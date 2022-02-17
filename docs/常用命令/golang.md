# 1. 交叉编译

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

