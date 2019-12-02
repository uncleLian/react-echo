import React from 'react'
import './index.styl'

import AudioContainer from './Audio'
import Bar from './Bar'

class MusicBar extends React.Component {
    render() {
        return (
            <div id="MusicBar">
                <AudioContainer />
                <Bar />
            </div >
        )
    }
}

export default MusicBar
