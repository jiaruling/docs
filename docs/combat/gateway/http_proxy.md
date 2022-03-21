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

### 四种负载均衡策略

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

## https代理

## websocket代理

## tcp代理

## grpc代理