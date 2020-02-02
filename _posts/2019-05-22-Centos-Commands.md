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

> 查看操作系统

```bash
cat /etc/issue 

cat /etc/redhat-release

cat /proc/version
```

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
## 系统交换文件 swap
> 在添加swap分区之前我们可以了解下当前系统swap是否存在以及使用情况

```bash
mkdir /swap
free -h   # or swapon -s
df -hal       # 了解硬盘情况
```

### 添加swap 分区

> 使用dd命令创建名为swapfile 的swap交换文件（文件名和目录任意）

```bash
dd if=/dev/zero of=/swap/swapfile bs=1024 count=2097152

# or

dd  if=/dev/zero  of=/swap/swapfile  bs=1024  count=2048k
```

  if(即输入文件,input file)，of(即输出文件,output file)。dev/zero是Linux的一种特殊字符设备(输入设备)，可以用来创建一个指定长度用于初始化的空文件，如临时交换文件，该设备无穷尽地提供0，可以提供任何你需要的数目。 bs=1024 ：单位数据块（block）同时读入/输出的块字节大小为1024 个字节即1KB，bs(即block size)。count=2048000 ：数据块（block）数量为2048000 ，即2048000个1KB。可以计算swap分区的容量为：1KB 2097152=1KB 1024(k)10242=2097152=2G。（dd命令里的单位M表示1024*1024,k表示1024）。

> 执行完毕，对交换文件格式化并转换为swap分区

```bash
mkswap /swap/swapfile 
```

> 挂载并激活分区

```bash 
swapon   /swap/swapfile
chmod -R 0600 /swap/swapfile    # 不安全的权限 0644，建议使用 0600
```

> 修改 fstab 配置，设置开机自动挂载该分区
> vim    /etc/fstab

``` bash
/swap/swapfile swap swap defaults 0 0

# or

echo  "/swap/swapfile   swap  swap  defaults  0  0" >>  /etc/fstab

```

### 删除swap 分区

```bash
swapoff  /swap/swapfile
rm -rf   /swap/swapfile

vim /etc/fstab  # 注释挂载
```


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

----
# SSH 

> SSH key

  AuthorizedKeysFile  .ssh/authorized_keys

## 生成key

```bash
ssh-keygen -t RSA -C "name"

:file_name

```  
## 开启服务器 ssh key 登录

> 修改 /etc/ssh/sshd_config 

```textarea 
RSAAuthentication yes 
PubkeyAuthentication yes 
AuthorizedKeysFile .ssh/authorized_keys

```

> 重启sshd

```bash
/sbin/service sshd restart
```

> add key 

> ~/.ssh/authorized_keys

```bash 
vim authorized_keys
```

> author permission

```bash 
chmod 700 ~/.ssh 
chmod 600 ~/.ssh/authorized_keys
```

## 授权

```bash
vim /etc/ssh/sshd_config
PubkeyAuthentication yes
AuthorizedKeysFile /root/.ssh/authorized_keys

cat pubkey > /root/.ssh/authorized_keys



chmod 600 authorized_keys

systemctl restart sshd

stat -c %a *.  //查看数字权限
```






----  

## 壓縮與解壓 gz

  yum install gzip

### tar 命令 
tar 可以为文件和目录创建档案

  * 主选项：
``` bash
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
```
  將文件夾www 打包到 /data/下

tar -xzf xxx.ca.tar.gz

### 解壓指定到文件夾
  tar -zxvf **.gz -C /etc/xx/

## zip  

  - 把 /data 下 web 压缩成 web.zip  

  cd /data/web
  zip -r web.zip web --exclude *.git*  // 排除 .git


# Centos System 
> 目录结构详细

![目录结构](https://lanbery.github.io/docs/images/2019/centos-dir.png?raw=true)

``` bash

/               : 根目录，一般根目录下只存放目录，不要存放文件,/etc、/bin、/dev、/lib、/sbin应该和根目录放置在一个分区
/bin:/usr/bin   : 可执行二进制文件的目录，如常用的命令ls、tar、mv、cat等
/boot           : 放置linux系统启动时用到的一些文件。/boot/vmlinuz为linux的内核文件
/dev            : 系统配置文件存放的目录，不建议在此目录下存放可执行文件，重要的配置文件有/etc/inittab、/etc/fstab、/etc/init.d、/etc/X11、/etc/sysconfig、/etc/xinetd.d修改配置文件之前记得备份
/etc            : 系统配置文件存放的目录，不建议在此目录下存放可执行文件，重要的配置文件有/etc/inittab、/etc/fstab、/etc/init.d、/etc/X11、/etc/sysconfig、/etc/xinetd.d修改配置文件之前记得备份
/home           : 用户home目录，新增用户账号时，用户的home目录都存放在此目录下，~表示当前用户的home目录
/lib:/usr/lib:/usr/lcoal/lib  : 系统使用的函数库的目录，程序在执行过程中，需要调用一些额外的参数时需要函数库的协助

/lost+fount     : 系统异常产生错误时，会将一些遗失的片段放置于此目录下
/opt            : 给主机额外安装软件所摆放的目录
/proc           : 此目录的数据都在内存中，如系统核心，外部设备，网络状态，由于数据都存放于内存中，所以不占用磁盘空间，比较重要的目录有/proc/cpuinfo、/proc/interrupts、/proc/dma、/proc/ioports、/proc/net/*等
/root           : 系统管理员root的家目录，系统第一个启动的分区为/，所以最好将/root和/放置在一个分区下
/sbin:/usr/sbin :
/usr/local/sbin : 放置系统管理员使用的可执行命令，如fdisk、shutdown、mount等。与/bin不同的是，这几个目录是给系统管理员root使用的命令，一般用户只能"查看"而不能设置和使用
/tmp            : 一般用户或正在执行的程序临时存放文件的目录,任何人都可以访问,重要数据不可放置在此目录下
/usr            :应用程序存放目录，
/usr/bin        : 存放应用程序， 
/usr/share      : 存放共享数据，
/usr/lib        : 存放不能直接运行的，却是许多程序运行所必需的一些函数库文件。
/usr/lcoal      : 存放软件升级包。
/usr/share/doc  : 系统说明文件存放目录。
/usr/share/man  : 程序说明文件存放目录

/var            : 放置系统执行过程中经常变化的文件，如随时更改的日志文件 
/var/log        :
/var/log/message : 所有的登录文件存放目录，
/var/spool/mail : 邮件存放的目录， 
/var/run        : 程序或服务启动后,其PID存放在该目录下

```



  
