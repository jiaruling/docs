---
title: Inventory
---

## 准备工作

### 查看每个虚拟机的配置信息

```shell
$ vagrant ssh-config
Host ansible-controller
  HostName 172.27.119.219
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
  IdentitiesOnly yes
  LogLevel FATAL

Host ansible-node1
  HostName 172.27.123.226
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
  IdentitiesOnly yes
  LogLevel FATAL

Host ansible-node2
  HostName 172.27.116.221
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
  IdentitiesOnly yes
  LogLevel FATAL
```

### node1 和 node2 也要开启密码登录【node1 和 node2 操作一致】

```shell
# node1 的示范如下
# 本地主机查看虚拟机状态
$ vagrant status
Current machine states:

ansible-controller        running (hyperv)
ansible-node1             running (hyperv)
ansible-node2             running (hyperv)

This environment represents multiple VMs. The VMs are all listed
above with their current state. For more information about a specific
VM, run `vagrant status NAME`.
# 通过ssh免密进入ansible-node1
➜ VagrantDemo1  vagrant ssh ansible-node1
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
# 退出
[vagrant@ansible-node1 ~]$ exit
logout
Connection to 172.27.123.226 closed.
```

## inventory

### 项目结构

```tex
F:.
├───.vscode
│       sftp.json
│
└───inventory
        inventory.ini
```

:::warning 不推荐

### ssh 密码登录方式

- 编写 **inventory.ini** 文件

  ```ini
  # 密码版本
  ansible-node1 ansible_connection=ssh ansible_user=vagrant ansible_ssh_pass=vagrant
  ansible-node2 ansible_connection=ssh ansible_user=vagrant ansible_ssh_pass=vagrant
  ```

- 使用 **SFTP** 同步文件至虚拟机

- 虚拟机中执行以下命令

  ```shell
  # 进入ansible-controller 节点
  $ ssh vagrant@172.27.119.219
  vagrant@172.27.119.219\'s password:
  Last login: Thu Nov 17 06:43:30 2022 from 172.27.112.1
  # 进入项目目录
  [vagrant@ansible-controller ~]$ cd ansible-code/inventory/
  [vagrant@ansible-controller inventory]$ ls
  inventory.ini
  # 执行ansible ping 操作
  [vagrant@ansible-controller inventory]$ ansible all -m ping -i inventory.ini # ping 所有的节点
  ## 执行失败
  ansible-node2 | FAILED! => {
      "msg": "Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.  Please add this host's fingerprint to your known_hosts file to manage this host."
  }
  ansible-node1 | FAILED! => {
      "msg": "Using a SSH password instead of a key is not possible because Host Key checking is enabled and sshpass does not support this.  Please add this host's fingerprint to your known_hosts file to manage this host."
  }
  # ansible-controller 通过密码登录的方式，先登录 ansible-node1 和 ansbible-node2
  ## 登录 ansible-node1
  [vagrant@ansible-controller inventory]$ ssh vagrant@ansible-node1
  The authenticity of host 'ansible-node1 (172.27.123.226)' can\'t be established.
  ECDSA key fingerprint is SHA256:3103jaP5o6vgukdMZ8O3EHjMeA+hpoTSteyStUfjinA.
  ECDSA key fingerprint is MD5:5d:0a:cd:aa:fd:a0:cd:4d:d3:f9:64:9b:33:f6:47:ea.
  Are you sure you want to continue connecting (yes/no)? yes
  Warning: Permanently added 'ansible-node1,172.27.123.226' (ECDSA) to the list of known hosts.
  vagrant@ansible-node1\'s password:
  Last login: Thu Nov 17 07:33:16 2022 from 172.27.112.1
  [vagrant@ansible-node1 ~]$ exit
  logout
  Connection to ansible-node1 closed.
  ## 登录 ansible-node1
  [vagrant@ansible-controller inventory]$ ssh vagrant@ansible-node2
  The authenticity of host 'ansible-node2 (172.27.116.221)' can\'t be established.
  ECDSA key fingerprint is SHA256:gHukUvvvNV0XqH96YAJ0lIpyBsexCIsVCeRs6oaRRC4.
  ECDSA key fingerprint is MD5:ef:88:5a:96:42:9f:eb:af:43:d1:a7:1e:d8:56:a9:b4.
  Are you sure you want to continue connecting (yes/no)? yes
  Warning: Permanently added 'ansible-node2,172.27.116.221' (ECDSA) to the list of known hosts.
  vagrant@ansible-node2\'s password:
  Last login: Thu Nov 17 07:40:10 2022 from 172.27.112.1
  [vagrant@ansible-node2 ~]$ exit
  logout
  Connection to ansible-node2 closed.
  # 再次执行 ansible ping 操作
  [vagrant@ansible-controller inventory]$ ansible all -m ping -i inventory.ini # ping 所有的节点
  ## 执行成功
  ansible-node2 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ansible-node1 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ```

