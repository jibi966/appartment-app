import {legacy_createStore as createStore, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {HomeReducer} from "./Home/reducer";

const middleware = [thunk];
const rootReducer = combineReducers({
    HomeReducer,
});

let store: any;

if (process.env.NODE_ENV !== 'production') {
    store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
} else {
    store = createStore(rootReducer, applyMiddleware(...middleware));
}

export default store;