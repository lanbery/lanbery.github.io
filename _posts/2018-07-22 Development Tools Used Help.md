---
layout:     post
title:      Development Tools
subtitle:   Sublime Text3
date:       2019-08-07 18:14:05
author:     lanbery
header-img: img/post-bg-os-metro.jpg
catalog: true
tags:
    - tools
    - developments
---

# VSCode 配置 msys
> window 下配置

  - 配置msys2: etc/profile (--login 直接) 

```bash

```

  - 配置vscode 

```json 
{
    "terminal.integrated.shell.windows" : "D:\\msys64\\usr\\bin\\bash.exe",
    "terminal.integrated.env.windows" : {"CHERE_INVOKING":"1"},
    "terminal.integrated.shellArgs.windows": [
        "--login"
    ],
    "terminal.integrated.allowChords": false
}
```

