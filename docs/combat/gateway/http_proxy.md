---
title: 网络代理
---

## 什么是网络代理

- 用户通过代理请求信息
- 请求通过网络代理完成转发到达目标服务器
- 目标服务器响应后再通过网络代理回传给用户

### 网络代理与网络转发的区别

- **网络代理:** 用户不直接连接服务器，网络代理去连接，获取数据后返回给用户。

![](/images/daili.png)

- **网络转发**: 是路由器对报文的转发操作，中间可能对数据包修改。

![](/images/zhuanfa.png)

### 网络代理类型

- **正向代理：**是一种**客户端的代理**技术，帮助客户端访问无法访问的服务资源，可以隐藏用户真实IP。比如：浏览器web代理，VPN等。
    - 代理接收客户端请求，复制原请求对象，并根据数据配置新请求的各种参数
    - 把新请求发送到真实服务端，并接收服务器端返回
    - 代理服务器对相应做一些处理，然后返回给客户端

::: details 点击查看代码

```go
// 目前在Windows11 上没有测试成功
// 需要关闭防火墙
// 只能访问http的服务，不能访问https的服务

package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"strings"
)

type Pxy struct{}

func (p *Pxy) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	fmt.Printf("Received request %s %s %s\n", req.Method, req.Host, req.RemoteAddr)
	transport := http.DefaultTransport
	// step 1，浅拷贝对象，然后就再新增属性数据
	outReq := new(http.Request)
	*outReq = *req
	if clientIP, _, err := net.SplitHostPort(req.RemoteAddr); err == nil {
		if prior, ok := outReq.Header["X-Forwarded-For"]; ok {
			clientIP = strings.Join(prior, ", ") + ", " + clientIP
		}
		outReq.Header.Set("X-Forwarded-For", clientIP)
	}
	
	// step 2, 请求下游
	res, err := transport.RoundTrip(outReq)
	if err != nil {
		rw.WriteHeader(http.StatusBadGateway)
		return
	}

	// step 3, 把下游请求内容返回给上游
	for key, value := range res.Header {
		for _, v := range value {
			rw.Header().Add(key, v)
		}
	}
	rw.WriteHeader(res.StatusCode)
	io.Copy(rw, res.Body)
	res.Body.Close()
}

func main() {
	fmt.Println("Serve on :8080")
	http.Handle("/", &Pxy{})
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

:::

- **反向代理：**是一种**服务端的代理**技术，帮助服务器做负载均衡、缓存、提供安全校验等，可以隐藏服务器真实IP。比如：LVS技术、nginx、proxy_pass等
    - 代理接收客户端请求，更改请求结构体信息
    - 通过一定的负载均衡算法获取下游服务地址
    - 把请求发送到下游服务器，并获取返回内容
    - 对返回内容做一些处理，然后返回给客户端

![](/images/proxy_server.png)

::: details 点击查看代码

```go
// 下游服务

package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	rs1 := &RealServer{Addr: "127.0.0.1:2003"}
	rs1.Run()
	rs2 := &RealServer{Addr: "127.0.0.1:2004"}
	rs2.Run()

	//监听关闭信号
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}

type RealServer struct {
	Addr string
}

func (r *RealServer) Run() {
	log.Println("Starting httpserver at " + r.Addr)
	mux := http.NewServeMux()
	mux.HandleFunc("/", r.HelloHandler)
	mux.HandleFunc("/base/error", r.ErrorHandler)
	server := &http.Server{
		Addr:         r.Addr,
		WriteTimeout: time.Second * 3,
		Handler:      mux,
	}
	go func() {
		log.Fatal(server.ListenAndServe())
	}()
}

func (r *RealServer) HelloHandler(w http.ResponseWriter, req *http.Request) {
	//127.0.0.1:8008/abc?sdsdsa=11
	//r.Addr=127.0.0.1:8008
	//req.URL.Path=/abc
	upath := fmt.Sprintf("http://%s%s\n", r.Addr, req.URL.Path)
    w.WriteHeader(200)
	io.WriteString(w, upath)
}

func (r *RealServer) ErrorHandler(w http.ResponseWriter, req *http.Request) {
	upath := "error handler"
	w.WriteHeader(500)
	io.WriteString(w, upath)
}
```

```go
// 反向代理服务

package main

import (
	"bufio"
	"log"
	"net/http"
	"net/url"
)

var (
	proxy_addr = "http://127.0.0.1:2003"
	port       = "2002"
)

