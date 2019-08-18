const expenseReducer = (state, action) => {
    switch (action.type){
        case 'UPDATE_FILTER':
            return {
                ...state,
                filter: action.filter
            };
        case 'AUTO_UPDATE':
            return {
                ...state,
                data: action.expenses
            }
        default:
            return state;
    }
}
export default expenseReducer;