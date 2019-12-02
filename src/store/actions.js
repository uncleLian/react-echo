// Audio
export function setAudioEle(data) {
    return { type: 'SET_AUDIO_ELE', data }
}
export function setAudioData(data) {
    return { type: 'SET_AUDIO_DATA', data }
}
export function setAudioPlay(data) {
    return { type: 'SET_AUDIO_PLAY', data }
}
export function setAudioProgress(data) {
    return { type: 'SET_AUDIO_PROGRESS', data }
}
// 播放列表
export function setPlayList(data) {
    return { type: 'SET_PLAY_LIST', data }
}
export function addPlayList(data) {
    return { type: 'ADD_PLAY_LIST', data }
}
export function deletePlayList(data) {
    return { type: 'DELETE_PLAY_LIST', data }
}
// 播放模式
export function setPlayMode(data) {
    return { type: 'SET_PLAY_MODE', data }
}
export function randomPlay(data) {
    return { type: 'RANDOM_PLAY', data }
}
export function singleRepeat(data) {
    return { type: 'SINGLE_REPEAT', data }
}
export function listRepeat(data) {
    return { type: 'LIST_REPEAT', data }
}
