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

#### linux 访问window

```bash
ll /mnt/d/iwork

```
