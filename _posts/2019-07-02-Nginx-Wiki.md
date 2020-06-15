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

> 常用命令：

```bash 
nginx -V 
nginx -t 
nginx -s reload or stop quit  # 彻底退出用quit
systemctl stop nginx 
nginx -c /etc/nginx/nginx.conf 
```



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




# 开启gzip
gzip  on;
# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;
# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间。一般设置1和2
gzip_comp_level 2;
# 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;
# 禁用IE 6 gzip
gzip_disable "MSIE [1-6]\.";
# 设置缓存路径并且使用一块最大100M的共享内存，用于硬盘上的文件索引，包括文件名和请求次数，每个文件在1天内若不活跃（无请求）则从硬盘上淘汰，硬盘缓存最大10G，满了则根据LRU算法自动清除缓存。
proxy_cache_path /var/cache/nginx/cache levels=1:2 keys_zone=imgcache:100m inactive=1d max_size=10g;



        #负载均衡配置 
    upstream lazyegg.net { 
 
        #upstream的负载均衡，weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。 
        server 192.168.80.121:80 weight=3; 
        server 192.168.80.122:80 weight=2; 
        server 192.168.80.123:80 weight=3; 
 
        #nginx的upstream目前支持4种方式的分配 
        #1、轮询（默认） 
        #每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。 
        #2、weight 
        #指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。 
        #例如： 
        #upstream bakend { 
        #    server 192.168.0.14 weight=10; 
        #    server 192.168.0.15 weight=10; 
        #} 
        #2、ip_hash 
        #每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。 
        #例如： 
        #upstream bakend { 
        #    ip_hash; 
        #    server 192.168.0.14:88; 
        #    server 192.168.0.15:80; 
        #} 
        #3、fair（第三方） 
        #按后端服务器的响应时间来分配请求，响应时间短的优先分配。 
        #upstream backend { 
        #    server server1; 
        #    server server2; 
        #    fair; 
        #} 
        #4、url_hash（第三方） 
        #按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。 
        #例：在upstream中加入hash语句，server语句中不能写入weight等其他的参数，hash_method是使用的hash算法 
        #upstream backend { 
        #    server squid1:3128; 
        #    server squid2:3128; 
        #    hash $request_uri; 
        #    hash_method crc32; 
        #} 
 
        #tips: 
        #upstream bakend{#定义负载均衡设备的Ip及设备状态}{ 
        #    ip_hash; 
        #    server 127.0.0.1:9090 down; 
        #    server 127.0.0.1:8080 weight=2; 
        #    server 127.0.0.1:6060; 
        #    server 127.0.0.1:7070 backup; 
        #} 
        #在需要使用负载均衡的server中增加 proxy_pass http://bakend/; 
 
        #每个设备的状态设置为: 
        #1.down表示单前的server暂时不参与负载 
        #2.weight为weight越大，负载的权重就越大。 
        #3.max_fails：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream模块定义的错误 
        #4.fail_timeout:max_fails次失败后，暂停的时间。 
        #5.backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。 
 
        #nginx支持同时设置多组的负载均衡，用来给不用的server来使用。 
        #client_body_in_file_only设置为On 可以讲client post过来的数据记录到文件中用来做debug 
        #client_body_temp_path设置记录文件的目录 可以设置最多3层目录 
        #location对URL进行匹配.可以进行重定向或者进行新的代理 负载均衡 
    } 