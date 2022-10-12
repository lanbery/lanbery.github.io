---
layout:     post
title:      Vue,Vuex,Webpack...
subtitle:   在vue-cli init 项目基础上升级webpack4
date:       2020-01-09
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - program language
    - vue
    
---

> developer
> Vue


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

## CSS 解析Upgrade

mini-css-extract-plugin

> edit build/utils.js => if (options.extract) 

```js 
    // Extract CSS when that option is specified
    // (which is the case during production build)
    // if (options.extract) {
    //   return ExtractTextPlugin.extract({
    //     use: loaders,
    //     fallback: 'vue-style-loader'
    //   })
    // } else {
    //   return ['vue-style-loader'].concat(loaders)
    // }

    return [
      {
        loader:MiniCssExtractPlugin.loader
      },
      'css-loader'
    ]
``` 

## clean-webpack-plugin

> 可以用于清除文件目录下的文件

```bash
yarn add -D clean-webpack-plugin
```

## Eslint 

> Delete `⏎⏎··`  prettier/prettier 

https://juejin.cn/post/6844904069304156168
git config --global core.autocrlf false