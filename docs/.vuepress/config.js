module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: 'VuePress',
  description: '这是我的第一个 VuePress 站点',
  base: '/',
  actionsText: "快速开始",
  actionsLink: "/",
  port: 8089,

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  sidebar: 'auto',
  head: [
    ['link', { rel: 'icon', href: '/images/hero.png' }]
  ],
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
        searchMaxSuggestions: 10
      },
    ],
  ],
  themeConfig: {
    logo: '/images/logo.png',
    navbar: [ // 导航栏
      {
        text: '导航',
        children: [
          { text: "Golang", link: "/golang/" },
          { text: "Python", link: "/python/" },
          { text: "JavaScript", link: "/JavaScript/" },
          { text: "Shell", link: "/shell/" },
          { text: "DataBase", link: "/database/" },
          { text: "Ops", link: "/ops/" },
          { text: "Cmd", link: "/cmd/" },
          { text: '面试题', link: '/interview/' },
          {
            text: "Framework",
            children: [
              { text: "Gin", link: "/golang/" },
              { text: "Django", link: "/python/" },
              { text: "Vue", link: "/JavaScript/" },
            ],
          },
        ],
      },
      // 下拉列表显示分组
      {
        text: '高级',
        children: [
          {
            text: '算法',
            children: [
              { text: '冒泡', link: '/language/chinese/' },
              { text: '快速', link: '/language/japanese/' },
            ]
          },
          {
            text: '设计模式',
            children: [
              { text: '工厂', link: '/language/chinese' },
              { text: '单例', link: '/language/chinese' },
            ]
          },
        ]
      },
      {
        text: '实战',
        children: [
          { text: "微服务网关", link: "/combat/gateway/" },
        ],
      },
      // 外部链接
      {
        text: 'Github',
        link: 'https://github.com/jiaruling',
      },
      {
        text: 'Docker Hub',
        link: 'https://hub.docker.com/',
      },
      {
        text: 'VuePress',
        link: "https://v2.vuepress.vuejs.org/zh/",
      }
    ],
    // 侧边栏
    sidebar: {
      '/ops/': [
        {
          text: '实战项目',
          collapsible: true,
          children: [
            '/ops/README.md',
            '/ops/linux shell.md',
            '/ops/nginx常用部署.md',
            '/ops/alpine镜像设置时区.md',
            '/ops/cicd.md'
          ],
        },
      ],
      '/cmd/': [
        {
          text: '常用命令',
          collapsible: true,
          children: [
            '/cmd/README.md',
            '/cmd/python.md',
            '/cmd/anaconda.md',
            '/cmd/golang.md',
            '/cmd/docker.md',
            '/cmd/docker-compose.md',
            '/cmd/git.md',
            '/cmd/git常用命令.md',
            '/cmd/JetBrains 快捷键.md',
            '/cmd/linux.md',
            '/cmd/linux常用.md',
          ]
        },
      ],
      '/golang/': [
        {
          text: "Golang",
          collapsible: true,
          children: [
            '/golang/README.md',
            '/golang/base.md',
          ]
        },
      ],
      '/interview/': [
        {
          text: "面试题",
          collapsible: true,
        }
      ],
      '/combat/gateway/': [
        {
          text: "微服务网关",
          collapsible: true,
          children: [
            "/combat/gateway/README.md",
            "/combat/gateway/net.md",
          ]
        }
      ],
    },
  },
}