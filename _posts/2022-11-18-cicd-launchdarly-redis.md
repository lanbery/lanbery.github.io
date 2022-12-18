---
layout:     post
title:      灰度集成-功能标志和临时环境
subtitle:   launch darkly nodejs
date:       2021-10-21
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Javascript
    - nodejs  
---

> [origin blog](https://devpress.csdn.net/cicd/62edbb7d7e66823466181644.html)

> 功能标志和临时环境 功能标志是现代软件开发中必不可少且无处不在的部分。随着您的公司和应用程序复杂性的增长,必须能够控制您的内部开发团队、利益相关者和客户可以使用哪些功能。在很久以前,以前,我们只有一个变量,您可以在真假之间切换来控制应用程序的行为。然而,随着应用程序开发向 Web 过渡,我们需要相同类型的控制,只是硬编码的功能标志不会削减它。输入动态功能标志! 动态功能标志是对静态功能标志的重大改

### 功能标志和临时环境

> 功能标志是现代软件开发中必不可少且无处不在的部分,随着公司和应用程序复杂性的增长,必须能够控制您的内部开发团队、利益相关者和客户可以使用哪些功能
> 以前,我们只有一个变量,您可以在真假之间切换来控制应用程序的行为。然而,随着应用程序开发向 Web 过渡,我们需要相同类型的控制,只是硬编码的功能标志不会削减它。输入动态功能标志!


动态功能标志是对静态功能标志的重大改进,但也增加了复杂性并提出了与静态功能标志不同的挑战。硬编码的标志已经不复存在,但它们被 if 语句替换,更重要的是,为您的应用程序检索适当的标志。大多数人都是从滚动自己开始的,但是随着使用功能标志进行开发越来越受欢迎,许多不同的公司突然出现,希望解决以下问题

- 一个界面来管理你的Feature Flag
- 轻松维护您的旗帜
- 非常快速可靠地检索您的标志
- 将流量拆分到一个或另一个功能

虽然 LaunchDarkly、Optimizely、Rollout、Split.io 等公司让创建和管理这些标志变得相当容易,但这并不能解决您的所有问题。许多软件组织,尤其是随着它们的成长,需要大量的测试环境。如果您的环境是短暂的,这对您的功能标志设置提出了挑战。

> 临时环境与任何环境一样,只是它们将在相对较短的时间内被删除,这与您的登台或生产环境不同。

- 特征分支
- 销售演示
- 负载测试
- 重构
  
这些环境可能不会持续很长时间,但它们非常重要,并且可能与生产一样复杂。虽然销售演示环境可能能够使用种子数据运行,但负载测试环境将需要生产或类似生产的数据以及每个服务的许多副本才能给出有效的结果。这些创建和管理可能非常复杂,并且它们的短暂性质可能会对您的功能标志设置造成严重破坏

### 功能标志环境救援......排序

LaunchDarkly(和其他人)认识到了这个问题,并在他们自己的应用程序中创建了环境概念。你可以在这里阅读他们的实现。他们有 api,允许您在一个环境的基础上创建和操作这些功能标志集。如果您有一组有限的环境并且它们的集合不经常更改,那么这非常有用,但是对于短暂的环境,上下旋转它们的能力是一个特性而不是错误。

为了简化这个问题,大多数人在他们最喜欢的 Feature Flag 提供程序中创建了两种环境:一种用于开发(或测试),一种用于生产。在较大的组织中,开发团队可能有一些,例如开发、测试、uat、登台和生产。只要您不想添加另一个,或者您永远不会冒险进入真正的短暂应用程序环境,这就可以正常工作。

一旦你转移到临时环境,大多数人都会采取捷径,将每个临时环境分配给单个 Feature Flag 环境,这很简单,但会造成人们互相踩脚的大问题

想象一下,您有 10 个环境都指向一个数据库,并且所有这些环境都发生了写入:这里是同一个问题。功能标志的好处是能够切换它们并查看不同的行为,但是如果每个环境都指向同一个环境,那么您现在就会遇到另一个资源争用问题。如果您将功能 A 切换为“开启”,有什么可以阻止您的同事将其切换为“关闭”?您在永久暂存环境中遇到的任何问题都会在临时环境中放大

最好的解决方案是在创建一个临时环境时,您将在 LaunchDarkly 中创建一个基于您的临时环境的独特之处的环境,并且当它出现时,您将确保它使用该特定功能标志环境的唯一 SDK api .让我们实现工作流程,看看它如何与 Release 一起工作!

![](/img/front/launchdarkly-flow.png)

### 使用临时环境

为了在 Release 中尝试这一点,我们需要一个包含 Docker 文件的存储库,该文件已使用 LaunchDarkly 实现了功能标志。我将在 Github 上使用这个存储库,您可以通过首先分叉存储库来执行相同操作,这样您就可以使用它来创建带有 Release 的应用程序


分叉存储库后,您可以导航到releasehub.com并使用 github 登录,以便按照此示例进行操作

在 Release 中创建我们的临时环境并支持 LaunchDarkly 中的环境的步骤是:

- 1. 在 Release 中创建我们的应用程序
- 2. 用Release创建job,在LaunchDarkly中创建环境
- 3. 添加一些环境变量,以便应用程序可以联系 LaunchDarkly 并从我们新创建的 LaunchDarkly 环境中提取 SDK Api 密钥
- 4. 部署我们的临时环境

![config feature flag](/img/front/cicd-launchdarkly-config-feature-flag.png)

### 在发布中创建应用程序

登录到 Release 后,我们要单击左侧边栏中的 Create New Application。之后,我们将看到创建新应用程序工作流

![create app workflow](/img/front/cicd-ld-create-app-workflow.png)

首先,我们将单击“刷新”按钮以找到我们新分叉的存储库。然后,我们将为“api”服务选择该存储库和“Docker”。最后,命名您的应用程序。完成后单击紫色的“生成应用程序模板”按钮

![](/img/front/cicd-ld-pickrepos-workflow.png)

最后命名您的应用程序并为您的配置生成模板

![generate app template](/img/front/cicd-ld-generate-app-templeate.png)


### 修改应用模板

在我们可以部署我们的环境之前,我们需要对我们的应用程序模板进行修改并添加一些环境变量。我们还需要创建一个作业,在初始环境部署时创建我们的 LaunchDarkly 环境。 Release 中的作业在此处详细描述。 TL;DR 是通过少量配置,您可以在容器中运行任意脚本或任务。例如,这些作业对于在部署后端服务之前运行迁移非常有用。在这种情况下,我们将运行一个 rake 任务来设置我们的 LaunchDarkly 环境

```yml
jobs:
- name: create-launch-darkly-env
  from_services: api
  args:
  - bundle
  - exec
  - rake
  - launch_darkly: create_environment
```
**上面的yaml代表Release中的一个job**

- 我们将在我们的应用程序模板中将上述行放在“服务”节之前。

```yml
memory: 
  limits: 1Gi
  requests: 100Mi
replicas: 1
jobs:
- name: create-launch-darkly-env
  from_services: api
  args:
  - bundle
  - exec
  - rake
  - launch_darkly: create_environment
services:
  - name: api
    image: feature-flag-001/rails_postgres_redis/api
    has_repo: true
    static: false
```

为了让 Release 使用此作业作为工作流的一部分来部署环境,我们需要在“工作流”部分的文件底部附近添加一行。在 'setup':'order_from' 下,我们将添加 jobs.create-launch-darkly-env。然后,单击“保存并继续”

```yml
workflows:
- name: setup
  order_from:
  - jobs.create-launch-darkly-env
  - service.all
- name: patch
  order_from
  - services.api
  - services.sidekiq
  - services.db
  - services.redis

```

这就是所有需要的配置,现在我们只需要在部署之前添加两个环境变量!

### 添加环境变量

![添加环境变量](/img/front/cicd-ld-environment-vars.png)

单击“默认环境变量”的“编辑”以打开编辑器。我们将添加两个环境变量,其中包含有关 LaunchDarkly 的信息。他们是:

LAUNCH_DARKLY_API_KEY:您的 LaunchDarkly Api 密钥,可在此处找到。如果您没有 api 令牌,请创建“+ TOKEN”按钮来制作一个。你会想要给它管理员权限。如果您不能这样做,请联系您的管理员。 创建后,请确保将其复制并粘贴到可以检索的位置。 LaunchDarkly 会混淆您的令牌,如果您不将其保存在某处,则需要生成一个新令牌。

![access token](/img/front/cicd-ld-access-token.png)



**LAUNCH\DARKLY\PROJECT\NAME** : 我们将在此示例中仅使用“默认”,但如果还有其他项目您想随意测试

单击“保存”以将环境变量保存为应用程序配置的一部分。然后,单击“构建和部署”。您将被重定向到该应用程序的活动仪表板,并在后台启动 Docker 构建。随后将为您的应用程序部署环境。您可以分别在“构建”和“部署”部分下查看构建和部署。

### 环境集成

第一次进行 docker 构建的过程需要几分钟。构建和部署完成后,您可以通过单击左侧的“环境”找到新环境的 url,然后单击进入新环境。
![](/img/front/cicd-ld-docker-integration.png)

单击新创建的临时环境的 url 后,浏览器中的另一个窗口将打开到带有 postgres 和 redis 的示例 rails 站点。它应该看起来像这样