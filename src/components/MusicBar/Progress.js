import React from 'react'
import './progress.styl'

import { connect } from 'react-redux'

// 进度条
class Progress extends React.Component {
    render() {
        const { audio_progress } = this.props
        return (
            <div className="musicBar-progress">
                <div className="progress-length" style={{ 'width': audio_progress }}></div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        audio_progress: state.audio_progress
    }
}

export default connect(mapStateToProps, {})(Progress)
