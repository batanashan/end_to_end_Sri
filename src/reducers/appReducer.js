export const appReducer=(state,action)=>{
switch(action.type){
    case 'LOADER':
        return state={
            ...state,
            isLoading:action.payload
        }
}
return state;
}