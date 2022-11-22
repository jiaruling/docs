---
title: 常用 Modules
---

## Module - 文件模块

::: tip Module

**[Copy](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/copy_module.html#ansible-collections-ansible-builtin-copy-module)**

**[File](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html#ansible-collections-ansible-builtin-file-module)**

**[Template](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/template_module.html#ansible-collections-ansible-builtin-template-module)**

:::

### 实战1

- 目录结构

  ```tex
  module_demo
     └── file_module
         ├── ansible.cfg
         ├── files
         │   └── test.txt
         ├── inventory
         │   ├── group_vars
         │   │   └── all.yml
         │   └── hosts
         └── site.yml
  ```

- 文件内容

  - **file_module/ansible.cfg** 文件内容

    ```tex
    [defaults]
    inventory = inventory/hosts
    private_key_file = /home/vagrant/.ssh/ansible # ssh登录密钥位置
    ```

  - **file_module/site.yml** 文件内容

    ```yaml
    - name: file module
      hosts: all
      gather_facts: no            # 不获取节点主机信息
      become: yes                 # 使用root权限
    
      tasks:
      - name: Create a directory if it does not exist
        ansible.builtin.file:
          path: /etc/test
          state: directory
      - name: copy files form local to remote
        ansible.builtin.copy:
          src: files/test.txt      # 拷贝文件路径
          dest: /etc/test/test.txt # 拷贝至目标文件路径
          backup: yes              # 允许备份
    ```

  - **file_module/inventory/hosts** 文件内容

    ```tex
    [all]
    ansible-node1
    ansible-node2
    ```

  - **file_module/inventory/group_vars/all.yml** 文件内容

    `````yaml
    ansible_user: vagrant
    ansible_connection: ssh

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  # 切换目录
  [vagrant@ansible-controller ~]$ cd ansible-code/playbook/module_demo/file_module/
  # 检查节点是否可达
  [vagrant@ansible-controller file_module]$ ansible all -m ping
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
  # 执行ansible-playbook
  [vagrant@ansible-controller file_module]$ ansible-playbook site.yml
  PLAY [file module] *****************************************************************************************************
  
  TASK [Create a directory if it does not exist] *************************************************************************
  ok: [ansible-node2]
  ok: [ansible-node1]
  
  TASK [copy files form local to remote] *********************************************************************************
  ok: [ansible-node1]
  ok: [ansible-node2]
  
  PLAY RECAP *************************************************************************************************************
  ansible-node1              : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ansible-node2              : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  
  # 检查文件是否拷贝成功【不用切换对应节点】
  [vagrant@ansible-controller file_module]$ ansible all -m shell -a "more /etc/test/test.txt"
  ansible-node1 | CHANGED | rc=0 >>
  123
  ansible-node2 | CHANGED | rc=0 >>
  123
  ```

### 实战2

::: warning 提示

**实战2** 是对 **实战1** 的拓展，旨在如何使用 **template module**，相同部分直接省略

:::

- 目录结构

  ```tex{10-15}
  module_demo
     └── file_module
         ├── ansible.cfg
         ├── files
         │   └── test.txt
         ├── inventory
         │   ├── group_vars
         │   │   └── all.yml
         │   ├── hosts
         │   └── host_vars
         │       ├── ansible-node1.yml
         │       └── ansible-node2.yml
         ├── site.yml
         └── templates
             └── test.j2
  ```

- 文件内容

  - **file_module/templates/atest.j2** 文件内容

    ```jinja2
    [default]
    
    http_port = {{ http_port }}
    ```

  - **file_module/inventory/host_vars/ansible-node1.yml** 文件内容

    ```yaml
    http_port: 80
    ```

  - **file_module/inventory/host_vars/ansible-node2.yml** 文件内容

    ```yaml
    http_port: 443
    ```

  - **file_module/site.yml** 文件内容

    ```yaml{16-19}
    - name: file module
      hosts: all
      gather_facts: no # 不获取节点主机信息
      become: yes      # 使用root权限
    
      tasks:
      - name: Create a directory if it does not exist
        ansible.builtin.file:
          path: /etc/test
          state: directory
      - name: copy files form local to remote
        ansible.builtin.copy:
          src: files/test.txt
          dest: /etc/test/test.txt
          backup: yes  # 允许备份
      - name: test template
        ansible.builtin.template:
          src: templates/test.j2  # 模板文件
          dest: /etc/test/test.cfg # 目标文件路径
    ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  # 切换目录
  [vagrant@ansible-controller ~]$ cd ansible-code/playbook/module_demo/file_module/
  # 检查节点是否可达
  [vagrant@ansible-controller file_module]$ ansible all -m ping
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
  # 执行ansible-playbook
  [vagrant@ansible-controller file_module]$ ansible-playbook site.yml
  
  PLAY [file module] *****************************************************************************************************
  
  TASK [Create a directory if it does not exist] *************************************************************************
  ok: [ansible-node1]
  ok: [ansible-node2]
  
  TASK [copy files form local to remote] *********************************************************************************
  ok: [ansible-node1]
  ok: [ansible-node2]
  
  TASK [test template] ***************************************************************************************************
  changed: [ansible-node1]
  changed: [ansible-node2]
  
  PLAY RECAP *************************************************************************************************************
  ansible-node1              : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ansible-node2              : ok=3    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  
  # 检查模板是否设置成功
  [vagrant@ansible-controller file_module]$ ansible all -m shell -a "more /etc/test/test.cfg"
  ansible-node1 | CHANGED | rc=0 >>
  [default]
  
  http_port = 80
  ansible-node2 | CHANGED | rc=0 >>
  [default]
  
  http_port = 443
  ```

  

### 实战3

::: warning 提示

**实战3** 是对 **实战2** 的拓展，旨在完成更加复杂的模板文件生成，相同部分直接省略

:::

- 目录结构

  ```tex
  module_demo
     └── file_module
         ├── ansible.cfg
         ├── files
         │   └── test.txt
         ├── inventory
         │   ├── group_vars
         │   │   └── all.yml
         │   ├── hosts
         │   └── host_vars
         │       ├── ansible-node1.yml
         │       └── ansible-node2.yml
         ├── site.yml
         └── templates
             └── test.j2
  ```

- 文件内容

  - **file_module/inventory/host_vars/ansible-node1.yml** 文件内容

    ```yaml
    http_port: 80
    host_prefix: test1-
    ip_prefix: 192.168.1.
    ```

  - **file_module/inventory/host_vars/ansible-node2.yml** 文件内容

    ```yaml
    http_port: 443
    host_prefix: test1-
    ip_prefix: 192.168.2.
    ```

  - **file_module/templates/atest.j2** 文件内容

    ```jin
    [default]
    
    http_port = {{ http_port }}
    
    [demo]
    {% for id in range(201,210) %}
    {{ host_prefix }}{{ "%02d" | format(id-200) }} - {{ip_prefix}}{{id}}
    {% endfor %}
    ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  # 切换目录
  [vagrant@ansible-controller ~]$ cd ansible-code/playbook/module_demo/file_module/
  # 检查节点是否可达
  [vagrant@ansible-controller file_module]$ ansible all -m ping
  # 执行ansible-playbook
  [vagrant@ansible-controller file_module]$ ansible-playbook site.yml
  # 检查模板是否设置成功
  [vagrant@ansible-controller file_module]$ ansible all -m shell -a "more /etc/test/test.cfg"
  ansible-node1 | CHANGED | rc=0 >>
  [default]
  
  http_port = 80
  
  [demo]
  test1-01 - 192.168.1.201
  test1-02 - 192.168.1.202
  test1-03 - 192.168.1.203
  test1-04 - 192.168.1.204
  test1-05 - 192.168.1.205
  test1-06 - 192.168.1.206
  test1-07 - 192.168.1.207
  test1-08 - 192.168.1.208
  test1-09 - 192.168.1.209
  ansible-node2 | CHANGED | rc=0 >>
  [default]
  
  http_port = 443
  
  [demo]
  test1-01 - 192.168.2.201
  test1-02 - 192.168.2.202
  test1-03 - 192.168.2.203
  test1-04 - 192.168.2.204
  test1-05 - 192.168.2.205
  test1-06 - 192.168.2.206
  test1-07 - 192.168.2.207
  test1-08 - 192.168.2.208
  test1-09 - 192.168.2.209
  ```

## Module - 系统模块

::: tip Module

**[Ping](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html#ansible-collections-ansible-builtin-ping-module)**

**[Gathers Facts](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/gather_facts_module.html#ansible-collections-ansible-builtin-gather-facts-module)**

**[Groups](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html#ansible-collections-ansible-builtin-group-module)**

**[User](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html#ansible-collections-ansible-builtin-user-module)**

:::

### 实战1

- 目录结构

  ```tex{19-28}
  module_demo
  ├── file_module
  │   ├── ansible.cfg
  │   ├── files
  │   │   └── test.txt
  │   ├── inventory
  │   │   ├── group_vars
  │   │   │   └── all.yml
  │   │   ├── hosts
  │   │   ├── hosts_vars
  │   │   │   ├── ansible-node1.yml
  │   │   │   └── ansible-node2.yml
  │   │   └── host_vars
  │   │       ├── ansible-node1.yml
  │   │       └── ansible-node2.yml
  │   ├── site.yml
  │   └── templates
  │       └── test.j2
  └── system_module
      ├── ansible.cfg
      ├── inventory
      │   ├── group_vars
      │   │   └── all.yml
      │   └── hosts
      └── site.yml
  ```

- 文件内容

  - **system_module/ansible.cfg** 文件

    ```tex
    [defaults]
    inventory = inventory/hosts
    private_key_file = /home/vagrant/.ssh/ansible
    ```

  - **system_module/site.yml** 文件

    ```yaml
    - name: system module
      hosts: all
      gather_facts: no  # 不获取节点主机信息
    
      tasks:
      - name: test ping
        ansible.builtin.ping:
    ```

  - **system_module/inventory/hosts** 文件

    ```tex
    [all]
    ansible-node1
    ansible-node2
    ansible-node3
    ```

  - **system_module/inventory/group_vars/all.yml** 文件

    ```yaml
    ansible_user: vagrant
    ansible_connection: ssh
    ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  # 切换至项目目录
  [vagrant@ansible-controller system_module]$ cd ~/ansible-code/playbook/module_demo/system_module/
  # 执行ansible-playbook
  [vagrant@ansible-controller system_module]$ ansible-playbook site.yml
  
  PLAY [system module] ***************************************************************************************************
  
  TASK [test ping] *******************************************************************************************************
  ok: [ansible-node1]
  ok: [ansible-node2]
  fatal: [ansible-node3]: UNREACHABLE! => {"changed": false, "msg": "Failed to connect to the host via ssh: ssh: Could not resolve hostname ansible-node3: Name or service not known", "unreachable": true}
  
  PLAY RECAP *************************************************************************************************************
  ansible-node1              : ok=1    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ansible-node2              : ok=1    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ansible-node3              : ok=0    changed=0    unreachable=1    failed=0    skipped=0    rescued=0    ignored=0
  ```

### 实战2

- 获取节点主机信息 

  ```shell{20,23}
  # 切换至项目目录
  [vagrant@ansible-controller system_module]$ cd ~/ansible-code/playbook/module_demo/system_module/
  # 查看当前目录
  [vagrant@ansible-controller system_module]$ ls
  ansible.cfg inventory  site.yml
  # 查看hosts文件
  [vagrant@ansible-controller system_module]$ cat inventory/hosts
  [all]
  ansible-node1
  ansible-node2
  
  # 执行 gather_facts 获取节点
  [vagrant@ansible-controller system_module]$ ansible all -m gather_facts
  
  # 执行 gather_facts 获取节点 并输出至文件
  [vagrant@ansible-controller system_module]$ ansible all -m gather_facts --tree ./facts
  
  # 查看当前目录
  [vagrant@ansible-controller system_module]$ ls
  ansible.cfg  facts  inventory  site.yml
  # 查看facts目录
  [vagrant@ansible-controller system_module]$ ls facts/
  ansible-node1  ansible-node2
  # 查看文件内容
  [vagrant@ansible-controller system_module]$ cat facts/ansible-node1
  ```

- 在 **playbook** 中获取主机信息

  -  **system_module/site.yml** 文件

    ```yaml
    - name: system module
      hosts: all
      # gather_facts: no  # 不获取节点主机信息
    
      tasks:
      - name: test ping
        ansible.builtin.ping:
      - name: get times
        ansible.builtin.debug:
          msg: "{{ ansible_date_time }}"  # 打印节点的时间信息
    ```

  - 其它文件内容和 **实战1** 保持一致

  - **ansible-controller** 中执行

    ```shell
    # 切换至项目目录
    [vagrant@ansible-controller system_module]$ cd ~/ansible-code/playbook/module_demo/system_module/
    # 执行 
    [vagrant@ansible-controller system_module]$ ansible-playbook site.yml
    
    PLAY [system module] ***************************************************************************************************
    # 默认执行获取节点的全部信息
    TASK [Gathering Facts] *************************************************************************************************
    ok: [ansible-node2]
    ok: [ansible-node1]
    
    TASK [test ping] *******************************************************************************************************
    ok: [ansible-node1]
    ok: [ansible-node2]
    
    TASK [get times] *******************************************************************************************************
    ok: [ansible-node1] => {
        "msg": {
            "date": "2022-11-22",
            "day": "22",
            "epoch": "1669103923",
            "hour": "07",
            "iso8601": "2022-11-22T07:58:43Z",
            "iso8601_basic": "20221122T075843599074",
            "iso8601_basic_short": "20221122T075843",
            "iso8601_micro": "2022-11-22T07:58:43.599074Z",
            "minute": "58",
            "month": "11",
            "second": "43",
            "time": "07:58:43",
            "tz": "UTC",
            "tz_offset": "+0000",
            "weekday": "Tuesday",
            "weekday_number": "2",
            "weeknumber": "47",
            "year": "2022"
        }
    }
    ok: [ansible-node2] => {
        "msg": {
            "date": "2022-11-22",
            "day": "22",
            "epoch": "1669103923",
            "hour": "07",
            "iso8601": "2022-11-22T07:58:43Z",
            "iso8601_basic": "20221122T075843594672",
            "iso8601_basic_short": "20221122T075843",
            "iso8601_micro": "2022-11-22T07:58:43.594672Z",
            "minute": "58",
            "month": "11",
            "second": "43",
            "time": "07:58:43",
            "tz": "UTC",
            "tz_offset": "+0000",
            "weekday": "Tuesday",
            "weekday_number": "2",
            "weeknumber": "47",
            "year": "2022"
        }
    }
    
    PLAY RECAP *************************************************************************************************************
    ansible-node1              : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
    ansible-node2              : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
    ```

    

### 实战3

::: warning

**实战3** 是对 **实战2** 的拓展，旨在完成**group**的**创建**和**删除**，相同部分直接省略

:::

- 目录结构

  ```tex
  system_module
  ├── ansible.cfg
  ├── facts
  │   ├── ansible-node1
  │   └── ansible-node2
  ├── inventory
  │   ├── group_vars
  │   │   └── all.yml
  │   └── hosts
  └── site.yml
  ```

- 文件内容

  ```yaml
  - name: system module
    hosts: all
    # gather_facts: no  # 不获取节点主机信息
    become: yes         # 使用root权限
  
    tasks:
    - name: test ping
      ansible.builtin.ping:
    - name: get times
      ansible.builtin.debug:
        msg: "{{ ansible_date_time }}"
    # - name: create group
    #   ansible.builtin.group:
    #     name: ansible_demo
    #     state: present
    - name: delete group
      ansible.builtin.group:
        name: ansible_demo
        state: absent
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  # 切换至项目目录
  [vagrant@ansible-controller system_module]$ cd ~/ansible-code/playbook/module_demo/system_module/
  # 执行
  [vagrant@ansible-controller system_module]$ ansible-playbook site.yml
  # 查看 group
  [vagrant@ansible-controller system_module]$ ansible all -m  shell -a "more /etc/group"
  ```

### 实战4

::: warning

:::

## Module - 包管理

