---
layout:     post
title:      Front Web Development 
subtitle:   Nodejs yarn
date:       2019-11-27
author:     lanbery
header-img: img/banner-shuimo.png
header-mask:0.15
catalog: true
tags:
    - Javascript
    - nodejs  
---

> Yarn 用于优化npm

> 目标是解决上一节中描述的由于语义版本控制而导致的npm安装的不确定性问题

## yarn command

``` shell
yarn init
yarn add package
yarn add global add package //全局安装

yarn install --force
yarn remove [package]
yarn cache clean
yarn upgrade


```

### 安装指定版本
  
  yarn add [package]@[version]
  yarn add --dev [package]@[version]

### 重新下载所有包
```js 
  npm rebuild
  yarn install --force
```
