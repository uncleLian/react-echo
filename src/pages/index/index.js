import React from 'react'
import './index.styl'
import MusicBanner from '@/components/MusicBanner'
import MusicList from '@/components/MusicList'
import BottomLoading from '@/components/BottomLoading'
import { getBanner, getList } from '@/api'

export default class Index extends React.Component {
    render() {
        return (
            <div id="index">
                <MusicBanner json={this.state.bannerJson} />
                {/* 推荐 */}
                <div className="recommend-container">
                    <div className="recommend-title">
                        <span>echo每日推荐</span>
                    </div>
                    <div className="playAll">
                        <i className="playAll-icon my-icon-arrow"></i>
                        <div className="playAll-label">一键播放</div>
                    </div>
                    <MusicList json={this.state.listJson} />
                </div>
                <BottomLoading loading={this.state.loading}/>
            </div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            bannerJson: [],
            listJson: [],
            page: 1,
            loading: false,
            lock: false
        }
    }
    componentDidMount() {
        this.getBannerData()
        this.getListData()
        this.lock = false
        window.addEventListener('scroll', this.onScroll)
    }
    componentWillUnmount() {
        this.lock = true
        window.removeEventListener('scroll', this.onScroll)
    }
    getBannerData = () => {
        getBanner().then(res => {
            this.setState({
                bannerJson: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
    getListData = () => {
        getList(this.state.page).then(res => {
            this.setState({
                listJson: res.data,
                page: 2
            })
        }).catch(err => {
            console.log(err)
        })
    }
    getListMoreData = () => {
        if (!this.state.loading) {
            this.setState({
                loading: 'loading',
                lock: true
            })
            getList(this.state.page).then(res => {
                if (res.data && res.data.length > 0) {
                    this.setState(prevState => ({
                        listJson: prevState.listJson.concat(res.data),
                        page: ++prevState.page,
                        loading: false,
                        lock: false
                    }))
                } else {
                    this.setState({
                        loading: 'nothing',
                        lock: true
                    })
                }
            }).catch(() => {
                this.setState({
                    loading: 'error',
                    lock: true
                })
            })
        }
    }
    onScroll = () => {
        // 利用requestAnimationFrame保证流畅性和精准度，相对于setTimeout执行次数会增多
        requestAnimationFrame(() => {
            // 滚动高度
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            // 窗口高度
            let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            // 文档高度
            let documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            // 距离
            let distance = 10
            // this.$toast(`滚动高度：${scrollTop}, 窗口高度：${windowHeight}, 文档高度：${documentHeight}, `)
            let isBottom = scrollTop + windowHeight + distance >= documentHeight
            if (isBottom && !this.lock) {
                this.getListMoreData()
            }
        })
    }
}
