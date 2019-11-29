import React from 'react'
import './index.styl'
import PlayListItem from './PlayListItem'
import { Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { setAudioData, setPlayList, setPlayMode } from '@/store/actions'
import { ArrayOptions, findActiveOption } from '@/utils/playMode'

class playList extends React.Component {
    render() {
        console.log('playList render')
        let { playList, playMode, handlePlayListOpen, playListVisible } = this.props
        const activePlayMode = findActiveOption(playMode)
        return (
            <div className="playList-container">
                {/* 头部 */}
                <div className="playList-header">
                    <div className="playList-mode-btn left" onClick={this.clearablePlayList}>清空</div>
                    <div className="playList-title">播放列表<span className="playList-count">（{playList.length}首）</span>
                    </div>
                    <div className={`playList-mode-btn right ${activePlayMode.icon}`} onClick={this.handlePlayModeOpen}></div>
                </div>
                {/* 播放列表 */}
                <ul className="playList-content">
                    {playList.length > 0 ?
                        playList.map(item =>
                            <PlayListItem json={item} key={item.sound.id} handlePlayListOpen={handlePlayListOpen} />
                        )
                        :
                        <div className="playList-nothing">什么都没有了T T~</div>
                    }
                </ul>
                {/* 播放模式 */}
                {playListVisible &&
                    <Modal popup animationType="slide-up" wrapClassName="playModePopup" visible={this.state.playModeVisible} onClose={this.handlePlayModeOpen}>
                        <div className="playMode-container">
                            {
                                ArrayOptions.map(item =>
                                    <div className={`playMode-item ${playMode === item.value ? 'active' : ''}`} key={item.value} onClick={() => this.handleChangePlayMode(item.value)}>
                                        <div className="item-label">{item.label}</div>
                                        <div className={`item-icon ${item.icon}`}></div>
                                    </div>
                                )}
                        </div>
                    </Modal >
                }
            </div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            playModeVisible: false
        }
    }
    handlePlayModeOpen = () => {
        this.setState(prevState => ({
            playModeVisible: !prevState.playModeVisible
        }))
    }
    clearablePlayList = () => {
        this.props.setPlayList([])
    }
    handleChangePlayMode(val) {
        this.props.setPlayMode(val)
        this.setState({
            playModeVisible: false
        })
    }
    // 处理播放模式
    handlePlayMode = () => {
        switch (this.porps.playMode) {
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
        if (this.props.playList[index].sound.id === this.audio_data.sound.id) {
            this.listRepeat()
        } else {
            this.set_audio_data(this.props.playList[index])
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
                this.setAudioData(this.props.playList[nextIndex])
            }
        } else {
            console.warn('正常逻辑不会到这里啊')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        playList: state.playList,
        playMode: state.playMode
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAudioData: (data) => {
            dispatch(setAudioData(data))
        },
        setPlayList: (data) => {
            dispatch(setPlayList(data))
        },
        setPlayMode: (data) => {
            dispatch(setPlayMode(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(playList)
