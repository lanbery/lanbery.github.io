---
layout:     post
title:      Git Tools Guide
subtitle:   Git Commands
date:       2020-01-12
author:     lanbery
header-img: img/developer-guide-blog-2.png
catalog: true
tags:
    - developer
    - Git
---

> Git 常用命令

## Branch 类

### Git branch
使用Git创建本地分支，并push到远程


  - git branch -a                 //查看所有分支
  - git status                  //查看状态
  - git checkout -b newBranch           //新建本地分支
  - git branch -d brachname         //删除本地分支
  - git push origin newBranch[:newBranch]     //创建远程分支，或者
  - git push --set-upstream origin sol5     //管理本地默认推送分支，直接git push
  - git push origin :newBranch          //通过推送空分支的方式删除远程分支
  - git push origin --delete newBranch      //删除远程分支


### git tags

> 列出已有标签

```bash
git tag
git tag -l 'v1.0.*' # 过滤


```

### checkout from tag and fixed bug workflow

```bash
git tag -l  # 列出分支 
git checkout v3.0.2  # checkout tag 
git checkout -b 3.0.2  # create local fixed bug branch 
git diff develop  src/xxx/xxx.js  # 对比文件差异
git commit -m "fixed bug #xxx" -a  # fixed bug and commit branch
git checkout develop #
git pull # let develop Keep consistent remote
git merge 3.0.2  # 合并分支 
git push  # 
git branch -D 3.0.2 # 删除本地分支

```


> 新建标签

```bash
git tag -a v1.0.2 -m "comments"  # 新建带注释标签
git show v1.0.2 #查看标签信息
git log --pretty=oneline #在后期对早先的某次提交加注标签。比如此示例展示的提交历史中

git push origin v1.0.2 # 上传tag到远程
```

> 验证标签
可以使用 git tag -v [tag-name] （译注：取 verify 的首字母）的方式验证已经签署的标签。此命令会调用 GPG 来验证签名，所以你需要有签署者的公钥，存放在 keyring 中，才能验证


>签署标签
如果你有自己的私钥，还可以用 GPG 来签署标签，只需要把之前的 -a 改为 -s （译注： 取 signed 的首字母）即可

```bash
git tag -s v1.5 -m 'my signed 1.5 tag'
```

### git merge

假设要将develop 分支最新内容合并到master 分支
  - git checkout develop            //切换至develop分支
  - git pull 或git fetch
  - git checkout master

### git pull 和 git fetch

> FETCH_HEAD： 是一个版本链接，记录在本地的一个文件中，指向着目前已经从远程仓库取下来的分支的末端版本

> commit-id ：  在每次本地工作完成后，都会做一个git commit 操作来保存当前工作到本地的repo， 此时会产生一个commit-id，这是一个能唯一标识一个版本的序列号。 在使用git push后，这个序列号还会同步到远程仓库

> git fetch :在每次本地工作完成后，都会做一个git commit 操作来保存当前工作到本地的repo， 此时会产生一个commit-id，这是一个能唯一标识一个版本的序列号。 在使用git push后，这个序列号还会同步到远程仓库


> 最后总结：可以理解为git pull 是把git fetch 和git merge 合并的操作，当然有冲突是可能会失败 

### 通过git fetch 更新远程仓库

  - git fetch origin master[:tmp]       //将远程master更新至本地master[:tmp]省略即同名(本地叫master)
  - git diff tmp              //对比本地当前分支与下载tmp区别
  - git merge tmp             //用tmp 合并本地当前分支
  - git branch -d tmp             //删除本地临时分支

> 对比两次提交具体文件差别

``` bash
git log    // 查看commit list 
git diff hash1 hash2 --stat         // 对比所有更改
git diff hash hash ./file 
```

## Git Message 规范

> commit message格式 

**type(必须)**


  - upd：更新某功能（不是 feat, 不是 fix）
  - feat：新功能（feature）
  - fix/to：修补 bug,fix 产生diff并自动修复此问题。适合于一次提交直接修复问题,to: 只产生diff不自动修复此问题。适合于多次提交
  - docs：文档（documentation）
  - style： 格式（不影响代码运行的变动）
  - refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
  - test：增加测试
  - chore：构建过程或辅助工具的变动
  - perf：优化相关，比如提升性能、体验。
  - revert：回滚到上一个版本
  - merge：代码合并。
  - sync：同步主线或分支的Bug。


**scope(可选)**

  scope用于说明 commit 影响的范围

**subject(必须)**

  subject是commit目的的简短描述，不超过50个字符


```bash
fix(DAO):用户查询缺少username属性 
feat(Controller):用户查询接口开发
```

