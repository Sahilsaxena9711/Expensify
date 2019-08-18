import React from 'react';
import {Link} from 'react-router-dom';

const ExpenseItem = ({id, amount, date, description}) => {
    return (
        <Link to={`edit/${id}`} className="listItem">
            <div className="descAmount">
                <div>
                    <h3>{description}</h3>
                    <p>{new Date(date).toDateString()}</p>
                </div>
                    <h3>₹{amount}</h3>
            </div>
        </Link>
    )
}

export default ExpenseItem