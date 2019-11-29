import React from 'react'
import { connect } from 'react-redux'

class Danmu extends React.Component {
    render() {
        return (
            <div className="cover-danmu" onClick={this.handlePlayOrPause}></div>
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
        audio_ele: state.audio_ele
    }
}

export default connect(mapStateToProps, {})(Danmu)
