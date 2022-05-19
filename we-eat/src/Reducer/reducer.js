//REDUCER
const initialState = {
    
    loginState:""/* [{"autenticated":"LoggedIn"}] */,
    user: [],
    clienteyRestaurantes:[],
    loading: true
  }

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'LOADING':
        return{
          ...state,
          loading: false
        }
      
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

      case 'GET_CLIENTEYRESTAURANTES':
        return{
          ...state,
          clienteyRestaurantes: action.payload
        }
      
      default:
        return {...state}
    }
  };

  export default rootReducer;