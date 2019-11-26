import React from 'react'
import './index.styl'
import { connect } from 'react-redux'

class ControlBar extends React.Component {
    render() {
        return (
            <div className={`control-playBtn ${this.props.audio_play ? 'pause' : 'play'}`} onClick={this.props.handlePlayOrPause} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audio_play: state.audio_play
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar)
