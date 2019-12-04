import React from 'react'

import Cover from '../Cover'
import Control from '../Control'
import PlayList from '../PlayList'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class barContainer extends React.Component {
    render() {
        let { audio_data } = this.props
        return (
            <React.Fragment>
                {audio_data &&
                    <div className="bar-container">
                        <div className="bar-info">
                            <Cover audio_data={audio_data} />
                            <Control handlePlayListOpen={this.handlePlayListOpen} />
                        </div>
                        <Modal popup animationType="slide-up" visible={this.state.playListVisible} onClose={this.handlePlayListOpen}>
                            <PlayList handlePlayListOpen={this.handlePlayListOpen} playListVisible={this.state.playListVisible} />
                        </Modal >
                    </div>
                }
            </React.Fragment>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            playListVisible: false,
            unlisten: ''
        }
    }
    handlePlayListOpen = () => {
        this.setState(prevState => {
            let unlisten = ''
            if (!prevState.playListVisible) {
                unlisten = this.props.history.listen((location, action) => {
                    this.state.unlisten && this.state.unlisten()
                    this.setState({
                        playListVisible: false,
                        unlisten: null
                    })
                })
            } else {
                this.state.unlisten && this.state.unlisten()
                unlisten = ''
            }
            return {
                playListVisible: !prevState.playListVisible,
                unlisten: unlisten
            }
        })
    }
}
const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data
    }
}

export default withRouter(connect(mapStateToProps, {})(barContainer))
