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

![react version management example](https://lanbery.github.io/docs/images/2020/semver-demo.png?raw=true)









