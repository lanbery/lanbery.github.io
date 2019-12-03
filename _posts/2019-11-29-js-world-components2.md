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
