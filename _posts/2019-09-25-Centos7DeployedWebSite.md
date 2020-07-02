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
  - firewall 配置

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

```bash
  yum list |grep nginx                   current version 1.1.16
```

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

----

## 配置Nginx

### 配置 nginx.conf 

> /etc/nginx/nginx.conf 
> line 1: user


``` script
user  www;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  4096;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;
		
		# modified
    gzip  on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain application/x-javascript text/css application/xml;
    gzip_vary on;    

    include /etc/nginx/conf.d/*.conf;
}

```

### 创建站点配置

> /etc/nginx/conf.d/{your-domain}.conf

```bash
touch /etc/nginx/conf.d/{your-domain}.conf
```

> vim config file

```script 

server {
  listen	80;
  server_name	your-domain;

# if enable https need 301 
#  return 301	https://$server_name$request_uri;

  # http2 need recomments
  root		/opt/nginx/www/{your-domain};

  location /	{
  	index	index.html;
  }
}

#server {
#  listen  443 http2	ssl;
#  server_name		{your-domain};
#  root			/opt/nginx/www/{your-domain};
#  add_header  Strict-Transport-Security "max-age=31536000";
  
  #ssl			on;
#  ssl_certificate	/etc/letsencrypt/live/{your-domain}/fullchain.pem;
#  ssl_certificate_key	/etc/letsencrypt/live/{your-domain}/privkey.pem;
#  ssl_dhparam		/etc/ssl/certs/dhparams.website.pem;
#  ssl_protocols		SSLv3 TLSv1 TLSv1.1 TLSv1.2;
#  ssl_ciphers		ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;

#  location / {
#	index 		index.html;
#  }

#}


```
----
> 编写index 界面

``` html 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="shortcut icon" href="favicon.ico">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no">
	<title>Welcome to {}</title>
	<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }

		.p-comesoon{
			margin:5rem 1rem;
			font-size: 4rem;
			color:#f2a977;
		}
	</style>	
</head>
<body>
	<h2>Welcome to {} </h2>
	<p class="p-comesoon">The HomePage Come Soon</p>
</body>
</html>
```

### 验证配置,启动Nginx

``` bash
nginx -t
nginx -c /etc/nginx/nginx.conf 
nginx -s [reload/quit/stop] 優雅的停止nginx用quit
```

> 启动Nginx 验证web

``` bash
curl -I 127.0.0.1 
```

## 防火墙配置

> firewalld 
> systemctl status firewalld 

### 添加端口 

``` bash
firewall-cmd --zone=public --list-ports   #查看开启的端口
firewall-cmd --permanent --zone=public --add-port=80/tcp --permanent
firewall-cmd --permanent --zone=public --add-port=20-26/tcp
firewall-cmd --permanent --zone=public --add-port=20-26/udp 
firewall-cmd --permanent --zone=public --add-port=41589/tcp   # ssh bak
firewall-cmd --permanent --zone=public --add-port=41589/udp   # ssh bak

firewall-cmd --reload

sudo iptables -w -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -w -A INPUT -p tcp --dport 80:90 -j ACCEPT
```

## Nginx 自动服务


# Ubuntu 安装最新的 Nginx
> 常用命令

```command
sudo lsb_release -a 
cat   /etc/issue
ufw status/enable/disable  //防火墻狀態
sudo ufw allow 53  //開啟端口
chown ubuntu ada/ 授权用户目录 方便scp upload file  
apt-get install xx //安裝軟件
```

> 切换root

```bash
sudo root
```

> 娘希匹 跳板機設置
```bash
mv **.pem ~/.ssh/aws.pem 
chmod 600 ~/.ssh/aws.pem 

stat -c %a **.* // 查看文件數字權限
```

```sh
Host favirate
Port 22
HostName *.*.*.*
User ubuntu
IdentityFile ~/.ssh/aws.pem
``  

## 创建Nginx 源文件
> /etc/apt/sources.list.d/nginx.list 

vim 
```script
deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ bionic nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ bionic nginx
```
> 为了验证从此存储库下载的包的完整性，我们需要使用以下命令导入Nginx公钥

```bash
cd ~
wget http://nginx.org/keys/nginx_signing.key 
apt-key add 
nginx_signing.key 

sudo apt update
```

> 安装前检查 

``bash 
which nginx 

apt install nginx
```



## 配置文件加载服务器 

```script 
server{
        listen 80;
        server_name localhost;

        location / {
                #root /usr/share/nginx/html;
                alias /usr/share/nginx/html/;
                index index.html index.htm;
        }

        location /downloads {
                #root /usr/share/nginx;
                alias /usr/share/nginx/downloads/;
                autoindex       on;
                autoindex_exact_size    off;
                autoindex_localtime     on;
        }
}

```
