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
	cd /opt
	wget https://****/nexus-3.16-*.tar.gz	
	mkdir nexus
	tar -zxvf nexus-3.16-*.tar.gz
	mv nexus-3.16-* nexus/nexus-3.16
	cd nexus
	ln -s nexus-3.16 nexus3 //最好建软链接,方便管理
	mv sonatype-work /work/nexus/sonatype-work //移到较大的挂载盘上
</code>  
  - user
 <code command>
 sudo useradd nexus

 sudo chown -R /opt/nexus
 sudo chown -R /work/nexus
 </code> 

### 修改配置 
  - nexus.rc

<code>
  run_as_user="nexus"	
</code>  

  - nexus.vmoptions
<code>
-Xms1200M
-Xmx1200M
-XX:MaxDirectMemorySize=2G
-XX:+UnlockDiagnosticVMOptions
-XX:+UnsyncloadClass
-XX:+LogVMOutput
-XX:LogFile=/work/nexus-data/sonatype-work/nexus3/log/jvm.log
-XX:-OmitStackTraceInFastThrow
-Djava.net.preferIPv4Stack=true
-Dkaraf.home=.
-Dkaraf.base=.
-Dkaraf.etc=etc/karaf
-Djava.util.logging.config.file=etc/karaf/java.util.logging.properties
-Dkaraf.data=/work/nexus-data/sonatype-work/nexus3
-Djava.io.tmpdir=/work/nexus-data/sonatype-work/nexus3/tmp
-Dkaraf.startLocalConsole=false	
</code> 

  - 修改端口 etc/nexus.properties
<code>
application-port=8964
application-host=0.0.0.0
</code>  

## 编写Nexus 服务
### nexus.service
<code>
[Unit]
Description=Nexus3
After=network.target

[Service]
Type=forking
User=nexus
ExecStart=/opt/nexus/nexus3/bin/nexus start
ExecReload=/opt/nexus/nexus3/bin/nexus force-reload
ExecStop=/opt/nexus/nexus3/bin/nexus stop
ExecRestart=/opt/nexus/nexus3/bin/nexus restart

[Install]
WantedBy=multi-user.target

</code>

<html>
<p class="section-indent">
</p>
<img src="">
<p class="section-indent">
</p>
<img src="">
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