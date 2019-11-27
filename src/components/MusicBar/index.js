import React from 'react'
import ReactDOM from "react-dom"
import './index.styl'
import Bar from './Bar'
import { connect } from 'react-redux'
import { setAudioEle, setAudioPlay, setAudioProgress } from '@/store/actions'

// 音乐条
class MusicBar extends React.Component {
    render() {
        console.log('MusicBar render')
        const { audio_data } = this.props
        return (
            <div id="MusicBar">
                <audio id='audio' ref="audio" />
                {audio_data &&
                    <Bar audio_data={audio_data} audioDOM={this.audioDOM}/>
                }
            </div >
        )
    }
    componentDidMount() {
        this.audioInit()
    }
    componentWillReceiveProps(newProps) {
        if (newProps.audio_data) {
            this.audioDOM.src = newProps.audio_data.sound.source
            this.audioDOM.play()
        }
    }
    // audio元素初始化
    audioInit = () => {
        let _audio = ReactDOM.findDOMNode(this.refs.audio)
        if (_audio) {
            this.audioDOM = _audio
            this.props.setAudioEle(_audio)
            _audio.oncanplay = () => {
                _audio.play()
            }
            _audio.onplay = () => {
                console.log('播放')
                this.props.setAudioPlay(true)
            }
            _audio.onpause = () => {
                console.log('暂停')
                this.props.setAudioPlay(false)
            }
            _audio.ontimeupdate = () => {
                if (!this.audioDOM.paused) {
                    const progress = (_audio.currentTime / _audio.duration * 100).toFixed(2) + '%'
                    this.props.setAudioProgress(progress)
                }
            }
            _audio.onended = () => {
                this.props.setAudioPlay(false)
                // 加载播放模式逻辑
                //     switch (this.playMode) {
                //         case 'random': this.randomPlay()
                //             break
                //         case 'singleRepeat': this.singleRepeat()
                //             break
                //         case 'listRepeat': this.listRepeat()
                //             break
                //     }
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAudioEle: (data) => {
            dispatch(setAudioEle(data))
        },
        setAudioPlay: (status) => {
            dispatch(setAudioPlay(status))
        },
        setAudioProgress: (audio) => {
            dispatch(setAudioProgress(audio))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicBar)