:::

### ssh 密码登录方式 - 分组和匹配

- 编写 **inventory.ini** 文件

  ```ini
  # 密码版本
  [web1] # 分组
  ansible-node[1:3] ansible_connection=ssh ansible_user=vagrant ansible_ssh_pass=vagrant  # 匹配
  # ansible-node2 ansible_connection=ssh ansible_user=vagrant ansible_ssh_pass=vagrant
  ```

- 使用 **SFTP** 同步文件至虚拟机

- 虚拟机中执行以下命令

  ```shell
  # 进入ansible-controller 节点
  $ ssh vagrant@172.27.119.219
  vagrant@172.27.119.219\'s password:
  Last login: Thu Nov 17 06:43:30 2022 from 172.27.112.1
  # 进入项目目录
  [vagrant@ansible-controller ~]$ cd ansible-code/inventory/
  [vagrant@ansible-controller inventory]$ ls
  inventory.ini
  # 执行ansible ping 操作
  [vagrant@ansible-controller inventory]$ ansible web1 -m ping -i inventory.ini  # 只 ping web1组下的节点
  ansible-node2 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ansible-node1 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ansible-node3 | UNREACHABLE! => {
      "changed": false,
      "msg": "Failed to connect to the host via ssh: ssh: Could not resolve hostname ansible-node3: Name or service not known",
      "unreachable": true
  }
  ```

::: tip 推荐

### ssh 证书登录方式

