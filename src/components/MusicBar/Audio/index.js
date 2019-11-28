import React from 'react'
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { setAudioData, setAudioEle, setAudioPlay, setAudioProgress } from '@/store/actions'

// 音乐条
class AudioContainer extends React.Component {
    render() {
        console.log('AudioContainer render')
        return (
            <audio id='audio' ref="audio" />
        )
    }
    componentDidMount() {
        this.audioInit()
    }
    shouldComponentUpdate(newProps) {
        if (!this.props.audio_data || newProps.audio_data.sound.id !== this.props.audio_data.sound.id) {
            return true
        }
        return false
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
                console.log('加载播放模式逻辑')
                this.handlePlayMode()
            }
        }
    }
    // 处理播放模式
    handlePlayMode = () => {
        switch (this.props.playMode) {
            case 'random': this.randomPlay()
                break
            case 'singleRepeat': this.singleRepeat()
                break
            case 'listRepeat': this.listRepeat()
                break
            default:
                console.log('默认播放模式')
        }
    }
    // 随机播放
    randomPlay = () => {
        // 0 ~ 播放列表的长度，随机得到一个数
        // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
        let index = ~~(Math.random() * this.props.playList.length)
        if (this.props.playList[index].sound.id === this.props.audio_data.sound.id) {
            this.listRepeat()
        } else {
            this.props.setAudioData(this.props.playList[index])
        }
    }
    // 单曲循环
    singleRepeat = () => {
        this.audioDOM.load()
        this.audioDOM.play()
    }
    // 列表循环
    listRepeat = () => {
        // 获取当前音乐位置currentIndex
        // currentIndex是结尾的话，nextIndex就等于0，否则 +1
        // 只有一首音乐，播放模式是列表循环或者用户点击下一首的情况：重新加载并播放当前的音乐
        let currentIndex = this.props.playList.findIndex(n => n.sound.id === this.props.audio_data.sound.id)
        if (currentIndex > -1) {
            let nextIndex
            currentIndex === this.props.playList.length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1
            if (this.props.playList[nextIndex].sound.id === this.props.audio_data.sound.id) {
                this.singleRepeat()
            } else {
                this.props.setAudioData(this.props.playList[nextIndex])
            }
        } else {
            console.warn('正常逻辑不会到这里啊')
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAudioData: (audio) => {
            dispatch(setAudioData(audio))
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
