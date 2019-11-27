import React from 'react'
import './index.styl'
import { Link } from 'react-router-dom'

// 封面信息
export default class Cover extends React.Component {
    render() {
        let { audio_data } = this.props
        return (
            <React.Fragment>
                <Link className="cover-img" to={`/detail/${audio_data.sound.id}`}>
                    <img src={audio_data.sound.pic_500} alt="" />
                </Link>
                <div className="cover-detail">
                    <div className="detail-name">{audio_data.sound.name}</div>
                    <div className="detail-author">{audio_data.sound.user.name}</div>
                </div>
            </React.Fragment>
        )
    }
    shouldComponentUpdate(newProps) {
        if (newProps.audio_data.sound.id !== this.props.audio_data.sound.id) {
            return true
        }
        return false
    }
}
