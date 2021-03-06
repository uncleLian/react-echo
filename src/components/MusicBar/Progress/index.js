import React from 'react'
import './index.styl'

import { connect } from 'react-redux'

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
