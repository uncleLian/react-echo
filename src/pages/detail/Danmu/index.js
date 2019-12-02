import React from 'react'

import { connect } from 'react-redux'
import { audioPlayOrPause } from '@/utils/audio'

class Danmu extends React.Component {
    render() {
        const { audio_ele } = this.props
        return (
            <div className="cover-danmu" onClick={() => audioPlayOrPause(audio_ele)}></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele
    }
}

export default connect(mapStateToProps, {})(Danmu)
