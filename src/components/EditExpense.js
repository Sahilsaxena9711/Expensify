import React, {useContext, useState, useEffect} from 'react';
import Store from '../context';

const EditExpense = (props) => {

    const store = useContext(Store);
    
    useEffect(() => {
        return () => {
            props.history.push('/')
        };
    }, [store.expense.data || store.expense.data.length])
    
    const expense = store.expense.data.filter(expense => expense.id === props.match.params.id)[0];

    const description = useInput(expense.description);
    const date = useInput(expense.date);
    const amount = useInput(expense.amount);
    
    const remove = _ => {
        store.removeExpense(props.match.params.id);
        props.history.push('/');
    }

    const onSubmit = e => {
        e.preventDefault();
        store.editExpense({id: props.match.params.id,description: description.value, date: date.value, amount: parseInt(amount.value)});
        props.history.push('/');
    }

    return(
        <>
            <div className="detailsContainer">
                <div className="detailsWrapper"><h1 className="detailsText">Edit Expense</h1></div>
            </div>
            <div className="formContainer">
                <form onSubmit={(e) => onSubmit(e)}>
                    <input required className="addEditInputs" placeholder="Description" type="text" {...description}/>
                    <input required className="addEditInputs" placeholder="Amount" type="number" {...amount}/>
                    <input required className="addEditInputs" placeholder="Date" type="date" {...date} />
                    <div>
                        <button type="submit">Edit Expense</button>
                    </div>
                </form>
                <button onClick={() => remove()} type="button">Remove Expense</button>
            </div>
        </>
    )
}

const useInput = (initial) => {
    const [value, setValue] = useState(initial);
    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        onChange: handleChange,
        value: value
    }
}

export default EditExpense