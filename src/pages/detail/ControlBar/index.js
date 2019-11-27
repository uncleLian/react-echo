import React from 'react'
import './index.styl'
import { connect } from 'react-redux'

class ControlBar extends React.Component {
    render() {
        return (
            <div className={`control-playBtn ${this.props.audio_play ? 'pause' : 'play'}`} onClick={this.handlePlayOrPause} />
        )
    }
    handlePlayOrPause = () => {
        if (this.props.audio_ele.paused) {
            this.props.audio_ele.play()
        } else {
            this.props.audio_ele.pause()
        }
    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_play: state.audio_play
    }
}

export default connect(mapStateToProps, {})(ControlBar)
