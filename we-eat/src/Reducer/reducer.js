//REDUCER
const initialState = {
    
    loginState:[{"autenticated":"LoggedIn"}],
    user: []
  }

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'GET_LOGIN':
        return{
          ...state,
          loginState: action.payload
        }
      
      case 'SET_USER':
        return{
          ...state,
          user: action.payload
        }
      
      default:
        return {...state}
    }
  };

  export default rootReducer;