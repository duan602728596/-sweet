(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{280:function(module,exports,__webpack_require__){__webpack_require__(281),__webpack_require__(427),module.exports=__webpack_require__(428)},345:function(module,exports){},428:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(215).configure)((function loadStories(){__webpack_require__(617)}),module)}).call(this,__webpack_require__(57)(module))},617:function(module,exports,__webpack_require__){"use strict";(function(module){var _react=__webpack_require__(215),_react2=_interopRequireDefault(__webpack_require__(48)),_MarkDown=_interopRequireDefault(__webpack_require__(618)),_introduction=_interopRequireDefault(__webpack_require__(708)),_quickStart=_interopRequireDefault(__webpack_require__(709)),_README=_interopRequireDefault(__webpack_require__(710)),_README2=_interopRequireDefault(__webpack_require__(711)),_milkteaApi=_interopRequireDefault(__webpack_require__(712)),_README3=_interopRequireDefault(__webpack_require__(713)),_README4=_interopRequireDefault(__webpack_require__(714)),_README5=_interopRequireDefault(__webpack_require__(715)),_demo=_interopRequireDefault(__webpack_require__(716));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(0,_react.addParameters)({options:{theme:{brandTitle:"Sweet - 🍩一个webpack的通用配置解决方案",brandUrl:"https://github.com/duan602728596/sweet"}}});var _ref=_react2.default.createElement(_MarkDown.default,{source:_introduction.default}),_ref2=_react2.default.createElement(_MarkDown.default,{source:_quickStart.default});(0,_react.storiesOf)("sweet",module).add("介绍",(function(){return _ref})).add("快速开始",(function(){return _ref2}));var _ref3=_react2.default.createElement(_MarkDown.default,{source:_README.default}),_ref4=_react2.default.createElement(_MarkDown.default,{source:_README2.default});(0,_react.storiesOf)("packages",module).add("milktea-cli",(function(){return _ref3})).add("milktea(notes)",(function(){return _ref4}),{notes:{markdown:_milkteaApi.default}});var _ref5=_react2.default.createElement(_MarkDown.default,{source:_README3.default}),_ref6=_react2.default.createElement(_MarkDown.default,{source:_README4.default});(0,_react.storiesOf)("packages/server",module).add("server",(function(){return _ref5})).add("server-log",(function(){return _ref6}));var _ref7=_react2.default.createElement(_MarkDown.default,{source:_README5.default});(0,_react.storiesOf)("packages",module).add("util-tools",(function(){return _ref7}));var _ref8=_react2.default.createElement(_MarkDown.default,{source:_demo.default});(0,_react.storiesOf)("demo",module).add("demo",(function(){return _ref8}))}).call(this,__webpack_require__(57)(module))},618:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__(61),__webpack_require__(619);var _react=_interopRequireDefault(__webpack_require__(48)),_reactMarkdown=_interopRequireDefault(__webpack_require__(623));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _extends(){return(_extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i])Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target}).apply(this,arguments)}function MarkDown(props){return _react.default.createElement("div",{className:"markdown-body",style:{padding:"16px"}},_react.default.createElement(_reactMarkdown.default,_extends({escapeHtml:!1},props)))}MarkDown.displayName="MarkDown",MarkDown.__docgenInfo={description:"",methods:[],displayName:"MarkDown"};var _default=MarkDown;exports.default=_default,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["docs/components/MarkDown/MarkDown.js"]={name:"MarkDown",docgenInfo:MarkDown.__docgenInfo,path:"docs/components/MarkDown/MarkDown.js"})},708:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# [![](https://raw.githubusercontent.com/duan602728596/sweet/master/statics/logo.svg?sanitize=true)](https://github.com/duan602728596/sweet)\n\n[sweet](https://github.com/duan602728596/sweet)是一个webpack开发和生产环境的通用配置解决方案。\n\n## 特点：\n\n1. 支持React和Vue的开发，会根据配置自动添加所需要的loaders和plugins。  \n2. 在开发环境下可以选择直接编译到指定目录（适用于Nwjs和Electron的开发），网站的开发可以使用基于Koa的服务器。\n3. 在生产环境下可以编译后快速部署。\n4. 支持react、vue的服务端的渲染。\n\n## packages\n\n* [@sweet-milktea/milktea](https://github.com/duan602728596/sweet/tree/master/packages/milktea/README.md)\n* [@sweet-milktea/milktea-cli](https://github.com/duan602728596/sweet/tree/master/packages/milktea-cli/README.md)\n* [@sweet-milktea/server](https://github.com/duan602728596/sweet/tree/master/packages/server/README.md)\n* [@sweet-milktea/server-log](https://github.com/duan602728596/sweet/tree/master/packages/server-log/README.md)\n* [@sweet-milktea/util-tools](https://github.com/duan602728596/sweet/tree/master/packages/util-tools/README.md)"},709:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# 快速开始\n\n## 启动工程\n\n1. 首先，我们需要下载`@sweet-milktea/milktea`和`@sweet-milktea/milktea-cli`。   \n2. 在工程目录下创建`.sweetrc.js`或`sweet.config.js`文件。\n3. [配置](https://github.com/duan602728596/sweet/blob/master/packages/milktea/README.md#%E9%85%8D%E7%BD%AE%E9%A1%B9)`.sweetrc.js`。\n4. 运行命令`milktea start`。\n\n## 启动服务\n\n1. 如果你想要启动一个服务，还需要下载`@sweet-milktea/server`。\n2. 运行命令`milktea start --server`。\n3. 浏览器内打开`http://127.0.0.1:5050`，开始开发。\n\n## 编译文件\n\n1. 运行命令`milktea build`。\n2. 文件会被编译到`dist`文件夹。\n\n## 运行服务\n\n1. 运行命令`milktea server`。\n2. 浏览器内打开`http://127.0.0.1`，你会看到你的网站。"},710:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# @sweet-milktea/milktea-cli\n\nmilktea-cli是一个快速运行环境的工具。\n\n## 命令\n\n* `milktea dll`: 编译开发环境下使用的dll文件。\n  * `--config`: 选择一个配置文件。\n  * `--webpackLog`: 日志输出类型。progress：进度条，stats：传统的输出方式。默认为progress。\n* `milktea start`: 运行开发环境。\n  * `--config`: 选择一个配置文件。\n  * `--server`: 开启一个Koa服务器，开发环境有效。\n  * `--httpPort`: http服务的端口号。开发环境（默认：5050）和服务器（默认：5052）。\n  * `--httpsPort`: https服务的端口号。开发环境（默认：5051）和服务器（默认：5053）。\n  * `--httpsKey`: 配置https的证书（*.key）。\n  * `--httpsCert`: 配置https的证书（*.crt）。\n  * `--redirectToHttps`: 重定向http到https。\n  * `--useBabelRegister`: 使用`@babel/register`来加载api文件和controllers文件。\n  * `--webpackLog`: 日志输出类型。progress：进度条，stats：传统的输出方式。默认为progress。\n  * `--serverRender`: 开启服务器端渲染。\n  * `--serverRenderRoot`: 服务器端渲染的模块文件目录。默认为`dist-server`。\n  * `--serverRenderFile`: 服务器渲染的主模块文件。默认为`server.js`。\n* `milktea build`: 编译代码。\n  * `--config`: 选择一个配置文件。\n  * `--serverRender`: 开启服务器端渲染。\n  * `--webpackLog`: 日志输出类型。progress：进度条，stats：传统的输出方式。默认为progress。\n* `milktea server`: 启动生产环境的服务器。\n  * `--config`: 选择一个配置文件。\n  * `--httpPort`: http服务的端口号。开发环境（默认：5050）和服务器（默认：80）。\n  * `--httpsPort`: https服务的端口号。开发环境（默认：5051）和服务器（默认：443）。\n  * `--serverRoot`: 服务器静态文件入口。默认为`dist`。\n  * `--log`: 是否开启日志功能。\n  * `--logUrl`: 配置日志的接口，会向接口发送日志来代替本地文件。\n  * `--logPm2`: 是否在pm2环境下运行程序。\n  * `--httpsKey`: 配置https的证书（*.key）。\n  * `--httpsCert`: 配置https的证书（*.crt）。\n  * `--redirectToHttps`: 重定向http到https。\n  * `--useBabelRegister`: 使用`@babel/register`来加载api文件和controllers文件。\n  * `--serverRender`: 开启服务器端渲染。\n  * `--serverRenderRoot`: 服务器端渲染的模块文件目录。默认为`dist-server`。 \n  * `--serverRenderFile`: 服务器端渲染的主模块文件。默认为`server.js`。\n  * `--template`: html模版的文件名。默认为`index.html`。\n  * `--renderType`：html使用的渲染模板，`ejs`或`nunjucks`。默认为`ejs`。\n* `milktea update`: 查看是否有依赖包需要更新。\n  * `--registry`: Npm包信息地址。可能的值为 0：Npm源，1：Yarn源，2：CNpm源。\n* `milktea image2webp`: 将图片批量转换成`*.webp`格式。\n  * `--imageEntry`: 源图片文件夹。\n  * `--imageOutput`: 输出文件夹。\n  * `--quality`: 图片质量。\n* `milktea media2webp`: 将图片、视频批量转换成`*.webp`格式（首先需要自行安装`ffmpeg`）。\n  * `--imageEntry`: 源图片文件夹。\n  * `--imageOutput`: 输出文件夹。\n  * `--ext`: 其他扩展名文件。\n* `milktea imageCompress`: 图片批量压缩。\n  * `--imageEntry`: 源图片文件夹。\n  * `--imageOutput`: 输出文件夹。\n* `milktea image2icns`: 将图片转换成`*.icns`图标。\n  * `--imageEntry`: 转换成icns图标的图片文件。\n  * `--imageOutput`: 输出icns图标文件。\n  * `--size`: icns图标的尺寸。\n  * `--retina`: 1k屏或2k屏。"},711:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# @sweet-milktea/milktea\n\n## 使用\n\n## 如何使用\n\n1. 在工程目录下创建`.sweetrc.js`或`sweet.config.js`文件，然后通过cli工具运行。\n\n2. 在node内运行函数。\n\n```javascript\nimport webpack from 'webpack';\nimport {\n  dll as dllConfig,        // dll编译配置\n  config as webpackConfig, // webpack配置\n  serverRenderConfig,      // webpack服务器端渲染配置\n  callback,                // webpack的回调函数\n  callbackOnlyError        // webpack的回调函数（只显示错误信息）\n} from '@sweet-milktea/milktea';\n\n// mode { string }: 开发模式 development，生产模式 production\n// webpackLog { 'progress' | 'stats' }: 日志输出类型。progress：进度条，stats：传统的输出方式。默认为progress\nconst mode = 'development';\n\nconst compiler = webpack(webpackConfig({\n  // 配置项\n}, mode, webpackLog));\n\ncompiler.run(callback);\n```\n\n## 配置文件`.sweetrc.js`说明\n\n### 使用方法\n\n根目录下创建`.sweetrc.js`文件。代码如下所示：\n\n```javascript\nmodule.exports = {\n  ... // 配置\n};\n```\n\n或\n\n```javascript\nmodule.exports = function(info) {\n  return {\n    ... // 配置\n  };\n};\n```\n\n### 配置项\n\n* mode `{ string }` : 开发模式还是生产模式\n* dll `{ Array<string> }` : 配置需要编译的dll模块\n* entry `{ any }` : 文件入口（参考webpack）\n* output `{ any }` : 文件出口（参考webpack）\n* alias `{ object }` : 模块别名（参考webpack）\n* externals `{ object }` : 外部扩展（参考webpack）\n* resolve `{ object }` : 解析（参考webpack）\n* devtool `{ string }`: 设置SourceMap的类型\n* loaders: 重写loaders的默认规则\n  * js `{ object }` : 重写默认的javascript规则\n  * ts `{ object }` : 重写默认的typescript规则\n  * sass `{ object }` : 重写默认的sass规则\n  * css `{ object }` : 重写默认的css规则\n  * favicon `{ object }` : 重写网站图标的规则\n  * fontFile `{ object }` : 重写字体文件的规则\n  * html `{ object }` : 重写html的规则，默认为pug\n  * image `{ object }` : 重写图片文件的规则\n  * svg `{ object }` : 重写svg的规则\n  * vue `{ object }` : 重写vue的规则\n* rules `{ Array<object> }` : 自定义规则\n* noParse `RegExp | Array<RegExp> | Function` : 防止解析任何与给定正则表达式相匹配的文件（参考webpack）\n* plugins `{ Array<any> }` : 自定义webpack插件\n* js `{ object }` : javascript配置\n  * targets `{ object }` : 配置@babel/preset-env的编译目标\n  * ecmascript `{ boolean }` : 是否编译到ecmascript的最新语法（即不使用@babel/preset-env，通常适用于node、nwjs和electron）\n  * typescript `{ boolean }` : 是否使用typescript编译（即使用@babel/preset-typescript）\n  * presets `{ Array<any> }` : 自定义presets\n  * plugins `{ Array<any> }` : 自定义plugins\n  * resetPresets `{ Array<any> }` : 重写presets\n  * resetPlugins `{ Array<any> }` : 重写plugins\n  * exclude `{ RegExp }` : exclude规则\n  * include `{ RegExp }` : include规则\n* ts `{ object }` : typescript配置\n  * presets `{ Array<any> }` : 自定义babel的presets\n  * plugins `{ Array<any> }` : 自定义babel的plugins\n  * exclude `{ RegExp }` : exclude规则\n  * include `{ RegExp }` : include规则\n* sass `{ object }` : sass配置\n  * publicPath `{ string }`\n  * modules `{ boolean }` : 开启css-in-modules\n  * exclude `{ RegExp }` : exclude规则\n  * include `{ RegExp }` : include规则\n  * prependData `{ string | Function }` : 注入sass变量（参考sass-loader，sass-loader >= 8）\n  * <del> data `{ string | Function }` : 注入sass变量（参考sass-loader，sass-loader < 8） </del>\n  * localIdentName `{ string }` : 配置localIdentName（参考css-loader）\n  * getLocalIdent `{ Function }` : 配置getLocalIdent（参考css-loader）\n* css `{ object }` : css配置（默认使用less）\n  * publicPath `{ string }`\n  * modules `{ boolean }` : 开启css-in-modules\n  * exclude `{ RegExp }` : exclude规则\n  * include `{ RegExp }` : include规则\n  * modifyVars `{ object }` : 注入less变量（参考less-loader）\n  * localIdentName `{ string }` : 配置localIdentName（参考css-loader）\n  * getLocalIdent `{ Function }` : 配置getLocalIdent（参考css-loader）\n* html `{ Array<object> }` : html配置（默认使用pug）\n  * template `{ string }` : html模板文件地址\n  * excludeChunks `{ Array<string> }` : 不包括的入口\n* frame `{ string }` : 值为`react`或`vue`，是否为react或vue模式，并自动注入loaders和plugins\n* chainWebpack `{ Function }` : 通过`webpack-chain`的API扩展或修改webpack配置\n* filesMap `{ boolean | object }` : 输出`filesMap.json`文件，记录了文件的映射。\n\n下面的配置是关于服务器端渲染的\n\n* serverRender `{ boolean }` : 是否开启服务器端渲染\n* severEntry `{ any }` : 服务器端的文件入口（参考webpack）\n* serverOutput `{ any }` : 服务器端文件出口（参考webpack）\n* serverExternals `{ object }` : 服务器端的外部扩展（参考webpack）\n* serverDevtool `{ string }` : 服务器端的SourceMap的类型（参考webpack）\n* serverChainWebpack`{ Function }` : 通过`webpack-chain`的API扩展或修改SSR的webpack配置\n\n### 关于vue\n\n如果使用vue，需要手动安装`@vue/babel-helper-vue-jsx-merge-props`、`@vue/babel-preset-jsx`、`vue-loader`、`vue-svg-loader`、\n`vue-template-compiler`。\n\n### 关于typescript\n\n使用typescript，需要手动安装`typescript`和`ts-loader`。   \n如果`js.typescript`为`true`，则不会配置ts-loader，且ts配置无效。因为typescript编译使用的是babel。\n\n### info\n\ninfo是当前环境的信息。\n\n* info.environment：当前环境，可能的值为`dll`、`client`、`server`。分别为编译dll文件、编译浏览器端代码、编译node端代码。\n\n## 引入svg\n\n### react\n\n```javascript\nimport svgUrl, { ReactComponent as SvgComponent } from './image.svg';\n// svgUrl：svg的图片地址\n// SvgComponent：svg作为react组件\n```\n\n### vue\n\n在vue项目中，如果svg文件匹配`*.component.svg`，则文件作为vue组件引入，否则作为图片地址引入。\n\n```javascript\nimport svgUrl from './image.svg';\nimport SvgComponent from './image.component.svg';\n// svgUrl：svg的图片地址\n// SvgComponent：svg作为vue组件\n```\n\n## [api、服务器端渲染](https://github.com/duan602728596/sweet/blob/master/packages/server/README.md)\n\n## 环境变量\n\n内置了环境变量，根据环境变量判断不同的编译环境。\n\n* `process.env.SWEET_SERVER_RENDER`：判断当前环境是否为服务器端渲染。\n\n## 使用typescript\n\n在项目内添加`tsconfig.json`文件。\n\n## 关于node-sass\n\nnode-sass如果安装失败，可以先到[https://github.com/sass/node-sass/releases](https://github.com/sass/node-sass/releases)下载**binding.node**文件，然后将该文件添加到**SASS_BINARY_PATH**环境变量内。"},712:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="## @sweet-milktea/milktea api\n\n| 配置项 | 类型 | 说明 |\n| ---    | ---  | ---  |\n| mode      | string        | 开发模式还是生产模式    |\n| dll       | Array<string> | 配置需要编译的dll模块   |\n| entry     | any           | 文件入口（参考webpack） |\n| output    | any           | 文件出口（参考webpack） |\n| externals | object        | 外部扩展（参考webpack） |\n| resolve   | object        | 解析（参考webpack）     |\n| devtool   | string        | 设置SourceMap的类型     |\n| loaders   | object        | 重写loaders的默认规则   |\n| - loaders.js       | object | 重写默认的javascript规则  |\n| - loaders.ts       | object | 重写默认的typescript规则  |\n| - loaders.sass     | object | 重写默认的sass规则        |\n| - loaders.css      | object | 重写默认的css规则         |\n| - loaders.favicon  | object | 重写网站图标的规则        |\n| - loaders.fontFile | object | 重写字体文件的规则        |\n| - loaders.html     | object | 重写html的规则，默认为pug |\n| - loaders.image    | object | 重写图片文件的规则        |\n| - loaders.svg      | object | 重写svg的规则             |\n| - loaders.vue      | object | 重写vue的规则             |\n| rules   | Array<object> | 自定义规则        |\n| noParse | RegExp &#124; Array<RegExp> &#124; Function | 防止解析任何与给定正则表达式相匹配的文件（参考webpack）|\n| plugins | Array<any>    | 自定义webpack插件 |\n| js      | object        | javascript配置    |\n| - js.targets      | object        | 配置@babel/preset-env的编译目标 |\n| - js.ecmascript   | boolean       | 是否编译到ecmascript的最新语法（即不使用@babel/preset-env，通常适用于node、nwjs和electron） |\n| - js.presets      | Array<any>    | 自定义presets |\n| - js.plugins      | Array<any>    | 自定义plugins |\n| - js.resetPresets | Array<any>  | 重写presets     |\n| - js.resetPlugins | Array<any>  | 重写plugins     |\n| - js.exclude      | RegExp        | exclude规则   |\n| - js.include      | RegExp        | include规则   |\n| ts           | object        | typescript配置 |\n| - ts.presets | Array<any>    | 自定义presets  |\n| - ts.plugins | Array<any>    | 自定义plugins  |\n| - ts.exclude | RegExp        | exclude规则    |\n| - ts.include | RegExp        | include规则    |\n| sass         | object        | sass配置       |\n| - sass.publicPath | string  | &nbsp; |\n| - sass.modules    | boolean  | 开启css-in-modules |\n| - sass.exclude    | RegExp  | exclude规则 |\n| - sass.include    | RegExp  | include规则 |\n| - sass.data       | string &#124; Function | 注入sass变量（参考sass-loader） |\n| - sass.localIdentName | string   | 配置localIdentName（参考css-loader） |\n| - sass.getLocalIdent  | Function | 配置getLocalIdent（参考css-loader）  |\n| - sass.data  | string &#124; Function | 注入sass变量（参考sass-loader） |\n| css          | object       | css配置 |\n| - css.publicPath | string  | &nbsp; |\n| - css.modules    | boolean | 开启css-in-modules |\n| - css.exclude    | RegExp  | exclude规则 |\n| - css.include    | RegExp  | include规则 |\n| - sass.modifyVars     | object   | 注入less变量（参考less-loader）      |\n| - sass.localIdentName | string   | 配置localIdentName（参考css-loader） |\n| - sass.getLocalIdent  | Function | 配置getLocalIdent（参考css-loader）  |\n| html | Array<object>  | html配置（默认使用pug）          |\n| - html.template       | string        | html模板文件地址 |\n| - html.excludeChunks  | Array<string> | 不包括的入口     |\n| frame        | string   | 值为`react`或`vue`，是否为react或vue模式，并自动注入loaders和plugins |\n| chainWebpack | Function | 通过`webpack-chain`的API扩展或修改webpack配置          |\n| filesMap     | boolean &#124; object | 输出`filesMap.json`文件，记录了文件的映射 |\n\n### 下面的配置是关于服务器端渲染的\n\n| 配置项 | 类型 | 说明 |\n| ---    | ---  | ---  |\n| serverRender | boolean | 是否开启服务器端渲染              |\n| severEntry   | any     | 服务器端的文件入口（参考webpack） |\n| serverOutput | any     | 服务器端文件出口（参考webpack）   |"},713:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# @sweet-milktea/server\n\n## 开发环境下运行服务\n\n### 使用方法\n\n```javascript\nimport webpack from 'webpack';\nimport devServer from '@sweet-milktea/server/devServer';\n\ndevServer({\n  compiler,\n  httpPort,\n  httpsPort,\n  serverRender,\n  serverRenderFile,\n  renderType,\n  serverChain,\n  httpsKey,\n  httpsCert,\n  useBabelRegister,\n  redirectToHttps\n});\n```\n\n### 热替换\n\n你可以使用函数来包装入口文件。\n\n```javascript\nimport hotClientEntry from '@sweet-milktea/server/hotClientEntry';\n\nexport default {\n  entry: hotClientEntry({\n    index: [path.join(__dirname, 'src/index.js')]\n  })\n};\n```\n\n或者自行包装入口，path配置为`/___WEBPACK_HMR___`。\n\n```javascript\nexport default {\n  entry: {\n    index: [path.join(__dirname, 'src/index.js'), 'webpack-hot-middleware/client?path=/___WEBPACK_HMR___']\n  }\n};\n```\n\n### 配置\n\n* compiler `{ object }` : webpack的compiler。\n* httpPort `{ number }` : http端口号，默认为5050。\n* httpsPort `{ number }` : https端口号，默认为5051。\n* serverRender `{ boolean }` : 开启服务器端渲染。\n* serverRenderRoot { string }: 服务器端渲染的文件夹。默认为`dist-server`。\n* serverRenderFile `{ string }` : 服务器端渲染的主模块文件。默认为`server.js`。\n* renderType `{ string }` : html使用的渲染模板，`ejs`或`nunjucks`。默认为`ejs`。**如果使用`nunjucks`，请自行下载依赖**。\n* serverChain `{ (app: Koa) => Promise<void> }` : 扩展koa中间件配置。\n* httpsKey `{ string }` : 配置https的证书（*.key）。\n* httpsCert `{ string }` : 配置https的证书（*.crt）。\n* useBabelRegister `{ boolean }` : 是否使用`@babel/register`来加载api文件和controllers文件。默认开启。\n* controllersDir `{ string }` : 重新定义的controllers的目录。\n* apiFile `{ string }` : 重新定义的api文件。\n* proxyFile `{ string }` : 重新定义的proxy文件。\n* redirectToHttps `{ boolean }` : 开启https的情况下，重定向http到https。\n\n## 生产环境下运行服务\n\n### 使用方法\n\n```javascript\nimport proServer from '@sweet-milktea/server/proServer';\n\nproServer({\n  httpPort,\n  httpsPort,\n  serverRoot,\n  serverRender,\n  serverRenderFile,\n  renderType,\n  log,\n  serverChain,\n  httpsKey,\n  httpsCert,\n  useBabelRegister,\n  redirectToHttps\n});\n```\n\n### 配置\n\n* httpPort `{ number }` : http端口号，默认为80。\n* httpsPort `{ number }` : https端口号，默认为443。\n* serverRoot `{ string }` : 生产环境下的服务器静态文件入口。默认为`dist`。\n* serverRender `{ boolean }` : 开启服务器端渲染。\n* serverRenderRoot { string }: 服务器端渲染的文件夹。默认为`dist-server`。\n* serverRenderFile `{ string }` : 服务器端渲染的主模块文件。默认为`server.js`。\n* renderType `{ string }` : html使用的渲染模板，`ejs`或`nunjucks`。默认为`ejs`。**如果使用`nunjucks`，请自行下载依赖**。\n* log `{ object }` : 日志配置。\n  * type `{ 'file' | 'http' }` : 日志类型，本地*file* 或 远程接口*http*。\n  * pm2 `{ boolean }` : 服务是否在pm2状态下运行。\n  * url `{ string }` : 日志的远程接口。\n* serverChain `{ (app: Koa) => Promise<void> }` : 扩展koa中间件配置。\n* httpsKey `{ string }` : 配置https的证书（*.key）。\n* httpsCert `{ string }` : 配置https的证书（*.crt）。\n* useBabelRegister `{ boolean }` : 是否使用`@babel/register`来加载api文件和controllers文件。默认开启。\n* controllersDir `{ string }` : 重新定义的controllers的目录。\n* apiFile `{ string }` : 重新定义的api文件。\n* proxyFile `{ string }` : 重新定义的proxy文件。\n* redirectToHttps `{ boolean }` : 开启https的情况下，重定向http到https。\n\n## sweetOptions\n\n你可以在任何中间件内通过`ctx.sweetOptions`拿到当前服务的配置。\n\n## 服务器端渲染\n\n服务器端渲染需要你创建`controllers`文件夹，文件夹里面的规则为: 你的路由中的 **“/”** 替换为 **“.”**，或者为文件夹。\n比如`/Path/PathFile`，则需要创建`/Path.PathFile.ts`、`/Path.PathFile.js`文件\n或`/Path/PathFile.ts`、`/Path/PathFile.js`文件。   \n\n在文件内，需要创建如下代码:\n\n```javascript\nmodule.exports = async function(ctx, sweetOptions) {\n  return {\n    initialState, // 返回初始化的state\n    ...           // 你要返回的其他数据\n  };\n}\n```\n\n在pug或html模板中，使用`<%- key %>`来标记占位的数据。其中`<%- render %>`表示服务器端渲染的数据，\n`<%- initialState %>`表示初始化数据，其他的占位数据同理。参考*ejs*。   \n\n如果路由找不到对应的interface文件，会自动寻找`default.ts`或`default.js`文件。你可以创建这个文件作为默认的interface文件。\n\n入口文件为：\n\n```javascript\nfunction server(url, context = {}, initialState = {}) {\n  return ''; // 返回字符串、stream对象或Promise\n}\n\nexport default server;\n```\n\n在入口文件内，你可以通过`context.routePath`拿到当前真实的path。\n\n## api\n\n创建一个`api/api.ts`或`api/api.js`文件，代码如下\n\n```javascript\nmodule.exports = function(router, sweetOptions, app) {\n  // 在这里面创建你的函数\n  router.get('/path', /* ...your_functions */);\n};\n```\n\n## 代理\n\n创建一个`proxy/proxy.ts`、`proxy/proxy.js`或`proxy/proxy.json`文件，\n代码配置参考[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)\n\n```javascript\nmodule.exports = function(sweetOptions, app) {\n  return {\n    '/proxy': {\n      target: 'http://127.0.0.1',\n      changeOrigin: true,\n      pathRewrite: {\n        '^/proxy': ''\n      }\n    }\n  };\n};\n```\n\n## mock\n\n创建一个`mock/mock.ts`或`mock/mock.js`文件，代码如下\n\n```javascript\nmodule.exports = {\n  // 使用方法\n  'GET /mock/data': { data: [1, 2] },\n  \n  // 省略请求方法时，默认的请求方法为GET\n  '/mock/data': { data: [1, 2] },\n  \n  // 支持自定义函数，API 参考 koa 和 @koa/router\n  'POST /mock/data': (ctx, next) => ctx.body = 'ok'\n};\n\n// 或者返回一个函数\n\nmodule.exports = function() {\n  return {\n    'GET /mock/data': { data: [1, 2] }\n  };\n};\n```\n\n## 关于https证书\n\n证书放在目录下会自动生效。\n开发环境下的证书安装，参考[https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)。\n\n* 开发环境下的证书，命名为`dev.*`，放在当前目录。\n* 生产环境下的证书，命名为`server.*`，放在当前目录。"},714:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# @sweet-milktea/server-log\n\n生产环境下的日志扩展。\n\n## 使用方法\n\n```javascript\nimport serverLog from '@sweet-milktea/server-log';\n\nconst { accessLogger, logger } = serverLog(type, {\n  pm2,\n  basicPath,\n  url\n});\n```\n\n## 参数\n\n* type `{ 'file' | 'http' }` : 日志类型，本地*file* 或 远程接口*http*。\n* options `{ object }` : 配置项。\n  * pm2 `{ boolean }` : 服务是否在pm2状态下运行。\n  * basicPath `{ string }` : *.logs*文件夹在本地的目录。\n  * url `{ string }` : 日志的远程接口。\n\n## 返回值\n\n* accessLogger `{ Function }` : Koa日志中间件。\n* logger `{ object }` : 创建日志方法。方法参考[log4js](https://github.com/log4js-node/log4js-node)。"},715:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# @sweet/util-tools\n\n一些通用的工具。\n\n## webp图片、视频批量转换工具\n\n首先需要自行安装`ffmpeg`。\n\n使用方法：\n\n```javascript\nimport media2webp from '@sweet-milktea/util-tools/media2webp';\n\nmedia2webp(\n  './src',        // 入口文件夹\n  './build',      // 输出文件夹\n  true,           // 是否包含视频\n  ['ogg', 'rmvb'] // 配置其他想要转换的格式\n);\n```\n\n## 查看当前工程下是否有依赖需要升级\n\n使用方法：\n\n```javascript\nimport update from '@sweet-milktea/util-tools/update';\n\nupdate(\n  ['path/to/project'], // 项目工程目录的数组\n  0                    // Npm包信息地址。0：Npm，1：Yarn，2：CNpm。\n);\n```\n\n## webp图片批量转换工具\n\n使用方法：\n\n```javascript\nimport image2webp from '@sweet-milktea/util-tools/image2webp';\n\nimage2webp(\n  './src',   // 入口文件夹\n  './build', // 输出文件夹\n  70         // 图片质量\n);\n```\n\n## 图片压缩工具\n\n使用方法：\n\n```javascript\nimport imageCompress from '@sweet-milktea/util-tools/imageCompress';\n\nimageCompress(\n  './src',   // 入口文件夹\n  './build', // 输出文件夹\n  // 图片压缩选项配置\n  {\n    png: {},\n    jpg: {},\n    gif: {}\n  }\n);\n```\n\n### 压缩选项：\n\n* png：[https://github.com/imagemin/imagemin-pngquant#api](https://github.com/imagemin/imagemin-pngquant#api)\n* jpg：[https://github.com/imagemin/imagemin-jpegoptim#api](https://github.com/imagemin/imagemin-jpegoptim#api)\n* gif：[https://github.com/imagemin/imagemin-gifsicle#api](https://github.com/imagemin/imagemin-gifsicle#api)\n\n## 生成icns图标\n\n使用方法：\n\n```javascript\nimport image2icns from '@sweet-milktea/util-tools/image2icns';\n\nimage2icns(\n  './1024x1024.png',  // 输入图片\n  './1024x1024.icns', // 生成图标\n  {\n    size: 512, // 尺寸\n    retina: 2  // 1k屏或2k屏 \n  }\n);\n```\n\n如果retina的值为1：则size的值为16、32、128、256、512、1024。   \n如果retina的值为2：则size的值为16、32、128、256、512。"},716:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_exports__.default="# demo\n\n如果你想快速搭建环境，可以参考[react](https://github.com/duan602728596/sweet/tree/react-demo)和[vue](https://github.com/duan602728596/sweet/tree/vue-demo)的demo。"}},[[280,1,2]]]);
//# sourceMappingURL=main.1bcb5c68c565af93194c.bundle.js.map