import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers.js'

const composeEnhancers = composeWithDevTools({
    shouldHotReload: false
})
let store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default store
