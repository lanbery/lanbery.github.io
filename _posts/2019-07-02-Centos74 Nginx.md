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


# Nginx 扩展模块

> Centos yum 方式安装nginx 添加新的modules

> 具体步骤如下

## 检查nginx 版本

```bash
  nginx -V
```

## 下载相同版本的可编译nginx

```bash
  wget http://
```

## 备份源文件

```bash
  which nginx 
  mv /usr/sbin/nginx /usr/sbin/nginx.xxx.bak
  cp -r /etc/nginx /etc/nginx.bak 
```

## 检查是否支持新模块

> 比如添加限流模块 limit 和 stream

```bash
  cd ${nginx_source}
  ./configure --help | grep limit

```

<img src="docs/images/2019/20191120172742806.png">

** Note **

  - --without-http_limit_conn_module disable 表示已经有该模块，编译时不需要添加
  - --with-stream  enable  表示当前不包含该模块，编译时需要自己添加


``` bash

  ./configure --user=nginx --group=nginx --prefix=/usr/share/nginx --sbin-path=/usr/libs/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --with-stream --with-file-aio --with-ipv6 ...
```

  编译过程中出现缺少依赖，可以yum 安装

## 编译通过，继续验证。


## 文件替换，并重启


> 添加第三方模块时，先下载需要的模块
编译时添加路径

```bash
--add-moule=/usr/local/src/xxx/
```


## 断点续传Nginx module 

  - nginx-file-process


> nginx conf

<p>
  #文件下载
  location /maifeng {
            alias /nas1/file/maifeng/;
            #关闭目录结构（视情况是否打开）
            autoindex off;
        }
  #文件上传        
  location /upload {
            client_max_body_size 50m;
            # 转到后台处理URL 
            upload_pass @maifeng;
            # 临时保存路径 (暂时保存此处，使用回调处理，将临时文件变成真实有效文件)
            #     # 可以使用散列
            upload_store /tmp/nginx-upload;
            upload_pass_args on;
            # 上传文件的权限，rw表示读写 r只读 
            upload_store_access user:rw;
            # 这里写入http报头，pass到后台页面后能获取这里set的报头字段
            upload_set_form_field "${upload_field_name}_name" $upload_file_name;
            upload_set_form_field "${upload_field_name}_content_type" $upload_content_type;
            upload_set_form_field "${upload_field_name}_path" $upload_tmp_path;
            # Upload模块自动生成的一些信息，如文件大小与文件md5值 
            upload_aggregate_form_field "${upload_field_name}_md5" $upload_file_md5;
            upload_aggregate_form_field "${upload_field_name}_size" $upload_file_size;
            # 允许的字段，允许全部可以 "^.*$"
            #upload_pass_form_field "^submit$|^description$";
            upload_pass_form_field "^.*$";
            # 每秒字节速度控制，0表示不受控制，默认0 
            upload_limit_rate 0;
            # 如果pass页面是以下状态码，就删除此次上传的临时文件 
            upload_cleanup 400 404 499 500-505;                                                                                
  }
  # proxy_pass 不支持uri添加／（可以使用alias），下面配置等同于访问：http://localhost:7992/maifeng        
  location @maifeng {
            rewrite ^ /maifeng$1 break;
            proxy_pass  http://localhost:7992;
  }

</p>  