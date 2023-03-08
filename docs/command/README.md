---
title: 概述
---

::: tip 涉及
**git、linux、docker、docker-compose、anaconda、golang、python、nodejs、jetBrains快捷键**
:::

## Linux

```shell
# 查看日志文件的最后几行
$ tail -n 5 log.log

# 查看当前所有tcp端口
$ netstat -ntlp
# $ netstat -ntlp | grep 8080   # 查看所有8080端口使用情况
# $ netstat -ntlp | grep 3306   # 查看所有3306端口使用情况

# 杀掉进程
$ kill 26993 # $ kill PID
# $ kill -9 PID

# 应用在后台执行
$ nohup ./GMMangementV1 > log.log 2>&1 &
```

## Docker

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


# docker 启动【golang/node/python/busybox...】镜像在后台一直运行的方法
$  docker run -d --name=[container-name] [image-name] /bin/sh -c "while true;do echo hello xxxx;sleep 60;done" # 在容器中一直执行打印输出，时间间隔60s 
```



## Docker-Compose

## Anaconda

## Golang

```shell
# golang 打包 【Windows 下编译 Mac 和 Linux 64位可执行程序】
$ SET CGO_ENABLED=0
$ SET GOOS=darwin
$ SET GOARCH=amd64
$ go build -o alias main.go  # go build [-o 输出名] [包名]

$ SET CGO_ENABLED=0
$ SET GOOS=linux
$ SET GOARCH=amd64
$ go build -o alias main.go  # go build [-o 输出名] [包名]
```

## Python

## JetBrains 快捷键

>  **PyCharm、Goland、IntelliJ IDEA ...**

[Pycharm 常用快捷键 - 暮良文王 - 博客园 (cnblogs.com)](https://www.cnblogs.com/liangmingshen/p/9297381.html)

[Pycharm超级好用的快捷键——效率之王 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/83987698)

| 快捷键                 | 功能                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `Ctrl + /`             | 行注释（可选中多行）                                         |
| `Ctrl + Alt + L`       | 代码格式化                                                   |
| `Alt + 鼠标`           | 列编辑模式                                                   |
| `Alt + Shift + Insert` | 列选择模式（编辑窗口鼠标右击选择 **Column Selection Mode**） |
| `Ctrl + w`             | 选中单词                                                     |
| `Ctrl + Alt + Enter`   | 向上插入                                                     |
| `Shift + Enter`        | 向下插入                                                     |
| `Alt + Shift + 上下键` | 选中代码上下移动                                             |
| `Ctrl + d`             | 复制粘贴一行                                                 |
| `Ctrl + y`             | 删除一行                                                     |
|                        |                                                              |
|                        |                                                              |
|                        |                                                              |
|                        |                                                              |
|                        |                                                              |