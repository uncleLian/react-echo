import React from 'react'
import './index.styl'
import { connect } from 'react-redux'

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
                <div className="control-icon my-icon-next" onClick={this.listRepeat} ></div>
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
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_play: state.audio_play
    }
}

export default connect(mapStateToProps, {})(Control)

