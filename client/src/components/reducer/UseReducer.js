const storedState = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

export const initialState = storedState;

export const reducer = (state,action) =>{
    if(action.type ==="LOGIN" || "LOGOUT"){
        return action.payload;
    }
    return state;
}