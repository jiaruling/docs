---
title: Playbook 最佳实践
---

## Module - [Debug](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/debug_module.html#ansible-collections-ansible-builtin-debug-module)

- 目录结构

  ```tex{5-6}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── debug
      │   └── helloworld.yml
      ├── playbook1.yml
      └── playbook2.yml
  ```

- **helloworld.yml** 文件内容

  ```yml
  - name: Hello World
    hosts: localhost
  
    tasks:
      - name: Hello World
        ansible.builtin.debug:
          msg: "Hello World"
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell{1}
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/debug/helloworld.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'
  
  PLAY [Hello World] **********************************************************************************************************************************************************************************************
  TASK [Gathering Facts] ******************************************************************************************************************************************************************************************ok: [localhost]
  
  TASK [Hello World] **********************************************************************************************************************************************************************************************ok: [localhost] => {
      "msg": "Hello World"
  }
  
  PLAY RECAP ******************************************************************************************************************************************************************************************************localhost                  : 
  ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=
  ```

## [Variables](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html)

### 变量的定义和引用

- 目录结构

  ```tex{9-11}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── debug
      │   └── helloworld.yml
      ├── playbook1.yml
      ├── playbook2.yml
      └── vars
          └── simple
              └── helloworld.yml
  ```

- **helloworld.yml** 文件内容

  ```yaml{5-11,18-19}
  - name: Hello World
    hosts: localhost
  
    # 变量的定义
    vars:
      greetings: "hello from vars"
      demo:
        a:
          - a: 1
          - b: 2
        b: "test"
  
    tasks:
      - name: Hello World
        ansible.builtin.debug:
          # 变量的引用
          msg:
            - "{{ greetings }}"
            - "{{ demo }}"
  
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell{1}
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/vars/simple/helloworld.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'
  
  PLAY [Hello World] **********************************************************************************************************************************************************************************************
  TASK [Gathering Facts] ******************************************************************************************************************************************************************************************ok: [localhost]
  
  TASK [Hello World] **********************************************************************************************************************************************************************************************ok: [localhost] => {
      "msg": [
          "hello from vars",
          {
              "a": [
                  {
                      "a": 1
                  },
                  {
                      "b": 2
                  }
              ],
              "b": "test"
          }
      ]
  }
  
  PLAY RECAP ******************************************************************************************************************************************************************************************************localhost                  : 
  ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ```

  

### 变量的引入

- 目录结构

  ```tex{12-16}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── debug
      │   └── helloworld.yml
      ├── playbook1.yml
      ├── playbook2.yml
      └── vars
          ├── simple
          │   └── helloworld.yml
          └── vars_file
              ├── helloworld.yml
              └── vars
                  ├── demo.yml
                  └── test.yml
  ```

- **vars_file/helloworld.yml** 文件内容

  ```yaml{5-7,9}
  - name: Hello World
    hosts: localhost
  
    # 引入变量  (存在相同变量名，后面引入的会覆盖前面引入的)
    vars_files:
      - "vars/demo.yml"
      - "vars/test.yml"
  
    # 【引入变量】的优先级比【本地定义变量】的优先级高
    vars:
      greetings: "hello from playbook vars"
  
    tasks:
      - name: Hello World
        ansible.builtin.debug:
          # 变量的引用
          msg:
            - "{{ greetings }}"
  ```

- **vars_file/vars/demo.yml** 文件内容

  ```yaml
  greetings: "hello from vars files demo.yml"
  ```

- **vars_file/vars/test.yml** 文件内容

  ```yaml
  greetings: "hello from vars files test.yml"
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/vars/vars_file/helloworld.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'
  
  PLAY [Hello World] **********************************************************************************************************************************************************************************************
  TASK [Gathering Facts] ******************************************************************************************************************************************************************************************ok: [localhost]
  
  TASK [Hello World] **********************************************************************************************************************************************************************************************ok: [localhost] => {
      "msg": [
          "hello from vars files test.yml"
      ]
  }
  
  PLAY RECAP ******************************************************************************************************************************************************************************************************localhost                  : 
  ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ```

  

## Loop

### 基本循环遍历