- 准备工作 

  - ansible-controller

    ```shell
    # ansible-controller 虚拟机
    ## 进入.ssh 目录并查看
    [vagrant@ansible-controller ~]$ ls -a
    .  ..  .ansible  ansible-code  .bash_history  .bash_logout  .bash_profile  .bashrc  .ssh
    [vagrant@ansible-controller ~]$ cd .ssh
    [vagrant@ansible-controller .ssh]$ ls
    authorized_keys  known_hosts
    ## 生成ssh-key
    [vagrant@ansible-controller .ssh]$ ssh-keygen
    Generating public/private rsa key pair.
    ### 指定ssh-key的文件名
    Enter file in which to save the key (/home/vagrant/.ssh/id_rsa): /home/vagrant/.ssh/ansible 
    ### 剩余的选项一路回车
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/vagrant/.ssh/ansible.
    Your public key has been saved in /home/vagrant/.ssh/ansible.pub.
    The key fingerprint is:
    SHA256:gta1HOIi4k5/8WWEuw4cc1+iOCTDwxEtFm4hRHjdhbs vagrant@ansible-controller
    The key\'s randomart image is:
    +---[RSA 2048]----+
    |++ =o. o.        |
    |. +o+.o          |
    | ..+. ..+        |
    |  + .+.= +       |
    |. .*+++oS. .     |
    |.. o*oEoooo      |
    | o   =o.+.       |
    |o .  .oo         |
    | . .. ..         |
    +----[SHA256]-----+
    ## 查看生成的文件
    [vagrant@ansible-controller .ssh]$ ls
    ansible  ansible.pub  authorized_keys  known_hosts
    ## 将生成的公钥传输至 ansible-node1
    [vagrant@ansible-controller .ssh]$ ssh-copy-id -i ./ansible.pub ansible-node1
    /usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "./ansible.pub"
    /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
    /usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
    vagrant@ansible-node1\'s password:
    
    Number of key(s) added: 1
    
    Now try logging into the machine, with:   "ssh 'ansible-node1'"
    and check to make sure that only the key(s) you wanted were added.
    ## 将生成的公钥传输至 ansible-node2
    [vagrant@ansible-controller .ssh]$ ssh-copy-id -i ./ansible.pub ansible-node2
    /usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "./ansible.pub"
    /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
    /usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
    vagrant@ansible-node2\'s password:
    
    Number of key(s) added: 1
    
    Now try logging into the machine, with:   "ssh 'ansible-node2'"
    and check to make sure that only the key(s) you wanted were added.
    ```

  - ansible-node1

    ```shell
    # 登录 ansible-node1
    $ ssh vagrant@172.27.123.226
    vagrant@172.27.123.226's password:
    Last login: Thu Nov 17 08:06:30 2022 from 172.27.119.219
    # 进入 .ssh/ 目录并查看
    [vagrant@ansible-node1 ~]$ cd .ssh/
    [vagrant@ansible-node1 .ssh]$ ls
    authorized_keys
    # 查看文件内容
    [vagrant@ansible-node1 .ssh]$ more authorized_keys 
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9H
    ZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHi
    lFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRd
    K8jlqm8tehUc9c9WhQ== vagrant insecure public key
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqQbqEyMj5dEA7bfT3TWAJKVB2n+t+b2CtGBxVAy6KfWsNqDPFSYstiuopdUnJUlCGw23r6iffwomc0dxw
    3oUiaCtZb95bkvvWVwHDnCOjVic+oA+g2blVcBhMQXzOKd6UvZRYAEo8AhKmOPvEN5UIZ0VktnB1hwpMqcoHI/LRT0d6Y3HX6/m8dIEi9p6Zjm81QF6IXtfr
    341WBeb+rIaj9dixnPd4FX4AeKRtL4Ib5/kEd59vkVcLbNypXXou+kWOo7iMlJRoQ4OmMTejQIQHE07Qd8iastLwyp6vaKMSK7XiivLzPY0wjnQbzD4eEg6c
    N+levYN6q1e99Rst0dAz vagrant@ansible-controller
    ```

  - ansible-node2

    ```shell
    # 登录 ansible-node1
    $ ssh vagrant@172.27.116.221
    vagrant@172.27.116.221's password:
    Last login: Thu Nov 17 08:06:30 2022 from 172.27.119.219
    # 进入 .ssh/ 目录并查看
    [vagrant@ansible-node2 ~]$ cd .ssh/
    [vagrant@ansible-node2 .ssh]$ ls
    authorized_keys
    # 查看文件内容
    [vagrant@ansible-node2 .ssh]$ more authorized_keys
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA6NF8iallvQVp22WDkTkyrtvp9eWW6A8YVr+kz4TjGYe7gHzIw+niNltGEFHzD8+v1I2YJ6oXevct1YeS0o9H
    ZyN1Q9qgCgzUFtdOKLv6IedplqoPkcmF0aYet2PkEDo3MlTBckFXPITAMzF8dJSIFo9D8HfdOV0IAdx4O7PtixWKn5y2hMNG0zQPyUecp4pzC6kivAIhyfHi
    lFR61RGL+GPXQ2MWZWFYbAGjyiYJnAmCP3NOTd0jMZEnDkbUvxhMmBYSdETk1rRgm+R4LOzFUGaHqHDLKLX+FIPKcF96hrucXzcWyLbIbEgE98OHlnVYCzRd
    K8jlqm8tehUc9c9WhQ== vagrant insecure public key
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqQbqEyMj5dEA7bfT3TWAJKVB2n+t+b2CtGBxVAy6KfWsNqDPFSYstiuopdUnJUlCGw23r6iffwomc0dxw
    3oUiaCtZb95bkvvWVwHDnCOjVic+oA+g2blVcBhMQXzOKd6UvZRYAEo8AhKmOPvEN5UIZ0VktnB1hwpMqcoHI/LRT0d6Y3HX6/m8dIEi9p6Zjm81QF6IXtfr
    341WBeb+rIaj9dixnPd4FX4AeKRtL4Ib5/kEd59vkVcLbNypXXou+kWOo7iMlJRoQ4OmMTejQIQHE07Qd8iastLwyp6vaKMSK7XiivLzPY0wjnQbzD4eEg6c
    N+levYN6q1e99Rst0dAz vagrant@ansible-controller
    ```

  - 证书登录验证

    ```shell
    # ansible-controller 通过证书登录 ansible-node1
    [vagrant@ansible-controller ~]$ ssh -i .ssh/ansible ansible-node1
    Last login: Thu Nov 17 08:24:18 2022 from 172.27.112.1
    [vagrant@ansible-node1 ~]$ exit
    logout
    Connection to ansible-node1 closed.
    # ansible-controller 通过证书登录 ansible-node1
    [vagrant@ansible-controller ~]$ ssh -i .ssh/ansible ansible-node2
    Last login: Thu Nov 17 08:39:45 2022 from 172.27.112.1
    [vagrant@ansible-node2 ~]$ exit
    logout
    Connection to ansible-node2 closed.
    ```

- 编写 **inventory.ini** 文件

  ```ini
  # 证书登录版本
  [web1] # 分组
  ansible-node1 ansible_connection=ssh ansible_user=vagrant
  ansible-node2 ansible_connection=ssh ansible_user=vagrant
  ```

- 使用 **SFTP** 同步文件至虚拟机

- 虚拟机中执行以下命令

  ```shell
  [vagrant@ansible-controller ~]$ cd ansible-code/inventory/
  [vagrant@ansible-controller inventory]$ ls
  inventory.ini
  [vagrant@ansible-controller inventory]$ ansible web1 -m ping -i inventory.ini --private-key=/home/vagrant/.ssh/ansible
  ansible-node1 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ansible-node2 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python"
      },
      "changed": false,
      "ping": "pong"
  }
  ```

:::

