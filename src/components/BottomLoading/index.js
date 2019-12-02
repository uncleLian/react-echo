import React from 'react'
import './index.styl'

import { Icon } from 'antd-mobile'

export default class bottomLoading extends React.Component {
    render() {
        let loading = this.props.loading
        return (
            <div className="loading-container">
                {loading === 'loading'
                    && <span className="loading"><Icon type="loading" /></span>
                }
                {loading === 'nothing'
                    && <span className="nothing">没有更多了T T~</span>
                }
                {loading === 'error'
                    && <span className="error">出错啦T T~</span>
                }
            </div>
        )
    }
}
