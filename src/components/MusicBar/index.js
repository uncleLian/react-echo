import React from 'react'
import './index.styl'
import AudioContinaer from './Audio'
import Bar from './Bar'

// 音乐条
class MusicBar extends React.Component {
    render() {
        console.log('MusicBar render')
        return (
            <div id="MusicBar">
                <AudioContinaer />
                <Bar />
            </div >
        )
    }
}

export default MusicBar
