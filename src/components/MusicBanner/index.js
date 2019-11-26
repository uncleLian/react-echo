import React from 'react'
import './index.styl'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd-mobile'

export default class MusicBanner extends React.Component {
    render() {
        return (
            <div className="MusicBanner">
                <Carousel infinite autoplay={true}>
                    {this.props.json.map((item, index) => (
                        <Link className="item-link" to={`/detail/${item.sound.id}`} key={index}>
                            <img src={item.sound.pic_640} alt=""/>
                        </Link>
                    ))}
                </Carousel>
            </div>
        )
    }
}
