---
title: Git 命令
---

## Git工作流

![](/images/gitflow.jpg)

## 常用基础操作

::: tip command

**init、clone、add、commit、status、log、diff、tag、stash、rm、mv**

:::

```shell
# 初始化git仓库
$ git init

# 克隆项目
$ git clone [url]
$ git clone [url] [rename] # 克隆项目并指定文件夹名称

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

# 删除文件&取消跟踪文件【只能操作已经追踪的文件】https://www.cnblogs.com/zhuchenglin/p/7128383.html
$ git rm 1.txt                 # 删除工作区已commit的文件【commit之后文件没有改动】
$ git rm --cached readme1.txt  # 删除readme1.txt的跟踪，并保留在本地
$ git rm --f readme1.txt       # 删除readme1.txt的跟踪，并删除本地文件
## 对所有文件都取消跟踪
$ git rm -r --cached . 　　    # 不删除本地文件
$ git rm -r --f . 　　         # 删除本地文件
## 对某个文件夹取消跟踪
$ git rm --cached log/*        # 删除log文件夹下所有文件的跟踪，并保留文件和文件夹
$ git rm --f log/*             # 删除log文件夹下所有文件的跟踪，并删除文件和文件夹

# 移动和重命名【只能操作已经追踪的文件】
$ git mv 1.txt 11.txt          # 重命名文件
$ git mv -f 1.txt 11.txt       # 如果新文件名已经存在，但还是要重命名它，可以使用 -f 参数
```

## 分支管理&远程操作

:::tip command

**branch、checkout、merge 、rebase、remote、 fetch、pull、push**

:::

```shell
# 分支
$ git branch                             # 列出所有分支
$ git branch dev                         # 创建dev分支
$ git checkout dev                       # 切换到dev分支
$ git checkout -b dev                    # 创建dev分支并切换到dev分支
$ git branch -d dev                      # 删除dev分支

# 合并分支
## merge 合并主分支上会产生一次新的提交
## 【无合并冲突】
$ git checkout master        # 切换主分支
$ git merge dev              # 合并dev分支
$ git merge master dev       # 以上两句缩写为一句命令
## 【有合并冲突】
$ git checkout master        # 切换主分支
$ git merge dev              # 合并dev分支
$ git add .                  # 解决冲突后执行
$ git commit -m "branch dev" # 提交
## rebase
## 【无合并冲突】
$ git checkout master    # 切换主分支
$ git rebase dev         # 合并dev分支
$ git rebase master dev  # 以上两句缩写为一句命令
## 【有合并冲突】
$ git checkout master    # 切换主分支
$ git rebase dev         # 合并dev分支
$ git add .              # 解决冲突后执行
$ git rebase --continue  # 继续执行合并

# 远程仓库
$ git remote                           # 查看是否关联远程仓库
$ git remote -v                        # 查看远程仓库
$ git remote show [origin]             # 显示某个远程仓库的信息
$ git remote add [shortname] [url]     # 添加远程版本库
$ git remote rm [origin]               # 删除远程仓库
$ git remote rename old_name new_name  # 修改仓库名

# fetch
$ git fetch origin        # git fetch [alias]  拉取代码
$ git merge origin/master # git merge [alias]/[branch] 合并代码

# pull == fetch + merge
$ git pull origin master                # git pull <远程主机名> <远程分支名>
$ git pull origin master:brantest       # git pull <远程主机名> <远程分支名>:<本地分支名>

# push
$ git push origin master                 # git push <远程主机名> <本地分支名>
$ git push origin master:master          # git push <远程主机名> <本地分支名>:<远程分支名>
$ git push --force origin master         # 本地版本与远程版本有差异，但又要强制推送
$ git push origin --delete [branchName]  # 删除远程分支
```

## 版本回退&放弃本地修改

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
##【HEAD 表示当前版本】【HEAD^ 上一个版本】【HEAD^^ 上上一个版本】【HEAD^^^ 上上上一个版本】
##【HEAD~0 表示当前版本】【HEAD~1 上一个版本】【HEAD^2 上上一个版本】【HEAD^3 上上上一个版本】

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

## 用户信息

::: tip

**config**

:::

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

## Merge和Rebase的异同点

::: warning rebase的黄金原则

- **不能在一个共享的分支上进行Git rebase操作**
- 融合代码到公共分支的时使用 `git merge`，而不用 `git rebase`
- 融合代码到个人分支的时候使用`git rebase`，可以不污染分支的提交记录，形成简洁的线性提交历史记录

:::

[跳转]( https://joyohub.com/2020/04/06/git-rebase/)