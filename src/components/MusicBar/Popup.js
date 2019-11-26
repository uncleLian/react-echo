import React from 'react'
import './popup.styl'

class popupContent extends React.Component {
    render() {
        let { audio_data, playList } = this.props
        return (
            <div className="playList-container">
                <div className="playList-header">
                    <div className="playList-mode-btn left">清空</div>
                    <div className="playList-title">播放列表<span className="playList-count">（{playList.length}首）</span>
                    </div>
                    <div className="playList-mode-btn right my-icon-more"></div>
                </div>
                <ul className="playList-content">
                    {
                        playList.map(item =>
                            <li className={`playList-item ${audio_data.sound.id === item.sound.id ? 'playing' : ''}`} key={item.sound.id}>
                                <div className="item-name">
                                    <div className="name-icon-container">
                                        <div className={`name-icon ${audio_data.sound.id === item.sound.id ? 'my-icon-circle-play' : 'smallCircle'}`}></div>
                                    </div>
                                    <div className={`name-value ${audio_data.sound.id === item.sound.id ? 'onPlay' : ''}`}>{item.sound.name}</div>
                                </div>
                                <div className="item-close my-icon-close"></div>
                            </li>
                        )}
                </ul>
            </div>
        )
    }
}
export default popupContent
