---
layout:     post
title:      Centos 7.4 Deployed Web Site 
subtitle:   work flow
date:       2019-09-25
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Centos7
    - Web	
---

> centos 7 部署Web Site 流程

# 总流程

  - 配置服务器
  - 安装Nginx	
  - 目录用户准备
  - 配置Nginx

----

## 配置服务器

### 常用工具
>netstat vim

```bash
yum install net-tools vim -y
```

> ssh

```script
/etc/ssh/sshd_config
~/.ssh/config
~/.ssh/


```
  	* ssh
  	* firewalld
  	* nginx 
  	* swap


## 安装Nginx	
> 安装最新的 nginx

### 修改yum源
 
  - 配置yum 
  - 更新
  - 检查

> 配置yum

  /etc/yum.repos.d/nginx.repo

```script
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
``` 

> 更新源

  yum update

> 验证

  yum list |grep nginx                   current version 1.1.16

> 安装

```bash
yum install nginx 
nginx -V
```


## 目录用户准备

```bash
mkdir -p /opt/nginx
groupadd www   						\\ create group
useradd -d /opt/nginx/www -m www -g www -G nginx   \\ 

```




