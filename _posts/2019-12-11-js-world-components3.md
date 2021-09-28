---
layout:     post
title:      Javascript world components (三)
subtitle:   javascript library develop
date:       2019-12-11
author:     lanbery
header-img: img/banner-shuimo.png
header-color: #182b71
header-mask: 0.15
catalog: true
tags:
    - Javascript 
---

> lerna: 一种工具，针对 使用 git 和 npm 管理多软件包代码仓库的工作流程进行优化

> es library 开发流程

---

# lerna

> 将大型代码仓库分割成多个独立版本化的 软件包（package）对于代码共享来说非常有用。但是，如果某些更改 跨越了多个代码仓库的话将变得很 麻烦 并且难以跟踪，并且， 跨越多个代码仓库的测试将迅速变得非常复杂。

为了解决这些（以及许多其它）问题，某些项目会将 代码仓库分割成多个软件包（package），并将每个软件包存放到独立的代码仓库中。但是，例如 Babel、 React、Angular、Ember、Meteor、Jest 等项目以及许多其他项目则是在 一个代码仓库中包含了多个软件包（package）并进行开发。

## lerna commands

```bash
# 创建一个新的 git 代码仓库
git init lerna-repo && cd lerna-repo
# 将上述仓库转变为一个 Lerna 仓库
lerna init -i # --independent/-i – 使用独立的 版本控制模式

lerna run 
```

#### lerna run

```bash
lerna run build # 运行 packages/下每个含有packag.json build 的脚本命令, 通过 -- 进行参数传递
```

**命令配置**
可以通过lerna.json对运行命令参数进行配置

```js
{
    command:{
        run:{

        }
    },
    "npmClient": "yarn" # 指定通过yarn 执行子包脚本命令
}

```


#### lerna bootstrap 

> 此命令至关重要，因为它让你可以 在 require() 中直接通过软件包的名称进行加载，就好像此软件包已经存在于 你的 node_modules 目录下一样。

```bash
lerna bootstrap --hoist
```

Install external dependencies matching glob at the repo root so they're available to all packages. Any binaries from these dependencies will be linked into dependent package node_modules/.bin/ directories so they're available for npm scripts. If the option is present but no glob is given the default is ** (hoist everything). This option only affects the bootstrap command


**lerna 参考项目**

- [web3js](https://github.com/ChainSafe/web3.js)
- [demo](https://github.com/nshen/ts-lerna-repo)


---
# Typescript

#### TSC 命令

```bash
tsc <source file> <target file>  #  Ignoring tsconfig.json, compiles the specified files with default compiler options

tsc -b # Build a composite project in the working directory
tsc -p <tsconfig.json>

```

---
# Rollup

> https://juejin.cn/post/6844904058394771470
> https://segmentfault.com/a/1190000040147085