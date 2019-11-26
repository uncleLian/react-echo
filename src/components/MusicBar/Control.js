import React from 'react'
import './control.styl'
import { connect } from 'react-redux'

// 按钮
class Control extends React.Component {
    render() {
        let { audio_play } = this.props
        let playBtnStyle = audio_play ? "my-icon-pause" : "my-icon-arrow"
        return (
            <div className="musicBar-control">
                <div className="control-icon my-icon-menu" onClick={this.props.handleChangePlayList}></div>
                <div className={"control-icon control-icon-mid " + playBtnStyle} onClick={this.props.handleChangePlay} ></div>
                <div className="control-icon my-icon-next" onClick={this.listRepeat} ></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Control)

