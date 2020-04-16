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

<p class="indent-2">
This is a library which allows you to set, get, and remove private and public data associated with an ethereum account. It can be used to store identity data, user settings, etc. by dapps that use a web3 enabled browser. The data will be retrievable as long as the user has access to the private key for the used ethereum account. The data is encrypted and can not be read by any third party that the user hasn't authorized. There is one shared space for data which all authorized dapps access by default, then there are spaces which dapps have to request explicit consent to access.  
</p> 




## JS Test Components

>  karma + mocha 
> chai 测试断言库

### Sinon

> 


### Karma

> Karma Spectacular Test Runner for Javascript

> Karma is a JavaScript test runner created by the team at AngularJS. It IS possible to write unit tests with Mocha alone, however, Karma provides some powerful features that are quite nice to have. In fact, it was the lack of online resources for coupling Karma, Mocha and RequireJS that prompted me to write this article. We’ll be using Karma to build dependencies, create a test server, check for code coverage and drive tests in multiple browsers.





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

----

# Webpack 4

> Webpack Core Features

  - Entry     : The webpack only excute file
  - Module    : 在webpack 中一切皆为module.
  - Chunk     : 代码库,一个chunk由十多个模块组合而成,用于代码合并与分割.
  - Loader    : 模块转换器,用于把模块原内容按照需求转换成新内容.
  - Plugin    : 扩展插件,在webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或do your want do.
  - Output    : 输出结果

> How webpack work flow ?

<p class="indent-2">
  webpack 启动后会从Entry里配置的Module开始递归解析Entry依赖的所有Module,每找到一个Module,就会根据配置的Loader去找出对应的转换规则,对Module进行转换后,在解析出当前的Module依赖的Module.这些模块会以Entry为单位进行分组,一个Entry和其他所有依赖的Module被分到一个组也就是一个Chunk.最好Webpack会把所有Chunk转换成文件输出,在整个流程中webpack会在恰当的时机执行Plugin里定义的逻辑.
</p>  

> Used Webpack

  - npm install --save-dev webpack webpack-cli

```js
const path = require('path');

module.exports = {
  entry:path.resolve(__dirname,'src/index.js'),
  output: {
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    publicPath:'/'
  }
}
```

  * publicPath : 上线时配置的cdn的地址
  * 打包输出dist/bundle.js

## webpack 进行打包

  webpack --mode production
  
  

## Use Html Templates

> html-webpack-plugin 

可以指定template模板文件,将会在output目录下,生成html文件,并引入打包后的js.

  * 配置webpack.config.js

```js
module.exports = {
  plugins : [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/index.html')
    })
  ]
}
```

HtmlWebpackPlugin 还有一些其它的参数,如title(html 的title),minify(enable express),filename (dist 中生成的html的文件名)等.

## webpack-dev-server 

> use webpack-dev-server support coding a web server and support hot deployment.

  * webpack.config.js 

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  devServer: {
    contentBase:'./dist',
    port:'8469',
    host:'localhost'
  }
}
```
  
  package.json and script:

```json
{
  ...,
  scripts:{
    "dev":"webpack-dev-server --mode development"
  }
}
```

## support loading css files

> 通过使用不同的style-loader 和 css-loader,可以将css文件转换成JS文件类型.

```js
module.exports = {
  ...,
  module: {
    rules: {
      test: /\.css/,
      use:['style-loader','css-loader'],
      exclude:/node_modules/,
      include:path.resolve(__dirname,'src')
    }
  }
}

