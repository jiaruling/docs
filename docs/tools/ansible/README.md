---
title: Ansible 系列
---

# 实验准备

::: tip 资源
[虚拟机镜像](https://www.osboxes.org/)

[ansible官网](https://docs.ansible.com/)
:::

- 准备三台Linux虚拟机(vagrant创建 hyper-V)

  - vagrantfile

    ```ruby
    # 优雅创建多台虚拟机
    host_list = [
      {
        :name => "ansible-controller",
        :box => "centos7",
        :ssh => false
      },
      {
        :name => "ansible-node1",
        :box => "centos7",
        :ssh => false
      },
      {
        :name => "ansible-node2",
        :box => "centos7",
        :ssh => false
      },
    ]

    Vagrant.configure("2") do |config|
      # 同时适应于 Hyper-V 和 VirtualBox的 Vagrantfile
      config.vm.provider "hyperv" do |v|
        config.vm.synced_folder '.', '/vagrant', type: "smb"
      end

      config.vm.provider "virtualbox" do |_, override|
        config.vm.synced_folder '.', '/vagrant', type: "smb"
      end

      host_list.each do |item|
        config.vm.define item[:name] do |host|
            host.vm.hostname = item[:name] # 设置名称
            host.vm.box = item[:box] # 设置镜像
            host.ssh.insert_key = item[:ssh] # 是否使用安全的key
          end
      end
    end
    ```

  - 执行

    ```shell
    # 创建虚拟机
    $ vagrant up --provider=hyperv

    # 查看ssh配置
    $ vagrant ssh-config

    # 查看状态
    $ vagrant status
    ```