- 目录结构

  ```tex{7-8}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── debug
      │   └── helloworld.yml
      ├── loop
      │   └── helloworld.yml
      ├── playbook1.yml
      ├── playbook2.yml
      └── vars
          ├── simple
          │   └── helloworld.yml
          └── vars_file
              ├── helloworld.yml
              └── vars
                  ├── demo.yml
                  └── test.yml
  ```

- **loop/helloworld.yml** 文件内容

  ```yaml
  - name: Hello World
    hosts: localhost
  
    # 定义一个可迭代的变量
    vars:
      test:
      - test1
      - test2
      - test3
      - test4
  
    tasks:
      - name: Hello World
        ansible.builtin.debug:
          msg: "{{ item }}"
        # 循环遍历
        with_items: "{{ test }}"
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/loop/helloworld.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'
  
  PLAY [Hello World] **********************************************************************************************************************************************************************************************
  
  TASK [Gathering Facts] ******************************************************************************************************************************************************************************************
  ok: [localhost]
  
  TASK [Hello World] **********************************************************************************************************************************************************************************************
  ok: [localhost] => (item=test1) => {
      "msg": "test1"
  }
  ok: [localhost] => (item=test2) => {
      "msg": "test2"
  }
  ok: [localhost] => (item=test3) => {
      "msg": "test3"
  }
  ok: [localhost] => (item=test4) => {
      "msg": "test4"
  }
  
  PLAY RECAP ******************************************************************************************************************************************************************************************************
  localhost                  : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ```

### 多重循环遍历

- 目录结构

  ```tex{7,9}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── debug
      │   └── helloworld.yml
      ├── loop
      │   ├── helloworld.yml
      │   └── test_loop.yml
      ├── playbook1.yml
      ├── playbook2.yml
      └── vars
          ├── simple
          │   └── helloworld.yml
          └── vars_file
              ├── helloworld.yml
              └── vars
                  ├── demo.yml
                  └── test.yml
  ```

- **loop/test_loop.yml** 文件内容

  ```yaml
  - name: Hello World
    hosts: localhost
  
    # 定义多个可迭代的变量
    vars:
      test:
      - test1
      - test2
      - test3
      - test4
      demo:
      - demo1
      - demo2
      - demo3
      xyz:
      - x
      - y
  
  
    tasks:
      - name: Hello World
        ansible.builtin.debug:
          msg: "{{ item[0] }}, {{ item[1] }}, {{ item[2] }}"
        # 多重循环遍历
        with_nested:
          - "{{ test }}"
          - "{{ demo }}"
          - "{{ xyz }}"
  
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/loop/test_loop.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'
  
  PLAY [Hello World] **********************************************************************************************************************************************************************************************
  TASK [Gathering Facts] ******************************************************************************************************************************************************************************************
  ok: [localhost]
  
  TASK [Hello World] **********************************************************************************************************************************************************************************************
  ok: [localhost] => (item=[u'test1', u'demo1', u'x']) => {
      "msg": "test1, demo1, x"
  }
  ok: [localhost] => (item=[u'test1', u'demo1', u'y']) => {
      "msg": "test1, demo1, y"
  }
  ok: [localhost] => (item=[u'test1', u'demo2', u'x']) => {
      "msg": "test1, demo2, x"
  }
  ok: [localhost] => (item=[u'test1', u'demo2', u'y']) => {
      "msg": "test1, demo2, y"
  }
  ok: [localhost] => (item=[u'test1', u'demo3', u'x']) => {
      "msg": "test1, demo3, x"
  }
  ok: [localhost] => (item=[u'test1', u'demo3', u'y']) => {
      "msg": "test1, demo3, y"
  }
  ok: [localhost] => (item=[u'test2', u'demo1', u'x']) => {
      "msg": "test2, demo1, x"
  }
  ok: [localhost] => (item=[u'test2', u'demo1', u'y']) => {
      "msg": "test2, demo1, y"
  }
  ok: [localhost] => (item=[u'test2', u'demo2', u'x']) => {
      "msg": "test2, demo2, x"
  }
  ok: [localhost] => (item=[u'test2', u'demo2', u'y']) => {
      "msg": "test2, demo2, y"
  }
  ok: [localhost] => (item=[u'test2', u'demo3', u'x']) => {
      "msg": "test2, demo3, x"
  }
  ok: [localhost] => (item=[u'test2', u'demo3', u'y']) => {
      "msg": "test2, demo3, y"
  }
  ok: [localhost] => (item=[u'test3', u'demo1', u'x']) => {
      "msg": "test3, demo1, x"
  }
  ok: [localhost] => (item=[u'test3', u'demo1', u'y']) => {
      "msg": "test3, demo1, y"
  }
  ok: [localhost] => (item=[u'test3', u'demo2', u'x']) => {
      "msg": "test3, demo2, x"
  }
  ok: [localhost] => (item=[u'test3', u'demo2', u'y']) => {
      "msg": "test3, demo2, y"
  }
  ok: [localhost] => (item=[u'test3', u'demo3', u'x']) => {
      "msg": "test3, demo3, x"
  }
  ok: [localhost] => (item=[u'test3', u'demo3', u'y']) => {
      "msg": "test3, demo3, y"
  }
  ok: [localhost] => (item=[u'test4', u'demo1', u'x']) => {
      "msg": "test4, demo1, x"
  }
  ok: [localhost] => (item=[u'test4', u'demo1', u'y']) => {
      "msg": "test4, demo1, y"
  }
  ok: [localhost] => (item=[u'test4', u'demo2', u'x']) => {
      "msg": "test4, demo2, x"
  }
  ok: [localhost] => (item=[u'test4', u'demo2', u'y']) => {
      "msg": "test4, demo2, y"
  }
  ok: [localhost] => (item=[u'test4', u'demo3', u'x']) => {
      "msg": "test4, demo3, x"
  }
  ok: [localhost] => (item=[u'test4', u'demo3', u'y']) => {
      "msg": "test4, demo3, y"
  }
  
  PLAY RECAP ******************************************************************************************************************************************************************************************************
  localhost                  : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ```

