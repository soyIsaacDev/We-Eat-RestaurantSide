// Store

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducer/reducer";
import thunk from "redux-thunk";


const store = createStore(
    rootReducer, 
    compose(applyMiddleware(thunk))
);

export default store;