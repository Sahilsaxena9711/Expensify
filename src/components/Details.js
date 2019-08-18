import React from 'react';
import {sumExpense} from '../helper';
const Details = (props) => {
    return(
        <div className="detailsContainer">
            <div className="detailsWrapper">
                <h1 className="detailsText">
                    Viewing <b>{props.expense.length}</b> expense{props.expense.length !== 1 ? 's': null} totalling <b>₹{props.expense.length > 0 ? sumExpense(props.expense) : "00"}</b>
                </h1>
                <button onClick={() => props.history.push('/create')}>Add Expense</button>
            </div>
        </div>
    )
}

export default Details;