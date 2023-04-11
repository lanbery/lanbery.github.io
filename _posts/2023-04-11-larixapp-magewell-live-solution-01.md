---
layout:     post
title:      SRT Stream live solution
subtitle:   Larix Broadcaster push to Magewell Cloud
date:       2023-04-11
author:     lanbery
header-img: img/live-tech-banner.png
catalog: true
tags:
    - SRT 
    - Live
---

> 使用美乐威Pro Convert系列解码器搭配Larix Broadcaster App传输SRT流

SRT（Secure Reliable Transport）能够在复杂互联网环境下，实现多地之间安全可靠低延时的高清网络视频传输与分发。在之前的博文中我们已经介绍过如何使用美乐威Ultra Encode和Pro Convert设备传输SRT流，本文将介绍美乐威Pro Convert系列解码器搭配Larix Broadcaster APP传输SRT流。

Larix Broadcaster允许通过WiFi，EDGE，3G，LTE和5G将来自移动设备的实时音视频内容进行编码和广播。它支持 SRT Caller，Listener和Rendezvous模式，在本文中我们将Larix Broadcaster用作Caller模式，将Pro Convert解码器用作Listener模式

## 需要设备

- 1. Larix Broadcaster App 
- 2. Magewell Cloud Server
- 3. 显示器一台、笔记本电脑一台、网线和HDMI线缆若干

<img src="https://mmbiz.qpic.cn/mmbiz_png/3ib9RyR37BXCJ6JQpia2ibvW0G7PiaaHFnfticnOk27ImjTxnTLdE7I7SicM1d6a5NyQLckRt5Aydn2eDA84UKiacYkbg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1" />

![PoW](/img/livestream/live-magewell-solution01.png)

## Larix App 配置

- Settings --> Connections --> new connection

## new connection form field
- name : SRT XXX
- url : srt://47.122.x.x:8000
- Mode: default
- streamid: upload.srt/live/[sub-stream-name] 这里与设备端 stream id 一致


