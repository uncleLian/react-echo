import React from 'react'
import './app.styl'

// route components
import index from '@/pages/index/index'
import detail from '@/pages/detail/detail'
import MusicBar from '@/components/MusicBar'
// keep-alive-route
import { HashRouter, Route } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'
const LiveRoute = withRouter(NotLiveRoute)

export default class RouteConfig extends React.Component {
    render() {
        return (
            <div id="app">
                <HashRouter>
                    <div>
                        <LiveRoute exact path="/" alwaysLive={true} component={index} />
                        <Route component={detail} path="/detail/:id" />
                        <MusicBar />
                    </div>
                </HashRouter>
            </div >
        )
    }
}
