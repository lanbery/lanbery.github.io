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

[Nginx Install](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)

yum install nginx

or

install Prebuilt

  modify or create the repos profile: [/etc/yum.repos.d/nginx.repo]

``` scripts
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```  


  - update repos : yum update
  - install: yum install nginx
  - verify: curl -I 127.0.0.1 

# nginx Basic Help

	nginx -V 查看Nginx 配置以及加載的模塊



## Deploy Setting
### mkdir folder

<a class="add-user" target="lanbery.github.io" href="https://lanbery.github.io/2019/05/22/LinuxCommands">创建用户，用户组</a>

```bash
groupadd www
```


``` bash
  mkdir /data/nginx /data/nginx/www
  chown -R root:root /data/nginx
  chown -R nginx:nginx /data/nginx

  groupadd www
  useradd -d /data/www -m www -g www -G nginx
```  


## Nginx Config


## Nginx start config

``` bash
nginx -c /*/*.conf

nginx -t 測試配置

nginx -s stop 

nginx -s [reload/quit/stop]優雅的停止nginx用quit
```

[Nginx Config Rule](https://my.oschina.net/foreverich/blog/800359)

----
# Issue 解決


##  forbidden 403

``` bash
  directory index of "/***" is forbidden 403

  ps -aux|grep nginx 查看工作進程的權限
```

----
# Centos 防火墙

> Centos firewall 

centos7 之后默认防火墙为firewall

## 查看firewall

  systemctl status/start/stop/enable/disable firewalld

  配置文件在: /etc/firewalld/

### firewall-cmd 命令

> firewall-cmd
```bash
  - [--version]
  - [--help]
  - [--get-active-zones] 查看区域信息
  - [--get-zone-of-interface=eth0] 查看指定接口所属区域信息
```

> firewall-cmd --reload 重启防火墙

### 查看指定区域所有开启的端口号
```bash
  firewall-cmd --zone=public --list-ports
```

### 开放端口

> firewall-cmd --zone=public --add-port=80/tcp --permanent

  – zone 作用域

  – add-port=8080/tcp 添加端口，格式为：端口/通讯协议

  – permanent #永久生效，没有此参数重启后失效

> 在指定区域开启某个范围的端口号

  在指定区域开启某个范围的端口号(如18881~65534，命令方式)
```bash
  firewall-cmd --zone=public --add-port=18881:65534/tcp --permanent
  firewall-cmd --permanent --zone=public --add-port=50810-50820/tcp 
  firewall-cmd --permanent --zone=public --add-port=50810-50820/udp 
  firewall-cmd --reload
```

> telnet 测试

  windows 开启telnet ： 开始　→　控制面板　→　程序和功能　→　打开或关闭Windows功能