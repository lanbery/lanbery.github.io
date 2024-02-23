---
layout:     post
title:      Javascript world components (二)
subtitle:   Browser Chapter
date:       2019-11-29
author:     lanbery
header-img: img/banner-shuimo.png
header-color: #182b71
header-mask: 0.15
catalog: true
tags:
    - Javascript
    - components  
---

> Javascript world components
> 
> 

# Development Components 

## json 

> json :json is a fast CLI tool for working with JSON. It is a single-file node.js script with no external deps

```bash
$ echo '{"foo":"bar"}' | json
{
  "foo": "bar"
}

$ echo '{"foo":"bar"}' | json foo
bar

$ echo '{"fred":{"age":42}}' | json fred.age    # '.' for property access
42

$ echo '{"age":10}' | json -e 'this.age++'
{
  "age": 11
}
```

## is-fqdn

> is-fqdn 为我们提供了一个函数 isFQDN, 可以用于判断传入的域名是否合法

<a href="https://github.com/parro-it/is-fqdn" target="github_fqdn">Github</a>

```js
  const isFQDN = require('is-fqdn');

  console.log(isFQDN('www.parro.it'));
  // true

  console.log(isFQDN('256.0.0.0'));
  // false

  console.log(isFQDN('s!ome.com'));
  // false
```


https://developers.google.com/speed/public-dns/docs/ecs


## DNS-packet

> https://www.npmjs.com/package/dns-packet

----
# npm modules 

## rimraf

> rimraf :封装了删除文件或文件夹的命令

> 这个包只提供一个方法：rimraf(pathName, function(err){})

```js 
const rimraf = require('rimraf');
rimraf('./test.txt', function (err) { // 删除当前目录下的 test.txt
  console.log(err);
});
```

## ora
> ora terminal status show

> https://github.com/sindresorhus/ora#text

## chalk 

> chalk 包的作用是修改控制台中字符串的样式，包括：字体样式(加粗、隐藏等)、字体颜色、背景颜色

> 常规使用

```js 
const chalk = require('chalk');
console.log(chalk.rgb(255,0,0).bold.bgRgb(255,255,255)('Hello World'));
```

> 模板使用

```js
const chalk = require('chalk');
console.log(chalk`{rgb(255,0,0).bold.bgRgb(255,255,255) Hello World}`);
```

## semver
> semver 語意化版本標準包

<a href="https://semver.org/lang/zh-TW/" target="semverDoc">Semver Wiki</a>

> react version management example

