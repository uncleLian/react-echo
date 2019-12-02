# react-echo

![image](https://img.shields.io/badge/react-16.8.6-blue.svg)
![image](https://img.shields.io/badge/react--router-5.0.0-blue.svg)
![image](https://img.shields.io/badge/react--redux-7.0.3-blue.svg)
![image](https://img.shields.io/badge/antd--mobilei-2.3.1-blue.svg)
![image](https://img.shields.io/badge/create--react--app-3.x-green.svg)


##### vue版本：
- [vue2-echo](https://github.com/uncleLian/vue2-echo)


## 技术栈
1. [react](https://github.com/facebook/react)、 [react-router](https://github.com/ReactTraining/react-router)、 [react-redux](https://github.com/reduxjs/react-redux)
2. [antd-mobilei（阿里移动端UI库）](https://mobile.ant.design/docs/react/introduce-cn)
3. [amfe-flexible（淘宝适配库）](https://github.com/amfe/lib-flexible)
4. [axios（请求库）](https://github.com/axios/axios)
5. [mockjs（数据模拟）](http://mockjs.com/)
6. [ES6/7（JS语法）](https://github.com/lukehoban/es6features)、[ESlint（JS语法规范）](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
7. [Stylus（css预处理器）](https://github.com/stylus/stylus)
8. [IconFont（阿里字体库）](http://www.iconfont.cn/)

## 说明
> 如果此开源系列对你有帮助，你可以点右上角 "star"支持一下，非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下作者，我正在不断开源更多实用的项目

> 如有问题可以直接在 Issues 中提

## 效果演示 

[在线链接](https://unclelian.github.io/react-echo/)（请使用手机模式预览）

<img src="https://github.com/uncleLian/react-echo/raw/gh-pages/screenshots/echo_QRcode.png" width="250" height="250"/>

## 功能

- [x] 全站内播放（单页面优点）
- [x] 播放行为：播放、暂停、下一首、一键播放
- [x] 播放模式：默认、随机播放、单曲循环、列表循环
- [x] 播放视图：播放进度条（可调节）、播放列表（可增删、切换、清空）

## 项目截图

![image](https://github.com/uncleLian/react-echo/raw/gh-pages/screenshots/echo_index.png)

![image](https://github.com/uncleLian/react-echo/raw/gh-pages/screenshots/echo_detail.png)

## 目录结构

``` bash
├── config             
│   ├── webpack.config.js        // webpack配置
├── src                          
│   ├── api                      // 请求api
│   ├── assets                   // 静态资源
│   ├── components               // 全局组件
│   ├── mock                     // 模拟数据
│   ├── page                   
│   |   ├── detail               // 详情页
│   |   ├── index                // 首页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── utils                    // 公用方法
│   └── index.js
├── .env.development             // 开发环境变量
├── .env.production              // 生产环境变量
└── package.json                 // 项目依赖
```

## 开发和发布

``` bash
# 安装依赖
npm install

# 启动项目：localhost:8001
npm run dev

# 打包项目
npm run build
```

## 更新日志
[发行说明](https://github.com/uncleLian/react-echo/releases)中记录了每个版本的详细更改。
