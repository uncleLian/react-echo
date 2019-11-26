import React from 'react'
import ReactDOM from "react-dom"
import './index.styl'

import { withRouter } from 'react-router-dom'
import Cover from './Cover'
import Control from './Control'
import Progress from './Progress'
import Popup from './Popup'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { setAudioEle, setAudioPlay, setAudioProgress } from '@/store/actions'

// 音乐条
class MusicBar extends React.Component {
    render() {
        let { audio_data, playList } = this.props
        return (
            <div id="MusicBar">
                <audio id='audio' ref="audio" />
                {audio_data &&
                    <div className="bar-container">
                        <div className="bar-info">
                            <Cover audio_data={audio_data} />
                            <Control handleChangePlay={this.audioPlayOrPause} handleChangePlayList={this.handlePlayListOpen} />
                        </div>
                        <Progress progress={this.state.progress} />
                        <Modal popup animationType="slide-up" visible={this.state.playListVisible} onClose={this.handlePlayListOpen}>
                            <Popup audio_data={audio_data} playList={playList}></Popup>
                        </Modal >
                    </div>
                }
            </div >
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            playListVisible: false,
            unlisten: ''
        }
    }
    componentDidMount() {
        this.audioInit()
    }
    componentWillReceiveProps(newProps) {
        if (newProps.audio_data) {
            this.audioDOM.src = newProps.audio_data.sound.source
            this.audioDOM.play()
        }
        this.setState(prevState => ({
            playListVisible: false
        }))
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
                this.props.setAudioPlay(true)
            }
            _audio.onpause = () => {
                this.props.setAudioPlay(false)
            }
            _audio.ontimeupdate = () => {
                if (!this.audioDOM.paused) {
                    const progress = (_audio.currentTime / _audio.duration * 100).toFixed(2) + '%'
                    this.props.setAudioProgress(progress)
                    // this.setState({
                    //     progress: (_audio.currentTime / _audio.duration * 100).toFixed(2) + '%'
                    // })
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
    audioPlayOrPause = () => {
        if (this.audioDOM.paused) {
            this.audioDOM.play()
        } else {
            this.audioDOM.pause()
        }
    }
    handlePlayListOpen = () => {
        this.setState(prevState => {
            let unlisten = ''
            if (!prevState.playListVisible) {
                unlisten = this.props.history.listen((location, action) => {
                    this.state.unlisten && this.state.unlisten()
                    this.setState({
                        playListVisible: false,
                        unlisten: null
                    })
                })
            } else {
                this.state.unlisten && this.state.unlisten()
                unlisten = ''
            }
            return {
                playListVisible: !prevState.playListVisible,
                unlisten: unlisten
            }
        })
    }
    // 添加播放列表
    AddToPlayList = (item) => {
        // let ishas = false
        // if (this.playList.find((n) => n.sound.id === item.sound.id)) {
        //     ishas = true
        // }
        // if (!ishas) {
        //     this.playList.unshift(item)
        //     this.set_playList(this.playList)
        // }
    }
    // 随机播放
    randomPlay = () => {
        // 0 ~ 播放列表的长度，随机得到一个数
        // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
        // let index = ~~(Math.random() * this.playList.length)
        // if (this.playList[index].sound.id === this.audio_data.sound.id) {
        //     this.listRepeat()
        // } else {
        //     this.set_audio_data(this.playList[index])
        // }
    }
    // 单曲循环
    singleRepeat = () => {
        // this.audio.ele.load()
        // this.audio.ele.play()
    }
    // 列表循环
    listRepeat = () => {
        // 获取当前音乐位置currentIndex
        // currentIndex是结尾的话，nextIndex就等于0，否则 +1
        // 只有一首音乐，播放模式是列表循环或者用户点击下一首的情况：重新加载并播放当前的音乐
        // let currentIndex = this.playList.findIndex(n => n.sound.id === this.audio_data.sound.id)
        // if (currentIndex > -1) {
        //     let nextIndex
        //     currentIndex === this.playList.length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1
        //     if (this.playList[nextIndex].sound.id === this.audio_data.sound.id) {
        //         this.singleRepeat()
        //     } else {
        //         this.set_audio_data(this.playList[nextIndex])
        //     }
        // } else {
        //     console.warn('正常逻辑不会到这里啊')
        // }
    }
}

const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data,
        playList: state.playList,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicBar))
