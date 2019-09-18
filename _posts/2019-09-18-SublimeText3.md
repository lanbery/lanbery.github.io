---
layout:     post
title:      Window Sublime Text Plugin
subtitle:   FileHeader Config
date:       2019-09-18
author:     lanbery
header-img: img/post-bg-hacker.jpg
catalog: true
tags:
    - Tools
    - Msys2	
---

> Sublime Text FileHeader Config


# Core Modified

``` python
def get_user():
    '''Get user'''

    output, error = getOutputError(
        'cd {0} && git status'.format(get_project_path()))

    if not error:
        output, error = getOutputError(
			'cd {0} && git config --get user.name'.format(get_project_path()))
        if not error and output:
            user = output
    return user

```

>Add variables

``` python
    if IS_ST3:
        args.update({
			'author':get_user(),
			'project_name': get_project_name(),
			'project_org':get_org(),
			'git_url':get_git_url(),
			'email':get_git_email(),
			'project_rel_path':get_project_path()
		})

```

### 获得项目路径
> get_project_path 为了让 git 获取项目配置
``` python
def get_project_path():
    '''Get project name'''

    project_data = Window().project_data()
    project_path = os.path.abspath(
        project_data['folders'][0]['path']) if project_data else None

    return project_path
```