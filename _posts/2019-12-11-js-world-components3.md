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

> lerna 命令无论是在packages 子目录下还是项目根目录执行命令,命令basedir 都是项目根目录,应该是基于项目下lerna.json 文件的相对位置判定


```bash
# 创建一个新的 git 代码仓库
git init lerna-repo && cd lerna-repo
# 将上述仓库转变为一个 Lerna 仓库
lerna init -i # --independent/-i – 使用独立的 版本控制模式

lerna creaate <package:name>  # 创建子package
lerna add <depedency pack> --dev # 为子packages <所有子pkg>添加依赖 
lerna bootstrap --hoist #
lerna add <@org/pkgName> --scope=<@org/demo> # 为demo 添加dependency依赖
lerna run <packages/**/package.json:script$command>   # 执行子包下script命令
lerna run <command> --scope <pkgname>  # 执行指定子包下 script 命令
```

#### lerna run

```bash
lerna run build # 运行 packages/下每个含有packag.json build 的脚本命令, 通过 -- 进行参数传递
```

**命令配置**
可以通过lerna.json对运行命令参数进行配置

```js
{
    // 每个子package都有自己的node_modules，
    // 通过这样设置后，只有顶层有一个node_modules ,package.json 增加 workspcaes:[]
    "useWorkspaces":true, 
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

- 解析需要安装的依赖，保存在depsToInstall中
- 判断是否开启hoist功能并且该依赖在packages中是否出现了多次，若不满足则向下执行
- 检测在出现的多次中最常出现的版本号(commonVersion)
- 若在根目录的依赖中也存在则比较版本号(rootVersion)，若不同则发出警告
- 在根节点上安装最佳版本的依赖
- 在叶子节点上安装其他出现次数较少的版本且未安装的依赖

Install external dependencies matching glob at the repo root so they're available to all packages. Any binaries from these dependencies will be linked into dependent package node_modules/.bin/ directories so they're available for npm scripts. If the option is present but no glob is given the default is ** (hoist everything). This option only affects the bootstrap command

**ISSUE**

> --hoist  在指定 yarn 时无效

> correct config

- root package.json 

```json
{
    "workspaces": {
        "packages":[
            "packages/*"  // this will instead lerna.json packages config
        ],
        "nohoist":[
            "**"    // 指定所有package dependencies 不提升至根项目目录下(node_modules)
        ]
    }
}
```

- root lerna.json

```json
  "command": {
    "bootstrap": {
      "npmClientArgs": [
        "--no-package-lock"
      ]
    }
  },
  "version": "independent",
  // "npmClient":"yarn",remove this will issue:
  "useWorkspaces": true
```

- root .yarnrc
> 
workspaces-experimental true



**lerna 参考项目**

- [web3js](https://github.com/ChainSafe/web3.js)
- [demo](https://github.com/nshen/ts-lerna-repo)
- [基于 Lerna 管理 packages 的 Monorepo 项目最佳实践](https://github.com/morrain/lerna-learning)

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
> https://github.com/zxpsuper/qrcode-with-logos
> https://medium.com/@dandobusiness/setting-up-typescript-in-a-mono-repo-cd49a38d6030
. [typescript+karma+mocha Test](https://blog.crimx.com/2019/06/19/%E6%90%AD%E5%BB%BA-karma-mocha-chai-%E6%B5%8B%E8%AF%95-typescript-%E9%A1%B9%E7%9B%AE/)

> [lerna+mocha+ts](https://scriptable.com/blog/typescript-lerna-monorepo-setup)
> https://www.adaltas.com/en/2021/01/11/js-monorepos-versioning-publishing/

