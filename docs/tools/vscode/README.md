---
title: 配置 VSCode
---

## 编辑器通用配置

### 1. font

- **字体和大小**

![](/images/vscode1.jpg)

![](/images/vscode2.jpg)

![](/images/vscode3.jpg)

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

## 通用插件

### 1. Chinese (Simplified) (简体中文)

### 2. Rainbow Brackets (彩虹括号)

### 3. git-commit-plugin (git commit 模板)

### 4. GitLens — Git supercharged (Git 日志查看工具)

### 5. Open in External App (打开外部应用)

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

### 6. 日志插件

#### 6.1 Log File Highlighter （日志高亮）

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

### 7. Markdown Preview Enhanced （markdown查看器）

### 8. 代码补全插件

#### 8.1 Tabnine AI Autocomplete

#### 8.2 Kite

#### 8.3 GitHub Copilot

### 9. 配置文件插件

#### 9.1 YAML [YMAL入门教程](https://www.runoob.com/w3cnote/yaml-intro.html)

#### 9.2 Better TOML [TOML学习](https://github.com/LongTengDao/TOML)

### 10. Docker



## 编程语言

### 1. Golang

#### 1.1 Create tests （golang自动生成测试代码）

```shell
# 安装生成工具  https://github.com/cweill/gotests
$ go get -u github.com/cweill/gotests/...
```



## 其他



