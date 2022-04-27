# 基于 taro 的微信小程序（vue3+Typescript+pinia）

## 规范

该项目采用了 `husky`+`esLint`+`prettier`+`commitLint`+`cz`+`npm-limit`对项目进行规范约束。(在代码提
交前，会自动格式化代码，检测代码质量，不符合规范的代码将会不予提交！)

对于代码提交：  
推荐 将`git commit`操作，换用 `yarn cz`交互式快速提交，当然也可以自己通过`commit -m`填写规范的信息

## 构建项目说明

1. node 版本最好 16.0 以上

   ```sh
   # 查一下node版本
   node -v
   #v16.13.2
   ```

1. 该项目依赖限制只能通过 yarn 安装, 如果安装依赖很慢建议使用 yrm 切换镜像源

   ```sh
   # 安装以下两个全局插件
   npm i yarn -g
   npm i yrm -g
   ```

   ```sh
   # 切换taobao镜像源
   yrm use taobao
   ```

1. 项目通过 tarojs/cli 构建,全局安装`@tarojs/cli`后可以本地预览/开发 👇

   ```sh
   npm i @tarojs/cli -g
   ```

1. 切到项目中,执行以下命令,安装项目依赖 👇

   ```sh
   yarn
   ```

1. 本地开发预览(执行命令后,将 dist 目录导入到微信开发者工具中)

   ```sh
   npm run dev:weapp
   ```

1. 打包构建

   正式包的内网接口版本

   ```sh
   npm run local:weapp
   ```

   正式包的测试服务器接口版本

   ```sh
   npm run build:weapp
   ```

## 发布流程

打包构建后通过微信开发者工具，上传小程序，然后在微信开发者平台，登录小程序主体于版本控制中进行发版

## 最后

1.  @tarojs/plugin-vue-devtools 目前仍有问题。（后续官方弄好了，对于调试会方便很多！）
2.  nutui 的样式按需加载不友好

以上 2 个问题，等官方优化后，对应处理。
