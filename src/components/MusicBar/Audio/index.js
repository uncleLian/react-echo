import React from 'react'

import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { setAudioData, setAudioEle, setAudioPlay, setAudioProgress, randomPlay, singleRepeat, listRepeat } from '@/store/actions'

class AudioContainer extends React.Component {
    render() {
        return (
            <audio id='audio' ref="audio" />
        )
    }
    shouldComponentUpdate(newProps) {
        if (!this.props.audio_data || newProps.audio_data.sound.id !== this.props.audio_data.sound.id) {
            return true
        }
        return false
    }
    componentDidMount() {
        this.audioInit()
    }
    componentWillReceiveProps(newProps) {
        if (!this.props.audio_data || newProps.audio_data.sound.id !== this.props.audio_data.sound.id) {
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
                this.handlePlayMode()
            }
        }
    }
    // 处理播放模式
    handlePlayMode = () => {
        const params = {
            audio_ele: this.audioDOM,
            audio_data: this.props.audio_data,
            playList: this.props.playList
        }
        switch (this.props.playMode) {
            case 'random':
                console.log('随机播放')
                this.props.randomPlay(params)
                break
            case 'singleRepeat':
                console.log('单曲循环')
                this.props.singleRepeat(params)
                break
            case 'listRepeat':
                console.log('列表循环')
                this.props.listRepeat(params)
                break
            default:
                console.log('默认播放模式')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data,
        playList: state.playList,
        playMode: state.playMode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAudioData: (data) => {
            dispatch(setAudioData(data))
        },
        setAudioEle: (data) => {
            dispatch(setAudioEle(data))
        },
        setAudioPlay: (data) => {
            dispatch(setAudioPlay(data))
        },
        setAudioProgress: (audio) => {
            dispatch(setAudioProgress(audio))
        },
        randomPlay: (data) => {
            dispatch(randomPlay(data))
        },
        singleRepeat: (data) => {
            dispatch(singleRepeat(data))
        },
        listRepeat: (data) => {
            dispatch(listRepeat(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