![react version management example](https://lanbery.github.io/img/2020/semver-demo.png?raw=true)

## child_process

<a href="https://www.nodeapp.cn/child_process.html" target="node child_process">child_process</a>


## address
> address :Get current machine IP, MAC and DNS servers

```js 
var address = require('address');

// default interface 'eth' on linux, 'en' on osx.
address.ip();   // '192.168.0.2'
address.ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
address.mac(function (err, addr) {
  console.log(addr); // '78:ca:39:b0:e6:7d'
});
```

## opn 

> opn : 使用用户默认程序打开网站，文件，可执行文件等内容

> Open stuff like URLs, files, executables. Cross-platform.

> 使用方法

```js 
const opn = require('opn')
 
//  在默认图像程序打开图像
opn('unicorn.png').then(() => {
    // image viewer closed
});

//  用默认浏览器打开网址
opn('http://sindresorhus.com');
 
//  用指定应用打开网址
opn('http://sindresorhus.com', {app: 'firefox'});
 
//  指定打开网址的浏览器参数
opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});
```

## express

> Express 是一个基于 Node.js 封装的上层服务框架，它提供了更简洁的 API 更实用的新功能。它通过中间件和路由让程序的组织管理变的更加容易；它提供了丰富的 HTTP 工具；它让动态视图的渲染变的更加容易；它还定义了一组可拓展标准。

> 使用方法

```js 
let express = require('express')
let app = express()

app.get('/',(req,res) => res.end('hello world'))

app.listen(3000,() => console.log('Server is running...'))
```

## http-proxy-middleware

> http-proxy-middleware用于后台将请求转发给其它服务器

> 我们当前主机A为http://localhost:3000/，现在浏览器发送一个请求，请求接口/api,这个请求的数据在另外一台服务器B上（ http://10.119.168.87:4000），这时，就可通过在A主机设置代理，直接将请求发送给B主机

```js 
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api', proxy({target: 'http://10.119.168.87:4000', changeOrigin: true}));
app.listen(3000);
```

# devtool 
> devtool 开启 sourceMap 让我们可以调试代码, webpack 文档中关于 devtool 给出了7种模式

^  模式  ^  解释  ^
|  eval  | 每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL. |
|  source-map  | 生成一个 SourceMap 文件. |
|  hidden-source-map  | 和 source-map 一样，但不会在 bundle 末尾追加注释. |
|  inline-source-map  | 生成一个 DataUrl 形式的 SourceMap 文件.  |
|  eval-source-map    | 每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的 SourceMap . |
|  cheap-source-map   | 生成一个没有列信息（column-mappings）的 SourceMaps 文件，不包含 loader 的sourcemap（譬如 babel 的 sourcemap）|
|  cheap-module-source-map  | 生成一个没有列信息（column-mappings）的 SourceMaps 文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。 |

** 註 **
  開發模式推薦: cheap-module-eval-source-map

  生產環境推薦: cheap-module-source-map


  - 使用 cheap 模式可以大幅提高 souremap 生成的效率。大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息。
  - 使用 eval 方式可大幅提高持续构建效率。参考官方文档提供的速度对比表格可以看到 eval 模式的编译速度很快。
  - 使用 module 可支持 babel 这种预编译工具（在 webpack 里做为 loader 使用）。
  - 使用 eval-source-map 模式可以减少网络请求。这种模式开启 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率。而生产环境中则不宜用 eval，这样会让文件变得极大。


## optimize-css-assets-webpack-plugin

> 用於優化壓縮css資源(webpack v4)

  - assetNameRegExp: 正则表达式，用于匹配需要优化或者压缩的资源名。默认值是 /\.css$/g
  - cssProcessor: 用于压缩和优化CSS 的处理器，默认是 cssnano.这是一个函数，应该按照 cssnano.process 接口(接受一个CSS和options参数，返回一个Promise)
  - canPrint: {bool} 表示插件能够在console中打印信息，默认值是true




## 




# githubs

-> https://github.com/one-dragon/webpack4-vue

-> https://github.com/shaohuanhuan/vue2-webpack4-

-> https://juejin.im/post/5dc3b97b6fb9a04aa660ddf7

## Github boilerplates

> https://github.com/taniarascia/webpack-boilerplate  webpack4 

> webpack full extension : https://github.com/kamilogerto2/webpack-react-extension-boilerplate

https://github.com/jhen0409/react-chrome-extension-boilerplate.git

https://developer.aliyun.com/mirror/npm/package/react-redux-chrome-extension-boilerplate

https://smellycode.com/chrome-extension-live-reloading-with-react/ 

## Sentry 

> 什么是sentry?

当我们完成一个业务系统的上线时，总是要观察线上的运行情况，对于每一个项目，我们都没办法保证代码零BUG、零报错，即便是经历过测试，因为测试永远无法做到100%覆盖，用户也不会总是按照我们所预期的进行操作，在上线后也会出现一些你预料不到的问题，而这种情况下，广大的用户其实才是最好的测试者。当生产环境中产生了一个 bug 时，如何做到迅速报警，找到问题原因，修复后又如何在线上验证？此时我们需要一个高效的错误监控系统。sentry扮演着一个错误收集的角色，将你的项目和sentry结合起来，无论谁在项目使用中报错，sentry都会第一次时间通知开发者，我们需要在系统异常时主动对其进行收集上报，出现了什么错误，错误出现在哪，帮你记录错误，以制定解决方案并进行优化迭代。
sentry是一个基于Django构建的现代化的实时事件日志监控、记录和聚合平台,主要用于如何快速的发现故障。支持几乎所有主流开发语言和平台,并提供了现代化UI,它专门用于监视错误和提取执行适当的事后操作所需的所有信息,而无需使用标准用户反馈循环的任何麻烦。官方提供了多个语言的SDK.让开发者第一时间获悉错误信息,并方便的整合进自己和团队的工作流中.官方提供saas版本免费版支持每天5000个event.
sentry支持自动收集和手动收集两种错误收集方法.我们能成功监控到vue中的错误、异常，但是还不能捕捉到异步操作、接口请求中的错误，比如接口返回404、500等信息，此时我们可以通过Sentry.caputureException()进行主动上报。使用sentry需要结合两个部分，客户端与sentry服务端；客户端就像你需要去监听的对象，比如公司的前端项目，而服务端就是给你展示已搜集的错误信息，项目管理，组员等功能的一个服务平台

### 什么是DSN？
DSN是连接客户端(项目)与sentry服务端,让两者能够通信的钥匙；每当我们在sentry服务端创建一个新的项目，都会得到一个独一无二的DSN，也就是密钥。在客户端初始化时会用到这个密钥，这样客户端报错，服务端就能抓到你对应项目的错误了。之前版本的sentry对于密钥分为公钥和私钥，一般前端用公钥(DSN(Public))，但是现在的版本舍弃了这种概念，只提供了一个密钥

### 什么是event
每当项目产生一个错误，sentry服务端日志就会产生一个event，记录此次报错的具体信息。一个错误，对应一个event


### 什么是issue
同一类event的集合，一个错误可能会重复产生多次，sentry服务端会将这些错误聚集在一起，那么这个集合就是一个issue。

### 什么是Raven
raven是sentry官方针对vue推荐的插件,我们在项目中初始化，让项目链接sentry的前提，都得保证已经引入了raven-js，以及我们手动提交错误的各类方法，都由Raven提供


### 监控原理

- 1.传统的前端监控原理分为异常捕获和异常上报。一般使用onerror捕获前端错误：

```js
window.onerror = (msg, url, line, col, error) => {
  console.log('onerror')
  // TODO
}
```

- 2.但是onerror事件无法捕获到网络异常的错误(资源加载失败、图片显示异常等)，例如img标签下图片url 404 网络请求异常的时候，onerror无法捕获到异常，此时需要监听unhandledrejection。

```js
window.addEventListener('unhandledrejection', function(err) {
  console.log(err)
})
```
- 3.捕获的异常如何上报？常用的发送形式主要有两种:
通过 ajax 发送数据(xhr、jquery...)
动态创建 img 标签的形式

```js
function report(error) {
  var reportUrl = 'http://xxxx/report'
  new Image().src = reportUrl + '?error=' + error
}
```