```

loader 可以配置以下参数:

  * test              : 匹配处理文件的扩展名的正则表达式
  * use               : loader 名称
  * include/exclude   : 手动指定必须处理的文件夹或不屏蔽的文件夹
  * query             : 为loader提供额外的设置选项

如需要给loader传参数,需要使用use+loader

```js
module.exports = {
  //...,
  module: {
    rules : [
      {
        use : [
          {
            loader: 'style-loader',
            options: {
              insertAt:'top'
            }
          },
          'css-loader'
        ],
        //...
      }
    ]
  }
}
```

## 支持加载图片

> url-loader file-loader

  * file-loader: 解决CSS等文件中的引入图片路径问题
  * url-loader : 当图片小于limit的时候会把图片Base64编码,大于limit参数的时候还是使用file-loader进行copy


  * webpack.config.js

```js 
module.exports = {
  //...
  module: {
    rules: [
      test:/\.(git|jpg|svg|.../,
      use:[
        {
          loader:'url-loader',
          options: {
            limit:8192,
            outputPath:'images'
          }
        }
      ]
    ]
  }
} 
```

### support less and sass

> bigFront like use less or sass coding css,so install plugin

> less less-laoder
 
> node-sass sass-loader

```js 
module.exports = {
  module: {
    test:/\.less/,
    use:['style-loader','css-loader','less-loader'],
    exclude:/node_modules/,
    include:path.resolve(__dirname,'src')
  },
  {
    test:/\.scss/,
    use:['style-loader','css-loader','sass-loader'],
    exclude:/node_modules/,
    include:path.resolve(__dirname,'src')
  }
}
```

### 支持转义ES6/ES7/JSX

> ES6/ES7/JSX 转义需要Babel的依赖,支持装饰器

> @babel/core babel-loader @babel/preset-env @babel/preset-react 
> @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread

 * config 

```js
module.exports = {
  module: {
    rules : [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader:'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/react'],
              plugins:[
                ["@babel/plugin-proposal-decorators",{"legacy":true}]
              ]
            }
          }
        ],
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/ 
      },
    ]
  }
}

```

### 压缩JS文件

> uglifyjs-webpack-plugin 压缩JS 文件

  * config

```js
module.exports = {
  optimization: {
    minimizer : [
      new UglifyWebpackPlugin({
        parallel:4
      })
    ]
  }
}
```

> terfer : A JavaScript parser and mangler/compressor toolkit for ES6+

```bash

    -h, --help                  Print usage information.
                                `--help options` for details on available options.
    -V, --version               Print version number.
    -p, --parse <options>       Specify parser options:
                                `acorn`  Use Acorn for parsing.
                                `bare_returns`  Allow return outside of functions.
                                                Useful when minifying CommonJS
                                                modules and Userscripts that may
                                                be anonymous function wrapped (IIFE)
                                                by the .user.js engine `caller`.
                                `expression`  Parse a single expression, rather than
                                              a program (for parsing JSON).
                                `spidermonkey`  Assume input files are SpiderMonkey
                                                AST format (as JSON).
    -c, --compress [options]    Enable compressor/specify compressor options:
                                `pure_funcs`  List of functions that can be safely
                                              removed when their return values are
                                              not used.
    -m, --mangle [options]      Mangle names/specify mangler options:
                                `reserved`  List of names that should not be mangled.
    --mangle-props [options]    Mangle properties/specify mangler options:
                                `builtins`  Mangle property names that overlaps
                                            with standard JavaScript globals.
                                `debug`  Add debug prefix and suffix.
                                `domprops`  Mangle property names that overlaps
                                            with DOM properties.
                                `keep_quoted`  Only mangle unquoted properties, quoted
                                               properties are automatically reserved.
                                               `strict` disables quoted properties
                                               being automatically reserved.
                                `regex`  Only mangle matched property names.
                                `reserved`  List of names that should not be mangled.
    -b, --beautify [options]     Specify output options:
                                `preamble`  Preamble to prepend to the output. You
                                            can use this to insert a comment, for
                                            example for licensing information.
                                            This will not be parsed, but the source
                                            map will adjust for its presence.
                                `quote_style`  Quote style:
                                               0 - auto
                                               1 - single
                                               2 - double
                                               3 - original
                                `wrap_iife`  Wrap IIFEs in parenthesis. Note: you may
                                             want to disable `negate_iife` under
                                             compressor options.
                                `wrap_func_args`  Wrap function arguments in parenthesis.
    -o, --output <file>         Output file path (default STDOUT). Specify `ast` or
                                `spidermonkey` to write Terser or SpiderMonkey AST
                                as JSON to STDOUT respectively.
    --comments [filter]         Preserve copyright comments in the output. By
                                default this works like Google Closure, keeping
                                JSDoc-style comments that contain "@license" or
                                "@preserve". You can optionally pass one of the
                                following arguments to this flag:
                                - "all" to keep all comments
                                - `false` to omit comments in the output
                                - a valid JS RegExp like `/foo/` or `/^!/` to
                                keep only matching comments.
                                Note that currently not *all* comments can be
                                kept when compression is on, because of dead
                                code removal or cascading statements into
                                sequences.
    --config-file <file>        Read `minify()` options from JSON file.
    -d, --define <expr>[=value] Global definitions.
    --ecma <version>            Specify ECMAScript release: 5, 6, 7 or 8.
    -e, --enclose [arg[:value]] Embed output in a big function with configurable
                                arguments and values.
    --ie8                       Support non-standard Internet Explorer 8.
                                Equivalent to setting `ie8: true` in `minify()`
                                for `compress`, `mangle` and `output` options.
                                By default Terser will not try to be IE-proof.
    --keep-classnames           Do not mangle/drop class names.
    --keep-fnames               Do not mangle/drop function names.  Useful for
                                code relying on Function.prototype.name.
    --module                    Input is an ES6 module. If `compress` or `mangle` is
                                enabled then the `toplevel` option will be enabled.
    --name-cache <file>         File to hold mangled name mappings.
    --safari10                  Support non-standard Safari 10/11.
                                Equivalent to setting `safari10: true` in `minify()`
                                for `mangle` and `output` options.
                                By default `terser` will not work around
                                Safari 10/11 bugs.
    --source-map [options]      Enable source map/specify source map options:
                                `base`  Path to compute relative paths from input files.
                                `content`  Input source map, useful if you're compressing
                                           JS that was generated from some other original
                                           code. Specify "inline" if the source map is
                                           included within the sources.
                                `filename`  Name and/or location of the output source.
                                `includeSources`  Pass this flag if you want to include
                                                  the content of source files in the
                                                  source map as sourcesContent property.
                                `root`  Path to the original source to be included in
                                        the source map.
                                `url`  If specified, path to the source map to append in
                                       `//# sourceMappingURL`.
    --timings                   Display operations run time on STDERR.
    --toplevel                  Compress and/or mangle variables in top level scope.
    --verbose                   Print diagnostic messages.
    --warn                      Print warning messages.
    --wrap <name>               Embed everything in a big function, making the
                                “exports” and “global” variables available. You
                                need to pass an argument to this option to
                                specify the name that your module will take
                                when included in, say, a browser.

