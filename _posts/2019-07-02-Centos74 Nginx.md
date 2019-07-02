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

> 域名解釋基礎理論
> Nginx Install [yum or source install]

----
# 域名解釋設置
## 基礎理論

DNS查询有两种方式：

递归和迭代。DNS客户端设置使用的DNS服务器一般都是递归服务器，它负责全权处理客户端的DNS查询请求，直到返回最终结果。而DNS服务器之间一般采用迭代查询方式。

### 几种域名解析方式

域名解析记录主要分为A记录、MX记录、CNAME记录、NS记录和TXT记录：

  - A记录 A代表Address，用来指定域名对应的IP地址
  - MX记录 Mail Exchange，就是可以将某个域名下的邮件服务器指向自己的Mail Server。 taobao.com域名的A记录IP地址是115.238.25.xxx，如果将MX记录设置为115.238.25.xxx，即xxx@taobao.com的邮件路由，DNS会将邮件发送到115.238.25.xxx所在的服务器，而正常通过Web请求的话仍然解析到A记录的IP地址
  - CNAME记录 Canonical Name， 即别名解析。所谓别名解析就是可以为一个域名设置一个或者多个别名，如将aaa.com解析到bbb.net、将ccc.com也解析到bbb.net，其中bbb.net分别是aaa.com和ccc.com的别名
  - NS记录 为某个域名指定DNS解析服务器，也就是这个域名由指定的IP地址的DNS服务器取解析
  - TXT记录 为某个主机名或域名设置说明，如可以为ddd.net设置TXT记录为"这是XXX的博客"这样的说明

----
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


## Deploy Setting
### mkdir folder
mkdir /data/nginx /data/nginx/www
chown -R root:root /data/nginx
chown -R nginx:nginx /data/nginx


## Nginx Config




