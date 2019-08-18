const authReducer = (state, action) => {
    switch (action.type){
        case 'AUTH_STATE_CHANGE':
            return {
                isAuth: action.payload.isAuth,
                uuid: action.payload.uuid,
                profilePicture: action.payload.profilePicture
            }
        default:
        return state;
    }
}

export default authReducer;