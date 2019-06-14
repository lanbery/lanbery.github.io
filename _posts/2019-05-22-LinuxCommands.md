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

### chown 和 chmod 命令下
	chown 改变目录所属权，在ubuntu下注意，带上用户组[sudo chown -R user:usergrp ** ]
	chmod 修改操作权限

<hr/>
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