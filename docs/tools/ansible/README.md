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
    Bringing machine 'ansible-node1' up with 'hyperv' provider...
    Bringing machine 'ansible-node2' up with 'hyperv' provider...
    ==> ansible-controller: Verifying Hyper-V is enabled...
    ==> ansible-controller: Verifying Hyper-V is accessible...
    ==> ansible-controller: Importing a Hyper-V instance
        ansible-controller: Creating and registering the VM...
        ansible-controller: Successfully imported VM
        ansible-controller: Please choose a switch to attach to your Hyper-V instance.
        ansible-controller: If none of these are appropriate, please open the Hyper-V manager
        ansible-controller: to create a new virtual switch.
        ansible-controller:
        ansible-controller: 1) Default Switch
        ansible-controller: 2) WSL
        ansible-controller:
        ansible-controller: What switch would you like to use? 1
        ansible-controller: Configuring the VM...
        ansible-controller: Setting VM Enhanced session transport type to disabled/default (VMBus)
    ==> ansible-controller: Starting the machine...
    ==> ansible-controller: Waiting for the machine to report its IP address...
        ansible-controller: Timeout: 120 seconds
        ansible-controller: IP: 172.24.19.67
    ==> ansible-controller: Waiting for machine to boot. This may take a few minutes...
        ansible-controller: SSH address: 172.24.19.67:22
        ansible-controller: SSH username: vagrant
        ansible-controller: SSH auth method: private key
    ==> ansible-controller: Machine booted and ready!
    ==> ansible-controller: Preparing SMB shared folders...
        ansible-controller: You will be asked for the username and password to use for the SMB
        ansible-controller: folders shortly. Please use the proper username/password of your
        ansible-controller: account.
        ansible-controller:
        ansible-controller: Username (user[@domain]): Administrator  
        ansible-controller: Password (will be hidden):                                                                                                                                                                                              Vagrant requires administrator access to create SMB shares and                                                          may request access to complete setup of configured shares.
    ==> ansible-controller: Mounting SMB shared folders...
        ansible-controller: F:/VagrantDemo1 => /vagrant
    ==> ansible-node1: Verifying Hyper-V is enabled...
    ==> ansible-node1: Verifying Hyper-V is accessible...
    ==> ansible-node1: Importing a Hyper-V instance
        ansible-node1: Creating and registering the VM...
        ansible-node1: Successfully imported VM
        ansible-node1: Please choose a switch to attach to your Hyper-V instance.
        ansible-node1: If none of these are appropriate, please open the Hyper-V manager
        ansible-node1: to create a new virtual switch.
        ansible-node1:
        ansible-node1: 1) Default Switch
        ansible-node1: 2) WSL
        ansible-node1:
        ansible-node1: What switch would you like to use? 1
        ansible-node1: Configuring the VM...
        ansible-node1: Setting VM Enhanced session transport type to disabled/default (VMBus)
    ==> ansible-node1: Starting the machine...
    ==> ansible-node1: Waiting for the machine to report its IP address...
        ansible-node1: Timeout: 120 seconds
        ansible-node1: IP: 172.24.31.24
    ==> ansible-node1: Waiting for machine to boot. This may take a few minutes...
        ansible-node1: SSH address: 172.24.31.24:22
        ansible-node1: SSH username: vagrant
        ansible-node1: SSH auth method: private key
    ==> ansible-node1: Machine booted and ready!
    ==> ansible-node1: Preparing SMB shared folders...
        ansible-node1: You will be asked for the username and password to use for the SMB
        ansible-node1: folders shortly. Please use the proper username/password of your
        ansible-node1: account.
        ansible-node1:
        ansible-node1: Username (user[@domain]): Administrator 
        ansible-node1: Password (will be hidden):                                                                                                                                                                                                   Vagrant requires administrator access to create SMB shares and                                                          may request access to complete setup of configured shares.
    ==> ansible-node1: Mounting SMB shared folders...
        ansible-node1: F:/VagrantDemo1 => /vagrant
    ==> ansible-node2: Verifying Hyper-V is enabled...
    ==> ansible-node2: Verifying Hyper-V is accessible...
    ==> ansible-node2: Importing a Hyper-V instance
        ansible-node2: Creating and registering the VM...
        ansible-node2: Successfully imported VM
        ansible-node2: Please choose a switch to attach to your Hyper-V instance.
        ansible-node2: If none of these are appropriate, please open the Hyper-V manager
        ansible-node2: to create a new virtual switch.
        ansible-node2:
        ansible-node2: 1) Default Switch
        ansible-node2: 2) WSL
        ansible-node2:
        ansible-node2: What switch would you like to use? 1
        ansible-node2: Configuring the VM...
        ansible-node2: Setting VM Enhanced session transport type to disabled/default (VMBus)
    ==> ansible-node2: Starting the machine...
    ==> ansible-node2: Waiting for the machine to report its IP address...
        ansible-node2: Timeout: 120 seconds
        ansible-node2: IP: 172.24.17.197
    ==> ansible-node2: Waiting for machine to boot. This may take a few minutes...
        ansible-node2: SSH address: 172.24.17.197:22
        ansible-node2: SSH username: vagrant
        ansible-node2: SSH auth method: private key
    ==> ansible-node2: Machine booted and ready!
    ==> ansible-node2: Preparing SMB shared folders...
        ansible-node2: You will be asked for the username and password to use for the SMB
        ansible-node2: folders shortly. Please use the proper username/password of your
        ansible-node2: account.
        ansible-node2:
        ansible-node2: Username (user[@domain]): Administrator
        ansible-node2: Password (will be hidden):
    
    Vagrant requires administrator access to create SMB shares and
    may request access to complete setup of configured shares.
    ==> ansible-node2: Setting hostname...
    ==> ansible-node2: Mounting SMB shared folders...
        ansible-node2: F:/VagrantDemo1 => /vagrant
    
    # 查看ssh配置
    $ vagrant ssh-config
    Host ansible-controller
      HostName 172.24.19.67
      User vagrant
      Port 22
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    Host ansible-node1
      HostName 172.24.31.24
      User vagrant
      Port 22
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    Host ansible-node2
      HostName 172.24.17.197
      User vagrant
      Port 22
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/Administrator/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    # 查看状态
    $ vagrant status
    Current machine states:
    
    ansible-controller        running (hyperv)
    ansible-node1             running (hyperv)
    ansible-node2             running (hyperv)
    
    This environment represents multiple VMs. The VMs are all listed
    above with their current state. For more information about a specific
    VM, run `vagrant status NAME`.
    ```

