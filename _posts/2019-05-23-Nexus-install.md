---
layout:     post
title:      Nexus 私服安装配置（一）
subtitle:   Centos7 配置 nexus3
date:       2019-05-23
author:     lanbery
header-img: img/tag-lambor-orange.png
catalog: true
tags:
    - Nexus	
---

# Nexus ![Nexus](https://www.sonatype.com/hs-fs/hubfs/SON_logo_main@2x%20copy%20trimmed.png?width=165&name=SON_logo_main@2x%20copy%20trimmed.png)
<p class="section-indent">
mavenCentral 是最早的 maven 中央仓库,Nexus 是常用的私用 Maven 服务器， Nexus 被超过10万个开发团队所使用。
	<a href="https://sonatype-download.global.ssl.fastly.net/repository/repositoryManager/3/nexus-3.16.1-02-unix.tar.gz" >
	下载Nexus-3.16.1 unix
	</a>
</p>




## 准备工作
  - java 环境(最好yum，不用自己配置java HOME),不详细说google
  - Nexus 安装目录及用户
  - Nexus tar [curl or wget]
### Nexus 目录及用户
  - Folder

<code command>
	cd /opt <br />
	wget https://*/**/nexus-3.16-*.tar.gz	<br />
	mkdir nexus <br />
	tar -zxvf nexus-3.16-*.tar.gz  <br />
	mv nexus-3.16-* nexus/nexus-3.16  <br />
	cd nexus  <br />
	ln -s nexus-3.16 nexus3 //最好建软链接,方便管理  <br />
	mv sonatype-work /work/nexus/sonatype-work //移到较大的挂载盘上  <br />
</code>  

  - user

`sudo useradd nexus`<br />
`sudo chown -R /opt/nexus`<br />
`sudo chown -R /work/nexus`<br />


### 修改配置 
  - nexus.rc

` run_as_user="nexus" ` 

  - nexus.vmoptions

<code>
-Xms1200M<br />
-Xmx1200M<br />
-XX:MaxDirectMemorySize=2G<br />
-XX:+UnlockDiagnosticVMOptions<br />
-XX:+UnsyncloadClass<br />
-XX:+LogVMOutput<br />
-XX:LogFile=/work/nexus-data/sonatype-work/nexus3/log/jvm.log<br />
-XX:-OmitStackTraceInFastThrow<br />
-Djava.net.preferIPv4Stack=true<br />
-Dkaraf.home=.<br />
-Dkaraf.base=.<br />
-Dkaraf.etc=etc/karaf<br />
-Djava.util.logging.config.file=etc/karaf/java.util.logging.properties<br />
-Dkaraf.data=/work/nexus-data/sonatype-work/nexus3<br />
-Djava.io.tmpdir=/work/nexus-data/sonatype-work/nexus3/tmp<br />
-Dkaraf.startLocalConsole=false	<br />
</code> 

  - 修改端口 etc/nexus.properties

<code>
application-port=8964<br />
application-host=0.0.0.0<br />
</code>  

## 编写Nexus 服务
### nexus.service

<code>

[Unit]<br/>
Description=Nexus3<br/>
After=network.target<br/>

[Service]<br/>
Type=forking<br/>
User=nexus<br/>
ExecStart=/opt/nexus/nexus3/bin/nexus start<br />
ExecReload=/opt/nexus/nexus3/bin/nexus force-reload<br />
ExecStop=/opt/nexus/nexus3/bin/nexus stop<br />
ExecRestart=/opt/nexus/nexus3/bin/nexus restart<br />

[Install]<br />
WantedBy=multi-user.target<br/>

</code>

  - 建立软链接 
`ln -s /opt/nexus/nexus.service /usr/lib/systemd/system/nexus.service`

### 安装启动

  sudo systemctl enable nexus.service



## 关于配置过程中的问题
 - File Descriptiors

<p class="section-indent">
	在 /etc/security/lim	its.conf 中增加<br>
    nexus	hard nofile 65536 <br>	
    nexus   soft nofile 65536 <br>
    nexus 为用户name，可以用 * 代表所有人
</p>	
<p>
然后，编辑 nexus-sysctl.conf,内容为： vm.max_map_count=65536
<br>
在 /etc/sysctl.d 建立软链接
<br>重启 reboot
</p>

  - database frozen 问题解决

<p >
   删除工作目录（sonatype-work/nexus3/）中生成文件【原始文件:log,orient,tmp,clean_cache】之外其他文件和目录，重启解决。
</p>  
![status](https://lanbery.github.io/docs/images/2019/2019-05-23_17-30-32.png?raw=true&width=600)

<hr/>

<html>
<a href="https://blog.csdn.net/qq_26975307/article/details/89173409">sublime 小福利</a>

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