---
title: Playbook
---

## 介绍

- **Playbook** 是 **Ansible** 的配置、部署和编排的语言，是通过 **yml** 文件格式定义的一种结构，每一个 **Playbook** 由一个或多个的 **play** 构成 

-  一个 **Playbook** 可以包含多个 **play**， 每个 **play** 可以包含多个 **task**， 每个 **task** 是做一些任务

- 示例  **playbook1.yml**

  ```yml{1-12,14-25}
  - hosts: webservers
    remote_user: root
  
    tasks:
    - name: ensure apache is at the latest version
      yum:
        name: httpd
        state: latest
    - name:
      template:
        src: /srv/httpd.j2
        dest: /etc/httpd.conf
  
  - hosts: databases
    remote_user: root
  
    tasks:
    - name: ensure postgresql is at the latest version
      yum:
        name: postgresql
        state: latest
    - name: ensure that postgresql is started
      service:
        name: postgresql
        state: started
  ```

  

## demo

### 项目结构

```tex
F:.
├───.vscode
│       sftp.json    
│
├───inventory        
│       inventory.ini
│
└───playbook
        playbook1.yml
        playbook2.yml
```

- **inventory.ini** 文件内容

  ```ini
  ; 证书登录
  [web1] # 分组
  ansible-node1 ansible_connection=ssh ansible_user=vagrant
  ansible-node2 ansible_connection=ssh ansible_user=vagrant
  ```

- **playbook2.yml** 文件内容

  ```yml
  - hosts: web1
    name: play-test
    remote_user: vagrant
  
    tasks:
    - name: check host connection
      ping:
  ```

- 使用 **SFTP** 同步文件至虚拟机

### 基于 inventory 的 ping

```shell{5}
# ansible-controller
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

### 基于 playbook 的 ping

```shell{5}
# ansible-controller
[vagrant@ansible-controller ~]$ cd ansible-code/playbook/
[vagrant@ansible-controller playbook]$ ls
playbook1.yml  playbook2.yml
[vagrant@ansible-controller playbook]$ ansible-playbook playbook2.yml -i ../inventory/inventory.ini --private-key=/home/vagrant/.ssh/ansible

PLAY [play-test] *******************************************************************************************************

TASK [Gathering Facts] *************************************************************************************************
ok: [ansible-node1]
ok: [ansible-node2]

TASK [check host connection] *******************************************************************************************
ok: [ansible-node2]
ok: [ansible-node1]

PLAY RECAP *************************************************************************************************************
ansible-node1              : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
ansible-node2              : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

## 核心概念

:::tip Inventory



:::

:::tip Playbook



:::

:::tip Module



:::
