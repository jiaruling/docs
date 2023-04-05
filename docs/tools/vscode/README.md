---
title: 配置 VSCode
---

## 编辑器通用配置

### 1. font

- **字体和大小**

![](/images/vscode1.jpg)

![](/images/vscode2.jpg)

![](/images/vscode3.jpg)

- **窗口字体大小**

![](/images/vscode6.jpg)

- **关键字斜体**

  - 按下 `Ctrl + Shift + P`，在输入框中输入 `Open User settings(JSON)`
  - 在 `settings.json` 文件中添加如下内容, 并保存

  ```json
  {
    "editor.fontLigatures": true,
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "name": "italic font",
                "scope": [
                    "comment",
                    "keyword",
                    "storage",
                    "keyword.control.import",
                    "keyword.control.default",
                    "keyword.control.from",
                    "keyword.operator.new",
                    "keyword.control.export",
                    "keyword.control.flow",
                    "storage.type.class",
                    "storage.type.function",
                    "storage.type",
                    "storage.type.class",
                    "variable.language",
                    "variable.language.super",
                    "variable.language.this",
                    "meta.class",
                    "meta.var.expr",
                    "constant.language.null",
                    "support.type.primitive",
                    "entity.name.method.js",
                    "entity.other.attribute-name",
                    "punctuation.definition.comment",
                    "text.html.basic entity.other.attribute-name.html",
                    "text.html.basic entity.other.attribute-name",
                    "tag.decorator.js entity.name.tag.js",
                    "tag.decorator.js punctuation.definition.tag.js",
                    "source.js constant.other.object.key.js string.unquoted.label.js",
                ],
                "settings": {
                    "fontStyle": "italic",
                }
            },
        ]
    },
  }
  ```


### 2. theme

- **安装插件**
  - One Dark Pro

  - Material Icon Theme

- **配置主题和图标**

 ![](/images/vscode4.jpg)

- 修改样式颜色
  - 按下 `Ctrl + Shift + P`，在输入框中输入 `Open User settings(JSON)`
  - 在 `settings.json` 文件中添加如下内容, 并保存
  ```json
  {
    "workbench.colorCustomizations": {
        "editor.foreground": "#d19a66",
    },
    "editor.tokenColorCustomizations": {
        "[One Dark Pro]": {
            "textMateRules": [
                {
                    "name": "Variables",
                    "scope": "variable",
                    "settings": {
                        "foreground": "#d19a66"
                    }
                },
                {
                    "name": "Functions",
                    "scope": [
                        "entity.name.function",
                        "meta.require",
                        "support.function.any-method",
                        "variable.function"
                    ],
                    "settings": {
                        "foreground": "#61aeef"
                    }
                },
                {
                    "name": "Support",
                    "scope": "support.function",
                    "settings": {
                        "foreground": "#61aeef"
                    }
                },
                {
                    "name": "go operator",
                    "scope": [
                        "keyword.operator.assignment.go"
                    ],
                    "settings": {
                        "foreground": "#61afef"
                    }
                },
                {
                    "name": "keyword.operator",
                    "scope": "keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational",
                    "settings": {
                        "foreground": "#61afef"
                    }
                },
            ]
        }
    },
  }
  ```



## 通用插件

### 1. Git

#### 1.1 git-commit-plugin (git commit 模板)

#### 1.2 GitLens — Git supercharged (Git 日志查看工具)

#### 1.3 Git History

#### 1.4 Git Graph

### 2. Code Runner (代码运行)

### 3. 代码补全插件

#### 3.1 Tabnine AI Autocomplete

#### 3.2 GitHub Copilot

### 4. 日志插件

#### 4.1 Log File Highlighter (日志高亮)

插件配置

1. 按下 `Ctrl + Shift + P`，在输入框中输入 `Open User settings(JSON)`

2. 在 `settings.json` 文件中添加如下内容, 并保存

```json
"logFileHighlighter.customPatterns": [
        {
            "pattern": "error|Error|ERROR",
            "foreground": "#bf1f1f",
            // "background": "#18b933"
        },
        {
            "pattern": "\\[.*\\]",
            "foreground": "#bf1f1f",
            "background": "#18b933"
        }
    ],
```

### 5. Todo Tree

插件配置

1. 按下 `Ctrl + Shift + P`，在输入框中输入 `Open User settings(JSON)`
2. 在 `settings.json` 文件中添加如下内容, 并保存

