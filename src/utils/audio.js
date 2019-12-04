// 播放/暂停
export function audioPlayOrPause(ele) {
    ele.paused ? ele.play() : ele.pause()
}
// 是否替换音频地址
export function audioSetRoute(audio) {
    // 切换音频时，判断当前是否详情页，是则替换当前地址
    const fullPath = window.location.href
    if (fullPath.includes('/detail')) {
        window.location.replace(`/#/detail/${audio.sound.id}`)
    }
}
