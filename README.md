# 基于 taro 的微信小程序（vue3+Typescript+pinia）

## 规范

该项目采用了 `husky`+`esLint`+`prettier`+`commitLint`+`cz`+`npm-limit`对项目进行规范约束。(在代码提
交前，会自动格式化代码，检测代码质量，不符合规范的代码将会不予提交！)

对于代码提交：  
推荐 将`git commit`操作，换用 `yarn cz`交互式快速提交，当然也可以自己通过`commit -m`填写规范的信息

## 本地开发预览

```sh
yarn dev:weapp
```

## 打包构建

```sh
yarn build:weapp
```

## 发布流程

打包构建后通过微信开发者工具，上传小程序，然后在微信开发者平台，登录小程序主体于版本控制中进行发版

## taro 现有的问题

1.  @tarojs/plugin-vue-devtools 目前仍有问题。（后续官方弄好了，对于调试会方便很多！）
