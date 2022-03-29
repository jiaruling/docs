---
title: PowerShell 
---

::: tip 资源

 [配置一个漂亮的Windows Powershell](https://www.bilibili.com/video/BV12u411Z7Zo?spm_id_from=333.337.search-card.all.click)

[Oh My Posh](https://ohmyposh.dev/)

[xiaopeng163](https://gist.github.com/xiaopeng163/0fe4225a56ff97cd47e25a4b8a6f36ec)

:::

## Step 1

- 安装 **[Windows Terminal](https://github.com/microsoft/terminal)**
- 安装 **[PowerShell](https://github.com/PowerShell/PowerShell)**

## Step 2

- 安装 oh-my-posh 、posh-git、PSReadLine

    ```shell
    $ Install-Module oh-my-posh -Scope CurrentUser -SkipPublisherCheck
    $ Install-Module posh-git -Scope CurrentUser
    $ Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck
    $ Install-Module -Name Terminal-Icons -Repository PSGallery
    ```

- 下载并安装字体： **[Nerd Fonts - Iconic font aggregator](https://www.nerdfonts.com/)**

- 设置 profile

    ```shell
    $ notepad.exe $PROFILE
    Import-Module posh-git
    Import-Module oh-my-posh
    Import-Module -Name Terminal-Icons
    Set-PoshPrompt -Theme robbyrussel
    Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete
    ```

    

