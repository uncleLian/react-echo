import React from 'react'
import './index.styl'

import AudioContainer from './Audio'
import Bar from './Bar'
import Progress from './Progress'

class MusicBar extends React.Component {
    render() {
        return (
            <div id="MusicBar">
                <AudioContainer />
                <Bar />
                <Progress />
            </div >
        )
    }
}

export default MusicBar
