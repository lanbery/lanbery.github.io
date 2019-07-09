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

## 壓縮與解壓 gz

  yum install gzip

### tar 命令 
tar 可以为文件和目录创建档案

  * 主选项：

  c 创建新的档案文件。如果用户想备份一个目录或是一些文件，就要选择这个选项。 
  r 把要存档的文件追加到档案文件的未尾。例如用户已经作好备份文件，又发现还有一个目录或是一些文件忘记备份了，这时可以使用该选项，将忘记的目录或文件追加到备份文件中。 
  t 列出档案文件的内容，查看已经备份了哪些文件。 
  u 更新文件。就是说，用新增的文件取代原备份文件，如果在备份文件中找不到要更新的文件，则把它追加到备份文件的最后。 
  x 从档案文件中释放文件。 

  * 辅助选项：

  b 该选项是为磁带机设定的。其后跟一数字，用来说明区块的大小，系统预设值为20（20*512 bytes）。 
  f 使用档案文件或设备，这个选项通常是必选的。 
  k 保存已经存在的文件。例如我们把某个文件还原，在还原的过程中，遇到相同的文件，不会进行覆盖。 
  m 在还原文件时，把所有文件的修改时间设定为现在。 
  M 创建多卷的档案文件，以便在几个磁盘中存放。 
  v 详细报告tar处理的文件信息。如无此选项，tar不报告文件信息。 
  w 每一步都要求确认。 
  z 用gzip来压缩/解压缩文件，加上该选项后可以将档案文件进行压缩，但还原时也一定要使用该选项进行解压缩

tar -zcvf /data/xxx.ca.tar.gz /usr/www
  將文件夾www 打包到 /data/下

tar -xzf xxx.ca.tar.gz

### 解壓指定到文件夾
  tar -zxvf **.gz -C /etc/xx/

## zip  

  - 把 /data 下 web 压缩成 web.zip  

  cd /data/web
  zip -r web.zip web --exclude *.git*  // 排除 .git
  
