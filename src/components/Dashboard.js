import React, {useContext} from 'react';
import ExpenseList from './ExpenseList';
import Store from '../context';
import Filter from './Filter';
import {updatedData} from '../helper';
import Details from './Details';

const Dashboard = (props) => {
    const store = useContext(Store);
    return(
        <div>
            <Details {...props} expense={updatedData(store.expense, store.expense.filter)}/>
            <div className="main">
                <Filter/>
                <ExpenseList expense={updatedData(store.expense, store.expense.filter)} />
            </div>
        </div>
    )
}

export default Dashboard