## [When](https://docs.ansible.com/ansible/latest/user_guide/playbooks_conditionals.html)

- 目录结构

  ```tex{5-6}
  .
  ├── inventory
  │   └── inventory.ini
  └── playbook
      ├── condition
      │   └── when.yml
      ├── debug
      │   └── helloworld.yml
      ├── loop
      │   ├── helloworld.yml
      │   └── test_loop.yml
      ├── playbook1.yml
      ├── playbook2.yml
      └── vars
          ├── simple
          │   └── helloworld.yml
          └── vars_file
              ├── helloworld.yml
              └── vars
                  ├── demo.yml
                  └── test.yml
  ```

- **condition/when.yml** 文件内容

  ```yaml{18-19}
  - name: test loop and when
    hosts: localhost
  
    # 定义一个可迭代的变量
    vars:
      seq:
        - 1
        - 2
        - 3
        - 4
  
    tasks:
      - name: test loop and when
        ansible.builtin.debug:
          msg: "{{ item }}"
        # 循环遍历
        with_items: "{{ seq }}"
        # 条件判断
        when: item >= 3
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  [vagrant@ansible-controller ansible-code]$ ansible-playbook playbook/condition/when.yml
  [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match
  'all'
  
  PLAY [test loop and when] **********************************************************************************************
  TASK [Gathering Facts] *************************************************************************************************
  ok: [localhost]
  
  TASK [test loop and when] **********************************************************************************************
  skipping: [localhost] => (item=1)
  skipping: [localhost] => (item=2)
  ok: [localhost] => (item=3) => {
      "msg": 3
  }
  ok: [localhost] => (item=4) => {
      "msg": 4
  }
  
  PLAY RECAP *************************************************************************************************************
  localhost                  : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
  ```

## Group

- 目录结构

  ```tex
  
  ```

- **helloworld.yml** 文件内容

  ```yaml
  
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  
  ```

## Host

- 目录结构

  ```tex
  
  ```

- **helloworld.yml** 文件内容

  ```yaml
  
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  
  ```

## Ansible.cfg

- 目录结构

  ```tex
  
  ```

- **helloworld.yml** 文件内容

  ```yaml
  
  ```

- 使用 **SFTP** 同步文件至虚拟机

- **ansible-controller** 中执行

  ```shell
  
  ```