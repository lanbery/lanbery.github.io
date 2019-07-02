---
layout:     post
title:      Centos 系统级常用命令
subtitle:   命令
date:       2019-05-22
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Centos
    - Commands	
---

> Centos Commands
> Linux Basic

# 系统级

## netstat -ntpl

## systemctl start/restart/status/stop excuteabled
<code command>
	systemctl enable mysqld //加入开机启动
	systemctl start nginx
</code>

## ll /proc/[pid] 查看进程信息
top 

### yum list install
  列出已安装软件
  yum list install |grep ssl

### yum 源升级
  - /etc/yum.repos.d/ 源目录配置文件
  - mv Centos-Base.repos Centos.**.bak 备份
  - wget http://*** 新的源文件


   yum clean all
   yum makecache
   yum update



## 制作启动脚本



## 磁盘查询命令

----
# 用戶、用戶組相關
用戶列表文件：/etc/passwd
用戶組列表文件：/etc/group

  cut -d : -f 1 /etc/passwd
  cut：显示所选择的相关段。（-f 1 指的是一列，-d 指出分割符是冒号，PS:冒号和d之间有空格

  内容包括用户组（Group）、用户组口令、GID及该用户组所包含的用户（User），每个用户组一条记录:

  group_name:passwd:GID:user_list 第四字段:用户列表，每个用户之间用,号分割；本字段可以为空；

## 查看可以登录系统的用户
  cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1

  

## 查看用户操作
  - 登录历史记录 last
  - 查看用户操作 w [用戶名]
  - 查看登录用户 who



## User
### 查看當前用戶組信息
  
id

  uid=0(root) gid=0(root) groups=0(root)

## 修改所属用户和用户组
  - chown nginx:nginx *.txt   	修改文件
  - chown nginx:nginx www 		只修改文件夾
  - chown -R nginx:nginx 		改变文件夹及所有子文件（夹）

