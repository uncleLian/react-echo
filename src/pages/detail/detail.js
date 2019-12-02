import React from 'react'
import './detail.styl'

import MusicList from '@/components/MusicList'
import ControlBar from './ControlBar'
import ProgressBar from './ProgressBar'
import Danmu from './Danmu'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { setAudioData, addPlayList } from '@/store/actions.js'
import { getDetail, getOther } from '@/api'
const vipIcon = require('@/assets/img/vip.png')

class Detail extends React.Component {
    render() {
        const { audio_data } = this.props
        return (
            <React.Fragment>
                {audio_data && !this.state.loading &&
                    <div key={this.props.location.pathname} id="detail" className={audio_data ? 'musicBar-padding' : ''}>
                        <div className="detail-container">
                            <div className="detail-author">
                                <div className="author-left">
                                    <div className="author-avatar">
                                        <img className="author-img" src={audio_data.sound.user.avatar_50} alt="" />
                                        {audio_data.sound.user.famous_type &&
                                            <img className='author-vip' src={vipIcon} alt="" />
                                        }
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
                                <Danmu />
                                <ProgressBar />
                                <div className="control">
                                    <ControlBar />
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
                    </div>
                }
            </React.Fragment>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            otherJson: null,
            loading: false
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.getDetailData(id)
        this.getOtherData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.getDetailData(nextProps.match.params.id)
            this.getOtherData()
        } else {
            window.scrollTo(0, 0)
        }
    }
    getDetailData = (id) => {
        this.setState({ loading: true })
        Toast.loading('Loading', 0)
        window.scrollTo(0, 0)
        getDetail(id).then(res => {
            // console.log(res)
            if (res.data) {
                let { audio_ele } = this.props
                if (audio_ele.src !== res.data.sound.source) {
                    this.props.setAudioData(res.data)
                    this.props.addPlayList(res.data)
                }
            }
            Toast.hide()
            this.setState({ loading: false })
        }).catch(err => {
            console.log(err)
        })
    }
    getOtherData = () => {
        getOther().then(res => {
            // console.log(res)
            if (res.data) {
                this.setState({
                    otherJson: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })

    }
}

const mapStateToProps = (state) => {
    return {
        audio_ele: state.audio_ele,
        audio_data: state.audio_data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAudioData: (data) => {
            dispatch(setAudioData(data))
        },
        addPlayList: (data) => {
            dispatch(addPlayList(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
