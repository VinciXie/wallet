import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../Reducer'

let middleware = [thunk]

const Store = createStore(rootReducer,
    applyMiddleware(...middleware)
)

export default Store