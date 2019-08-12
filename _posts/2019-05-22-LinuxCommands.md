---
layout:     post
title:      Linux 常用命令
subtitle:   命令
date:       2019-05-22
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Linux
    - Commands	
---

## Centos Commands

### 系统命令
  uname -n -r -p -o
  查询系统信息
  # whoami #查看当前登录用户名

	# id #查看当前用户及其属组

	# w #查看当前登录的用户及运行的命令

	# last #查看最近登录用户

	# cat /etc/passwd|awk -F: '{print $1}' #查看服务器上面所有用户

	# date '+%Y-%m-%d %H:%M:%S' #查看系统时间

	# ps -ef #查看运行进程

	# uptime #查看服务器开机时长，用户数，平均负载

	# lsmod #查看所有加载的模块

	# env #查系统环境变量

	# crontab -l #查看计划任务

### scp 命令
  scp [-12346BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
           [-l limit] [-o ssh_option] [-P port] [-S program]
           [[user@]host1:]file1 ... [[user@]host2:]file2

<p class="section-indent">
	复制本地文件到远程
</p>
<code json>
	scp local_file remote_user@remote_ip:remote_folder
</code>
<p class="section-indent">
	复制本地文件目录到远程
</p>
<code json>
	scp -r local_folder remote_user@remote_ip:remote_folder	
</code>

<hr/>

<p class="section-indent">
	从远程复制文件或目录到本地
</p>
<code json>
	scp [-r]  remote_user@remote_ip:remote_folder/xxx.file[copy_folder] /opt/recv_folder/	
</code>

<hr/>
<p class="section-indent">
	磁盘查询命令
</p>
<code json>
	df -h
	df -h /usr //指定目录	
</code>


### cp 命令

	cp -rf [source:file/folder] [target:folder] 

	Centos cp 前加反斜杠，不提示覆盖

	\cp -rf aaa.x ./da


-----
## 用户组，用户组

	- 用户列表文件：/etc/passwd

	- 用户组列表文件：/etc/group

### 系统用户

#### 查看系统中有哪些用户 
  cut -d : -f 1 /etc/passwd

#### 查看可登陆的用户
  cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1  

### 用户添加
> useradd [options] username
> options 

  - c comment
  - d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录
  - g 用户组 指定用户所属的用户组
  - G 用户组，用户组 指定用户所属的附加组
  - s Shell文件 指定用户的登录Shell
  - u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号

  useradd -d /usr/sam -m sam
  此命令创建了一个用户sam，其中-d和-m选项用来为登录名sam产生一个主目录/usr/sam（/usr为默认的用户主目录所在的父目录）

  useradd -s /bin/sh -g group -G adm,root gem
  此命令新建了一个用户gem，该用户的登录Shell是 /bin/sh，它属于group用户组，同时又属于adm和root用户组，其中group用户组是其主组


### 删除账号
  userdel -r sam 
  常用的选项是 -r ，它的作用是把用户的主目录一起删除 

### 用户组

  groupadd [name] 增加
  groupmod -n test2 test  将test改成test2
  groupdel test2 删除

#### 查看用户组
   


-----

## 权限

### chown 和 chmod 命令下
	chown 改变目录所属权，在ubuntu下注意，带上用户组[sudo chown -R user:usergrp ** ]
	chmod 修改操作权限

<hr/>


### stat -c %a **.* 
	查看文件权限数值

###  chmod 700 xx.txt
	授权	

## Centos7 Commands

### yum list install
  列出已安装软件
  yum list install |grep ssl

# System Level Commands
## su
  su username 切换到用户

## ssh-keygen 
	ssh-keygen -t rsa -C "xxx"

	chmod 644 id_rsa

# 软链接 ln

  ln -s 源文件 目标文件

  -s 它只会在你选定的位置上生成一个文件的镜像，不会占用磁盘空间，硬链接ln ** **,没有参数-s, 它会在你选定的位置上生成一个和源文件大小相同的文件，无论是软链接还是硬链接，文件都保持同步变化。


  -f : 链结时先将与 dist 同档名的档案删除
  -d : 允许系统管理者硬链结自己的目录
  -i : 在删除与 dist 同档名的档案时先进行询问
  -n : 在进行软连结时，将 dist 视为一般的档案
  -s : 进行软链结(symbolic link)
  -v : 在连结之前显示其档名
  -b : 将在链结时会被覆写或删除的档案进行备份
  -S SUFFIX : 将备份的档案都加上 SUFFIX 的字尾
  -V METHOD : 指定备份的方式
  --help : 显示辅助说明
  --version : 显示版本

  *修改软链接*
  ln -snf 源 目标


<html>
<div class="col-lg-8 col-lg-offset-3 col-md-10 col-md-offset-1">
	<div class="pull-right">
		<a href="#" target="_self" class="copyright-link">
			著作权归作者
			{% if page.author %}
<strong>{{ page.author }}</strong>
			{% endif %}
			所有，任何形式的转载都请联系作者获得授权并注明出处。
		</a>
	</div>
</div>
</html>