func handler(w http.ResponseWriter, r *http.Request) {
	//step 1 解析代理地址，并更改请求体的协议和主机
	proxy, err := url.Parse(proxy_addr)
	r.URL.Scheme = proxy.Scheme // http
	r.URL.Host = proxy.Host // 127.0.0.1:2003

	//step 2 请求下游
	transport := http.DefaultTransport
	resp, err := transport.RoundTrip(r)
	if err != nil {
		log.Print(err)
		return
	}

	//step 3 把下游请求内容返回给上游
	for k, vv := range resp.Header { // 请求头
		for _, v := range vv {
			w.Header().Add(k, v)
		}
	}
	defer resp.Body.Close()
	bufio.NewReader(resp.Body).WriteTo(w) // 请求体
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("Start serving on port " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
```

:::

## http代理

### 需要实现的基本功能

- 错误回调及错误日志处理
- 更改下游服务返回内容
- 负载均衡
- url重写
- 限流、熔断、降级
- 数据统计
- 权限验证

### ReverseProxy -- 标准库

#### 功能点

- 更改内容支持
- 错误信息回调
- 支持自定义负载均衡
- url重写功能
- 连接池功能
- 支持websocket服务
- 支持https代理

#### ReverseProxy 代理的下游服务

::: details 点击查看代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	rs1 := &RealServer{Addr: "127.0.0.1:2003"}
	rs1.Run()
	rs2 := &RealServer{Addr: "127.0.0.1:2004"}
	rs2.Run()

	//监听关闭信号
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}

type RealServer struct {
	Addr string
}

func (r *RealServer) Run() {
	log.Println("Starting httpserver at " + r.Addr)
	mux := http.NewServeMux()
	mux.HandleFunc("/", r.HelloHandler)
	mux.HandleFunc("/base/error", r.ErrorHandler)
	server := &http.Server{
		Addr:         r.Addr,
		WriteTimeout: time.Second * 3,
		Handler:      mux,
	}
	go func() {
		log.Fatal(server.ListenAndServe())
	}()
}

func (r *RealServer) HelloHandler(w http.ResponseWriter, req *http.Request) {
	//127.0.0.1:8008/abc?sdsdsa=11
	//r.Addr=127.0.0.1:8008
	//req.URL.Path=/abc
	upath := fmt.Sprintf("http://%s%s\n", r.Addr, req.URL.Path)
    w.WriteHeader(200)
	io.WriteString(w, upath)
}

func (r *RealServer) ErrorHandler(w http.ResponseWriter, req *http.Request) {
	upath := "error handler"
	w.WriteHeader(500)
	io.WriteString(w, upath)
}
```

:::

#### ReverseProxy 简单使用

::: details 点击查看代码

```go
package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

var addr = "127.0.0.1:2002"

func main() {
	//127.0.0.1:2002/xxx --> 127.0.0.1:2003/base/xxx
	rs1 := "http://127.0.0.1:2003/base"
	url1, err1 := url.Parse(rs1)
	if err1 != nil {
		log.Println(err1)
	}
	proxy := httputil.NewSingleHostReverseProxy(url1)
	log.Println("Starting httpserver at " + addr)
	log.Fatal(http.ListenAndServe(addr, proxy))
}
```

:::

#### ReverseProxy 修改返回内容

:::details 点击查看代码

```go
package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"regexp"
	"strings"
)

var addr = "127.0.0.1:2002"

func main() {
	//127.0.0.1:2002/xxx
	//127.0.0.1:2003/base/xxx
	rs1 := "http://127.0.0.1:2003/base"
	url1, err1 := url.Parse(rs1)
	if err1 != nil {
		log.Println(err1)
	}
	proxy := NewSingleHostReverseProxy(url1)
	log.Println("Starting httpserver at " + addr)
	log.Fatal(http.ListenAndServe(addr, proxy))
}

func NewSingleHostReverseProxy(target *url.URL) *httputil.ReverseProxy {
	//http://127.0.0.1:2002/dir?name=123
	//RayQuery: name=123
	//Scheme: http
	//Host: 127.0.0.1:2002
	targetQuery := target.RawQuery
	director := func(req *http.Request) {
		//url_rewrite
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2003/base/abc ??
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2002/abc
		//127.0.0.1:2002/abc ==> 127.0.0.1:2003/base/abc
		re, _ := regexp.Compile("^/dir(.*)");
		req.URL.Path = re.ReplaceAllString(req.URL.Path, "$1")

		req.URL.Scheme = target.Scheme
		req.URL.Host = target.Host

		//target.Path : /base
		//req.URL.Path : /dir
		req.URL.Path = singleJoiningSlash(target.Path, req.URL.Path)
		if targetQuery == "" || req.URL.RawQuery == "" {
			req.URL.RawQuery = targetQuery + req.URL.RawQuery
		} else {
			req.URL.RawQuery = targetQuery + "&" + req.URL.RawQuery
		}
		if _, ok := req.Header["User-Agent"]; !ok {
			req.Header.Set("User-Agent", "")
		}
	}
	modifyFunc := func(res *http.Response) error {
		if res.StatusCode != 200 {
			//return errors.New("error statusCode")
            // 获取下游服务的响应内容
			oldPayload, err := ioutil.ReadAll(res.Body)
			if err != nil {
				return err
			}
            // 修改下游服务的响应内容
			newPayLoad := []byte("hello " + string(oldPayload))
            // 回写响应体内容
			res.Body = ioutil.NopCloser(bytes.NewBuffer(newPayLoad))
            // 重置响应体长度
			res.ContentLength = int64(len(newPayLoad))
			res.Header.Set("Content-Length", fmt.Sprint(len(newPayLoad)))
		}
		return nil
	}
	errorHandler := func(res http.ResponseWriter, req *http.Request, err error) {
		res.Write([]byte(err.Error()))
	}
	return &httputil.ReverseProxy{Director: director, ModifyResponse: modifyFunc, ErrorHandler: errorHandler}
}

func singleJoiningSlash(a, b string) string {
	aslash := strings.HasSuffix(a, "/")
	bslash := strings.HasPrefix(b, "/")
	switch {
	case aslash && bslash:
		return a + b[1:]
	case !aslash && !bslash:
		return a + "/" + b
	}
	return a + b
}

```

:::

#### ReverseProxy 特殊请求头 -- Connection

-  标记**请求发送方**与**第一代理**的状态
- 决定当前事务完成后，是否会关闭网络
    - Connection：keep-alive //不关闭网络
    - Connection：close         //关闭网络
    - Connection：Upgrade  //协议升级

![](/images/mproxy.png)

#### ReverseProxy 特殊请求响应头 -- TE、Trailer

- TE
    - 请求头
    - 表示希望使用的传输编码类型
    - 如：TE: trailers, deflate;q=0.5，表示期望在采用分块传输编码响应中接收挂载字段, zlib编码, 0.5优先级排序
- Trailer
    - 响应头
    - 允许发送方在消息后面添加额外的元信息
    - 如：Trailer: Expires, 表示Expires 将出现在分块信息的结尾

#### 第一代理去除标准的逐段传输头

- 逐段传输头都需要在  Connection 头中列出
- 第一代理知道必须处理它们（如协议升级），并且不转发它。
- 逐段传输头
    - Keep-Alive
    - Transfer-Encoding
    - TE
    - Connection
    - Trailer
    - Upgrade
    - Proxy-Authorization
    - Proxy-Authenticate

#### 特殊StatusCode

- **100:** 表示目前一切正常，客户端可以继续请求
    - 客户端要POST的数据大于1024字节的时候
    - 客户端不会直接就发起POST请求，而是分为两步
        - 发送一个请求，包含一个Expect: 100-continue,询问Server是否愿意接收数据
        - 接收到Server返回的100-continue应答以后，返回100状态，才把数据POST给Server
- **101:** 服务端发送给客户端升级协议的请求

![](/images/statusCode101.png)

#### 请求头 X-Forward-For 和 X-Real-Ip

- X-Forwarded-For
    - 记录最后直连实际服务器之前的整个代理过程
    - 可能会被伪造

![](/images/x-forward-for.png)

- X-Real-IP
    - 请求实际服务器的IP
    - 每过一层代理都会被覆盖掉，只需第一代理设置转发
    - 不会被位置

![](/images/x-real-ip.png)

##### 代码实现

:::details 点击查看代码

- 真实服务

```go
// real_server/main.go

package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	rs1 := &RealServer{Addr: "127.0.0.1:2003"}
	rs1.Run()
	rs2 := &RealServer{Addr: "127.0.0.1:2004"}
	rs2.Run()

	//监听关闭信号
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
}

type RealServer struct {
	Addr string
}

func (r *RealServer) Run() {
	log.Println("Starting httpserver at " + r.Addr)
	mux := http.NewServeMux()
	mux.HandleFunc("/", r.HelloHandler)
	mux.HandleFunc("/base/error", r.ErrorHandler)
	mux.HandleFunc("/test_http_string/test_http_string/aaa", r.TimeoutHandler)
	server := &http.Server{
		Addr:         r.Addr,
		WriteTimeout: time.Second * 3,
		Handler:      mux,
	}
	go func() {
		log.Fatal(server.ListenAndServe())
	}()
}

func (r *RealServer) HelloHandler(w http.ResponseWriter, req *http.Request) {
	//127.0.0.1:8008/abc?sdsdsa=11
	//r.Addr=127.0.0.1:8008
	//req.URL.Path=/abc
	//fmt.Println(req.Host)
	upath := fmt.Sprintf("http://%s%s\n", r.Addr, req.URL.Path)
	realIP := fmt.Sprintf("RemoteAddr=%s,X-Forwarded-For=%v,X-Real-Ip=%v\n", req.RemoteAddr, req.Header.Get("X-Forwarded-For"), req.Header.Get("X-Real-Ip"))
	header:=fmt.Sprintf("headers =%v\n",req.Header)
	io.WriteString(w, upath)
	io.WriteString(w, realIP)
	io.WriteString(w, header)

}

func (r *RealServer) ErrorHandler(w http.ResponseWriter, req *http.Request) {
	upath := "error handler"
	w.WriteHeader(500)
	io.WriteString(w, upath)

}

func (r *RealServer) TimeoutHandler(w http.ResponseWriter, req *http.Request) {
	time.Sleep(6*time.Second)
	upath := "timeout handler"
	w.WriteHeader(200)
	io.WriteString(w, upath)
}
```

- 第二层代理

```go
// reverse_proxy/main.go

package main

import (
	"bytes"
	"compress/gzip"
	"io/ioutil"
	"log"
	"math/rand"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var addr = "127.0.0.1:2002"

func main() {
	//rs1 := "http://www.baidu.com"
	rs1 := "http://127.0.0.1:2003"
	url1, err1 := url.Parse(rs1)
	if err1 != nil {
		log.Println(err1)
	}

	//rs2 := "http://www.baidu.com"
	rs2 := "http://127.0.0.1:2004"
	url2, err2 := url.Parse(rs2)
	if err2 != nil {
		log.Println(err2)
	}
	urls := []*url.URL{url1, url2}
	proxy := NewMultipleHostsReverseProxy(urls)
	log.Println("Starting httpserver at " + addr)
	log.Fatal(http.ListenAndServe(addr, proxy))
}

var transport = &http.Transport{
	DialContext: (&net.Dialer{
		Timeout:   30 * time.Second, //连接超时
		KeepAlive: 30 * time.Second, //长连接超时时间
	}).DialContext,
	MaxIdleConns:          100,              //最大空闲连接
	IdleConnTimeout:       90 * time.Second, //空闲超时时间
	TLSHandshakeTimeout:   10 * time.Second, //tls握手超时时间
	ExpectContinueTimeout: 1 * time.Second,  //100-continue 超时时间
}

func NewMultipleHostsReverseProxy(targets []*url.URL) *httputil.ReverseProxy {
	//请求协调者
	director := func(req *http.Request) {
		//url_rewrite
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2003/base/abc ??
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2002/abc
		//127.0.0.1:2002/abc ==> 127.0.0.1:2003/base/abc
		re, _ := regexp.Compile("^/dir(.*)");
		req.URL.Path = re.ReplaceAllString(req.URL.Path, "$1")

		//随机负载均衡
		targetIndex := rand.Intn(len(targets))
		target := targets[targetIndex]
		targetQuery := target.RawQuery
		req.URL.Scheme = target.Scheme
		req.URL.Host = target.Host

		//todo 部分章节补充1
		//todo 当对域名(非内网)反向代理时需要设置此项。当作后端反向代理时不需要
		req.Host = target.Host

		// url地址重写：重写前：/aa 重写后：/base/aa
		req.URL.Path = singleJoiningSlash(target.Path, req.URL.Path)
		if targetQuery == "" || req.URL.RawQuery == "" {
			req.URL.RawQuery = targetQuery + req.URL.RawQuery
		} else {
			req.URL.RawQuery = targetQuery + "&" + req.URL.RawQuery
		}
		if _, ok := req.Header["User-Agent"]; !ok {
			req.Header.Set("User-Agent", "user-agent")
		}
		//只在第一代理中设置此header头
		//req.Header.Set("X-Real-Ip", req.RemoteAddr)
	}
	//更改内容
	modifyFunc := func(resp *http.Response) error {
		//请求以下命令：curl 'http://127.0.0.1:2002/error'
		//todo 部分章节功能补充2
		//todo 兼容websocket
		if strings.Contains(resp.Header.Get("Connection"), "Upgrade") {
			return nil
		}
		var payload []byte
		var readErr error

		//todo 部分章节功能补充3
		//todo 兼容gzip压缩
		if strings.Contains(resp.Header.Get("Content-Encoding"), "gzip") {
			gr, err := gzip.NewReader(resp.Body)
			if err != nil {
				return err
			}
			payload, readErr = ioutil.ReadAll(gr)
			resp.Header.Del("Content-Encoding")
		} else {
			payload, readErr = ioutil.ReadAll(resp.Body)
		}
		if readErr != nil {
			return readErr
		}

		//异常请求时设置StatusCode
		if resp.StatusCode != 200 {
			payload = []byte("StatusCode error:" + string(payload))
		}

		//todo 部分章节功能补充4
		//todo 因为预读了数据所以内容重新回写
		resp.Body = ioutil.NopCloser(bytes.NewBuffer(payload))
		resp.ContentLength = int64(len(payload))
		resp.Header.Set("Content-Length", strconv.FormatInt(int64(len(payload)), 10))
		return nil
	}
	//错误回调 ：关闭real_server时测试，错误回调
	errFunc := func(w http.ResponseWriter, r *http.Request, err error) {
		http.Error(w, "ErrorHandler error:"+err.Error(), 500)
	}
	return &httputil.ReverseProxy{
		Director:       director,
		Transport:      transport,
		ModifyResponse: modifyFunc,
		ErrorHandler:   errFunc}
}

func singleJoiningSlash(a, b string) string {
	aslash := strings.HasSuffix(a, "/")
	bslash := strings.HasPrefix(b, "/")
	switch {
	case aslash && bslash:
		return a + b[1:]
	case !aslash && !bslash:
		return a + "/" + b
	}
	return a + b
}
```

- 第一层代理

```go{73}
// reverse_proxy_level1/main.go

package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"math/rand"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var addr = "127.0.0.1:2001"

func main() {
	rs1 := "http://127.0.0.1:2002"
	url1, err1 := url.Parse(rs1)
	if err1 != nil {
		log.Println(err1)
	}
	urls := []*url.URL{url1}
	proxy := NewMultipleHostsReverseProxy(urls)
	log.Println("Starting httpserver at " + addr)
	log.Fatal(http.ListenAndServe(addr, proxy))
}

var transport = &http.Transport{
	DialContext: (&net.Dialer{
		Timeout:   30 * time.Second, //连接超时
		KeepAlive: 30 * time.Second, //长连接超时时间
	}).DialContext,
	MaxIdleConns:          100,              //最大空闲连接
	IdleConnTimeout:       90 * time.Second, //空闲超时时间
	TLSHandshakeTimeout:   10 * time.Second, //tls握手超时时间
	ExpectContinueTimeout: 1 * time.Second,  //100-continue 超时时间
}

func NewMultipleHostsReverseProxy(targets []*url.URL) *httputil.ReverseProxy {
	//请求协调者
	director := func(req *http.Request) {
		//url_rewrite
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2003/base/abc ??
		//127.0.0.1:2002/dir/abc ==> 127.0.0.1:2002/abc
		//127.0.0.1:2002/abc ==> 127.0.0.1:2003/base/abc
		re, _ := regexp.Compile("^/dir(.*)");
		req.URL.Path = re.ReplaceAllString(req.URL.Path, "$1")

		//随机负载均衡
		targetIndex := rand.Intn(len(targets))
		target := targets[targetIndex]
		targetQuery := target.RawQuery
		req.URL.Scheme = target.Scheme
		req.URL.Host = target.Host

		// url地址重写：重写前：/aa 重写后：/base/aa
		req.URL.Path = singleJoiningSlash(target.Path, req.URL.Path)
		if targetQuery == "" || req.URL.RawQuery == "" {
			req.URL.RawQuery = targetQuery + req.URL.RawQuery
		} else {
			req.URL.RawQuery = targetQuery + "&" + req.URL.RawQuery
		}
		if _, ok := req.Header["User-Agent"]; !ok {
			req.Header.Set("User-Agent", "user-agent")
		}
		//只在第一代理中设置此header头
		req.Header.Set("X-Real-Ip", req.RemoteAddr)
	}
	//更改内容
	modifyFunc := func(resp *http.Response) error {
		//请求以下命令：curl 'http://127.0.0.1:2002/error'
		if resp.StatusCode != 200 {
			//获取内容
			oldPayload, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				return err
			}
			//追加内容
			newPayload := []byte("StatusCode error:" + string(oldPayload))
			resp.Body = ioutil.NopCloser(bytes.NewBuffer(newPayload))
			resp.ContentLength = int64(len(newPayload))
			resp.Header.Set("Content-Length", strconv.FormatInt(int64(len(newPayload)), 10))
		}
		return nil
	}
	//错误回调 ：关闭real_server时测试，错误回调
	errFunc := func(w http.ResponseWriter, r *http.Request, err error) {
		http.Error(w, "ErrorHandler error:"+err.Error(), 500)
	}
	return &httputil.ReverseProxy{
		Director:       director,
		Transport:      transport,
		ModifyResponse: modifyFunc,
		ErrorHandler:   errFunc}
}

func singleJoiningSlash(a, b string) string {
	aslash := strings.HasSuffix(a, "/")
	bslash := strings.HasPrefix(b, "/")
	switch {
	case aslash && bslash:
		return a + b[1:]
	case !aslash && !bslash:
		return a + "/" + b
	}
	return a + b
}
```

- 运行结果

```shell{3,7}
$ curl 'http://127.0.0.1:2001/base'
http://127.0.0.1:2004/base
RemoteAddr=127.0.0.1:55561,X-Forwarded-For=127.0.0.1, 127.0.0.1,X-Real-Ip=127.0.0.1:55557
headers =map[Accept:[text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9] Accept-Encoding:[gzip, deflate, br] Accept-Language:[zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6] Sec-Ch-Ua:[" Not A;Brand";v="99", "Chromium";v="99", "Microsoft Edge";v="99"] Sec-Ch-Ua-Mobile:[?0] Sec-Ch-Ua-Platform:["Windows"] Sec-Fetch-Dest:[document] Sec-Fetch-Mode:[navigate] Sec-Fetch-Site:[none] Sec-Fetch-User:[?1] Upgrade-Insecure-Requests:[1] User-Agent:[Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.46] X-Forwarded-For:[127.0.0.1, 127.0.0.1] X-Real-Ip:[127.0.0.1:55557]]
$ curl -H 'X-Forwarded-For: 2.2.2.2' 'http://127.0.0.1:2001/base'
http://127.0.0.1:2004/base
RemoteAddr=127.0.0.1:55886,X-Forwarded-For=2.2.2.2, 127.0.0.1, 127.0.0.1,X-Real-Ip=127.0.0.1:55596
headers =map[Accept:[*/*] Accept-Encoding:[gzip, deflate, br] Content-Length:[72] Content-Type:[application/json] Postman-Token:[3043f404-069c-4c62-97a8-c18da86e2a84] User-Agent:[PostmanRuntime/7.28.4] X-Forwarded-For:[2.2.2.2, 127.0.0.1, 127.0.0.1] X-Real-Ip:[127.0.0.1:55596]]
```

:::

### 四种负载均衡策略

- **随机负载:** 随机挑选目标服务器IP
- **轮询负载:** ABC三台服务器，ABCABC依次轮询
- **加权负载:** 给目标设置访问权重，按照权重轮询
- **一致性hash负载:** 请求固定URL访问指定IP

 #### 随机策略

:::details 点击查看代码

```go
package load_balance

import (
	"errors"
	"math/rand"
    "fmt"
	"testing"
    "time"
)

type RandomBalance struct {
	curIndex int
	rss      []string
}

func (r *RandomBalance) Add(params ...string) error {
	if len(params) == 0 {
		return errors.New("param len 1 at least")
	}
	addr := params[0]
	r.rss = append(r.rss, addr)
	return nil
}

func (r *RandomBalance) Next() string {
	if len(r.rss) == 0 {
		return ""
	}
    rand.Seed(time.Now().UnixNano())
	r.curIndex = rand.Intn(len(r.rss))
	return r.rss[r.curIndex]
}

func TestRandomBalance(t *testing.T) {
	rb := &RandomBalance{}
	rb.Add("127.0.0.1:2003") //0
	rb.Add("127.0.0.1:2004") //1
	rb.Add("127.0.0.1:2005") //2
	rb.Add("127.0.0.1:2006") //3
	rb.Add("127.0.0.1:2007") //4

	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
}

```

- 运行结果

```shell
$ go test -test.run TestRandomBalance
127.0.0.1:2003
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2005
127.0.0.1:2005
127.0.0.1:2005
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2004
PASS
ok      github.com/e421083458/gateway_demo/proxy/load_balance   0.035s
```

:::

#### 轮询策略

:::details 点击查看代码

```go
package load_balance

import (
	"errors"
    "fmt"
	"testing"
)

type RoundRobinBalance struct {
	curIndex int
	rss      []string
}

func (r *RoundRobinBalance) Add(params ...string) error {
	if len(params) == 0 {
		return errors.New("param len 1 at least")
	}
	addr := params[0]
	r.rss = append(r.rss, addr)
	return nil
}

func (r *RoundRobinBalance) Next() string {
	if len(r.rss) == 0 {
		return ""
	}
	lens := len(r.rss) //5
	if r.curIndex >= lens {
		r.curIndex = 0
	}
	curAddr := r.rss[r.curIndex]
	r.curIndex = (r.curIndex + 1) % lens
	return curAddr
}

func Test_main(t *testing.T) {
	rb := &RoundRobinBalance{}
	rb.Add("127.0.0.1:2003") //0
	rb.Add("127.0.0.1:2004") //1
	rb.Add("127.0.0.1:2005") //2
	rb.Add("127.0.0.1:2006") //3
	rb.Add("127.0.0.1:2007") //4

	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
}
```

- 运行结果

```shell
$ go test -test.run Test_main
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2005
127.0.0.1:2006
127.0.0.1:2007
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2005
127.0.0.1:2006
PASS
ok      github.com/e421083458/gateway_demo/proxy/load_balance   0.039s

```

:::

#### 加权轮询策略

::: tip 实现原理

**ServerA=4 | ServerB=3 | ServerC=2**

:::

| 请求次数 | 请求前currentWeight                | 选中的节点 | 请求后currentWeight                |
| -------- | ---------------------------------- | ---------- | ---------------------------------- |
| 1        | [ServerA=4, ServerB=3, ServerC=2]  | ServerA    | [ServerA=-1, ServerB=6, ServerC=4] |
| 2        | [ServerA=-1, ServerB=6, ServerC=4] | ServerB    | [ServerA=3, ServerB=0, ServerC=6]  |
| 3        | [ServerA=3, ServerB=0, ServerC=6]  | ServerC    | [ServerA=7, ServerB=3, ServerC=-1] |
| 4        | [ServerA=7, ServerB=3, ServerC=-1] | ServerA    | [ServerA=2, ServerB=6, ServerC=1]  |
| 5        | [ServerA=2, ServerB=6, ServerC=1]  | ServerB    | [ServerA=6, ServerB=0, ServerC=3]  |
| 6        | [ServerA=6, ServerB=0, ServerC=3]  | ServerA    | [ServerA=1, ServerB=3, ServerC=5]  |
| 7        | [ServerA=1, ServerB=3, ServerC=5]  | ServerC    | [ServerA=5, ServerB=6, ServerC=-2] |
| 8        | [ServerA=5, ServerB=6, ServerC=-2] | ServerB    | [ServerA=9, ServerB=0, ServerC=0]  |
| 9        | [ServerA=9, ServerB=0, ServerC=0]  | ServerA    | [ServerA=4, ServerB=3, ServerC=2]  |

:::details 点击查看代码

```go
package load_balance

import (
	"errors"
	"strconv"
    "fmt"
	"testing"
)

type WeightRoundRobinBalance struct {
	curIndex int
	rss      []*WeightNode
	rsw      []int
}

type WeightNode struct {
	addr            string
	weight          int //权重值
	currentWeight   int //节点当前权重
	effectiveWeight int //有效权重
}

func (r *WeightRoundRobinBalance) Add(params ...string) error {
	if len(params) != 2 {
		return errors.New("param len need 2")
	}
	parInt, err := strconv.ParseInt(params[1], 10, 64)
	if err != nil {
		return err
	}
	node := &WeightNode{addr: params[0], weight: int(parInt)}
	node.effectiveWeight = node.weight
	r.rss = append(r.rss, node)
	return nil
}

func (r *WeightRoundRobinBalance) Next() string {
	total := 0
	var best *WeightNode
	for i := 0; i < len(r.rss); i++ {
		w := r.rss[i]
		//step 1 统计所有有效权重之和
		total += w.effectiveWeight

		//step 2 变更节点临时权重为的节点临时权重+节点有效权重
		w.currentWeight += w.effectiveWeight

		//step 3 有效权重默认与权重相同，通讯异常时-1, 通讯成功+1，直到恢复到weight大小
		if w.effectiveWeight < w.weight {
			w.effectiveWeight++
		}
		//step 4 选择最大临时权重点节点
		if best == nil || w.currentWeight > best.currentWeight {
			best = w
		}
	}
	if best == nil {
		return ""
	}
	//step 5 变更临时权重为 临时权重-有效权重之和
	best.currentWeight -= total
	return best.addr
}
func TestLB(t *testing.T) {
	rb := &WeightRoundRobinBalance{}
	rb.Add("127.0.0.1:2003", "4") //0
	rb.Add("127.0.0.1:2004", "3") //1
	rb.Add("127.0.0.1:2005", "2") //2

	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
	fmt.Println(rb.Next())
}
```

- 运行结果

```shell
$ go test -test.run TestLB
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2005
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2003
127.0.0.1:2005
127.0.0.1:2004
127.0.0.1:2003
127.0.0.1:2003
127.0.0.1:2004
127.0.0.1:2005
127.0.0.1:2003
127.0.0.1:2004
PASS
ok      github.com/e421083458/gateway_demo/proxy/load_balance   0.039s
```

:::

#### 一致性哈希策略

::: tip 一致性哈希指标

单调性 、 平衡性、分散性、负载、平滑性

[一致性hash环原理](https://zhuanlan.zhihu.com/p/146011745)

:::

:::details 点击查看代码

```go
package load_balance

import (
	"errors"
	"hash/crc32"
	"sort"
	"strconv"
	"sync"
    "fmt"
	"testing"
)

type Hash func(data []byte) uint32

type UInt32Slice []uint32

func (s UInt32Slice) Len() int {
	return len(s)
}

func (s UInt32Slice) Less(i, j int) bool {
	return s[i] < s[j]
}

func (s UInt32Slice) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

type ConsistentHashBanlance struct {
	mux      sync.RWMutex
	hash     Hash
	replicas int               //复制因子
	keys     UInt32Slice       //已排序的节点hash切片
	hashMap  map[uint32]string //节点哈希和Key的map,键是hash值，值是节点key

	//观察主体
	conf LoadBalanceConf
}

func NewConsistentHashBanlance(replicas int, fn Hash) *ConsistentHashBanlance {
	m := &ConsistentHashBanlance{
		replicas: replicas,
		hash:     fn,
		hashMap:  make(map[uint32]string),
	}
	if m.hash == nil {
		//最多32位,保证是一个2^32-1环
		m.hash = crc32.ChecksumIEEE
	}
	return m
}

// 验证是否为空
func (c *ConsistentHashBanlance) IsEmpty() bool {
	return len(c.keys) == 0
}

// Add 方法用来添加缓存节点，参数为节点key，比如使用IP
func (c *ConsistentHashBanlance) Add(params ...string) error {
	if len(params) == 0 {
		return errors.New("param len 1 at least")
	}
	addr := params[0]
	c.mux.Lock()
	defer c.mux.Unlock()
	// 结合复制因子计算所有虚拟节点的hash值，并存入m.keys中，同时在m.hashMap中保存哈希值和key的映射
	for i := 0; i < c.replicas; i++ {
		hash := c.hash([]byte(strconv.Itoa(i) + addr))
		c.keys = append(c.keys, hash)
		c.hashMap[hash] = addr
	}
	// 对所有虚拟节点的哈希值进行排序，方便之后进行二分查找
	sort.Sort(c.keys)
	return nil
}

// Get 方法根据给定的对象获取最靠近它的那个节点
func (c *ConsistentHashBanlance) Get(key string) (string, error) {
	if c.IsEmpty() {
		return "", errors.New("node is empty")
	}
	hash := c.hash([]byte(key))

	// 通过二分查找获取最优节点，第一个"服务器hash"值大于"数据hash"值的就是最优"服务器节点"
	idx := sort.Search(len(c.keys), func(i int) bool { return c.keys[i] >= hash })

	// 如果查找结果 大于 服务器节点哈希数组的最大索引，表示此时该对象哈希值位于最后一个节点之后，那么放入第一个节点中
	if idx == len(c.keys) {
		idx = 0
	}
	c.mux.RLock()
	defer c.mux.RUnlock()
	return c.hashMap[c.keys[idx]], nil
}

func TestNewConsistentHashBanlance(t *testing.T) {
	rb := NewConsistentHashBanlance(10, nil)
	rb.Add("127.0.0.1:2003") //0
	rb.Add("127.0.0.1:2004") //1
	rb.Add("127.0.0.1:2005") //2
	rb.Add("127.0.0.1:2006") //3
	rb.Add("127.0.0.1:2007") //4

	//url hash
	fmt.Println(rb.Get("http://127.0.0.1:2002/base/getinfo"))
	fmt.Println(rb.Get("http://127.0.0.1:2002/base/error"))
	fmt.Println(rb.Get("http://127.0.0.1:2002/base/getinfo"))
	fmt.Println(rb.Get("http://127.0.0.1:2002/base/changepwd"))

	//ip hash
	fmt.Println(rb.Get("127.0.0.1"))
	fmt.Println(rb.Get("192.168.0.1"))
	fmt.Println(rb.Get("127.0.0.1"))
}
```

- 运行结果

```shell
$ go test -test.run TestNewConsistentHashBanlance
127.0.0.1:2004 <nil>
127.0.0.1:2005 <nil>
127.0.0.1:2004 <nil>
127.0.0.1:2005 <nil>
127.0.0.1:2007 <nil>
127.0.0.1:2003 <nil>
127.0.0.1:2007 <nil>
PASS
ok      github.com/e421083458/gateway_demo/proxy/load_balance   0.039s
```

:::

### 中间件

### 限流、熔断、降级

#### 限流器 time/rate

##### 介绍

- 限流器是后台服务中的非常重要的组件，可以用来限制请求速率，保护服务，以免服务过载。
- 限流器的实现方法有很多种，例如滑动窗口法、Token Bucket、Leaky Bucket 等。
- 其实 Golang 标准库中就自带了限流算法的实现，即 `golang.org/x/time/rate`。该限流器是基于 **Token Bucket(令牌桶)** 实现的。
- 简单来说，令牌桶就是想象有一个固定大小的桶，系统会以恒定速率向桶中放 Token，桶满则暂时不放。而用户则从桶中取 Token，如果有剩余 Token 就可以一直取。如果没有剩余 Token，则需要等到系统中被放置了 Token 才行。
- **[API使用说明](https://www.cyhone.com/articles/usage-of-golang-rate/)**

##### 代码实现

:::details 点击查看代码

```go
package main

import (
	"context"
	"golang.org/x/time/rate"
	"log"
	"testing"
	"time"
)

func TestRateLimiter(t *testing.T) {
	l := rate.NewLimiter(1, 5)
	log.Printf("limit: %f, burst: %d", l.Limit(), l.Burst())
	for i := 0; i < 10; i++ {
		//阻塞等待直到，取到一个token
		log.Println("before Wait")
		c, _ := context.WithTimeout(context.Background(), time.Second*2)
		if err := l.Wait(c); err != nil {
			log.Println("limiter wait err:" + err.Error())
		}
		log.Println("after Wait")

		//返回需要等待多久才有新的token,这样就可以等待指定时间执行任务
		r := l.Reserve()
		log.Println("reserve Delay:", r.Delay())

		//判断当前是否可以取到token
		a := l.Allow()
		log.Println("Allow:", a)
		log.Println("-----------------------------------------------------------------------------------------------")
	}
}
```

```shell
$ go test -test.run Test_RateLimiter
2022/03/22 17:47:44 limit: 1.000000, burst: 5
2022/03/22 17:47:44 before Wait
2022/03/22 17:47:44 after Wait
2022/03/22 17:47:44 reserve Delay: 0s
2022/03/22 17:47:44 Allow: true
2022/03/22 17:47:44 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:44 before Wait
2022/03/22 17:47:44 after Wait
2022/03/22 17:47:44 reserve Delay: 0s
2022/03/22 17:47:44 Allow: false
2022/03/22 17:47:44 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:44 before Wait
2022/03/22 17:47:45 after Wait
2022/03/22 17:47:45 reserve Delay: 990.1707ms
2022/03/22 17:47:45 Allow: false
2022/03/22 17:47:45 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:45 before Wait
2022/03/22 17:47:47 after Wait
2022/03/22 17:47:47 reserve Delay: 987.1507ms
2022/03/22 17:47:47 Allow: false
2022/03/22 17:47:47 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:47 before Wait
2022/03/22 17:47:49 after Wait
2022/03/22 17:47:49 reserve Delay: 994.5779ms
2022/03/22 17:47:49 Allow: false
2022/03/22 17:47:49 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:49 before Wait
2022/03/22 17:47:51 after Wait
2022/03/22 17:47:51 reserve Delay: 993.5709ms
2022/03/22 17:47:51 Allow: false
2022/03/22 17:47:51 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:51 before Wait
2022/03/22 17:47:53 after Wait
2022/03/22 17:47:53 reserve Delay: 992.4085ms
2022/03/22 17:47:53 Allow: false
2022/03/22 17:47:53 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:53 before Wait
2022/03/22 17:47:55 after Wait
2022/03/22 17:47:55 reserve Delay: 993.1072ms
2022/03/22 17:47:55 Allow: false
2022/03/22 17:47:55 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:55 before Wait
2022/03/22 17:47:57 after Wait
2022/03/22 17:47:57 reserve Delay: 994.7224ms
2022/03/22 17:47:57 Allow: false
2022/03/22 17:47:57 -----------------------------------------------------------------------------------------------
2022/03/22 17:47:57 before Wait
2022/03/22 17:47:59 after Wait
2022/03/22 17:47:59 reserve Delay: 985.14ms
2022/03/22 17:47:59 Allow: false
2022/03/22 17:47:59 -----------------------------------------------------------------------------------------------
PASS
ok      github.com/e421083458/gateway_demo/demo/proxy/rate_limiter      15.357s
```

- 初始化限流器的时候，桶中有5个token，所以前5次取的时候就直接通过，当桶中的token取完以后，每秒只产生一个token，所以每间隔一秒只有一个能成功取到token

:::

## websocket代理

## tcp代理

## grpc代理