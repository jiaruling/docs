---
title: 插件推荐
---

## 通用插件

### 1. Chinese (Simplified) (简体中文)

### 2. Rainbow Brackets

### 3. git-commit-plugin

### n. Open in External App

- 插件配置

  1. 按下 `Ctrl + Shift + P`，在输入框中输入 `Open settings(json)`

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

## 编程语言

## 其他



