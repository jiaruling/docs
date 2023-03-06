---
title：常用命令速查
---

## Git

### Git工作流

![](/images/gitflow.jpg)

### 常用基础操作

::: tip command

**init、add、commit、status、clone、log、diff、tag、stash**

:::

```shell
# 初始化git仓库
$ git init

# 工作区 -> 暂存区
$ git add .     # 添加所有文件到暂存区【只对当前目录下的文件及子目录有效，对上级目录中文件的改动无效】
$ git add 1.txt # 只添加1.txt文件到暂存区
$ git add 1.txt *.c # 添加1.txt文件和.c文件到暂存区
$ git add [dir] # 添加指定目录到暂存区，包括子目录

# 暂存区 -> 版本库
$ git commit -m "commit" # -m参数 指定提交的信息
$ git commit 1.txt 2.txt -m "commit" # 提交【暂存区】的指定文件1.txt 2.txt到版本库

# 工作区 -> 版本库
$ git commit -am "commit" # -a参数 设置修改文件后不需要执行 git add 命令，直接提交【只能直接提交所有的改动的文件，不能指定文件提交】
$ git commit 1.txt 2.txt -m "commit" # 提交【工作区】的指定文件1.txt 2.txt到版本库

# 查看状态【上次提交之后是否有对文件进行再次修改】
$ git status
$ git status -s  # -s参数 获得简短的输出结果

# 克隆项目
$ git clone [url] 
$ git clone [url] [rename] # 克隆项目并指定文件夹名称

# 提交历史
$ git log
$ git log --oneline # 查看简洁版
$ git log --graph   # 查看分支【分叉/合并】的拓扑图
$ git log --reverse # 逆向显示所有日志
$ git log --author=userName --oneline -5 # 查找指定用户的提交日志 -5 表示显示5行
$ git blame 1.txt   # 查看指定文件的修改记录

# 比较差异
$ git diff 1.txt  # 显示【暂存区】和【工作区】的差异。如果文件还没有添加到暂存区，则是【工作区】和【上一次提交】的差异
$ git diff --cached 1.txt # 显示【暂存区】和【上一次提交】的差异
$ git diff [first commitId] [second commitId] # 显示【两次提交】的差异

# 标签
$ git tag v1.0.0          # 给最新一次提交打上
$ git tag                 # 查看所有标签
$ git tag v0.0.9 85fc7e7  # 给某次提交追加标签
$ git tag -d v0.0.9       # 删除标签
$ git show v1.0.0         # 查看此版本所修改的内容

# git栈
## 使用场景: 当在一个分支的开发工作未完成，却又要切换到另外一个分支进行开发的时候，可以先将自己写好的代码，储存到git栈，进行另外一个分支的代码开发，在需要的时候再恢复。
$ git stash                # 保存当前的【工作区】与【暂存区】的状态，把当前的修改的保存到git栈，等以后需要的时候再恢复，git stash 这个命令可以多次使用，每次使用都会新加一个stash@{num}，num是编号
$ git stash save 'comment' # 作⽤等同于【git stash】，区别是可以加⼀些注释， 执⾏存储时，添加注释，⽅便查找
$ git stash pop            # 默认恢复git栈中最新的一个stash@{num}，建议在git栈中只有一条的时候使用，以免混乱。【注：该命令将堆栈中最新保存的内容删除】
$ git stash apply          # 将堆栈中的内容恢复到当前分支下。这个命令不同于【git stash pop】。该命令不会将内容从对堆栈中删除，也就是该命令能够将堆栈的内容多次运用到工作目录，适合用与多个分支的场景。
						   # 使用方法：git stash apply stash@{$num}
$ git stash drop           # 从堆栈中移除指定的stash
						   # 使用方法：git stash drop stash@{$num}
$ git stash clear          # 移除全部的stash
$ git stash list           # 查看当前stash的所有内容
$ git stash show           # 查看堆栈中最新保存的stash和当前⽬录的差异，显⽰做了哪些改动，默认show第一个存储
```

### 分支管理&远程操作

:::tip command

**branch、checkout、merge 、rebase、remote、pull、push、 fetch**

:::

```shell
# 删除远程分支
$ git push origin --delete [branchName]
```



### 版本回退&放弃本地修改

:::tip command

**reset、checkout**

:::

```shell
# 版本回退
## 语法格式
$ git reset [--soft | --mixed | --hard] [HEAD]
## 【--mixed】参数为默认，可以不用带该参数，用于重置【暂存区】的文件与上一次的提交(commit)保持一致，【工作区】文件内容保持不变
$ git reset HEAD^            # 回退所有内容到上一个版本  
$ git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
$ git reset 052e             # 回退到指定版本
## 【--soft】 参数用于回退到某个版本
$ git reset --soft HEAD~3   # 回退上上上一个版本 
## 【--hard】 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交【慎使用--hard参数，它会删除回退点之前的所有信息】
$ git reset --hard HEAD             # 取消【工作区】和【暂存区】已缓存的内容
$ git reset --hard HEAD~3           # 回退上上上一个版本  
$ git reset --hard bae128           # 回退到某个版本回退点之前的所有信息。 
$ git reset --hard origin/master    # 将本地的状态回退到和远程的一样
## HEAD说明 
###【HEAD 表示当前版本】【HEAD^ 上一个版本】【HEAD^^ 上上一个版本】【HEAD^^^ 上上上一个版本】
###【HEAD~0 表示当前版本】【HEAD~1 上一个版本】【HEAD^2 上上一个版本】【HEAD^3 上上上一个版本】


# 放弃本地修改
## 情况1:没有执行 git add
$ git checkout -- 1.txt
$ git checkout .

## 情况2:已经执行 git add 【暂存区->工作区】暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变
$ git reset HEAD 1.txt
$ git reset HEAD .

## 情况3:已经执行 git commit 
$ git reset --hard HEAD^
```

### 用户信息

```shell
# 获取
$ git config user.name   # 获取当前登录的用户
$ git config user.email  # 获取当前登录用户的邮箱

# 修改【去掉 --global 参数只对当前仓库有效】
$ git config --global user.name 'userName'    # 修改登陆账号，userName为你的git账号
$ git config --global user.email 'email'      # 修改登陆邮箱，email为你的git邮箱
$ git config --global user.password 'password'  # 修改登陆密码，password为你的git密码

# 清理本地缓存
$ git clean -df
```

### 非重点

:::tip command

**rm、mv**

:::

```shell
# 删除文件&取消跟踪文件【只能操作已经追踪的文件】https://www.cnblogs.com/zhuchenglin/p/7128383.html
$ git rm 1.txt # 删除工作区已commit的文件【commit之后文件没有改动】
$ git rm --cached readme1.txt    # 删除readme1.txt的跟踪，并保留在本地
$ git rm --f readme1.txt        # 删除readme1.txt的跟踪，并删除本地文件
## 对所有文件都取消跟踪
$ git rm -r --cached . 　　# 不删除本地文件
$ git rm -r --f . 　　     # 删除本地文件
## 对某个文件夹取消跟踪
$ git rm --cached log/*    # 删除log文件夹下所有文件的跟踪，并保留文件和文件夹
$ git rm --f log/*         # 删除log文件夹下所有文件的跟踪，并删除文件和文件夹

# 移动和重命名【只能操作已经追踪的文件】
$ git mv 1.txt 11.txt    # 重命名文件
$ git mv -f 1.txt 11.txt # 如果新文件名已经存在，但还是要重命名它，可以使用 -f 参数
```

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