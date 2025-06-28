// import { configureStore } from '@reduxjs/toolkit';
// import  { categoryReducer, productReducer } from './slices/productSlice'


// const store = configureStore({
//     reducer:{
//         product: productReducer,
//         categories: categoryReducer,
//     }
// })


// export default store;

import { applyMiddleware, combineReducers, createStore} from "redux";
import { thunk } from "redux-thunk";
import generalManagementReducer from "./reducer/generalManagementReducer";
import userManagementReducer from "./reducer/userManagementReducer";
import supportManagementReducer from "./reducer/supportManagementReducer";
import landingManagementReducer from "./reducer/landingManagementReducer";


const rootReducer = combineReducers({
    landing: landingManagementReducer,
    general: generalManagementReducer,
    users: userManagementReducer,
    supports: supportManagementReducer,
   
});

const store = createStore(rootReducer,window.REDUX_DEVTOOLS_EXTENSION_COMPOSE && Window.__REDUX_DEVTOOLS_EXTENSION_(), applyMiddleware(thunk));

export default store;