```

**For Example: **

```bash
terser js/file1.js js/file2.js \
         -o foo.min.js -c -m \
         --source-map "root='http://foo.com/src',url='foo.min.js.map'"
```

> terser-webpack-plugin : the webpack terser



### 分割CSS 

> 因为CSS的下载和JS可以并行,当一个HTML文件很大时,可以把CSS单独提取出来加载.

> 修改 webpack.config.js 增加plugins,将'style-loader' 修改为 loader:MiniCssExtractPlugin.loader .

  * CSS 打包在单独目录

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules : [
      {
        test:/\.css/,
        use: [{loader:MiniCssExtractPlugin.loader},'css-loader'],
        exclude:/node_modules/,
        include:path.resolve(__dirname,'src')        
      },
      {
        test:/\.less/,
        use:[
          {loader:MiniCssExtractPlugin.loader},'css-loader','less-loader'
        ],
        exclude:/node_modules/,
        include:path.resolve(__dirname,'src')
      },
      {
        test:/\.scss/,
        use:[
          {loader:MiniCssExtractPlugin.loader},'css-loader','sass-loader'
        ],
        exclude:/node_modules/,
        include:path.resolve(__dirname,'src')
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    })
  ]
}

```

### 压缩CSS文件

> optimize-css-assets-webpack-plugin

> config webpack.config.js

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer : [
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
}

```

### 打包前先清空输出目录

> clean-webpack-plugin

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

# Resources URL

> loaders

<a href="https://www.webpackjs.com/loaders/" target="webpack-loaders">Webpack Loader</a>

<a href="https://www.webpackjs.com/plugins/" target="webpack-plugins">Webpack Plugins</a>

<a href="https://www.toptal.com/front-end/webpack-browserify-gulp-which-is-b" target="webpack">webpackVSglup</a>
<a href="https://fettblog.eu/gulp-browserify-multiple-bundles/" target="browserify_glup">browserify & glup</a>

> promise-to-callback lib 将promise 转成 callback

> ethjs-ens A convenience interface for using the Ethereum Name Service, based on the EthJS contract abstraction.
 
 MetaMask 通过infura.io rpc 到eth 网络
 

 



