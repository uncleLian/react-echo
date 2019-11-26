import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import Store from '@/store'
import { Provider } from 'react-redux'
import RouteConfig from '@/router'

import '@/assets'
import '@/mock'

ReactDOM.render(
    <Provider store={Store}>
        <RouteConfig />
    </Provider>,
    document.getElementById('root')
)
serviceWorker.unregister()
