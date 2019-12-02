import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    timeout: 20 * 1000
})

// request
instance.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

// response
instance.interceptors.response.use(response => {
    const res = response.data
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})

/*
* request方法
* url       请求URL
* type      请求类型
* data      参数
* isForm    是否表单数据
*/
export const request = async (url = '', type = 'GET', data = {}, isForm = false) => {
    let result
    type = type.toUpperCase()
    let requestOptions = {
        method: type,
        url: url
    }
    if (isForm) {
        let form = new FormData()
        Object.keys(data).forEach(key => {
            let value = data[key]
            if (Array.isArray(value)) {
                value.forEach(item => {
                    form.append(key, item)
                })
            } else {
                form.append(key, data[key])
            }
        })
        data = form
    }
    requestOptions['headers'] = {
        'Content-type': isForm ? 'multipart/form-data' : 'application/json'
    }
    if (type === 'GET') {
        requestOptions['params'] = data
    } else {
        requestOptions['data'] = data
    }
    await instance(requestOptions).then(res => {
        result = res
    })
    return result
}
