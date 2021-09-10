---
layout:     post
title:      Truffle 开发合约的简要步骤
subtitle:   
date:       2018-06-15
author:     lanbery
header-img: img/post-bg-os-metro.jpg
catalog: true
tags:
    - Truffle
    
---

![模型](https://lanbery.github.io/docs/images/2019/eth-world.jpeg?raw=true) 

> truffle

# 环境要求
  * node 
  * npm
  * truffle
  * ganache
  * metamask

## 合约项目步骤


  - mkdir TestSol
  - cd TestSol
  - npm init 								//构建node 项目 
  - truffle init  							//生成truffle 项目结构
  - vim contracts/First.sol 				//编写合约
  - truffle compile							//编译合约
  - 启动Ganache 								// 
  - vim migrations/2_deploy_contracts.js  	//编辑部署文件
  - vim truffle-config.js 					// development
  - truffle migrate							//deploy the contracts to deployment env


### deploy_contract.js

	var First = artifacts.require('First.sol');

	module.exports = function(deployer){
		deployer.deploy(First);
	};  

### truffle-config.js 

	development: {
		host: "127.0.0.1",     // Localhost (default: none)
		port: 7545,            // 与Ganache Server 一致
		network_id: "*",       // Any network (default: none)
	}
