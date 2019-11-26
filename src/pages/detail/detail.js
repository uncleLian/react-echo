import React from 'react'
import './detail.styl'
import MusicList from '@/components/MusicList'
import ControlBar from '@/pages/detail/components/ControlBar'
import ProgressBar from '@/pages/detail/components/ProgressBar'
import { getDetail, getOther } from '@/api'
import { connect } from 'react-redux'
import { setAudioData } from '@/store/actions.js'

class Detail extends React.Component {
    render() {
        let audio_data = this.state.musicJson
        return (
            <div id="detail">
                {audio_data &&
                    <div className="detail-container">
                        <div className="detail-author">
                            <div className="author-left">
                                <div className="author-avatar">
                                    <img className="author-img" src={audio_data.sound.user.avatar_50} alt="" />
                                    <img className='author-vip' src={'~@/assets/img/vip.png'} alt="" />
                                </div>
                                <div className="author-name">{audio_data.sound.user.name}</div>
                            </div>
                            <div className="author-right">
                                <div className="right-item">
                                    <div className="item-label">粉丝</div>
                                    <div className="item-value">{audio_data.sound.user.followed_count}</div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-cover">
                            <img className="cover-img" src={audio_data.sound.pic_500} alt="" />
                            <div className="cover-danmu" onClick={this.handlePlayOrPause}></div>
                            <ProgressBar />
                            <div className="control">
                                <ControlBar handlePlayOrPause={this.handlePlayOrPause} />
                                <div className="control-info">
                                    <div className="info-name">{audio_data.sound.name}</div>
                                    <div className="info-source">
                                        <span className="info-author primaryColor">{audio_data.sound.user.name}</span>
                                        <div className="info-label">发布在</div>
                                        <span className='info-channel primaryColor'>{audio_data.sound.channel.name}</span>
                                        <div className="info-label">频道</div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="detail-info">
                            <div className="info-left">
                                <div className="left-item">
                                    <div className="item-icon my-icon-play"></div>
                                    <div className="item-value">{audio_data.sound.view_count} 播放</div>
                                </div>
                                <div className="left-item">
                                    <div className="item-icon my-icon-like"></div>
                                    <div className="item-value">{audio_data.sound.like_count} 喜欢</div>
                                </div>
                            </div>
                            <div className="info-right">
                                <div className="right-item">
                                    <div className="item-icon my-icon-bell"></div>
                                    <div className="item-label">设为手机铃声</div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-lyric">
                            {audio_data.sound.song_info &&
                                <div>
                                    {audio_data.sound.song_info.album_name &&
                                        <p>{audio_data.sound.song_info.album_name.type} : {audio_data.sound.song_info.album_name.name}</p>
                                    }
                                    {audio_data.sound.song_info.author &&
                                        <p>{audio_data.sound.song_info.author.type} : {audio_data.sound.song_info.author.name}</p>
                                    }
                                    {audio_data.sound.song_info.name &&
                                        <p>{audio_data.sound.song_info.name.type} : {audio_data.sound.song_info.name.name}</p>
                                    }
                                </div>
                            }
                            {audio_data.sound.lyrics &&
                                <div dangerouslySetInnerHTML={{ '__html': audio_data.sound.lyrics }}></div>
                            }
                            {(!audio_data.sound.song_info && !audio_data.sound.lyrics) &&
                                <div className="noLyric">没有相关的歌词T T~ </div>
                            }
                        </div>
                        <div className="detail-other">
                            <div className="other-title">
                                <span className="title-label primaryColor">相关推荐</span>
                            </div>
                            <div className="other-recommend">
                                <MusicList json={this.state.otherJson} />
                            </div>
                        </div>
                    </div >
                }
            </div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            musicJson: null,
            otherJson: []
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.getDetailData(id)
        this.getOtherData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.getDetailData(nextProps.id)
            this.getOtherData()
        }
    }
    getDetailData = (id) => {
        window.scrollTo(0, 0)
        getDetail(id).then(res => {
            if (res.data) {
                // console.log(res.data)
                this.setState(() => {
                    return {
                        musicJson: res.data
                    }
                })
                this.musicJson = res.data
                let { audio_ele } = this.props
                if (audio_ele.src !== res.data.sound.source) {
                    this.props.setAudioData(res.data)
                }
            }
        })
    }
    getOtherData = () => {
        getOther().then(res => {
            if (res.data) {
                this.setState(() => {
                    return {
                        otherJson: res.data
                    }
                })
            }
        })
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
        audio_data: state.audio_data,
        audio_ele: state.audio_ele
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAudioData: (data) => {
            dispatch(setAudioData(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
