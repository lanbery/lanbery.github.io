---
layout:     post
title:      Golang Pkg Collection
subtitle:   Keep learning
date:       2019-10-15
author:     lanbery
header-img: img/golang-banner2.jpg
header-color: #33b
header-mask: 0.35
catalog: true
tags:
    - Golang
---

> Usage pkg in Go world

---

## net/http

> Go 语言里面提供了一个完善的 net/http 包，通过 http 包可以很方便的就搭建起来一个可以运行的 Web 服务。同时使用这个包能很简单地对 Web 的路由，静态文件，模版，cookie 等数据进行设置和操作。

#### http包建立Web服务
```go
package main

import (
    "fmt"
    "net/http"
    "strings"
    "log"
)

func sayhelloName(w http.ResponseWriter, r *http.Request) {

    r.ParseForm()   // 解析参数,默认不会解析的

    fmt.Println(r.Form) // 这些信息是输出到服务器端的

    fmt.Println("path",r.URL.path)
    fmt.Println("scheme",r.URL.Scheme)
    fmt.Println(r.Form["url_long"])

    for k,v := range r.Form {
        fmt.Println("key:",k)
        fmt.Println("Value:",strings.Join(v,""))
    }

    fmt.Fprintf(w,"Hello lanbery") // 写到w 输出到客户端的流
}

func main() {
    http.HandleFunc("/",sayhelloName)   // 设置路由

    err := http.ListenAndServe(":9099",nil) // 设置监听端口

    if err != nil {
        log.Fatal("Listen on 9099 serve :",err)
    }
}
```

> web 工作方式的几个概念

    - Request：用户请求的信息，用来解析用户的请求信息，包括 post、get、cookie、url 等信息
    - Response：服务器需要反馈给客户端的信息
    - Conn：用户的每次请求链接
    - Handler：处理请求和生成返回信息的处理逻辑

<img src="/img/go/go-web-server.png" />

>  Go 的 http 包的源码，通过下面的代码我们可以看到整个的 http 处理过程

```go

func (srv *Server) Serve(l net.Listener) error {
    defer l.Close()
    var tempDelay time.Duration // how long to sleep on accept failure
    for {
        rw, e := l.Accept()
        if e != nil {
            if ne, ok := e.(net.Error); ok && ne.Temporary() {
                if tempDelay == 0 {
                    tempDelay = 5 * time.Millisecond
                } else {
                    tempDelay *= 2
                }
                if max := 1 * time.Second; tempDelay > max {
                    tempDelay = max
                }
                log.Printf("http: Accept error: %v; retrying in %v", e, tempDelay)
                time.Sleep(tempDelay)
                continue
            }
            return e
        }
        tempDelay = 0
        c, err := srv.newConn(rw)
        if err != nil {
            continue
        }
        go c.serve()
    }
}
```

<img src="/img/go/go-web-req-resp.png" />

#### http包核心之一 Conn

> Go 为了实现高并发和高性能，使用了 goroutines 来处理 Conn 的读写事件，这样每个请求都能保持独立，相互不会阻塞，可以高效的响应网络事件。这是 Go 高效的保证

```go
    c,err := srv.newConn(rw)

    if err != nil {
        continue
    }

    // 客户端的每次请求都会创建一个 Conn，这个 Conn 里面保存了该次请求的信息，
    // 然后再传递到对应的 handler，该 handler 中便可以读取到相应的 header 信息，
    // 这样保证了每个请求的独立性

    go c.serve()
```

#### http 包核心之二ServeMux 

> ServeMux 的自定义

其实内部是调用了 http 包默认的路由器，通过路由器把本次请求的信息传递到了后端的处理函数

```go
type ServeMux struct {
    mu sync.RWMutex   // 锁，由于请求涉及到并发处理，因此这里需要一个锁机制
    m  map[string]muxEntry  // 路由规则，一个 string 对应一个 mux 实体，这里的 string 就是注册的路由表达式
    hosts bool // 是否在任意的规则中带有 host 信息
}

//muxEntry

type muxEntry struct {
    explicit bool   // 是否精确匹配
    h        Handler // 这个路由表达式对应哪个 handler
    pattern  string  // 匹配字符串
}

// Handler 的定义

type Handler interface {
    ServeHTTP(ResponseWriter, *Request)  // 路由实现器
}
```

自己实现一个简单的路由器

```go

package main

import (
    "fmt"
    "net/http"
)

type MyMux struct {
}

func(p *MyMux) ServeHTTP(w http.ResponseWriter,r *http.Request) {
    if r.URL.Path == "/" {
        sayhelloName(w,r)
        return
    }

    http.NotFound(w,r)
    return
}

func sayhelloName(w http.ResponseWriter,r *http.Request) {
    fmt.Fprintf(w,"hello use myRoute")
}

func main(){
    mux := &MyMux{}

    http.ListenAndServe(":9527",mux)
}

```

---

## Go Gin

> Gin 是使用 Go/golang 语言实现的 HTTP Web 框架

> Gin 有以下特性

    - 快速：路由不使用反射，基于Radix树，内存占用少
    - 中间件：HTTP请求，可先经过一系列中间件处理，例如：Logger，Authorization，GZIP等。这个特性和 NodeJs 的 Koa 框架很像。中间件机制也极大地提高了框架的可扩展性
    - 异常处理：服务始终可用，不会宕机。Gin 可以捕获 panic，并恢复。而且有极为便利的机制处理HTTP请求过程中发生的错误.
    - Gin可以解析并验证请求的JSON。这个特性对Restful API的开发尤其有用
    - 路由分组：例如将需要授权和不需要授权的API分组，不同版本的API分组。而且分组可嵌套，且性能不受影响。
    - 渲染内置：原生支持JSON，XML和HTML的渲染。


#### Example

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    // 首先，我们使用了gin.Default()生成了一个实例，这个实例即 WSGI 应用程序
    r := gin.Default()

    // 接下来，我们使用r.Get("/", ...)声明了一个路由，告诉 Gin 什么样的URL 能触发传入的函数，这个函数返回我们想要显示在用户浏览器中的信息
    r.GET('/',func(c *gin.Context){
        c.String(200,"hello ,world.")
    })

    // 最后用 r.Run()函数来让应用运行在本地服务器上，默认监听端口是 _8080_，可以传入参数设置端口，
    // 例如r.Run(":9999")即运行在 _9999_端口
    r.Run(":9527") // listen and serve on 0.0.0.0:9527
} 

```

运行: go run main.go


---
# go-zero 

> go-zero 是一个集成了各种工程实践的web和rpc框架,通过弹性设计保障了大并发服务端的稳定性，经受了充分的实战检验。

    - 轻松获得支撑千万日活服务的稳定性
    - 内建级联超时控制、限流、自适应熔断、自适应降载等微服务治理能力，无需配置和额外代码
    - 微服务治理中间件可无缝集成到其它现有框架使用
    - 极简的API描述，一键生成各端代码
    - 自动校验客户端请求参数合法性
    - 大量微服务治理和并发工具包

<img src="/img/go/go-zero-framwork.png" />

[Source Code](https://github.com/zeromicro/go-zero)