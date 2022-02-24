---
title: PreStudy
---

## 网络基础

## TCP 通信

### Server

::: details 点击查看代码

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	//1、监听端口
	listener, err := net.Listen("tcp", "0.0.0.0:9090")
	if err != nil {
		fmt.Printf("listen fail, err: %v\n", err)
		return
	}

	//2.建立套接字连接
	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Printf("accept fail, err: %v\n", err)
			continue
		}

		//3. 创建处理协程
		go process(conn)
	}
}

func process(conn net.Conn) {
	defer conn.Close()	//思考题：这里不填写会有啥问题？
	for {
		var buf [128]byte
		n, err := conn.Read(buf[:])

		if err != nil {
			fmt.Printf("read from connect failed, err: %v\n", err)
			break
		}
		str := string(buf[:n])
		fmt.Printf("receive from client, data: %v\n", str)
	}
}
```

:::

### Client

::: details 点击查看代码

```go
package main 

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main()  {
	doSend()
	fmt.Print("doSend over")
}


func doSend() {
	//1、连接服务器
	conn, err := net.Dial("tcp", "localhost:9090")
	if err != nil {
		fmt.Printf("connect failed, err : %v\n", err.Error())
		return
	}
	defer conn.Close()	//思考题：这里不填写会有啥问题？
	//2、读取命令行输入
	inputReader := bufio.NewReader(os.Stdin)
	for {
		// 3、一直读取直到读到\n
		input, err := inputReader.ReadString('\n')
		if err != nil {
			fmt.Printf("read from console failed, err: %v\n", err)
			break
		}
		// 4、读取Q时停止
		trimmedInput := strings.TrimSpace(input)
		if trimmedInput == "Q" {
			break
		}
		// 5、回复服务器信息
		_, err = conn.Write([]byte(trimmedInput))
		if err != nil {
			fmt.Printf("write failed , err : %v\n", err)
			break
		}
	}
}
```

:::

## UDP 通信

### Server

::: details 点击查看代码

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	//step 1 监听服务器
	listen, err := net.ListenUDP("udp", &net.UDPAddr{
		IP:   net.IPv4(0, 0, 0, 0),
		Port: 9090,
	})
	if err != nil {
		fmt.Printf("listen failed, err:%v\n", err)
		return
	}

	//step 2 循环读取消息内容
	for {
		var data [1024]byte
		n, addr, err := listen.ReadFromUDP(data[:])
		if err != nil {
			fmt.Printf("read failed from addr: %v, err: %v\n", addr, err)
			break
		}

		go func() {
			//todo sth
			//step 3 回复数据
			fmt.Printf("addr: %v data: %v  count: %v\n", addr, string(data[:n]), n)
			_, err = listen.WriteToUDP([]byte("received success!"), addr)
			if err != nil {
				fmt.Printf("write failed, err: %v\n", err)
			}
		}()
	}
}
```

:::

### Client

::: details 点击查看代码

```go
package main

import (
	"fmt"
	"net"
)

func main() {
	//step 1 连接服务器
	conn, err := net.DialUDP("udp", nil, &net.UDPAddr{
		IP:   net.IPv4(127, 0, 0, 1),
		Port: 9090,
	})

	if err != nil {
		fmt.Printf("connect failed, err: %v\n", err)
		return
	}

	for i := 0; i < 100; i++ {
		//step 2 发送数据
		_, err = conn.Write([]byte("hello server!"))
		if err != nil {
			fmt.Printf("send data failed, err : %v\n", err)
			return
		}

		//step 3 接收数据
		result := make([]byte, 1024)
		n, remoteAddr, err := conn.ReadFromUDP(result)
		if err != nil {
			fmt.Printf("receive data failed, err: %v\n", err)
			return
		}
		fmt.Printf("receive from addr: %v  data: %v\n", remoteAddr, string(result[:n]))
	}
}
```

:::

## HTTP 通信

### Server

::: details 点击查看代码

```go
package main

import (
	"log"
	"net/http"
	"time"
)

var (
	Addr = ":1210"
)

func main() {
	// 创建路由器
	mux := http.NewServeMux()
	// 设置路由规则
	mux.HandleFunc("/bye", sayBye)
	// 创建服务器
	server := &http.Server{
		Addr:         Addr,
		WriteTimeout: time.Second * 3,
		Handler:      mux,
	}
	// 监听端口并提供服务
	log.Println("Starting httpserver at "+Addr)
	log.Fatal(server.ListenAndServe())
}

func sayBye(w http.ResponseWriter, r *http.Request) {
	time.Sleep(1 * time.Second)
	w.Write([]byte("bye bye ,this is httpServer"))
}
```

:::

### Client

::: details 点击查看代码

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"time"
)

func main() {
	// 创建连接池
	transport := &http.Transport{
		DialContext: (&net.Dialer{
			Timeout:   30 * time.Second, //连接超时
			KeepAlive: 30 * time.Second, //探活时间
		}).DialContext,
		MaxIdleConns:          100,              //最大空闲连接
		IdleConnTimeout:       90 * time.Second, //空闲超时时间
		TLSHandshakeTimeout:   10 * time.Second, //tls握手超时时间
		ExpectContinueTimeout: 1 * time.Second,  //100-continue状态码超时时间
	}
	// 创建客户端
	client := &http.Client{
		Timeout:   time.Second * 30, //请求超时时间
		Transport: transport,
	}
	// 请求数据
	resp, err := client.Get("http://127.0.0.1:1210/bye")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	// 读取内容
	bds, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(bds))
}
```

:::

