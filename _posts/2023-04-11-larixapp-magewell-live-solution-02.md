---
layout:     post
title:      SRT Stream live solution (Ⅱ)
subtitle:   Larix Broadcaster push to Magewell Cloud
date:       2023-04-11
author:     lanbery
header-img: img/live-tech-banner.png
catalog: true
tags:
    - SRT 
    - Live
---

> 如何使用美乐威Ultra Encode系列编码盒搭配Larix Player App传输SRT流

SRT（Secure Reliable Transport）能够在复杂互联网环境下，实现多地之间安全可靠低延时的高清网络视频传输与分发。在之前的博文中我们已经介绍过如何使用美乐威Pro Convert系列解码器搭配Larix Broadcaster App传输SRT流，本文将介绍美乐威Ultra Encode系列编码盒搭配Larix Player App传输SRT流。

Larix Player支持 SRT Caller，Listener和Rendezvous模式，在本文中我们将Larix Player用作Caller模式，将Ultra Encode编码器用作Listener模式。

![Solution](/img/livestream/magewell-device-2larix-app-02-1.png)