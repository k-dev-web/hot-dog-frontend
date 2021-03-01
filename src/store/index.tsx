import {createStore, combineReducers,applyMiddleware} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import hotDogs from './FormHotDogs/reducer';
import editCard from './EditItem/reducer';
import hotDogsList from './HotDogsList/reducer';
import toast from "./Toast/reducer";
import logger from 'redux-logger'



const reducer = combineReducers({
    toast,
    hotDogsList,
    editCard,
    hotDogs,
    form: reduxFormReducer,
});
const store = createStore(reducer,applyMiddleware(logger));

export default store;
