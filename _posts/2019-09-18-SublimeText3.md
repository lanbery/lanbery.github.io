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
> FileHeader Template 

# TEMPLATE 

``` bash
copyright (c) {current_year} {organization},{author}
email: {email}
git: {git_repo}

```




# Core Modified

> 修改文件${packages}/FileHeader/FileHeader.py

## add method and Global Variables

    - IS_GIT
    - get_project_path

``` python
IS_GIT = False

'''plugin_loaded() add '''

def plugin_loaded():

    IS_GIT = is_git_repo()

'''plugin_loaded() add end '''

''' add method '''
def is_git_repo():
    ''' is git repo'''
    output, error = getOutputError(
        'cd {0} && git status'.format(get_project_path()))

    if not error:
        return True
    else:
        return False 

def get_organization():
    ''' get git organization '''
    output, error = getOutputError(
        'cd {0} && git config --get user.organization'.format(get_project_path()))
    if not error and output:
        project_org = output
    else:
        project_org is None

    return project_org

def get_git_url():
    '''get git remote url'''
    output, error = getOutputError(
        'cd {0} && git config --get remote.origin.url'.format(get_project_path()))

    if not error and output:
        project_git_url = output
    else:
        project_git_url is None

    return project_git_url            

def get_current_year():
    dt = datetime.now()

    return dt.year 

''' modified method '''
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
add get_args method

``` python

    args.update({
        'current_year':get_current_year()
    })

    if IS_ST3:
        args.update({
			'author':get_user(),
			'project_name': get_project_name(),
			'email':get_git_email()
		})

    if IS_GIT:
        args.update({
            'organization':get_organization(),
            'git_repo':get_git_url()
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

### 双击打开新页签设置

> Preferences==>user settings

```json
    "preview_on_click":false,
    "translate_tabs_to_spaces":true
```

## Emmet plugin

> emmet 
> 
> Preferences -> Package Settings -> Emmet -> Setting --User


```js
{
    "snippets": {
        "html": {
            "snippets": {
                "myviewport": "<meta name=\"viewport\" content=\"width=device-width\">",
                "default-css": "<link rel=\"stylesheet\" href=\"style.css\">"
            },
            "abbreviations": {
                "example": "<div id=\"root\"></div>",
                "bundlejs":"<script src=\"/dist/bundlejs/xx.bundle.js\"></script>",
                "mydoc":"html>(head>meta[charset='utf-8']+title{${1:Document}}+myviewport+default-css)+body>example",
                "extdoc":"html>(head>meta[charset='utf-8']+title{${1:Document}}+myviewport+default-css)+body>(example+bundlejs)",
                "!!":"mydoc[lang='en']",
                "crx":"!!!+extdoc[lang=${lang}]",
            }
        }
    },  
}
```

  * crx+tab: 快捷键生成html
  * !!+tab:

<a href="https://www.iteye.com/news/27580?spm=a2c4e.10696291.0.0.181c19a4eMNRiK" target="emmet-command">Emmet Key</a>
