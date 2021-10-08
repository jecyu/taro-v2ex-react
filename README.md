# taro-v2ex-react

taro 3.x 渐进式入门教程
## 启动环境

由于 v2ex 没有在国内备案，无法上线使用，因为上线要在小程序后台配置服务器域名 https、且在国内备案的。

目前把对应的 json 数据下载到本地，然后通过 json-server 基于这些 json 建立对应的 rest api 即可。

静态图片：使用 http-server 提供静态图片服务。

启动编译：
```sh
yarn dev:weapp
```

启动 json 服务：
```sh
yarn mock
```

启动静态图片服务：
```sh
yarn mock:static
```