```json
 {
	 //todo-tree settings
     // https://primer.style/octicons/
    "todo-tree.regex.regex": "((//|#|<!--|;|/\\*|^)\\s*($TAGS):|^\\s*- \\[ \\])",
    "todo-tree.general.tags": [
        "todo", // 待完成
        "bug", // bug
        "fixme", // 已知的无法运行的代码
        "tag", // 标签
        "done", // 已完成
        "note", // 笔记
        "wait for test" // 等待测试: wait for test
    ],
    "todo-tree.regex.regexCaseSensitive": false,
    "todo-tree.highlights.defaultHighlight": {
        "foreground": "#FFFFFF",
        "background": "#FFD700",
        "icon": "check-circle",
        "rulerColour": "#FFD700",
        "type": "tag",
        "iconColour": "#FFD700",
        "gutterIcon": true
    },
    "todo-tree.highlights.customHighlight": {
        "todo": {
            "background": "#FFD700",
            "rulerColour": "#FFD700",
            "iconColour": "#FFD700"
        },
        "bug":{
            "background": "#A31EAD",
            "icon": "alert",
            "rulerColour": "#A31EAD",
            "iconColour": "#A31EAD",
        },
        "fixme": {
            "background": "#FF3030",
            "icon": "flame",
            "rulerColour": "#FF3030",
            "iconColour": "#FF3030",
        },
        "tag": {
            "background": "#1E90FF",
            "icon": "tag",
            "rulerColour": "#1E90FF",
            "iconColour": "#1E90FF",
            "rulerLane": "full"
        },
        "done": {
            "background": "#00FF00",
            "icon": "check-circle-fill",
            "rulerColour": "#00FF00",
            "iconColour": "#00FF00",
        },
        "note": {
            "background": "#FF9900",
            "icon": "note",
            "rulerColour": "#FF9900",
            "iconColour": "#FF9900",
        },
        "wait for test": {
            "background": "#ec1a24",
            "icon": "info",
            "rulerColour": "#ec1a24",
            "iconColour": "#ec1a24",
        },
    },
 }
```

## 编程语言插件

### 1. 配置文件插件

#### 1.1 YAML [YMAL入门教程](https://www.runoob.com/w3cnote/yaml-intro.html)

#### 1.2 Better TOML [TOML学习](https://github.com/LongTengDao/TOML)

#### 1.3 vscode-proto3 [Protocol Buffers](https://developers.google.com/protocol-buffers)

### 2. Golang插件

#### 2.1 Go (带自动补全功能)

#### 2.2 Create tests (golang自动生成测试代码)

```shell
# 安装生成工具  https://github.com/cweill/gotests
$ go get -u github.com/cweill/gotests/...
```

### 3. python插件

#### 3.1 Python  (带自动补全功能)

#### 3.2 Pylance

#### 3.3 isort

## 其他插件

### 1. Chinese (Simplified) (简体中文)

### 2. Rainbow Brackets (彩虹括号)

### 3. Docker

### 4. IntelliJ IDEA Keybindings (JetBrains 快捷键)

### 5.filesize (查看当前文件大小)

### 6. File Utils (文件增删改查)

### 7. WakaTime (IDE使用统计)

### 8. Markdown Preview Enhanced (markdown查看器)

### 9. Trailing Spaces (多余空格显示)

### 10. REST Client (http客户端发送请求) [参考](https://www.pkslow.com/archives/vscode-rest-client)

### 11. Remote Development

#### 11.1WSL

#### 11.2 Dev Containers

- vscode 连接容器配置
  1. setings 中输入 `docker host`
  2. 配置`tcp://localhost:2375`

  ![](/images/vscode5.jpg)

#### 11.3 Remote - SSH

#### 11.4 Remote - SSH: Editing Configuration File

### 12. Inline SQL (SQL语句高亮)
### 13. Open in External App (打开外部应用)

- 插件配置

  1. 按下 `Ctrl + Shift + P`，在输入框中输入 `Open User settings(JSON)`

  2. 在 `settings.json` 文件中添加如下内容, 并保存

```json
{
    "openInExternalApp.openMapper": [
        {
            // 用浏览器打开html文件
            "extensionName": "html",
            "apps": [
                {
                    "title": "chrome",
                    "openCommand": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
                },
                {
                    "title": "edge",
                    "openCommand": "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
                }
            ]
        },
        {
            // 使用typora打开md文件
            "extensionName": "md",
            "apps": [
                {
                    "title": "typora",
                    "isElectronApp": true,
                    // "openCommand": "E:\\Program Files\\Typora\\Typora.exe"
                }
            ]
        }
    ]
}
```

### 14. SFTP (本地和远程代码同步)

### 15. Ansible （Ansible开发工具）



