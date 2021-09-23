---
layout:     post
title:      WSL2 搭建linux 开发环境(一)
subtitle:   Window10 安装配置WSL2 + Ubuntu + Docker
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

# Window WSL2 基础概念

> windows10目前推出了WSL2，相对于WSL采用API转换的方式， WSL2 则完全不同，win10 开始内置了一个轻量级虚拟机，经过不断的优化，这个虚拟机实现了与 windows 的高度集成，实现了虚拟机的高性能运行，WSL2 便是运行在虚拟机上的一个完整的 linux 内核。因此WSL2给了在windows更接近原生linux的体验，同时wsl2 的开启速度有了非常明显的提升，几乎不需要再等待

#### 安装WLS2 

> 如果运行的是 Windows 10 版本1903 或 1909，请在 Windows 菜单中打开“设置”，导航到“更新和安全性”，然后选择“检查更新”。 内部版本号必须是 18362.1049+ 或 18363.1049+，次要内部版本号需要高于 .1049。 阅读详细信息：WSL 2 即将支持 Windows 10 版本 1903 和 1909

[官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)


#### 通过MircosoftStore 安装Ubuntu

> 打开 Microsoft Store，并选择你偏好的 Linux 分发版 (如果上述连接打开有错，请直接打开Microsoft Store搜索)

```PowerShell
wsl -l -v

wsl -d centos -u root # 打开WSL centos 

# 修改ubuntu的apt安装源
cd /etc/apt/
sudo vim sources.list 
```

```text
echo "deb http://mirrors.aliyun.com/ubuntu/ focal main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal universe
deb http://mirrors.aliyun.com/ubuntu/ focal-updates universe
deb http://mirrors.aliyun.com/ubuntu/ focal multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted
deb http://mirrors.aliyun.com/ubuntu/ focal-security universe
deb http://mirrors.aliyun.com/ubuntu/ focal-security multiverse">/etc/apt/sources.list
```

```bash
apt update && apt upgrade -y # 执行更新
```

**如果忘记了 Linux 分发版的密码**

```PowerShell
wsl -l -v # 列出wsl 
wsl -d Debian -u root #并将 Debian 替换为目标分发版的名称
```


- 打开 PowerShell，并使用以下命令进入默认 WSL 分发版的根目录：wsl -u root

#### Ubuntu 20.04 安装 python2
> Python 2.7的支持周期已于2020年1月1日结束。因为不再维护Python 2.7，pip 21.0已于2021年1月停止对Python 2.7的支持
```bash
sudo apt install wget python-is-python2 # 安装wget和python2
```

#### linux 访问window

```bash
ll /mnt/d/iwork

```
