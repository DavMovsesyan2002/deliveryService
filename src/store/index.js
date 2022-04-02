import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {mapReducer} from "./mapReducer";

const rootReducer = combineReducers({
    map: mapReducer
})

export const store = createStore(rootReducer, composeWithDevTools())