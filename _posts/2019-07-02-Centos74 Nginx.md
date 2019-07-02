---
layout:     post
title:      Centos 7.4 Yum Nginx
subtitle:   官方配置实践
date:       2019-07-02
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Linux
    - Web	
---

> Nginx Install [yum or source install]

# nginx install

yum install nginx

or

install Prebuilt
  modify or create the repos profile: [/etc/yum.repos.d/nginx.repo]

<code commands>
  name=nginx repo
  baseurl=https://nginx.org/packages/mainline/<OS>/<OSRELEASE>/$basearch/
  gpgcheck=0
  enabled=1
</code> 

  - update repos : yum update
  - install: yum install nginx
  - verify: curl -I 127.0.0.1 

# nginx Basic Help
	nginx -v  