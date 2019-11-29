import { Toast } from 'antd-mobile'

// 播放模式配置文件
const Options = {
    default: {
        label: '默认',
        value: 'default',
        icon: 'my-icon-more'
    },
    random: {
        label: '随机播放',
        value: 'random',
        icon: 'my-icon-random'
    },
    singleRepeat: {
        label: '单曲循环',
        value: 'singleRepeat',
        icon: 'my-icon-repeatone'
    },
    listRepeat: {
        label: '列表循环',
        value: 'listRepeat',
        icon: 'my-icon-repeat'
    }
}

export function randomPlay(params) {
    let res = ''
    // 0 ~ 播放列表的长度，随机得到一个数
    // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
    let index = ~~(Math.random() * params.playList.length)
    if (params.playList[index].sound.id === params.audio_data.sound.id) {
        res = listRepeat(params)
    } else {
        res = params.playList[index]
    }
    return res
}
// 单曲循环
export function singleRepeat(params) {
    let res = params.audio_data
    params.audio_ele.load()
    params.audio_ele.play()
    return res
}
// 列表循环
export function listRepeat(params) {
    let res = ''
    // 获取当前音乐位置currentIndex
    // currentIndex是结尾的话，nextIndex就等于0，否则 +1
    // 只有一首音乐，播放模式是列表循环或者用户点击下一首的情况：重新加载并播放当前的音乐
    let currentIndex = params.playList.findIndex(n => n.sound.id === params.audio_data.sound.id)
    if (currentIndex > -1) {
        let nextIndex
        currentIndex === params.playList.length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1
        if (params.playList[nextIndex].sound.id === params.audio_data.sound.id) {
            res = singleRepeat(params)
        } else {
            res = params.playList[nextIndex]
        }
    } else {
        console.warn('正常逻辑不会到这里啊')
        Toast.fail('没有找到下一首', 2)
        res = params.audio_data
    }
    return res
}

export let ArrayOptions = []
Object.keys(Options).forEach(key => {
    ArrayOptions.push(Options[key])
})

export function findActiveOption(value) {
    const activeOption = ArrayOptions.find(item => item.value === value)
    return activeOption
}

export default Options
