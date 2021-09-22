---
layout:     post
title:      WSL2 搭建linux 开发环境(三)
subtitle:   WSL2 配置golang 开发环境
date:       2021-09-20
author:     lanbery
header-img: img/golang-banner2.jpg
header-color: #33b
header-mask: 0.35
catalog: true
tags:
    - Golang
    - WSL2
---

> 基于ubuntu 20.04 安装配置go 环境

# 解决沦陷区问题

由于万恶的美帝国主义的封锁,有些资源需要跳出沦陷区访问.

- 开启宿主机VPN[允许来自局域网访问]设置,[假设port:14996]
- 打开wsl terminal [micro store app client or cmd wls]
- 设置 proxy

```bash
## 获取主机 IP
## 主机 IP 保存在 /etc/resolv.conf 中
export hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*')

export http_proxy="socks5://${hostip}:14996"
export https_proxy="socks5://${hostip}:14996"

# 或者
export all_proxy="socks5://${hostip}:14996"

# 验证
curl-I https://www.google.com

# 取消 proxy
unset all_proxy
```

也可以将上面命令编辑成脚本,保存到"~/.zshrc"

```shell
export hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*')
alias setss='export https_proxy="http://${hostip}:14996";export http_proxy="http://${hostip}:14996";export all_proxy="socks5://${hostip}:14996";'
alias unsetss='unset all_proxy'
```

然后执行source ~/.zshrc

---

#### linux 安装 golang

> 这里使用 Go 版本管理器 gvm 来管理Go的运行环境

```bash
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

source ~/.gvm/scripts/gvm
```

> 安装GO前,先安装一些必要的工具

```bash
# ubuntu commands
sudo apt-get install binutils bison gcc make build-essential -y

# centos commands
sudo yum install curl git make bison gcc glibc-devel -y
```

> 查看当前所有可安装的go 版本

```bash
gvm listall # 列出go 版本
gvm install go1.16.8 --binary # 安装
gvm use go1.16.8 --default # 设置默认
go version # check go env
```

> 安装VSCode 工具

```bash
sudo apt-get install xdg-utils  # 安装此工具可通过命令 code . 开启宿主机VSCode 软件

code ~/work/demo_wsp # 打开宿主机VSCode 并将 ~/work/demo_wsp 目录作为资源目录 
```

#### 配置 git ssh

```bash 
cd ~/.ssh 
ssh-keygen -t ed25519 -C 'xxx.sbccp'    # create ssh keypair
stat -c '%n %a %U:%G' . *   # 列出目录下文件 权限

sudo chmod 600 private # 配置权限
sudo chmod 644 key.pub 

sudo vim ~/.ssh/config
```

> config 内容

```text
Host github.com
HostName github.com
User xxx
IdentityFile ~/.ssh/private
# Proxycommand /usr/bin/nc -v -X 5 -x 127.0.0.1:14996 %h %p 2> /var/logs/gitxxx.log
```

