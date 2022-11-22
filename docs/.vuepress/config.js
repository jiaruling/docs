module.exports = {
  // 站点配置
  base: "/", // "/" -> 部署  "/docs/" -> 开发
  lang: 'zh-CN',
  title: 'DevOps',
  description: '学而不思则罔，思而不学则殆',
  port: 8089, // 本地开发运行端口

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
          { text: "工具", link: "/tools/linux/" },
          { text: "运维", link: "/ops/" },
          { text: '面试', link: '/interview/' },
          { text: "编程语言", link: "/language/" },
          { text: '设计模式', link: '/design_pattern/' }
        ],
      },
      {
        text: '实战',
        children: [
          { text: "微服务网关", link: "/combat/gateway/" },
        ],
      },
      { text: "资源", link: "/resource/" },
      { text: "命令速查", link: "/command/" },
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
            '/ops/cpu架构.md',
            '/ops/nginx常用部署.md',
            '/ops/alpine镜像设置时区.md',
            '/ops/cicd.md',
            '/ops/kubernetesManagement.md',
          ],
        },
      ],
      '/language/': [
        {
          text: '概览',
          collapsible: true,
          children: [
            '/language/README.md',
          ]
        },
        {
          text: "Golang",
          collapsible: true,
          children: [
            '/language/golang/README.md',
            '/language/golang/history.md',
            '/language/golang/springhead.md',
            '/language/golang/base.md',
            '/language/golang/PerformanceTuning.md',
          ]
        },
        {
          text: "C",
          collapsible: true,
          children: [
            '/language/c/README.md',
          ]
        },
        {
          text: "JavaScript",
          collapsible: true,
          children: [
            '/language/javaScript/README.md',
          ]
        },
        {
          text: "Python",
          collapsible: true,
          children: [
            '/language/python/README.md',
          ]
        },
        {
          text: "Rust",
          collapsible: true,
          children: [
            '/language/rust/README.md',
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
        },
        {
          text: "MySQL",
          collapsible: true,
          children: [
            "/interview/module/mysql/README.md",
            "/interview/module/mysql/1.mysql版本问题.md"
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
      '/design_pattern/': [
        {
          text: '设计模式',
          collapsible: true,
          children: [
            "/design_pattern/README.md",
            "/design_pattern/createPattern.md",
            "/design_pattern/structPattern.md",
            "/design_pattern/actionPattern.md",
            "/design_pattern/J2EEPattern.md",
            "/design_pattern/summary.md",
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Linux',
          collapsible: true,
          children: [
            '/tools/linux/README.md',
            '/tools/linux/1.linux shell.md',
            '/tools/linux/2.powershell.md',
          ]
        },
        {
          text: 'Git',
          collapsible: true,
          children: [
            '/tools/git/README.md',
            "/tools/git/0.privateGitRegistry.md",
            '/tools/git/1.BestPractice.md',
            '/tools/git/2.BasePrinciple.md',
          ]
        },
        {
          text: 'Docker',
          collapsible: true,
          children: [
            '/tools/docker/README.md',
            '/tools/docker/1.dockerManagement.md',
            '/tools/docker/2.privateDockerRegistry.md',
          ]
        },
        {
          text: 'Vagrant',
          collapsible: true,
          children: [
            '/tools/vagrant/README.md',
            '/tools/vagrant/firstVM.md',
            '/tools/vagrant/downloadImages.md',
            '/tools/vagrant/cmd.md',
            '/tools/vagrant/VagrantFile.md',
            '/tools/vagrant/box.md',
            '/tools/vagrant/networking.md',
            '/tools/vagrant/provisioning.md',
          ]
        },
        {
          text: 'Ansible',
          collapsible: true,
          children: [
            '/tools/ansible/README.md',
            '/tools/ansible/install.md',
            '/tools/ansible/inventory.md',
            '/tools/ansible/playbook.md',
            '/tools/ansible/playbookUse.md',
            '/tools/ansible/modules.md',
            '/tools/ansible/setup.md',
          ]
        },
        {
          text: 'vscode',
          collapsible: true,
          children: [
            "/tools/vscode/README.md",
          ]
        }
      ]
    },
  },
}
