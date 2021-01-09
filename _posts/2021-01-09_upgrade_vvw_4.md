---
layout:     post
title:      Vue,Vuex,Webpack...
subtitle:   在vue-cli init 项目基础上升级webpack4
date:       2021-01-09
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - program language
    
---

> developer
> Vue

> 参考 [vue](https://www.jianshu.com/p/540e7924af1f) https://www.jianshu.com/p/540e7924af1f

# vue-cli 创建项目

```bash
vue init webpack <project name> 

cd <project name> 

npm run dev # test 
```


#  Upgrade webpack 

## 升级 webpack 

```bash 
yarn add -D webpack@4.44.2 webpack-cli@3.3.12 webpack-merge@4.2.2 webpack-dev-server@latest 
yarn add -D copy-webpack-plugin@6.4.1 # options patterns
```

## html-webpack-plugin

```bash 
yarn add -D html-webpack-plugin@latest 

```
## Eslint upgrade 

```bash 
yarn add -D eslint@latest eslint-loader@latest
```

## Vue-loader upgrade 

```bash
yarn add -D vue-loader@latest

```

> edit config 

```js 


```