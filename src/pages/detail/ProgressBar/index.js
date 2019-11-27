import React from 'react'
import './index.styl'
import { sec2his } from '@/utils/filter'
import { connect } from 'react-redux'
import { setAudioEle } from '@/store/actions.js'

class ProgressBar extends React.Component {
    render() {
        // 时间进度
        const { audio_ele } = this.props
        const audio_time = sec2his(audio_ele.currentTime) + '/' + sec2his(audio_ele.duration)
        // 进度条进度
        const progress = this.props.audio_progress || 0
        return (
            <div className="progress-bar-container" onClick={this.handleSeek}>
                <div className="progress-time">{audio_time}</div>
                <div className="progress-bar" style={{ 'width': progress }}></div>
            </div >
        )
    }
    // 调节进度条
    handleSeek = (e) => {
        e = e || window.event
        let percent = (e.pageX / window.innerWidth).toFixed(2)
        let audio_ele = this.props.audio_ele
        audio_ele.currentTime = audio_ele.duration * percent
    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_progress: state.audio_progress
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAudioEle: (data) => {
            dispatch(setAudioEle(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)