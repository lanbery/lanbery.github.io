---
layout:     post
title:      Javascript world components (一)
subtitle:   Test Integration Chapter
date:       2019-11-28
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


# 3box-js

<p class="">
This is a library which allows you to set, get, and remove private and public data associated with an ethereum account. It can be used to store identity data, user settings, etc. by dapps that use a web3 enabled browser. The data will be retrievable as long as the user has access to the private key for the used ethereum account. The data is encrypted and can not be read by any third party that the user hasn't authorized. There is one shared space for data which all authorized dapps access by default, then there are spaces which dapps have to request explicit consent to access.  
</p> 




## JS Test Components

>  karma + mocha 
> chai 测试断言库

### Sinon

> 


### Karma

> Karma Spectacular Test Runner for Javascript



------

<a href="https://iyaozhen.com/use-karma-and-mocha-for-fe-tdd.html" target="kmBlog">karma+ mocha</a>

> demo 

  * addLib.js 

```js 
function add(x,y) {
  return x + y;
}

module.exports = add;
```

  * test/add/test.js 

```js 
var add = require('./src/lib/addLib.js');
var assert = require('chain').assert;

describe('add method library Test',function(){
  it('1 plus 1 equal 2',function(){
    assert.equal(add(1,1),2);
  });
});

```
<h2>Syntax Rules</h2>
测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块

  - describe 称为测试套件（test suite),第一个参数为套件名称，第二个参数为实际执行的匿名函数。
  - it 称为测试用例 (test case)

> 测试用例文件写完，如何让测试驱动开发呢？

```bash
  karma init kra.config.js 
```
  if window platform only used in cmd excute command.see 
  <a href="https://github.com/karma-runner/karma/issues/1724" target="issue1724">1724</a>. 



