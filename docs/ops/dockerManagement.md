---
title: Docker 图形化管理工具
---

## Portainer

![](/images/dockerManagement1.jpeg)

Portainer 是开源的，是 Web 应用的形式。

github 上项目地址：https://github.com/portainer/portainer

官网地址：https://www.portainer.io

支持的系统：Linux, Mac OS X, Windows。

功能特性：

- 管理仓库、网络、数据卷、密钥、镜像、容器
- 管理你的配置，例如告警、监控
- 支持容器的健康检查
- 容器的启动、停止、恢复、删除
- 检查容器、查看容器日志、可视化状态查看
- 进入容器控制台
- 可以添加扩展
- 有一套 RBAC 基于角色的权限控制系统

## DockStation

![](/images/dockerManagement2.jpeg)

DockStation 是免费的，是桌面应用的形式。

官网地址：https://dockstation.io/

支持的系统：Linux, Mac, Windows

功能特性：

- 可以非常方便的操作 Docker 和 DockerCompose。
- 可以帮助我们管理容器、Service服务（本地远程都可以），并监控他们
- 可以轻松跟踪 CPU、内存、网络、磁盘I/O、开放端口
- 可以把常用的操作组织成一个项目，通过项目的方式来检查容器状态，以图形化的方式管理。

## Docker Desktop

![](/images/dockerManagement3.jpeg)

Docker Desktop 是 Docker 自己的客户端。

官网地址：http://www.docker.com

支持的系统：Mac, Windows

功能特性：

- 可以设置 Docker 的资源限制（例如 CPU、内存、交换空间、磁盘镜像大小、文件共享、网络）
- 配置 Docker 引擎
- 运行命令行
- 支持 Kubernetes，可以配置发布到 Kubernetes
- 查看日志、容器状态

## Lazydocker

![](/images/dockerManagement4.jpeg)

Lazydocker 是开源，是终端 UI 的形式。

项目地址：https://github.com/jesseduffield/lazydocker

支持的系统：Linux, OSX, Windows

功能特性：

- 鼠标、键盘都可操作
- 快速查看 docker/docker-compose 容器环境，一目了然
- 查看 container/service 的日志
- 容器指标可视化
- 自己配置你关注的各项指标图形
- containers/services 重启、删除、重新构建
- 清理无用镜像、容器、数据卷

## Docui

![](/images/dockerManagement5.jpeg)

Docui 是开源的，形式与 Lazydocker 一样，也是 终端 UI 的形式。

项目地址：https://github.com/skanehira/docui

支持的系统：Mac, Linux

功能特性：

- 镜像
  - 搜索、拉取、删除
  - 保存、导入、加载
  - 监查、过滤
- 容器
  - 创建、删除
  - 启动、停止
  - 导出、提交
  - 监查、重命名、过滤
  - 执行命令
- 数据卷
  - 创建、删除
  - 监查、过滤
- 网络
  - 删除
  - 监查、过滤

Docui 和 Lazydocker 都是终端界面，他们都有一个共同的优势，就是支持大量的快捷键，熟练后会极其便利。

## Summary

Portainer 比较适合团队使用，因为他有访问控制。

如果你有多个远程的项目，而且你比较喜欢桌面应用，DockStation 比较适合你。

Lazydocker 和 Docui 都属于简单灵活的小工具，如果你不需要复杂的功能，他们比较合适，而且会让你更有程序员的感觉。

Docker Desktop 是 Windows/Mac 安装 Docker 时就有的，管理功能比较简单，在需要简单的集成 Kubernetes 时可以用他。