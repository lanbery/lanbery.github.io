---
layout:     post
title:      Linux 常用命令
subtitle:   命令
date:       2018-07-11
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Linux
    - Commands	
---

## Centos Commands

### scp 命令
  scp [-12346BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file]
           [-l limit] [-o ssh_option] [-P port] [-S program]
           [[user@]host1:]file1 ... [[user@]host2:]file2
<html>
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

<div class="col-lg-8 col-lg-offset-3 col-md-10 col-md-offset-1">
	<div class="pull-right">
		<a href="#" target="_blank" class="copyright-link">
			著作权归作者
			{% if page.author %}
<strong>{{ page.author }}</strong>
			{% endif %}
			所有，任何形式的转载都请联系作者获得授权并注明出处。
		</a>
	</div>
</div>
</html>