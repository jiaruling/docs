---
title: Linux Shell
---

## 介绍

### shell 是什么？

- shell 是一个程序，它是提供**用户**和**内核**之间交互的接口。

### shell 在 Linux 中的作用是什么？

- 内核是 Linux 操作系统的核心，它管理用户和操作系统之间的所有内容。
- Shell 可供所有用户在启动终端时使用。
- 终端启动后，用户可以运行任何可用的命令。
- 当 shell 完成命令的执行时，将在终端窗口上获取输出。

### linux系统支持的几种Shell类型

:::tip 介绍

常见的 Shell 有 sh、bash、csh、tcsh、ash 等

:::

#### sh

- sh 的全称是 Bourne shell，由 AT&T 公司的 Steve Bourne开发，为了纪念他，就用他的名字命名了。

- sh 是 UNIX 上的标准 shell，很多 UNIX 版本都配有 sh。sh 是第一个流行的 Shell。

#### bash

- Bash（全称是 Bourne Again Shell）是运行在今天的大多数 Linux 发行版上的默认的 shell，它非常受欢迎，并具有很多功能。
- bash 由 GNU 组织开发，保持了对 sh shell 的兼容性，是各种 Linux 发行版默认配置的 shell。

#### csh

- sh 之后另一个广为流传的 shell 是由柏克莱大学的 Bill Joy 设计的，这个 shell 的语法有点类似C语言，所以才得名为 C shell ，简称为 csh。

- Bill Joy 是一个风云人物，他创立了 BSD 操作系统，开发了 vi 编辑器，还是 Sun 公司的创始人之一。

#### tcsh

- tcsh 是 csh 的增强版，加入了命令补全功能，提供了更加强大的语法支持。

#### ash

- 一个简单的轻量级的 Shell，占用资源少，适合运行于低内存环境，但是与 bash shell 完全兼容

## 系统自带 shell

### 如何查看当前系统支持的Shell类型

- Shell 是一个程序，一般都是放在/bin或者/user/bin目录下，当前 Linux 系统可用的 Shell 都记录在/etc/shells文件中。
- /etc/shells是一个纯文本文件，可以在图形界面下打开它，也可以使用 cat 命令查看它。

```shell
$ cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
```

### 查看当前 Linux 的默认 Shell

```shell
$ echo $SHELL
/bin/bash
```

- 在现代的 Linux 上，sh 已经被 bash 代替，/bin/sh往往是指向/bin/bash的符号链接。

## Fish - friendly interactive shell

### fish 安装

> 参考: 
>
> - https://www.ruanyifeng.com/blog/2017/05/fish_shell.html
> - https://zhuanlan.zhihu.com/p/59439573
>
> 官网: https://fishshell.com/#platform_tabs

```shell
# 增加仓库
$ sudo -s
$ cd /etc/yum.repos.d/
$ yum-config-manager --add-repo https://download.opensuse.org/repositories/shells:fish:release:2/CentOS_7/shells:fish:release:2.repo

# 更新仓库
$ yum repolist
$ yum update

# 安装 fish
$ yum install fish

# 使用 fish
$ fish
```

### 将 Fish 设置为默认 shell

- 首先使用以下命令获取 Fish Shell 的位置

```shell
$ whereis fish
fish: /usr/bin/fish /etc/fish /usr/share/fish /usr/share/man/man1/fish.1.gz
```

- 通过运行以下命令将默认 shell 更改为 fish shell 

```shell
$ chsh -s /usr/bin/fish
Changing shell for root.
Shell changed.
```

::: tip 提示

需验证 Fish Shell 是否已添加到 `/etc/shells` 目录中。如果不是，则运行以下命令以附加它。

:::

```shell
# 验证 fish shell 是否添加到 /etc/shells
$ cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
/bin/tcsh
/bin/csh
/usr/bin/fish

# 如果 /usr/bin/fish 不在 /etc/shells 中，进行添加
$ echo /usr/bin/fish | sudo tee -a /etc/shells
```

### 返回 bash

- 暂时返回

```shell
$ bash
```

- 永久返回

```shell
$ chsh -s /bin/bash
```

