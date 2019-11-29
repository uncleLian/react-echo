import React from 'react'
import './index.styl'
import { connect } from 'react-redux'
import { listRepeat } from '@/store/actions'

// 按钮
class Control extends React.Component {
    render() {
        let { audio_play } = this.props
        console.log('Control render')
        return (
            <div className="musicBar-control">
                {/* 播放列表 */}
                <div className="control-icon my-icon-menu" onClick={this.props.handlePlayList}></div>
                {/* 播放/暂停 */}
                <div className={`control-icon control-icon-mid ${audio_play ? "my-icon-pause" : "my-icon-arrow"}`} onClick={this.handlePlayOrPause} ></div>
                {/* 下一首 */}
                <div className="control-icon my-icon-next" onClick={this.handleNextPlay} ></div>
            </div>
        )
    }
    handlePlayOrPause = () => {
        if (this.props.audio_ele.paused) {
            this.props.audio_ele.play()
        } else {
            this.props.audio_ele.pause()
        }
    }
    handleNextPlay = () => {
        const params = {
            audio_data: this.props.audio_data,
            audio_ele: this.props.audio_ele,
            playList: this.props.playList
        }
        this.props.listRepeat(params)
    }
    shouldComponentUpdate(newProps) {
        if (newProps.audio_play !== this.props.audio_play) {
            return true
        }
        return false
    }
}

const mapStateToProps = (state) => {
    return {
        audio_play: state.audio_play,
        audio_data: state.audio_data,
        audio_ele: state.audio_ele,
        playList: state.playList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listRepeat: (data) => {
            dispatch(listRepeat(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Control)

