---
layout:     post
title:      Blockchain Consensus & Algorithm
subtitle:   PoW,PoS,pBFT
date:       2018-08-22
author:     lanbery
header-img: img/developer-guide-blog-2.png
catalog: true
tags:
    - blockchain
    - consensus
---

> 共识机制是区块链运行的基础，在区块链中，数据的存储通过链式绑定在一起达到不可篡改的目的，与中心化架构不同，在区块链中各个参与节点都有平等的记录数据的权力.为了保证数据的正确性，使得所有节点对数据达成一致并防止恶意节点提交假数据，就需要共识机制.

> 共识就是大家通过协商达成一致，在中心化架构里面，存在一个权威，其他人都听他的. 但是由于区块链是去中心化的机制，如何让每个对等节点通过一个规则将各自的数据保持一致是一个很核心的问题，这个问题的解决方案就是制定一套共识算法，实现不同账本节点上的账本数据的一致性和正确性

> 目前常见区块链共识机制有：POW，POS，DPOS，PBFT

![PoW](/img/blockchain/blockchain-illustrated.png)

## POW(工作量证明)

>> 工作证明(Proof-of-work，PoW)算法是最古老、最复杂和最安全的算法。在 PoW 中，所有事务都使用复杂的数学计算来证明，网络的任何用户都可以对其可靠性进行双重检查。

>> 换句话说，矿工解决了一个问题。如果一个挖掘者已经设法解决了这个问题，一个新的区块就形成了，下一组事务被放置在其中，并且它们被认为是已确认的。矿工的工作会得到奖励，这是由创建一个区块和交易佣金的奖励形成的。

这样做有几点好处：

- PoW 解决了网络黑客问题，攻击者利用虚假信息制造大量虚假参与者，以“粉碎”由此产生的大多数参与者。在 PoW 中实现这样的机制需要大量的计算能力。

- 战俘确保公平。每个矿工的奖励与他们的计算能力(杂凑率)成正比。如果挖掘者从整个网络中获得2% 的散列率，那么他们将平均创建2% 的块，并获得2% 的分配奖励。

- 不诚实的行为可能会花费真金白银。由于物理资源被用于计算(就比特币网络而言，计算单位是每分钟数千美元) ，矿工们有了遵守规则的全新动机。

同样值得注意的是，如果发生51% 的攻击(当一组攻击者获得51% 或更多计算能力的控制权时) ，攻击者将只能忽略来自所有其他挖掘者的块，从而获得在网络中挖掘的所有回报。

然而，即使网络中的所有矿工密谋，他们也无法绕过比特币的基本安全机制。例如，他们将无法从用户那里窃取比特币。



## PoS consensus algorithm

>> The proof-of-stake (PoS) algorithm 

在一定程度上，PoS 算法的功能与 PoW 算法相似，但不同的是，PoS 算法不需要解决复杂的计算问题,Pos 共识算法最早是在 PPCoin cryptocurrency 中应用的。据说Ethereum 的未来也是PoS 


## DPOS 

delegated-proof-of-stake

>> 对于PoS机制的加密货币，每个节点都可以创建区块。DPoS是由被社区选举的可信帐户（超级账户）来创建区块。DPoS机制类似于股份制公司，普通股民进不了董事会，要投票选举代表（受托人）代他们做决策


委托证明算法(DPoS)是对PoS证明基本概念的一种改进，是一种一致同意的算法。代理股权证明(DPoS)共识算法是由EOS 的创始人丹尼尔•拉里默(Daniel Larimer)于2014年开发的

### DPoS 工作原理 

- Voting 投票

在DPoS共识中，用户可以直接投票，也可以将投票权交给其他实体代表他们投票。选定的见证人负责通过验证交易创建区块。如果他们核实并签署了一个区块中的所有交易，他们会得到一份奖励，通常与投票支持证人的人分享。如果目击者未能在给定时间内验证所有交易，则会错过区块，所有交易都不会被验证，也不会向目击者分发奖励。奖励与下一个验证该区块的证人的奖励相加。此类交易由下一个证人收集，此类区块称为被盗

选票与每个投票者所持股份的大小成比例。一个用户不需要有很大的股份进入顶层的证人。相反，拥有较大股份的用户的投票可能导致相对较小股份的用户被提升到证人的顶层

- Witnesses 见证人

顶级证人的数量上限为一定数量，通常在21-101之间。这些证人负责验证交易和创建区块，并相应获得相关费用。证人可以阻止特定交易被包括在区块中，但他们不能更改任何交易的信息，使其与工作证明区块链中的矿工类似。投票是一个持续的过程，顶层的每个证人总是有被获得更多投票的用户取代的风险，因此被认为更值得信任。随着证人申请人数的增加，竞争加剧，声誉对每个证人保持竞争力至关重要。

证人受到收入损失威胁、股份锁定和声誉评分的制约。如果证人采取恶意行为或试图攻击区块链，他们必须锁定被扣押的部分Token。

> DPoS 区块链中包含 N 个区块生成者/见证者的一轮循环遵循如下

  * N block producers get elected from the pool of witnesses candidates 第 N个区块的打包权 从见证人中选出
  * The kth block producer signs the kth block, until k=N
  * A block is finalized when it is voted on by (2/3+1) of block producers. In case of two chains, the longest chain rule is followed. Block added cannot be reversed.

- Delegates 

DPoS系统中的用户还投票给一组监督区块链治理的代表。它们在事务控制中不起作用。代表们可以建议更改区块的大小，或者更改证人验证区块所应支付的金额。一旦代表们提出此类变更，区块链的用户就会投票决定是否采用这些变更

- Block validators
DPoS 中的块验证器是指完整的节点，用于验证证人创建的块是否遵循协商一致规则。任何用户都可以运行块验证器并验证网络


> DPoS 的优势

- DPoS blockchains have good protection from double-spending 防止双花
- DPoS is more democratic and financially inclusive due to lesser staking amount required by a user/node. （由于用户/节点所需的抵押量较小，DPoS更民主、更具财务包容性）
- DPoS provides more decentralization as more people take part in the consensus due to low entry threshold. （由于入门门槛较低，随着更多人参与共识，DPoS提供了更多的分散化）
- DPoS doesn’t require lots of power to run network, which makes it more sustainable. （不需要大量电力来运行网络，这使其更具可持续性）
- Transactions in DPoS is not dependent on computing power required to run network, hence it is more scalable. （事务不依赖于运行网络所需的计算能力，因此更具可扩展性）
- DPoS separates election of block producers from block production itself which opens door for more creative models to solve both problems in isolation. (将区块生产商的选举与区块生产本身分离开来)
- DPoS method provides foundation for implementing interesting governance models in blockchain applications. In a sense, it forms a kind of democracy.(将区块生产商的选举与区块生产本身分离开来)


> DPoS 缺点
- 限制见证人数量，可能导致过于中心化 （验证出块需要21个见证人）
- 


## pBFT 实用拜占庭容错

pBFT 全称为 Practical Byzantine Fault Tolerance (pBFT) 

---- 

# Zero Knowledge Proof (ZKP) 

