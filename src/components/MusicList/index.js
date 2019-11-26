import React from 'react'
import './index.styl'
import { Link } from 'react-router-dom'
import { hotClass } from '@/utils/filter'

// 音乐列表
export default class MusicList extends React.Component {
    render() {
        let listJson = this.props.json
        return (
            <ul className="MusicList">
                {listJson && listJson.map(item =>
                    <li className="list-item" key={item.sound.id}>
                        <Link className="item-link" to={`/detail/${item.sound.id}`}>
                            <div className="item-image-container">
                                <img className="item-image" src={item.sound.pic_500} alt="" />
                                <div className={'my-icon-hot item-fire ' + hotClass(item.sound.is_hot)}></div>
                            </div>
                            <div className="item-name">{item.sound.name}</div>
                        </Link>
                        <div className="item-channel">
                            <div className="item-channel-value">{item.sound.channel.name}</div>
                            <div className="item-channel-label">频道</div>
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}
