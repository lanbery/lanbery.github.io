---
layout:     post
title:      Centos 7.4 Yum Nginx
subtitle:   官方配置实践
date:       2019-07-02
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Web
    - Nginx
---

# Nginx Study

## 唯一安装Nginx 添加第三方模块

> 步骤：

|  no  |   item   |
| ---- |  -----  |
|  1  | 查看当前Nginx安装版本  |
|  2  | 下载对应Nginx版本源码包  和要安装的module包源码  wget -c url |
|  3  | 解压 tar zxvf *.tar.gz  |
|  4  | configure   在原有配置上增加module 配置  --add-module=/usr/lib64/nginx/modules/ngx_cache_purge-2.3  |
|  5  |  make 编译 ，编译完不要急于 make install  先备份原nginx   cp /usr/sbin/nginx ./nginx.old1.18，用生成nginx 替换测试  |
|  6  | 


```bash 
nginx -V # 查看Nginx 基础信息
wget -c http://labs.frickle.com/files/ngx_cache_purge-2.3.tar.gz # 下载nginx module 源码包
tar zxvf ngx_cache_purge-2.3.tar.gz
cd /usr/local/src/nginx-1.18.0/ && ./configure --add-module=....
make  # do not make install ，编译后生成的文件位置：/usr/local/src/nginx-1.18.0/objs
cp /usr/sbin/nginx /usr/sbin/nginx.old
cp /usr/local/src/nginx-1.18.0/objs /usr/sbin/  # ll /usr/local/src/nginx-1.18.0/objs
nginx -t # nginx -V 确认ok
make upgrade # or make install
```

<html>
<textarea>
nginx version: nginx/1.18.0
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC) 
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie' --add-module=/usr/lib64/nginx/modules/ngx_cache_purge-2.3
</textarea>

<span style="color:red;">
  nginx的版本为1.16.1，configure arguments后面的即为nginx现有的配置
</span>
</html>

### 下载对应Nginx版本源码包

wget -c https://nginx.org/download/nginx-1.18.0.tar.gz