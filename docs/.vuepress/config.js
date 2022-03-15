module.exports = {
  // 站点配置
  base: '/docs/',
  lang: 'zh-CN',
  title: 'VuePress',
  description: '这是我的第一个 VuePress 站点',
  actionsText: "快速开始",
  actionsLink: "/",
  port: 8089, // 端口

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

    // 导航栏
    navbar: [
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
          { text: 'Interview', link: '/interview/' },
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
      {
        text: '项目',
        children: [
          { text: "微服务网关", link: "/combat/gateway/" },
        ],
      },
      // 下拉列表显示分组
      {
        text: '大佬',
        children: [
          {
            text: 'Blogs',
            children: [
              { text: 'Draven', link: 'https://draveness.me/' },
              { text: '大俊', link: 'https://darjun.github.io/' },
              { text: '刘江', link: 'https://www.liujiangblog.com/' },
              { text: '写代码的明哥', link: 'https://www.cnblogs.com/wongbingming/' },
            ]
          },
          {
            text: 'Github',
            children: [
              { text: "niuyufu", link: "https://github.com/e421083458" }
            ]
          },
          {
            text: 'Video',
            children: [
              { text: '麦兜搞IT', link: 'https://www.youtube.com/c/%E9%BA%A6%E5%85%9C%E6%90%9EIT/featured' },
              { text: '零度解说', link: 'https://www.youtube.com/c/%E9%9B%B6%E5%BA%A6%E8%A7%A3%E8%AF%B4/featured' },
              { text: 'Topbook', link: 'https://topbook.cc/overview' },
            ]
          }
        ]
      },

      {
        text: '书籍',
        children: [
          { text: "《Go 语言设计与实现》", link: "https://draveness.me/golang/" },
          { text: "《Docker - 从入门到实践》", link: "https://yeasy.gitbook.io/docker_practice/" },
          { text: "《Mastering Go》", link: "https://www.kancloud.cn/cloud001/golang/1601804" },
        ],
      },
      {
        text: '资源',
        children: [
          {
            text: 'Golang',
            children: [
              { text: 'Topgoer', link: 'https://www.topgoer.com/' },
              { text: 'GoCN', link: 'https://gocn.vip/' },
            ],
          },
          {
            text: 'Redis',
            children: [
              { text: "Redisdoc", link: 'http://redisdoc.com/' },
              { text: "RedisFans", link: 'http://doc.redisfans.com/' },
            ]
          },
          {
            text: 'Github',
            children: [
              { text: "Qmgo", link: 'https://github.com/qiniu/qmgo' },
              { text: "Learning Lab", link: 'https://lab.github.com/' },
            ]
          }
        ]
      },
      {
        text: '工具',
        children: [
          {
            text: "dev",
            children: [
              { text: 'VuePress', link: "https://v2.vuepress.vuejs.org/zh/" },
              { text: 'GoTests-Sublime', link: "https://github.com/cweill/GoTests-Sublime" },
              { text: 'Casbin', link: 'https://casbin.org/docs/zh-CN/overview' },
            ]
          },
          {
            text: "ops",
            children: [
              { text: "fish-shell", link: 'https://github.com/fish-shell/fish-shell' },
              { text: "Yearning", link: 'http://yearning.io/' },
            ]
          },
          {
            text: 'test',
            children: [
              { text: 'wrk', link: 'https://github.com/wg/wrk'}
            ]
          }
        ]
      },
      {
        text: '关于',
        children: [
          { text: 'Github', link: 'https://github.com/jiaruling' },
          { text: 'Docker Hub', link: 'https://hub.docker.com/' },

        ]
      },
    ],

    // 侧边栏
    sidebar: {
      '/ops/': [
        {
          text: '运维',
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
            'PerformanceTuning.md',
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
