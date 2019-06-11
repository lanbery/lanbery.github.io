---
layout:     post
title:      Centos7 安装Mysql
subtitle:   
date:       2019-06-10
author:     lanbery
header-img: img/about-header-lambor-yellow.png
catalog: true
tags:
    - tech-wiki
    - Mysql	
---

## yum 列出源
  yum repolist all 
### wget yum 源
  wget https://dev.mysql.com/downloads/file/?id=484922
  rpm -Uvh mysql80-community-release-el7-3.noarch.rpm

  查看 yum repolist all |grep mysql

### Selecting Release
  yum-config-manager --disable MySQL Connectors Community

  yum-config-manager --disable MySQL 8.0 Community Server

OR
  edit  /etc/yum.repos.d/mysql-community configurations

  [mysql57-community]
  name=MySQL 5.7 Community Server
  baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/6/$basearch/
  enabled=1
  gpgcheck=1
  gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

## Install Mysql
  yum install mysql-community-server [--nogpgcheck] //解決公鑰未安裝提示問題

  systemctl start/stauts/restart/stop mysqld

### First Login
  grep 'temporary password' /var/log/mysqld.log
  Get the root local password

![detail](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)






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