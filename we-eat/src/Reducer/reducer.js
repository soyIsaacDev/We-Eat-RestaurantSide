//REDUCER
const initialState = {
    
    loginState:""/* [{"autenticated":"LoggedIn"}] */,
    user: [],
    clienteyRestaurantes:[],
    envios:[],
    loading: true,
    location: "", 
    pedidos:[]
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
      case 'GET_PEDIDOS':
        return{
          ...state,
          pedidos: action.payload
        }
      case 'LOCATION':
        return{
          ...state,
          location: action.payload
        }
      case 'GET_ENVIOS':
        return{
          ...state,
          envios: action.payload
        }
      
      default:
        return {...state}
    }
  };

  export default rootReducer;