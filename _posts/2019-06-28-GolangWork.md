---
layout:     post
title:      Golang 环境搭建&学习资料
subtitle:   Golang 
date:       2019-06-28
author:     lanbery
header-img: img/super-cars.jpg
catalog: true
tags:
    - Coding
    - Golang
---

> Golang 够浪

----
# Centos 安装golang

## 源码安装

  wget https://dl.google.com/go/go1.12.6.linux-amd64.tar.gz

  tar -C /usr/local -xzf go1.12.6.linux-amd64.tar.gz

### 配置

  vim /etc/profile.d/go-env.sh

  export IPFS_PATH=/data/.ipfs
  export GOPATH=/root/gowork
  export GOROOT=/usr/local/go
  export PATH=$PATH:$GOPATH/bin:$GOROOT/bin


  source /etc/profile

验证：go env

----

### 学习资料

- <a href="https://makeoptim.com/golang/standards/project-layout/#google_vignette" target="_blank" >Go 项目工程化</a>



