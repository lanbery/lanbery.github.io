---
layout:     post
title:      Javascript world components (三)
subtitle:   how to build an modern es5 library
date:       2020-09-27
author:     lanbery
header-img: img/banner-shuimo.png
header-color: #182b71
header-mask: 0.15
catalog: true
tags:
    - Javascript
---

# lerna 

[官网](https://www.lernajs.cn/)

> Lerna 是一个管理工具，用于管理包含多个软件包（package）的 JavaScript 项目

> Lerna 是一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化

## Lerna Usage

> npm i --global lerna # 全局安装

**常用命令**

```bash
lerna init -i/--independent # 使用独立的 版本控制模式
lerna create <name> [loc]  # 创建一个lerna 管理的package loc: 自定义路径
```


**[](https://dev.to/alexandrshy/create-a-javascript-library-build-mvp-4i58)**