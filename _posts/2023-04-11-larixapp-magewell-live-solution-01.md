---
layout:     post
title:      SRT Stream live solution (Ⅰ)
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

![Solution](/img/livestream/live-magewell-solution01.png)

# 操作步骤

## 发送端 Larix App 配置

- Settings --> Connections --> new connection

## new connection form field
- name : SRT XXX
- url : srt://47.122.x.x:8000
- Mode: default
- streamid: upload.srt/live/[sub-stream-name] 这里与设备端 stream id 一致

![App Config](/img/livestream/live-magewell-solution01-1.png)

## Magewell Cloud 作为listener

## 接收端设备配置

- 1. 登录解码器Web GUI，点击进入“系统设置-网络”页签，打开“手动设置IP地址”开关，填写IP地址、子网掩码等信息，点击“应用”
  IP自动获取

- 2. 进入“数据源”页签，点击“添加”，选择“MPEG-TS SRT” 

- 3. 在弹出的页面中填写端口号（如图中8000），点击“确定”。

需要注意 streamid 需要与 app streamid 结尾一致
![App Config](/img/livestream/live-magewell-solution01-2.png)


## 测试

- 1. 手机开启 Larix App  
- 2. 点击中间录制按钮

