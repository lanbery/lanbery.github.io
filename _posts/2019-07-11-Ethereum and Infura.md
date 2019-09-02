---
layout:     post
title:      Ethereum Infura
subtitle:   API
date:       2019-07-11
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - blockchain
    - ethereum	
----
> 学习以太坊合约机制
> 通过 Infura 调用合约


----
# Ethereum

  What Ethereum intends to provide is a blockchain with a built-in fully fledged Turing-complete programming language that can be used to create "contracts" that can be used to encode arbitrary state transition functions, allowing users to create any of the systems described above, as well as many others that we have not yet imagined, simply by writing up the logic in a few lines of code.


## 部署合约

``` javascript
web3.eth.sendTransaction({
from:'0x6cf8b6982e7d7a9552e50d824624b5fc2b7fca40',
to:'0x9f00F4735b8032be2Ba59AFDaB1613957ba08e5d',
value:'50000000000000000',
gasPrice:'2'},function(err,result){
	if(err){console.log(err);}
	else{
		
    }
});
```
   