## 切换Remote Url

```bash
git remote -v                       //先检查remote Repositories
git remote set-url origin url       //url https://github.com/username/repository.git 
git remote -v                       //
git remote set-url origin git@ssh-host:(username/org)/repository.git   // set ssh push 
```

### fix issue
> Fix issue 

> commit -m ****  fixes #

``` bash
git commit -m "message, fixes #issueId"

```
>类型

必须是以下之一：

```bash
build:影响构建系统或外部依赖关系的更改（示例范围：gulp, broccoli, npm）
ci: 更改我们的配置文件和脚本（示例范围：Travis, Circle, BrowserStack, SauceLabs）
docs: 仅文档更改，比如README, CHANGELOG, CONTRIBUTE等等
feat: 一个新功能
fix: 一个错误修复
perf: 一个改进性能的代码更改，比如提升性能、体验
refactor: 代码更改，既不修复错误也不添加功能
style: 不改变代码逻辑，仅仅修改代码风格（空格，格式化，分号分号等）
test: 添加缺失测试或更正现有测试（测试用例，包括单元测试、集成测试等）
revert: 回滚到某一个版本（带上版本号）

```


## Git Submodule 子模块 
### add Submodule

```bash 
git submodule add <url> <path>

# url为子模块的路径，path为该子模块存储的目录路径
# git status会看到项目中修改了.gitmodules
# git diff --cached查看修改内容可以看到增加了子模块 
```
### 子模块的使用

```bash 
  git submodule init
  git submodule update

  git submodule update --init --recursive

```

> 加入不成功时
```
git rm --cached smart_v3
rm -rf submod_folder
git submodule add url ./submod_folder
```



### 子模块的更新
进入到子模块目录下，执行 git pull更新，查看git log查看相应提交

### 删除子模块

```bash 
  - rm -rf 子模块目录 删除子模块目录及源码
  - vi .gitmodules 删除项目目录下.gitmodules文件中子模块相关条目
  - vi .git/config 删除配置项中子模块相关条目
  - rm .git/module/* 删除模块下的子模块目录，每个子模块对应一个目录，注意只删除对应的子模块目录即可
```

# Git Proxy Setting

<a href="https://blog.systemctl.top/2017/2017-09-28_set-proxy-for-git-and-ssh-with-socks5/" target="_blank">Git Proxy</a>


----

# Git 回滚 & 恢复


### 误删除本地文件恢复

```bash
git status # 
git reset HEAD <dir/file> # 针对目录或文件
git checkout src/ui
```

> git reset HEAD src/ui

```text
M       src/store/index.js
D       src/store/initial-p3-state.js
D       src/ui/scss/_all.scss
D       src/ui/scss/_brv-core.scss
D       src/ui/scss/_mixin.scss
D       src/ui/scss/_reset.scss
D       src/ui/scss/_utilities.scss
D       src/ui/scss/_variables.scss
D       src/ui/scss/utils/classname-util.js
M       src/widgets/select/select.scss
```

## Git reset back commit hash


### 方式一

> Git 回滚: 强制 push 方式

- 0: 如本地有未提交代码,可git checkout -b for-reset-tmp && git add . && git commit -am 'xxxx' && git checkout current branch
- 1: git pull 保证本地与remote 一致
- 2: 备份当前分支(如有必要)
- 3: git log [--pretty=online] 查找要回复的hash
- 4: git reset --hard <commit hash>
- 5: git push -f origin <branch name>  # 强制更新远程分支

### 方式二

> 从回滚位置生成新的commit hash, 

- 0: 如本地有未提交代码,可git checkout -b for-reset-tmp && git add . && git commit -am 'xxxx' && git checkout current branch
- 1: git pull   # 保证当前工作区是干净的，并且和远程分支代码一致
- 2: 备份分支(如有必要)
- 3: git revert <hash> # 不加 --no-commit 生成新的hash
- 4: git push


----

## lerna version 

> git push --follow-tags --no-verify --atomic origin main

> 造成这个错误很有可能是网络不稳定，连接超时导致的

```text
nable to access 'https://github.com/*.git/': OpenSSL SSL_read: Connection was reset, errno 10054
```

> 解决方式

```bash
git config http.sslVerify "false"
```

--- 
# Git commit 注释规范

> AngularJS 在开发者文档中关于 git commit 的指导说明，提到严格的 git commit 格式规范可以在浏览项目历史的过程中看到更易读的信息，并且能用 git commit 的信息直接生成 AngularJS 的 changelog 

### 规范模板

commit messages 由 header 、body 、footer 组成。

header 又包含 type 、scope 、subject 。header 是必需的，不过其中的 scope 是可选的。
