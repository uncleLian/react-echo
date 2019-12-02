import React from 'react'
import './index.styl'

import { connect } from 'react-redux'
import { listRepeat } from '@/store/actions'
import { audioPlayOrPause } from '@/utils/audio'

// 按钮
class Control extends React.Component {
    render() {
        let { audio_ele, audio_play, handlePlayListOpen } = this.props
        return (
            <div className="musicBar-control">
                {/* 播放列表 */}
                <div className="control-icon my-icon-menu" onClick={handlePlayListOpen}></div>
                {/* 播放/暂停 */}
                <div className={`control-icon control-icon-mid ${audio_play ? "my-icon-pause" : "my-icon-arrow"}`} onClick={() => audioPlayOrPause(audio_ele)} ></div>
                {/* 下一首 */}
                <div className="control-icon my-icon-next" onClick={this.handleNextAudio} ></div>
            </div>
        )
    }
    shouldComponentUpdate(newProps) {
        if (newProps.audio_play !== this.props.audio_play) {
            return true
        }
        return false
    }
    handleNextAudio = () => {
        const params = {
            audio_ele: this.props.audio_ele,
            audio_data: this.props.audio_data,
            playList: this.props.playList
        }
        this.props.nextAudio(params)
    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_data: state.audio_data,
        audio_play: state.audio_play,
        playList: state.playList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        nextAudio: (data) => {
            dispatch(listRepeat(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)
