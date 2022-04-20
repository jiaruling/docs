module.exports = {
  // 站点配置
  base: "/docs/",
  lang: 'zh-CN',
  title: 'gopherDevOps',
  description: '这是我的第一个 VuePress 站点',
  port: 8089, // 端口

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  sidebar: 'auto',
  head: [
    ['link', { rel: 'icon', href: '/images/hero.png' }],
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
    ]
  ],
  themeConfig: {
    logo: '/images/logo.png',
    // 导航栏
    navbar: [
      {
        text: '导航',
        children: [
          { text: "工具", link: "/tools/linux/"},
          { text: "语言", link: "/language/"},
          { text: "运维", link: "/ops/" },
          { text: '面试', link: '/interview/' },
          { text: '设计模式', link: '/DesignPattern/' }
        ],
      },
      {
        text: '实战',
        children: [
          { text: "微服务网关", link: "/combat/gateway/" },
        ],
      },
      { text: "资源", link: "/resource/"},
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
            '/ops/cicd.md',
            '/ops/dockerManagement.md',
            '/ops/kubernetesManagement.md',
            '/ops/privateDockerRegistry.md',
            '/ops/privateGitRegistry.md',
            '/ops/powershell.md',
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
            '/golang/history.md',
            '/golang/springhead.md',
            '/golang/base.md',
            'PerformanceTuning.md',
          ]
        },
      ],
      '/interview/': [
        {
          text: "面试题",
          collapsible: true,
          children: [
            "/interview/README.md",
          ]
        }
      ],
      '/combat/gateway/': [
        {
          text: "微服务网关",
          collapsible: true,
          children: [
            "/combat/gateway/README.md",
            "/combat/gateway/net.md",
            "/combat/gateway/http_proxy.md",
          ]
        }
      ],
      '/DesignPattern/': [
        {
          text: '设计模式',
          collapsible: true,
          children: [
            "/DesignPattern/README.md",
            "/DesignPattern/createPattern.md",
            "/DesignPattern/structPattern.md",
            "/DesignPattern/actionPattern.md",
            "/DesignPattern/J2EEPattern.md",
            "/DesignPattern/summary.md",
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Linux',
          collapsible: true,
          children: [
            '/tools/linux/README.md',
          ]
        },
        {
          text: 'Git',
          collapsible: true,
          children: [
            '/tools/git/README.md',
            '/tools/git/1.BestPractice.md',
            '/tools/git/2.BasePrinciple.md',
          ]
        },
        {
          text: 'Docker',
          collapsible: true,
          children: [
            '/tools/docker/README.md',
          ]
        },
        {
          text: 'Vagrant',
          collapsible: true,
          children: [
            '/tools/vagrant/README.md',
          ]
        },
        {
          text: 'Ansible',
          collapsible: true,
          children: [
            '/tools/ansible/README.md',
          ]
        }
      ]
    },
  },
}
