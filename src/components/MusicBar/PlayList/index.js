import React from 'react'
import './index.styl'
import PlayListItem from './PlayListItem'
import { connect } from 'react-redux'
import { setPlayList } from '@/store/actions'

// 封面信息
class playList extends React.Component {
    render() {
        let { playList, handlePlayListOpen } = this.props
        return (
            <div className="playList-container">
                <div className="playList-header">
                    <div className="playList-mode-btn left" onClick={this.clearablePlayList}>清空</div>
                    <div className="playList-title">播放列表<span className="playList-count">（{playList.length}首）</span>
                    </div>
                    <div className="playList-mode-btn right my-icon-more"></div>
                </div>
                <ul className="playList-content">
                    {
                        playList.map(item =>
                            <PlayListItem json={item} key={item.sound.id} handlePlayListOpen={handlePlayListOpen} />
                        )}
                </ul>
            </div>
        )
    }
    clearablePlayList = () => {
        this.props.setPlayList([])
    }
}

const mapStateToProps = (state) => {
    return {
        playList: state.playList
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPlayList: (data) => {
            dispatch(setPlayList(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(playList)
