---
title：常用命令速查
---

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

## Git

```shell
# git 取消跟踪文件  https://www.cnblogs.com/zhuchenglin/p/7128383.html
## 对所有文件都取消跟踪
$ git rm -r --cached . 　　// 不删除本地文件
$ git rm -r --f . 　　    // 删除本地文件
## 对某个文件取消跟踪
$ git rm --cached readme1.txt    // 删除readme1.txt的跟踪，并保留在本地
$ git rm --f readme1.txt        // 删除readme1.txt的跟踪，并删除本地文件
## 对某个文件夹取消跟踪
$ git rm --cached log/*    // 删除log文件夹下所有文件的跟踪，并保留文件和文件夹
$ git rm --f log/*         // 删除log文件夹下所有文件的跟踪，并删除文件和文件夹

# 删除远程分支
$ git push origin --delete [branchName]
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