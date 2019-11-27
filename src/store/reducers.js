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
        // console.log('playList state', state)
        switch (action.type) {
            case 'SET_PLAY_LIST':
                return action.data
            case 'ADD_PLAY_LIST':
                // 添加播放列表（判断是否存在）
                const isHas = state.find((n) => n.sound.id === action.data.sound.id)
                if (!isHas) {
                    state.unshift(action.data)
                }
                return state
            case 'DELETE_PLAY_LIST':
                // 删除某项列表
                const index = state.findIndex((n) => n.sound.id === action.data.sound.id)
                let data = state
                if (index > -1) {
                    state.splice(index, 1)
                    data = [...state]
                }
                return data
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
