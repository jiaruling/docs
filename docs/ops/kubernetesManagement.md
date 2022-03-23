---
title:  Kubernetes Web 端管理工具
---

## 1. Kubernetes Dashboard

![](/images/kubernetes-dashboard1.png)

- github
  - https://github.com/kubernetes/dashboard
- 技术栈
  - Angular + Go
- 关键词
  - 单集群
  - K8s 资源管理

## 2. Kuboard

![](/images/kuboard-dashboard2.png)

- github
  - https://github.com/eip-work/kuboard-press
- 技术栈
  - Vue
- 关键词
  - 多集群
  - K8s 资源管理

## 3. Wayne

![](/images/wayne-dashboard3.png)

- github
  - https://github.com/Qihoo360/wayne
- 技术栈
  -  Angular + Go
- 关键词
  - 多集群
  - K8s 资源管理
  - 审计

## 4. Kubevious

![](/images/kubevious-dashboard4.png)

- github
  - https://github.com/kubevious/ui
  - https://github.com/kubevious/backend
- 技术栈
  - React
- 关键词
  - 多集群
  - K8s 资源管理
  - 全资源检索
  - 资源回滚

## 5. KubeSphere

![](/images/kubesphere-dashboard5.png)

- github
  - https://github.com/kubesphere/kubesphere
- 技术栈
  - React + Go
- 关键词
  - 多集群
  - K8s 资源管理
  - CLI 安装、升级
  - KubeSphere Mini 入侵
  - 应用商店

## 6. Rancher

![](/images/rancher-dashboard6.png)

- github
  - https://github.com/rancher/rancher
  - https://github.com/rancher/dashboard
- 技术栈
  - Vue + Go
- 关键词
  - 多集群
  - K8s 资源管理
  - Web 安装、升级 K8s
  - Agent 入侵
  - Namespace 入侵
  - 应用商店

## 7. KubeOperator

![](/images/kubeoperator-dashboard7.png)

- github
  - https://github.com/KubeOperator/neeko
  - https://github.com/KubeOperator/KubeOperator
  - https://github.com/KubeOperator/KubePi
- 技术栈
  - Vue + Go
- 关键词
  - 多集群
  - K8s 资源管理
  - Web 安装、升级 K8s

## 8. Summary

:::tip 总结

市面上的 Dashboard 大同小异，都能对 K8s 基础资源进行查看、编辑。不同的 Dashboard 具有不同侧重。

:::

- Kubernetes Dashboard 只能管理当前集群，简单但是有 Kubernetes 官方社区长期支持。如果只是查看、编辑资源，十分推荐。

- Kuboard、Wayne 在 K8s 资源管理的基础之上，增加了对多集群的支持。

- Kubevious 独辟蹊径，提供了很多差异化的特性，资源回滚、错误配置检测、集群资源检索等。

- KubeSphere、Rancher 都有商业公司运作，为了增加黏性，都会具有一定入侵性。KubeSphere 要求子集群安装最小化的 KubeSphere，Racher 要求安装 Agent。KubeSphere 针对的是开发全场景，Racher 针对的是集群运维管理。

- KubeOperator 将 K8s 资源管理剥离为子项目 KubePi，而专注于 K8s 集群本身的运维。此外，KubeOperator 和 Rancher 都对接了云厂商的 IaaS Api 可以直接申请主机

