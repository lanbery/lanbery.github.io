---
layout:     post
title:      MetaMask 源码学习笔记
subtitle:   Extension
date:       2020-04-10
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - program language
    
---

> developer
> Extension

#


## 整理中...

> 

### Ethereum instance

> ethereum.request(method,params)


>> { method: 'eth_accounts' }


>> eth_requestAccounts

## HD Wallet

> Hierarchical Deterministic 分层确定性

BIP 32是 HD 钱包的核心提案，通过种子来生成主私钥，然后派生海量的子私钥和地址，但是种子是一串很长的随机数，不利于记录，所以我们用算法将种子转化为一串助记词 （Mnemonic），方便保存记录，这就是 BIP 39，它扩展了 HD 钱包种子的生成算法

### BIP44 提出了 5 层的路径建议
```bash
m/purpse’/coin_type’/account’/change/address_index
`m/44'/60'/0'/0/0`
```

  - 第一层的目的地总是被设定为44'
  - coin_type’用来表示不同币种 ethereum 为60 
  - account’



{
  "version":3,"id":"c9837772-4cfa-48c9-8200-e13fa277d198",
  "address":"d37f425746aba35aa3107fce674eb9f98c9a8cdc",
  "crypto":
  {
    "ciphertext":"09d01bcf7db4cc1013527030bf6431286ddafd1eb226c7b526b942096abaf107",
    "cipherparams":
    {
      "iv":"447b28fc3a79d2762dc6a7d2fd11aedb"
    },
    "cipher":"aes-128-ctr",
    "kdf":"scrypt",
    "kdfparams":
    {
      "dklen":32,
      "salt":"83c32aaf13bc02549f9c6c7994d1b2ce8304f09f1307be1523edf367264b8986",
      "n":262144,
      "r":8,
      "p":1
    },
    "mac":"abb4473daace1314fd3c87deefdfea77fede896bca478c8eef61392267eaa118"
  }
}
>> 
{
  "data":"jV86QvGPUJAvQwz42thF/KNuj6Ua4EI3P6YtwIHUCC3rOG+eE6jSq0jgVOGaoiUk2abdwgVn9fskSaLdSJTZkAsJY/7+zuoaRh7/+gTo8l6J+vB6CRC5IXlzvQ+rgeiemmrgveKIq3NNCka+Zt4J4a3Y7mnnpuBImh/4ze/Z8G2MRctvFgKA3d9OuXg54zqjR4TXRcpQ7aSDmmSsgd78ttCAOw91ht3dOED0EBj2Wp8duQC9bPuDBXrdzaKiHlE1giRbBWmpZHSLoRUm5t4SUXgWUJt82+tDc1KjM2Jua5vtfpuqmqxUXRzYda85HOUpRmMnDGvldFR6axnHh9jyrnNfuI2FzKCbnkQMl8jKmf6Dxmbqz3QVRVLl8kvgPQLxHQQ4E0lhjQlRQUddmPdLsYEBxU3sYZTcOfjJwqmZbrKFkzKiPvMOyzj35AVxlf+hzL2f2cMKuCrNcp3XcTAQ4FkMZdIZs6cF6Ej5vzImQggLKgM6ppKGkwjpBVkZwj6TUy93hkUSSl5KX2yKe034kZdL1qaUGHd/PwSVJkavp2V0Vj+VicjLIEQsaezGz2PjzcrOnznqSse2UcVtFQutAEf4bMez7BaHehSKrl+F4UgByPyC0pYXe9vUVK5Y2qJDWY2WtkP9kw+eWkhqVHfUJSaAYJDsVBTp/pfP7fuiDk5zDenyRKafYYilIsE3h8cUkWXCnd0F7vhyy1hrWt+b6Lx1/5+uTebSVQDFZlovUvYqBVtoJTqE6VS8jk/Zcs7Om3wRbea0E5l4F855dO5l7eutyfS5zlAhlv9CZNm/WVswreM8TsGSLAoPsPRM9hJMXkhGfoZlUUit/sryRLkjDR4MciMip6i+PDwhNAoxVzCJds+qpUVSwKX03WA4t5bVlKM13Z6R82le1sZSka6dEPzpPUeH5DYMjUB81sP0AXtzMM7inhN4qfurgcMAjLacMth9sJK9EClrXRopCXh23RjTJ5P78+k4rpAk9Cy3S5o/GUaA0PklxgX8ibhvL/9Ji3DXwEcKCURvAFe8dBShr2zgVIKlY7ac5ydaShvlu/MgOyFnGt1uCU+vV9gJXJwiliT5e7FhMzq6jjR+LN8nhGYS76D4jXyIihXRvwTEHgrpAqY09PHJXnUWbA0HJ0LHPEFrhpCqCYzo3KKRrpbyUarHeHNwmF5w+4kEqhV0gx7ysFfbRL5shwiAuF/49woP8H2lM1Y2OIIq0Se7s0fjJbu0CU07j8kyFc9mHPS5D58aRxbmHWOpfRe8l9nw4mBI38EKIBzbuXrSU0iYF3UwvUwPxpg7Ucx/bz2xs21uAWsnhygrs2NXAJv5n4zV3trZVZsm",
  "iv":"L4aG928tLT8r6PCARp66SQ==",
  "salt":"snMhsriSaz1gbF++EJoOuFadiPD7G8np+GSUhQNXb4M="
}


[
{
  "type":"HD Key Tree",
  "data":{
    "mnemonic":"spider layer west spot soul prosper ask strategy ice total liquid nice",
    "numberOfAccounts":1,
    "hdPath":"m/44'/60'/0'/0"
  }
},
{
  "type":"Simple Key Pair",
  "data":["79e45ebe6f1cec0570f8dfd81e4e03f9ef0986d33d78e0de5dcd5a83916ee1d8"]
},
{
  "type":"Simple Key Pair",
  "data":["53d33755df150e1e9297c26e4893ca8469ea8afa8c185524f1dbbf14bd7ef3e2"]
},
{
  "type":"Simple Key Pair",
  "data":["6cab78eb1e23e1c7852ed710b83d104270ce632a45d09643e45ebfbd8a3a7029"]
},
{
  "type":"Simple Key Pair",
  "data":["66882b5856582adfd1f1d3078b4c57a7f462c3969093a0431727125bfc434396"]
},
{
  "type":"Simple Key Pair",
  "data":["dc8f5077d898d481581c5422a8ab5f66027992ccb9fac853c12a9e4a26214859"]
},
{
  "type":"Trezor Hardware",
  "data":
  {
    "hdPath":"m/44'/60'/0'/0",
    "accounts":[],
    "page":0,
    "paths":{},
    "perPage":5,
    "unlockedAccount":0
  }
},
{
  "type":"Ledger Hardware",
  "data":
  {
    "hdPath":"m/44'/60'/0'",
    "accounts":[],
    "accountIndexes":{},
    "bridgeUrl":"https://metamask.github.io/eth-ledger-bridge-keyring",
    "implementFullBIP44":false
  }
}
]


"{\"managementAddress\":\"0x65f12714fe9a95a5f9a5657514bf847f18961ca8\",\"seed\":\"0xe37c4f37b263664404bff1a6c347a1b5d8abccd7db0b02cb2b52ac2b8f58cdd5231ddbe6c9928405c5752c7c31718a54991c13878b85b99c331d467143ec2c03\",\"spaceSeeds\":{}}"

{"data":"ElVjnjDFFiWdYKcjUsDlST7B5VULeW+NLsTl6ruqtsI09nqc9afHpbNw/KK2uxzlhuKBi0QWrN0PNKqJhWbd9FZ23MrDqi5SSouR+qCaJN7U4VYKo2JHtHnoreauR9F+pwJb4CRvH+chMJBsJYYjnsi6QVYCxYGLs94a+fp/bA9WJfqFv3f7bN+u509tUwRbTcMIYliW2zldZxibDfulCmDs2OUJXFozRJF/ln6Nymhog5nIoQe+HnCO","iv":"zGnnk9oo0t7MtuogOGXBAw==",
"salt":"ilgZz7GCn4N2rPBFJupSsVwzGSlvi/woah1H58IYElQ="
}