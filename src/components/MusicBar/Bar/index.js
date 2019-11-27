import React from 'react'

import Cover from '../Cover'
import Control from '../Control'
import Progress from '../Progress'
import PlayList from '../PlayList'
import { Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class barContainer extends React.PureComponent {
    render() {
        console.log('barContainer render')
        let { audio_data } = this.props
        return (
            <React.Fragment>
                <div className="bar-container">
                    <div className="bar-info">
                        <Cover audio_data={audio_data} />
                        <Control handlePlay={this.audioPlayOrPause} handlePlayList={this.handlePlayListOpen} />
                    </div>
                    <Progress />
                    <Modal popup animationType="slide-up" visible={this.state.playListVisible} onClose={this.handlePlayListOpen}>
                        <PlayList handlePlayListOpen={this.handlePlayListOpen}/>
                    </Modal >
                </div>
            </React.Fragment>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            playListVisible: false,
            unlisten: ''
        }
    }
    audioPlayOrPause = () => {
        if (this.props.audioDOM.paused) {
            this.props.audioDOM.play()
        } else {
            this.props.audioDOM.pause()
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

export default withRouter(barContainer)