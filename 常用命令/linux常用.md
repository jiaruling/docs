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
