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

  注：没有yum-config-* 命令可 yum install yum-utils

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

`[detail](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)`

  ALTER USER 'root'@'localhost' IDENTIFIED BY 'clg*896430TH';

### 密碼配置策略
  修改root密碼後才能，查看或修改密碼策略。

  show variables like '%password%';

  Set GLOBAL {tag_label}={value}

## 配置my.cnf
  [client]
  port=8964
  default-character-set = utf8mb4
  [mysqld]
  max_connections=500
  # set pwd expireed no
  default_password_lifetime=0
  character_set_server=utf8mb4
  validate_password_length=6
  validate_password_mixed_case_count=0
  validate_password_policy=LOW

## 授權
  grant SELECT, INSERT, UPDATE, DELETE, EXECUTE, SHOW VIEW ON *.* TO 'dev'@'%' identified by 'dev!123';

  flush privileges;


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