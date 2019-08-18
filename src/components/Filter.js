import React, {useContext, useState, useEffect} from 'react';
import Store from '../context';

const Filter = props => {
    const store = useContext(Store);
    const sortBy = useChangeValue(store.expense.filter.sortBy);
    const text = useChangeValue(store.expense.filter.text);
    // const startDate = useChangeValue(store.expense.filter.startDate);
    // const endDate = useChangeValue(store.expense.filter.endDate);

    useEffect(() => {
        store.updateFilter({sortBy: sortBy.value, startDate: '', endDate: '', text: text.value})
    }, [sortBy.value, text.value])
    
    return(
        <>
            <input className="filters" placeholder="Search expenses" type="text" {...text} />
            <select className="filters" {...sortBy} >
                <option value='date'>Date</option>
                <option value='amount'>Amount</option>
            </select>
            {/* <input className="filters" max={endDate.value} placeholder="Start Date" type="date" {...startDate} />
            <input className="filters" min={startDate.value} placeholder="End Date" type="date" {...endDate} /> */}
        </>
    )
}

const useChangeValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = e => {
        setValue(e.target.value);
    } 
    return {
        onChange: handleChange,
        value: value
    }
}

export default Filter;