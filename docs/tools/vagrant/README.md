---
title: vagrant
---

## 简介

> **[Vagrant官网](https://developer.hashicorp.com/vagrant)**
>
> **[Vagrant基础镜像(Vagrant Cloud)](https://app.vagrantup.com/boxes/search)**
>
> **[完整课程链接](https://pengxiao.teachable.com/p/vagrant)**
>
> **[B站链接](https://space.bilibili.com/364122352/channel/seriesdetail?sid=1734443)**

Vagrant是hashicorp这家公司的产品，这家公司主要做数据中心PAAS和虚拟化，其名下大名鼎鼎的产品有Consul、Vault、Nomad、Terraform。他们的产品都是基于Open Source的。

Vagrant 实际上一套虚拟机管理工具，基于 Ruby 开发，底层支持 VirtualBox、VMware 甚至 AWS、Docker 等作为虚拟化系统。我们可以通过 Vagrant 封装一个 Linux 的开发环境，分发给团队成员。成员可以在自己喜欢的桌面系统（Mac/Windows/Linux）上开发程序，代码却能统一在封装好的环境里运行。

Vagrant 本身并没有能力创建虚拟机，它是调用一些虚拟化工具来创建，如 VirtualBox, VMWare。

## 安装步骤

- 官网上下载对应的[安装包](https://developer.hashicorp.com/vagrant/downloads)
- 点击安装包进行安装
- 开启 **[Hyper-V](https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)**，进入 **BIOS** 开启虚拟化
- 主机重启
- 进行验证是否安装成功

```
$ vagrant --version
Vagrant 2.3.2
```



