---
title: Ansible安装和配置
---

:::tip 资源

[ansible官网](https://docs.ansible.com/)

:::

## 安装ansible

在ansible-controller节点中安装ansible, Ansible安装[地址](https://docs.ansible.com/ansible/latest/installation_guide/index.html)

```shell
# 进入ansible-controller
$ vagrant ssh ansible-controller

# 安装ansible step1
[vagrant@ansible-controller ~]$ sudo yum install epel-release

# 安装ansible step2
[vagrant@ansible-controller ~]$ sudo yum install ansible

# 检查是否安装成功
[vagrant@ansible-controller ~]$ ansible --version
```

## 增加DNS路由

```shell
# 修改dns配置文件
[vagrant@ansible-controller ~]$ sudo vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
127.0.1.1   ansible-controller ansible-controller
# -------------------------------
# 新增内容
172.24.19.67  ansible-controller
172.24.31.24  ansible-node1
172.24.17.197 ansible-node2
# -------------------------------

# 检查是否可达
[vagrant@ansible-controller etc]$ ping ansible-controller

[vagrant@ansible-controller etc]$ ping ansible-node1

[vagrant@ansible-controller etc]$ ping ansible-node2
```

## 安装 VSCode 并实现本地和虚拟机文件同步

::: tip Step1: 虚拟机

- ansible-controller 允许 **密码登录** 和 **root登录** 

  ```shell
  # 修改ssh配置文件
  [vagrant@ansible-controller ~]$ sudo vi /etc/ssh/sshd_config
  ...
  #LoginGraceTime 2m
  PermitRootLogin yes  # 打开注释
  #StrictModes yes
  #MaxAuthTries 6
  #MaxSessions 10
  ...
  ...
  # To disable tunneled clear text passwords, change to no here!
  PasswordAuthentication yes # 打开注释
  #PermitEmptyPasswords no
  #PasswordAuthentication no # 注释掉
  ...
  
  # 重启sshd
  [vagrant@ansible-controller ~]$ sudo systemctl restart sshd
  ```

- 打开一个新的终端使用密码进行登录

  ```shell
  $ ssh vagrant@172.24.19.67
  The authenticity of host '172.24.19.67 (172.24.19.67)' can't be established.
  ECDSA key fingerprint is SHA256:d5Jqbnd9uBuStxDcA/DeFcb/jSTqadscT+DNH4GBc4I.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  Warning: Permanently added '172.24.19.67' (ECDSA) to the list of known hosts.
  vagrant@172.24.19.67's password:
  Last login: Mon Nov 14 06:25:11 2022 from 172.24.16.1
  [vagrant@ansible-controller ~]$
  ```

:::

:::tip Step2: 本地主机

- 安装 **VSCode** 软件

- 安装 **SFTP** 插件

- 本地新建 **ansible** 文件夹，并在该文件夹下新建 **inventory.txt** 文件

- 按下 **Ctrl + Shift + P**, 在输入框中输入 `SFTP: Config` ，并按下回车

  - 在 **ansible** 文件夹下会多出一个 **.vscode** 文件夹，文件夹下有一个 **sftp.json** 文件。目录结构如下所示

    ```tex
    F:.
    │   inventory.txt
    │
    └───.vscode
            sftp.json
    ```

  - **sftp.json** 文件内容修改如下所示

    ```json
    {
        "name": "ansible-controller",
        "host": "172.24.19.67",
        "protocol": "sftp",
        "port": 22,
        "username": "vagrant",
        "remotePath": "/home/vagrant/ansible-code",
        "uploadOnSave": true,
        "useTempFile": false,
        "openSsh": true
    }
    ```

  - 按下 **Ctrl + Shift + P**, 在输入框中输入 `SFTP: Sync Local -> Remote` ，并按下回车, 输入密码进行文件同步


:::

::: tip Step3: 虚拟机

- 进入虚拟机查看是否已经完成同步

  ```shell
  $ ssh vagrant@172.24.19.67
  vagrant@172.27.119.219's password:
  Last login: Thu Nov 17 06:18:50 2022 from 172.27.112.1
  [vagrant@ansible-controller ~]$ cd ansible-code/
  [vagrant@ansible-controller ansible-code]$ ls
  inventory.txt
  [vagrant@ansible-controller ansible-code]$ exit
  logout
  Connection to 172.27.119.219 closed.
  ```
:::
