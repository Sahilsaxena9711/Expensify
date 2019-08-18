import React, {useEffect, useReducer} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import Dashboard from '../components/Dashboard';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Login from '../components/Login';
import Store from '../context';
import expenseReducer from '../redux/expense/reducer';
import authReducer from '../redux/auth/reducer';
import database, { googleAuthProvider, firebase } from '../firebase/firebase';

const AppRouter = () => {
  const filter = {
    text: '', 
    sortBy: 'date', 
    startDate: '',
    endDate: ''
  }

  const initialExpense = {
    data: [],
    filter: filter,
  }

  const [expense, dispatchExpense] = useReducer(expenseReducer, initialExpense);
  const [auth, dispatchAuth] = useReducer(authReducer, {isAuth: false, isLoading: true});

  const updateFilter = (filter) => {
    dispatchExpense({type: 'UPDATE_FILTER', filter})
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        dispatchAuth({type: 'AUTH_STATE_CHANGE', payload: {
          isAuth: true,
          uuid: user.uid,
          isLoading: false,
          profilePicture: user.photoURL
        }});
      }else{
        dispatchAuth({type: 'AUTH_STATE_CHANGE', payload: {
          isAuth: false,
          uuid: null,
          isLoading: false,
          profilePicture: null
        }});
      }
    })
  }, [])

  const editExpense = expense => {
    database.ref(`expenses/${auth.uuid}/${expense.id}`).update({
      description: expense.description,
      amount: expense.amount,
      date: expense.date
    })
  }

  const removeExpense = (id) => {
    database.ref(`expenses/${auth.uuid}/${id}`).set(null);
  }

  const addExpense = (expense) => {
    database.ref(`expenses/${auth.uuid}`).push(expense).catch((e) => {
      console.log(e)
    });
  };

  const logout = () => {
    firebase.auth().signOut().then((res) => {
      dispatchAuth({type: 'AUTH_STATE_CHANGE', payload: {
        isAuth: false,
        isLoading: false,
        uuid: null,
        profilePicture: null
      }});
    }).catch((e) => {
      console.log(e)
    })
  }

  const login = () => {
    firebase.auth().signInWithPopup(googleAuthProvider).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    if(auth.isAuth){
      database.ref(`expenses/${auth.uuid}`).on('value', (snapshot) => {
        const expenses = [];
        snapshot.forEach((snapshotChild) => {
          expenses.push({
            id: snapshotChild.key,
            ...snapshotChild.val()
          });
        });
        dispatchExpense({
          type: 'AUTO_UPDATE',
          expenses
        });
      });
    };
    return () => {
      database.ref('expenses').off();
    };
  }, [auth.isAuth]);


  if(auth.isLoading){
    return (
      <div className="loaderConatiner">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
  return(
      <Store.Provider value={{expense:expense, auth: auth, updateFilter: updateFilter, addExpense: addExpense, login: login, editExpense: editExpense, removeExpense: removeExpense, logout: logout}}>
        <BrowserRouter>
        <>
          {auth.isAuth && <Header/>}
        </>
          <Switch>
            {(!auth.isAuth && !auth.isLoading) && <Route path="/" component={Login} />}
            {(auth.isAuth && !auth.isLoading) && <Route path="/" exact component={Dashboard} />}
            {(auth.isAuth && !auth.isLoading) && <Route path="/create" component={AddExpense} />}
            {(auth.isAuth && !auth.isLoading) && <Route path="/edit/:id" component={EditExpense} />}
            <Route component={NotFound} />
          </Switch>
      </BrowserRouter>
      </Store.Provider>
    )
};

export default AppRouter;