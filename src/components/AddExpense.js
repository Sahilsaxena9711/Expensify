import React, {useState, useContext, useEffect} from 'react';
import Store from '../context';
const AddExpense = (props) => {
    const description = useInput('');
    const date = useInput('Date');
    const amount = useInput('');
    const store = useContext(Store);
    
    const onSubmit = e => {
        e.preventDefault();
        store.addExpense({description: description.value, date: date.value, amount: parseInt(amount.value)})
    }

    useEffect(() => {
        return () => {
            props.history.push('/')
        };
    }, [store.expense.data.length])

    return(
        <>
            <div className="detailsContainer">
                <div className="detailsWrapper"><h1 className="detailsText">Add Expense</h1></div>
            </div>
            <div className="formContainer">
                <form onSubmit={(e) => onSubmit(e)}>
                    <input required className="addEditInputs" placeholder="Description" type="text" {...description}/>
                    <input required className="addEditInputs" placeholder="Amount" type="number" {...amount}/>
                    <input required className="addEditInputs" placeholder="Date" type="date" {...date} />
                    <div>
                        <button type="submit">Add Expense</button>
                    </div>
                </form>
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

export default AddExpense