// 时间处理（秒转为00:00格式）
export const sec2his = (t) => {
    if (~~t || t < 1) {
        var tt = Math.round(t)
        var m = Math.floor(t / 60)
        var s = tt % 60
        m = m >= 10 ? m : '0' + m
        s = s >= 10 ? s : '0' + s
        return m + ':' + s
    } else {
        return '00:00'
    }
}
// 热度处理（根据值转对应icon）
export const hotClass = (hot) => {
    switch (hot) {
        case 1: return 'fire-red'
        case 3: return 'fire-yellow'
        case 4: return 'fire-blue'
        default: return ''
    }
}

/** 进度条
 * @params  DOM      audio节点
 * @return  String   百分比%
*/
export const getProgressPercent = (audio) => {
    let progress = 0
    if (audio) {
        progress = (audio.currentTime / audio.duration * 100).toFixed(2) + '%'
    }
    return progress
}
