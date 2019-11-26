import { combineReducers } from 'redux'

let defaultState = {
    audio_ele: '',
    audio_data: '',
    audio_play: false,
    audio_progress: 0,
    playList: [],
    playMode: 'default'
}

let reducers = {
    audio_ele: (state = defaultState.audio_ele, action) => {
        switch (action.type) {
            case 'SET_AUDIO_ELE':
                return action.data
            default:
                return state
        }
    },
    audio_data: (state = defaultState.audio_data, action) => {
        switch (action.type) {
            case 'SET_AUDIO_DATA':
                // 音乐不存在则添加到播放列表
                const isHas = defaultState.playList.find((n) => n.sound.id === action.data.sound.id)
                if (!isHas) {
                    defaultState.playList.unshift(action.data)
                }
                return action.data
            default:
                return state
        }
    },
    audio_play: (state = defaultState.audio_play, action) => {
        switch (action.type) {
            case 'SET_AUDIO_PLAY':
                return action.data
            default:
                return state
        }
    },
    audio_progress: (state = defaultState.audio_progress, action) => {
        switch (action.type) {
            case 'SET_AUDIO_PROGRESS':
                return action.data
            default:
                return state
        }
    },
    playList: (state = defaultState.playList, action) => {
        switch (action.type) {
            case 'SET_PLAY_LIST':
                return action.data
            default:
                return state
        }
    },
    playMode: (state = defaultState.playMode, action) => {
        switch (action.type) {
            case 'SET_PLAY_MODE':
                return action.data
            default:
                return state
        }
    }
}

export default combineReducers(reducers)
