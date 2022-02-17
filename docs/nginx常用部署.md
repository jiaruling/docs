# 一、前端部署 【直接部署】

## 1. 安装工具

- windows terminal
- WinSCP

##  2. 登录到服务器

```shell
# 格式: ssh 用户名@地址
$ ssh root@192.168.18.100  # 22端口可以省略，其他端口不可省略 ssh -p 2222 root@192.168.18.100
```

## 3. 上传前端文件到指定目录

```shell
# 文件上传至目录: /test/dist
```

##  4. 配置nginx文件

```shell
# 1. 找到nginx配置文件目录
# cat /etc/nginx/nginx.conf

# 2. 修改配置文件
    #user  nobody;
    worker_processes  1;

    events {
        worker_connections  1024;
    }

    http {
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;
        #tcp_nopush     on;

        #keepalive_timeout  0;
        keepalive_timeout  65;

        ## 重点！重点！重点！
        server {
            listen       8083;
            server_name  localhost;

            location / {
                root   /test/dist;  # 指定前端打包的文路径
                index  index.html index.htm;
            }
        }
    }
    
# 3.检查配置文件是否正确
$ nginx -t # 可以通过这个命令找到nginx的配置文件路径

# 4.nginx重新加载配置文件
$ nginx -s reload # 一般在任意路径均可执行
```



# 二、前端部署 Docker 版 【开发测试版】

```shell
# 拉取镜像
$ docker pull nginx

# 启动 nginx
$ docker run -d \
--name nginx \
-p 8080:8080 \
-v /var/nginx/conf:/etc/nginx/conf.d \
-v /var/nginx/project:/var/nginx/project \
nginx:latest

# 设置开机自启动
$ docker container update --restart=always nginx

# 查看运行状况
$ docker logs nginx
```

- **nginx** 配置文件  **default.conf**  的内容如下

```tex
server {
    listen       8080;
    server_name  localhost;

    location / {
        root   /var/nginx/project/dist;
        index  index.html index.htm;
    }
}
```

- 配置文件设置好之后将其放置在宿主机的 **/var/nginx/conf** 目录下
- 前端编译好的目标文件将其放置在宿主机的 **/var/nginx/project** 目录下

# 三、前端部署 Docker 版 【生产环境】

> **单节点简易版本**

```shell
# 1.准备 Dockerfile 文件
$ ls
dist
# 编写 Dockerfile
$ vim Dockerfile
#--------------------------文件内容如下--------------------------
FROM nginx:latest
MAINTAINER xxx@163.com
COPY dist/ /usr/share/nginx/html/
#--------------------------------------------------------------
$ ls
dist  Dockerfile

# 2.构建镜像
$ docker build -t nginx:vue .
# 3.查看自己构建的镜像
$ docker images
# 4. 启动容器
$ docker run -d --name nginx-vue -p 8848:80 nginx:vue
```

# Ⅰ. 附录一 【linux主机】

```shell
# liunx主机
## 查看nginx启动状态
$ ps -ef | grep nginx
## 启动nginx
$ cd usr/local/nginx/sbin #注意：usr/local/nginx 是安装目录
$ ./nginx # ./ 表示执行当前文件夹下的nginx文件

## 停止nginx
$ nginx -s stop # 一般在任意路径均可执行

## 3. nginx重新加载配置文件
$ nginx -s reload # 一般在任意路径均可执行

## 4. 检查配置文件是否正确
$ nginx -t
```

# Ⅱ. 附录二 【docker】

```shell
# docker
## 查看容器的命令
$ docker container
## 查看正在运行中的容器
$ docker ps
## 查看所有容器
$ docker ps -a
## 停止容器
$ docker stop nginx
## 启动停止的容器
$ docker start nginx
## 重启容器
$ docker restart nginx
## 删除容器
$ docker rm nginx
## 删除所有停止的容器
$ docker rm $(docker ps -a -q) # 或者 docker rm $(docker ps -qf status=exited)
## 重新加载配置文件
$ docker exec nginx nginx -s reload
## docker镜像导出为压缩文件 【-o 和 > 表示输出到文件】
$ docker save -o nginx.tar nginx:vue # 等价于 docker save > nginx.tar nginx:vue
## 压缩文件导入为docker镜像 【-i 和 < 表示从文件输入】
$ docker load -i nginx.tar # 等价于 docker load < nginx.tar

## 查看端口是否开启
$ netstat -anp | grep docker-proxy
```

