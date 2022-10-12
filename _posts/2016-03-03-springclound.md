---
layout:     post
title:      Spring Cloud
subtitle:   Mirco Service
date:       2020-04-26
author:     lanbery
header-img: img/springcloud-banner.png
header-color: #1C1C1C
header-mask: 0.65
catalog: true
tags:
    - program language
    - java
    
---

> Spring Cloud为开发人员提供了工具，用于快速构建分布式系统中的一些常见模式（例如配置管理、服务发现、断路器、智能路由、微代理、控制总线、一次性令牌、全局锁、领导层选举、分布式会话、集群状态）

> 使用SpringCloud开发人员可以快速建立实现这些模式的服务和应用程序

## Features

- Distributed/versioned configuration
- Service registration and discovery
- Routing
- Service-to-service calls 
- Load balancing 负载均衡
- Circuit Breakers 熔断器 【防止服务雪崩】
- Global locks 全局锁 
- Leadership election and cluster state 集群
- Distributed messaging

## Eureka 服务注册与发现

> Eureka基本的架构

- Eureka采用了C-S的架构设计，EurekaServer作为服务注册功能的服务器，他是服务注册中心
- 而系统中的其他微服务，使用Eureka的客户端连接到EurekaServer并维持心跳连接。这样系统的维护人员就可以通过EurekaServer来监控系统中各个微服务是否正常运行，Springcloud 的一些其他模块 (比如Zuul) 就可以通过EurekaServer来发现系统中的其他微服务，并执行相关的逻辑.
- Eureka 包含两个组件：Eureka Server 和 Eureka Client
- Eureka Server 提供服务注册，各个节点启动后，回在EurekaServer中进行注册，这样Eureka Server中的服务注册表中将会储存所有可用服务节点的信息，服务节点的信息可以在界面中直观的看到

- Eureka Client 是一个Java客户端，用于简化EurekaServer的交互，客户端同时也具备一个内置的，使用轮询负载算法的负载均衡器。在应用启动后，将会向EurekaServer发送心跳 (默认周期为30秒) 。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除掉 (默认周期为90s)

### EureKa自我保护机制 

> 某时刻某一个微服务不可用，eureka不会立即清理，依旧会对该微服务的信息进行保存

> 默认情况下，当eureka server在一定时间内没有收到实例的心跳，便会把该实例从注册表中删除（默认是90秒），但是，如果短时间内丢失大量的实例心跳，便会触发eureka server的自我保护机制，比如在开发测试时，需要频繁地重启微服务实例，但是我们很少会把eureka server一起重启（因为在开发过程中不会修改eureka注册中心），当一分钟内收到的心跳数大量减少时，会触发该保护机制


**Eureka和Zookeeper都可以提供服务注册与发现的功能**

- Zookeeper 保证的是 CP —> 满足一致性，分区容错的系统，可用性不是特别高(zk使用的是半数选举机制，需要一个leader)
- Eureka 保证的是 AP —> 满足可用性，分区容错的系统，通常可能对一致性要求低一些

## 断路器——Hystrix

- 多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其他的微服务，这就是所谓的“扇出”，如果扇出的链路上某个微服务的调用响应时间过长，或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”

- Hystrix是一个应用于处理分布式系统的延迟和容错的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时，异常等，Hystrix 能够保证在一个依赖出问题的情况下，不会导致整个体系服务失败，避免级联故障，以提高分布式系统的弹性

- “断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控 (类似熔断保险丝) ，向调用方返回一个服务预期的，可处理的备选响应 (FallBack) ，而不是长时间的等待或者抛出调用方法无法处理的异常，这样就可以保证了服务调用方的线程不会被长时间，不必要的占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩

### Hystrix 主要作用
- 服务降级
- 服务熔断
- 服务限流
- 接近实时监控

  * 当一切正常时，请求流可以如下

![hystrix](/img/java/spring-cloud-hystrix-biz-demo.png)


  * 当许多后端系统中有一个潜在阻塞服务时，它可以阻止整个用户请求

![阻塞服务时](/img/java/spring-cloud-hystrix-02.png)

  * 随着大容量通信量的增加，单个后端依赖项的潜在性会导致所有服务器上的所有资源在几秒钟内饱和。

应用程序中通过网络或客户端库可能导致网络请求的每个点都是潜在故障的来源。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，从而备份队列、线程和其他系统资源，从而导致更多跨系统的级联故障

![阻塞服务时](/img/java/spring-cloud-hystrix-03.png)

  * 当使用Hystrix包装每个基础依赖项时，上面的图表中所示的体系结构会发生类似于以下关系图的变化。每个依赖项是相互隔离的，限制在延迟发生时它可以填充的资源中，并包含在回退逻辑中，该逻辑决定在依赖项中发生任何类型的故障时要做出什么样的响应


![阻塞服务时](/img/java/spring-cloud-hystrix-04.png)


## 服务网关 Zuul (Netflix)

Zull包含了对请求的路由(用来跳转的)和过滤两个最主要功能：

其中路由功能负责将外部请求转发到具体的微服务实例上，是实现外部访问统一入口的基础，而过滤器功能则负责对请求的处理过程进行干预，是实现请求校验，服务聚合等功能的基础。Zuul和Eureka进行整合，将Zuul自身注册为Eureka服务治理下的应用，同时从Eureka中获得其他服务的消息，也即以后的访问微服务都是通过Zuul跳转后获得

![Zuul](/img/java/spring-cloud-zuul-biz-demo.png)

## 分布式配置 Spring Cloud Config


## loading balance 负载均衡 Ribbon

> Ribbon 的负载均衡在默认情况下使用的 Round Robin轮询算法。 指的就是当订单服务对积分服务发起了6次请求，那就会先请求第一台机器，接着是第二台…，不断的循环

![Ribbon](/img/java/Ribbon.png)




