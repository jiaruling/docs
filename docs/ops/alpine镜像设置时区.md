---
title: 基于alpine系统的镜像时区配置
---

> **参考: https://blog.csdn.net/isea533/article/details/87261764**

---

## 起因

由于 alpine 提供的 linux 环境的镜像特别的小，只有 5M 左右，因此应用非常广泛，在 Docker Hub 有大量基于 alpine 的镜像，但是所有基于 alpine 的镜像使用的都是默认时区，因此在使用时，要对时区进行修改。[**时区地图**](https://www.timeanddate.com/time/map/)

## 查看日期

首先可以进入 alpine 的镜像（默认 /bin/sh）查看日期：

```shell
$ docker run -it --rm alpine:3.9 /bin/sh
$ date -R
Thu, 14 Feb 2019 05:59:48 +0000
```

## 修改日期

### 实验

在前面进入的容器中，按顺序执行下面的命令：

```shell
# 安装时区设置
$ apk add tzdata
# 复制上海时区
$ cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 指定为上海时区
$ echo "Asia/Shanghai" > /etc/timezone
# 验证
$ date -R
# 输出，和当前时间对比
$ Thu, 14 Feb 2019 14:01:02 +0800
# 删除其他时区配置，节省空间
$ apk del tzdata
# 查看修改后的时间
$ date -R
```

### 构建dockerfile

```dockerfile
FROM alpine:3.9

# 设置时区为上海
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
```

保存为 Dockerfile 文件，在 Dockerfile 目录执行命令构建镜像：

```shell
docker build -t alpine-sh:3.9 .
```

## 其他系统

可以先进系统看时区，以及是否存在时区的配置文件，存在的情况下，直接修改即可。例如 Docker 官方提供的 mysql：

```dockerfile
FROM 10.10.1.243:5000/mysql:5.6.43

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone
```

