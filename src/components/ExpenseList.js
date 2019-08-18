import React from 'react';
import ExpenseItem from "./ExpenseItem";

const ExpenseList = props => {
    return(
        <>
            <div className="listContainer">
                <div className="listHeader">
                    <div>Expenses</div>
                    <div className="desktopOnly">Amount</div>
                </div>
                {props.expense.map((data, key) => (
                    <ExpenseItem key={key} {...data} />
                ))}
            </div>
        </>
    )
}

export default ExpenseList;