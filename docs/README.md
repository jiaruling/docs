---
home: true
heroImage: /images/hero.png
heroText: null
tagline: 学而不思则罔，思而不学则殆
actions:
  - text: VuePress
    link: https://v2.vuepress.vuejs.org/zh/guide/
    type: primary
  - text: Python
    link: /guide/
    type: secondary
  - text: Docker
    link: /zh/guide/getting-started.html
    type: primary
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | VuePress v2.0.0-beta.35
---

### 开发&部署
```shell
# run project
$ npm run docs:dev # or yarn run docs:dev

# build project
$ yarn run docs:build # or npm run docs:build
# cd 目录
$ cd docs/
# docker build
$ docker build -t vuepress .
# run docker
$ docker run -d --name=vuepress -p 8090:80 vuepress
# 访问 http://127.0.0.1:8090
```
