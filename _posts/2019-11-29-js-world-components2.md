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




