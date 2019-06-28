---
layout:     post
title:      Centos7 安装SS
subtitle:   穿越火线
date:       2019-06-11
author:     lanbery
header-img: img/post-bg-mma-4.jpg
catalog: true
tags:
    - tech-wiki
    - SS	
---

## yum 基礎Commands
  yum repolist all 
  yum update
  yum list install | grep python-pip 查詢是否安裝
  yum remove python-pip



### 安裝相關軟體程式
  - yum install epel-release
  - yum install python-pip

####  shadows 配置設置
  /etc/shadowsocks/shadowsocks.json

<code json>
  {
  	"server":"xx.x.x.x",
  	"server_port":38964,
	...
  }
</code>  

  Service Shell sscs.service

<code json>
    [Unit]
    Description=sscs
    [Service]
    TimeoutStartSec=0
    ExecStart=/usr/bin/sslocal -c /etc/shadowsocks/sscs.json
    [Install]
    WantedBy=multi-user.target
</code> 

  systemctl enable  sscs.service

#### pip 
  /etc/privoxy/config

<code json>
  listen-address 127.0.0.1:8118
  forward-socks5t / 127.0.0.1:1080
</code>  

  验证：
  curl --socks5 127.0.0.1:1080 http://httpbin.org/ip

## VPS Network Test
  wget -qO- git.io/superbench.sh | bash

  ./superbench.sh info

  ./superbench.sh io

  ./superbench.sh speed

  ./superbench.sh share

<html>
<div class="col-lg-8 col-lg-offset-3 col-md-10 col-md-offset-1">
	<div class="pull-right">
		<a href="https://lanbery.github.io/about" target="self" class="copyright-link">
			著作权归作者
			{% if page.author %}
<strong>{{ page.author }}</strong>
			{% endif %}
			所有，任何形式的转载都请联系作者获得授权并注明出处。
		</a>
	</div>
</div>
</html>