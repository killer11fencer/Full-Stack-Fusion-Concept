import {createStore, combineReducers} from 'redux'
import reducer from  './reducer'
import adminReducer from './adminReducer'

const reduce = combineReducers({
    admin: adminReducer,
    client: reducer
})



export default createStore(reduce,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())