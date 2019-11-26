import React from 'react'
import './app.styl'

import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// route components
import index from '@/pages/index/index'
import detail from '@/pages/detail/detail'
import MusicBar from '@/components/MusicBar'
// keep-alive-route
import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'
const LiveRoute = withRouter(NotLiveRoute)

class RouteConfig extends React.Component {
    render() {
        const { audio_data } = this.props
        return (
            <div id="app" className={audio_data ? 'musicBar-on' : ''}>
                <HashRouter>
                    <div>
                        <LiveRoute exact path="/" alwaysLive={true} component={index} />
                        <Route component={detail} path="/detail/:id" />
                        <MusicBar />
                    </div>
                </HashRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data
    }
}

export default connect(mapStateToProps, {})(RouteConfig)
