export const updatedData = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.data.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || new Date(expense.date).toISOString >= new Date(startDate).toISOString;
        const endDateMatch = typeof endDate !== 'number' || new Date(expense.date).toISOString <= new Date(endDate).toISOString;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.date < b.date ? 1 : -1;
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export const sumExpense = (expenses) => {
    return expenses.reduce((a, b) => {
       return  a + b.amount
    }, 0)
}