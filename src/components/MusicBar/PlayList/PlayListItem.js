import React from 'react'
import { connect } from 'react-redux'
import { setAudioData, deletePlayList } from '@/store/actions'
import { withRouter } from 'react-router-dom'

class playListItem extends React.Component {
    render() {
        const { audio_data } = this.props
        const item = this.props.json
        console.log('playListItem render')
        return (
            <li className={`playList-item ${audio_data.sound.id === item.sound.id ? 'playing' : ''}`} key={item.sound.id} onClick={this.handlePlay}>
                <div className="item-name">
                    <div className="name-icon-container">
                        <div className={`name-icon ${audio_data.sound.id === item.sound.id ? 'my-icon-circle-play' : 'smallCircle'}`}></div>
                    </div>
                    <div className={`name-value ${audio_data.sound.id === item.sound.id ? 'onPlay' : ''}`}>{item.sound.name}</div>
                </div>
                <div className="item-close my-icon-close" onClick={this.handleDelete}></div>
            </li>
        )
    }
    handlePlay = () => {
        const item = this.props.json
        // 判断当前是在/detail页，则使用链接跳转，否则只切换音乐数据
        if (this.props.history.location.pathname.includes('/detail/')) {
            this.props.history.push(`/detail/${item.sound.id}`)
        } else {
            this.props.setAudioData(item)
            this.props.handlePlayListOpen()
        }
    }
    handleDelete = (e) => {
        e.stopPropagation()
        const item = this.props.json
        this.props.deletePlayList(item)
    }
}

const mapStateToProps = (state) => {
    return {
        audio_data: state.audio_data
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deletePlayList: (data) => {
            dispatch(deletePlayList(data))
        },
        setAudioData: (data) => {
            dispatch(setAudioData(data))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(playListItem))
