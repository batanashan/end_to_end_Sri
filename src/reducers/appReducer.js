export const appReducer=(state,action)=>{
switch(action.type){
    case 'LOADER':
        return state={
            ...state,
            isLoading:action.payload
        }
        case 'LOGIN':
            return state={
                ...state,
                isLoggedIn:action.isLoggedIn,
                user:action.user
            }
}
return state;
}