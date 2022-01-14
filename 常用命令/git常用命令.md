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
