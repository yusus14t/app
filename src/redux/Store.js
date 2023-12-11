import { createStore } from 'redux';
import * as Reducers from './Reducer';

const reducer = (state = {}, action) => {
    try{
        return Reducers[action.type](state, action)
    } catch(errro){
        return state
}}

const store = createStore(reducer)

export default store;