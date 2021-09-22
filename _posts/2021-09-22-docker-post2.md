---
layout:     post
title:      Docker World (一)
subtitle:   docker 最常用的img
date:       2021-09-22
author:     lanbery
header-img: img/docker-post-banner.png
header-color: #33b
header-mask: 0.35
catalog: true
tags:
    - Docker
---

> 



```bash
wsl -l -v  # 查看当前WSL 列表

# output
NAME                   STATE           VERSION
* Ubuntu-20.04           Running         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2
  CentOS                 Running         2

```

---

# Docker 基础概念

### Docker Compose

> Docker Compose配置文件是Docker Compose的核心，用于定义服务、网络和数据卷。格式为YAML，默认路径为./docker-compose.yml，可以使用.yml或.yaml扩展名，目前Compose配置文件格式的最新版本为V3。Compose配置文件中涉及的配置项也比较多，但大部分配置项的含义跟docker run命令相关选项是类似的

> Docker Compose配置文件是一个用于定义服务、网络和数据卷的YAML文件。其中服务定义了该服务启动的每个容器的配置，就像将命令行参数传递给docker run一样，网络和数据卷的定义类似于docker network create和docker volume create。跟docker run一样，如果在Dockerfile中通过诸如CMD、EXPOSE、VOLUME和ENV这些指令指定了相关选项，那么在默认情况下，不需要在docker-compose.yml中再次指定它们

**Compose配置文件结构**

```yml
version: "3.8"
services:

  redis:
    image: redis:alpine
    ports:
      - "6379"
    networks:
      - frontend
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  db:
    image: postgres:9.4
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    deploy:
      placement:
        constraints:
          - "node.role==manager"

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    networks:
      - frontend
    depends_on:
      - redis
    deploy:
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure

  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
    networks:
      - backend
    depends_on:
      - db
    deploy:
      replicas: 1
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  worker:
    image: dockersamples/examplevotingapp_worker
    networks:
      - frontend
      - backend
    deploy:
      mode: replicated
      replicas: 1
      labels: [APP=VOTING]
      restart_policy:
        condition: on-failure
        delay: 10s
        max_attempts: 3
        window: 120s
      placement:
        constraints:
          - "node.role==manager"

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints:
          - "node.role==manager"

networks:
  frontend:
  backend:

volumes:
  db-data:
```

---

# Window WSL2 Docker 最佳实践

> 为了在绑定挂载文件时获得最好的文件系统性能，我们建议将源代码和其他绑定挂载到Linux容器中的数据(例如，使用docker运行-v <host-path>:<container-path>)存储在Linux文件系统中，而不是Windows文件系统中

- 如果原始文件存储在Linux文件系统中，Linux容器只接收文件更改事件(inotify事件)。例如，一些web开发工作流依赖于inotify事件来在文件更改时自动重新加载。
- 当文件从 Linux 文件系统绑定挂载而不是从 Windows 主机远程安装时，性能要高得多。 因此避免 docker run -v /mnt/c/users:/users （其中 /mnt/c 从 Windows 挂载）
- 相反，从 Linux shell 使用类似 docker run -v ~/my-project:/sources <my-image> 的命令，其中 ~ 被 Linux shell 扩展为 $HOME

---


# Docker Install Mysql

> mysql是Docker及MySQL提供、维护的一个官方镜像，我们可以基于该镜像构建自己的MySQL数据库镜像，也可以直接使用这个镜像创建MySQL数据库容器

```bash
docker pull mysql # 将镜像下载到本地 ,默认5.7(latest)

# or 直接安装
docker kill mysql
docker rm mysql
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -v ${pwd}/mysql8:/var/lib/mysql -d mysql:8.0.21
# --name:Assign a name to the container
# -v, --volume: Optional volume driver for the container [注意:WSL2 的mount 路径与Hyper-V 区别],WSL2 share dir 由 WSL 管理
# -e, --env list                       Set environment variables
```

**docker run 命令**

  docker [options] COMMAND


- [-v] Print version
- [network]  Manage networks  docker network ls
- docker run (bash: docker run [OPTIONS] IMAGE [COMMAND] [ARG...])
  - [docker run -d ] Run container in background and print container ID
  - [docker run -l ] Set meta data on a container

> 如何进入container bash client?

> docker在1.3.X版本之后还提供了一个新的命令exec用于进入容器


```bash
docker ps # 显示当前container list

# output
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS         PORTS              NAMES
8a6f43705906   mysql:8.0.21   "docker-entrypoint.s…"   39 minutes ago   Up 5 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql

```

```bat
docker exec -it <container id> /bin/bash
```

