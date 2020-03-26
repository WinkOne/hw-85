import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import productsReducer from "./reducer/reducer";
import usersReducer from "./reducer/usersReducer";
import trackHistoryReducer from "./reducer/trackHistoryReducer";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    reducer: productsReducer,
    users: usersReducer,
    trackHistoryReducers: trackHistoryReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;