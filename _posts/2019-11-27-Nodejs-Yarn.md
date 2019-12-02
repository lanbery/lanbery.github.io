---
layout:     post
title:      Front Web Development
subtitle:   Nodejs yarn vs npm 
date:       2019-11-27
author:     lanbery
header-img: img/banner-shuimo.png
header-mask: 0.15
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
  
```bash  
  yarn add [package]@[version]

  yarn add --dev [package]@[version]
```

### 重新下载所有包
```js 
  npm rebuild
  yarn install --force
```

----
## resolution field in package.json 
> yarn 支持选择性版本解析，可以通过在package.json 增加resolution 字段自定义程序版本

> how to use it?

```js 
{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "left-pad": "1.0.0",
    "c": "file:../c-1",
    "d2": "file:../d2-1"
  },
  "resolutions": {
    "d2/left-pad": "1.1.1",
    "c/**/left-pad": "^1.1.2"
  }
}
```

Then run yarn install.


  project deps left-pad 1.0.0 but d2 deps left-pad 1.1.1
--------------------- 


# plugins 

## npm-run-all

> A CLI tool to run multiple npm-scripts in parallel or sequential


```bash
npm-run-all
npm-s
npm-p

```

<p class="indent-2">
The main command is npm-run-all. We can make complex plans with npm-run-all command.

Both run-s and run-p are shorthand commands. run-s is for sequential, run-p is for parallel. We can make simple plans with those commands.
</p>


## npx

> npx 全局免安装

```bash

npx @vue/cli -V

等价于

npm install @vue/cli -g
vue -V

```
