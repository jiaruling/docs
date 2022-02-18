---
title: Docker 常用命令
---

## 镜像

## 容器

## 网络

## 卷

```shell
# docker 设置开机自启动
$ docker update --restart=always [containerId1] [containerId2] [containerId3]

# docke build 
$ docker build -t [tag] .
# 启动
$ docker run -d -v /var/gm299:/app/static --name=[container-name] -p [8000]:[8080] gm299-web

# 删除运行中的容器
$ docker rm -f [containerId]
# 删除停止的容器
$ docker rm [containerId]
# 停止容器
$ docker stop [containerId]
# 删除镜像
$ docker rmi [imageId]
```
