import React from 'react'
import './index.styl'

import { connect } from 'react-redux'
import { audioPlayOrPause } from '@/utils/audio'

class ControlBar extends React.Component {
    render() {
        const { audio_ele, audio_play } = this.props
        return (
            <div className={`control-playBtn ${audio_play ? 'pause' : 'play'}`} onClick={() => audioPlayOrPause(audio_ele)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_play: state.audio_play
    }
}

export default connect(mapStateToProps, {})(ControlBar)
