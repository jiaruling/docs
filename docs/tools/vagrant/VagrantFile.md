---
title: VagrantFile
---

## Vagrant相关的目录

### vagrant项目目录
```shell
# 进入vagrant项目目录
$ cd VagrantDemo

# 查看目录结构
$ tree /F
Folder PATH listing for volume 数据
Volume serial number is 0901-AEB1
F:.
│   Vagrantfile
│
└───.vagrant
    ├───machines
    │   └───default
    │       └───hyperv
    │           │   action_configure
    │           │   action_provision
    │           │   action_set_name
    │           │   box_meta
    │           │   creator_uid
    │           │   id
    │           │   index_uuid
    │           │   private_key
    │           │   synced_folders
    │           │   vagrant_cwd
    │           │
    │           ├───Snapshots
    │           ├───Virtual Hard Disks
    │           │       generic-alpine38-hyperv.vhdx
    │           │
    │           └───Virtual Machines
    │               │   9C4962E8-58EF-43C0-9553-C8514F8A255B.vmcx
    │               │   9C4962E8-58EF-43C0-9553-C8514F8A255B.vmgs
    │               │   9C4962E8-58EF-43C0-9553-C8514F8A255B.VMRS
    │               │
    │               └───9C4962E8-58EF-43C0-9553-C8514F8A255B
    └───rgloader
            loader.rb

```

### .vagrant.d 目录
```shell
# 进入家目录
$ cd ~

# 进入 .vagrant.d 目录
$ cd .vagrant.d

# 查看目录结构
$ tree /F
Folder PATH listing for volume 系统
Volume serial number is 98BB-3595
C:.
│   insecure_private_key
│   setup_version
│
├───boxes
│   ├───generic-VAGRANTSLASH-alpine37
│   │   │   metadata_url
│   │   │
│   │   └───4.2.0
│   │       ├───hyperv
│   │       │   │   info.json
│   │       │   │   metadata.json
│   │       │   │   Vagrantfile
│   │       │   │
│   │       │   ├───Virtual Hard Disks
│   │       │   │       generic-alpine37-hyperv.vhdx
│   │       │   │
│   │       │   └───Virtual Machines
│   │       │           7A599226-349E-4CEA-8A49-F363954CCEBA.vmcx
│   │       │           7A599226-349E-4CEA-8A49-F363954CCEBA.vmgs
│   │       │           7A599226-349E-4CEA-8A49-F363954CCEBA.VMRS
│   │       │           box.xml
│   │       │
│   │       └───virtualbox
│   │               box.ovf
│   │               generic-alpine37-virtualbox-disk001.vmdk
│   │               info.json
│   │               metadata.json
│   │               Vagrantfile
│   │
│   └───generic-VAGRANTSLASH-alpine38
│       │   metadata_url
│       │
│       └───4.2.0
│           ├───hyperv
│           │   │   info.json
│           │   │   metadata.json
│           │   │   Vagrantfile
│           │   │
│           │   ├───Virtual Hard Disks
│           │   │       generic-alpine38-hyperv.vhdx
│           │   │
│           │   └───Virtual Machines
│           │           259C3DE1-6987-4C81-909B-93F3E1C1D6EF.vmcx
│           │           259C3DE1-6987-4C81-909B-93F3E1C1D6EF.vmgs
│           │           259C3DE1-6987-4C81-909B-93F3E1C1D6EF.VMRS
│           │           box.xml
│           │
│           └───virtualbox
│                   box.ovf
│                   box_update_check
│                   generic-alpine38-virtualbox-disk001.vmdk
│                   info.json
│                   metadata.json
│                   Vagrantfile
│
├───data
│   │   checkpoint_cache
│   │   checkpoint_signature
│   │   lock.dotlock.lock
│   │
│   ├───fp-leases
│   └───machine-index
│           index
│           index.lock
│
├───gems
│   └───2.7.6
├───rgloader
│       loader.rb
│
└───tmp
```

## VagrantFile

### 主机名和镜像版本的指定

- Vagrantfile

  ```ruby
  Vagrant.configure("2") do |config|
    config.vm.box = "generic/alpine38"   # 指定box
    config.vm.hostname = "vagrant-demo"  # 指定主机名称
    config.vm.box_version = "4.2.0"      # 指定box的版本
  end
  ```

- 执行

  ```shell
  # 删除虚拟机
  $ vagrant destroy -f
  ==> default: Stopping the machine...
  ==> default: Deleting the machine...
  
  # 创建虚拟机
  $ vagrant up
  Bringing machine 'default' up with 'hyperv' provider...
  ==> default: Verifying Hyper-V is enabled...
  ==> default: Verifying Hyper-V is accessible...
  ==> default: Importing a Hyper-V instance
      default: Creating and registering the VM...
      default: Successfully imported VM
      default: Please choose a switch to attach to your Hyper-V instance.       
      default: If none of these are appropriate, please open the Hyper-V manager
      default: to create a new virtual switch.
      default:  
      default: 1) Default Switch
      default: 2) WSL
      default:  
      default: What switch would you like to use? 1
      default: Configuring the VM...
      default: Setting VM Enhanced session transport type to disabled/default (VMBus)
  ==> default: Starting the machine...
  ==> default: Waiting for the machine to report its IP address...
      default: Timeout: 120 seconds
      default: IP: 172.24.29.166
  ==> default: Waiting for machine to boot. This may take a few minutes...
      default: SSH address: 172.24.29.166:22
      default: SSH username: vagrant
      default: SSH auth method: private key
      default:
      default: Vagrant insecure key detected. Vagrant will automatically replace
      default: this with a newly generated keypair for better security.
      default:
      default: Inserting generated public key within guest...
      default: Removing insecure key from the guest if it's present...
      default: Key inserted! Disconnecting and reconnecting using new SSH key...
  ==> default: Machine booted and ready!
  ==> default: Setting hostname...
  
  # ssh链接虚拟机
  $ vagrant ssh
  vagrant-demo:~$ hostname
  vagrant-demo
  vagrant-demo:~$ exit
  logout
  Connection to 172.24.29.166 closed.SSH
  ```


### SSH

- Vagrant 推崇使用 ssh证书登录，不建议账号密码登录。
    - 默认是ssh证书登录，禁用了密码登录
    - 默认情况下，每创建一个新的虚拟机都会生成一对新的证书
    - 只有申明使用不安的证书，才会在创建虚拟机的时候不创建新的证书

- Vagrantfile

  ```ruby
  Vagrant.configure("2") do |config|
    config.vm.box = "generic/alpine38"   # 指定box
    config.vm.hostname = "vagrant-demo"  # 指定主机名称
    config.vm.box_version = "4.2.0"      # 指定box的版本
    config.ssh.insert_key = false        # 使用不安全的证书
  end
  ```

- 执行

    ```shell
    # 创建虚拟机
    $ vagrant up --provider virtualbox
    Bringing machine 'default' up with 'virtualbox' provider...
    ==> default: Importing base box 'generic/alpine38'...
    ==> default: Matching MAC address for NAT networking...
    ==> default: Checking if box 'generic/alpine38' version '4.2.0' is up to date...
    ==> default: Setting the name of the VM: vagrantdemo_default_1668085797159_65988
    ==> default: Clearing any previously set network interfaces...
    ==> default: Preparing network interfaces based on configuration...
        default: Adapter 1: nat
    ==> default: Forwarding ports...
        default: 22 (guest) => 2222 (host) (adapter 1)
    ==> default: Running 'pre-boot' VM customizations...
    ==> default: Booting VM...
    ==> default: Waiting for machine to boot. This may take a few minutes...
        default: SSH address: 127.0.0.1:2222
        default: SSH username: vagrant
        default: SSH auth method: private key
    ==> default: Machine booted and ready!
    ==> default: Checking for guest additions in VM...
        default: The guest additions on this VM do not match the installed version of
        default: VirtualBox! In most cases this is fine, but in rare cases it can
        default: prevent things such as shared folders from working properly. If you see
        default: shared folder errors, please make sure the guest additions within the
        default: virtual machine match the version of VirtualBox you have installed on
        default: your host and reload your VM.
        default:
        default: Guest Additions Version: 5.2.2 r119230
        default: VirtualBox Version: 6.1
    ==> default: Setting hostname...
    
    # ssh 链接虚拟机
    $ vagrant ssh
    vagrant-demo:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    
    # 查看ssh配置
    $ vagrant ssh-config
    Host default
      HostName 127.0.0.1
      User vagrant
      Port 2222
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/JRL/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    ```

    

### 创建多个虚拟机

- Vagrantfile

    ```ruby
    Vagrant.configure("2") do |config|
      # 全局变量
      config.vm.box = "generic/alpine38"   # 指定box
      config.vm.hostname = "vagrant-demo"  # 指定主机名称
      config.vm.box_version = "4.2.0"      # 指定box的版本
      config.ssh.insert_key = false        # 使用不安全的key
      # 定义两个host web 和 db
      config.vm.define "web-server" do |web|
        # 局部变量 优先于 全局变量
        web.vm.hostname = "web"
        web.vm.box_version = "4.1.20"
      end
      config.vm.define "database" do |db|
        db.vm.hostname = "db"
      end
    end
    ```

- 执行

    ```shell
    # 删除原有的虚拟机
    $ vagrant destroy -f
    ==> default: Forcing shutdown of VM...
    ==> default: Destroying VM and associated drives..
    
    # 创建虚拟机
    $ vagrant up
    Bringing machine 'web-server' up with 'virtualbox' provider...
    Bringing machine 'database' up with 'virtualbox' provider...
    ==> web-server: Box 'generic/alpine38' could not be found. Attempting to find and install...
        web-server: Box Provider: virtualbox
        web-server: Box Version: 4.1.20
    ==> web-server: Loading metadata for box 'generic/alpine38'
        web-server: URL: https://vagrantcloud.com/generic/alpine38
    ==> web-server: Adding box 'generic/alpine38' (v4.1.20) for provider: virtualbox
        web-server: Downloading: https://vagrantcloud.com/generic/boxes/alpine38/versions/4.1.20/providers/virtualbox.box
        web-server:
        web-server: Calculating and comparing box checksum...
    ==> web-server: Successfully added box 'generic/alpine38' (v4.1.20) for 'virtualbox'!
    ==> web-server: Importing base box 'generic/alpine38'...
    ==> web-server: Matching MAC address for NAT networking...
    ==> web-server: Checking if box 'generic/alpine38' version '4.1.20' is up to date...
    ==> web-server: Setting the name of the VM: vagrantdemo_web-server_1668088099735_11978
    ==> web-server: Clearing any previously set network interfaces...
    ==> web-server: Preparing network interfaces based on configuration...
        web-server: Adapter 1: nat
    ==> web-server: Forwarding ports...
        web-server: 22 (guest) => 2222 (host) (adapter 1)
    ==> web-server: Running 'pre-boot' VM customizations...
    ==> web-server: Booting VM...
    ==> web-server: Waiting for machine to boot. This may take a few minutes...
        web-server: SSH address: 127.0.0.1:2222
        web-server: SSH username: vagrant
        web-server: SSH auth method: private key
    ==> web-server: Machine booted and ready!
    ==> web-server: Checking for guest additions in VM...
        web-server: The guest additions on this VM do not match the installed version of
        web-server: VirtualBox! In most cases this is fine, but in rare cases it can
        web-server: prevent things such as shared folders from working properly. If you see
        web-server: shared folder errors, please make sure the guest additions within the
        web-server: virtual machine match the version of VirtualBox you have installed on
        web-server: your host and reload your VM.
        web-server:
        web-server: Guest Additions Version: 5.2.2 r119230
        web-server: VirtualBox Version: 6.1
    ==> web-server: Setting hostname...
    ==> database: Box 'generic/alpine38' could not be found. Attempting to find and install...
        database: Box Provider: virtualbox
        database: Box Version: 4.1.20
    ==> database: Loading metadata for box 'generic/alpine38'
        database: URL: https://vagrantcloud.com/generic/alpine38
    ==> database: Adding box 'generic/alpine38' (v4.1.20) for provider: virtualbox
    ==> database: Importing base box 'generic/alpine38'...
    ==> database: Matching MAC address for NAT networking...
    ==> database: Checking if box 'generic/alpine38' version '4.1.20' is up to date...
    ==> database: Setting the name of the VM: vagrantdemo_database_1668088137756_22042
    ==> database: Fixed port collision for 22 => 2222. Now on port 2203.
    ==> database: Clearing any previously set network interfaces...
    ==> database: Preparing network interfaces based on configuration...
        database: Adapter 1: nat
    ==> database: Forwarding ports...
        database: 22 (guest) => 2203 (host) (adapter 1)
    ==> database: Running 'pre-boot' VM customizations...
    ==> database: Booting VM...
    ==> database: Waiting for machine to boot. This may take a few minutes...
        database: SSH address: 127.0.0.1:2203
        database: SSH username: vagrant
        database: SSH auth method: private key
    ==> database: Machine booted and ready!
    ==> database: Checking for guest additions in VM...
        database: The guest additions on this VM do not match the installed version of
        database: VirtualBox! In most cases this is fine, but in rare cases it can
        database: prevent things such as shared folders from working properly. If you see
        database: shared folder errors, please make sure the guest additions within the
        database: virtual machine match the version of VirtualBox you have installed on
        database: your host and reload your VM.
        database:
        database: Guest Additions Version: 5.2.2 r119230
        database: VirtualBox Version: 6.1
    ==> database: Setting hostname...
    
    # 查看虚拟机状态
    $ vagrant status
    Current machine states:
    
    web-server                running (virtualbox)
    database                  running (virtualbox)
    
    This environment represents multiple VMs. The VMs are all listed
    above with their current state. For more information about a specific
    VM, run `vagrant status NAME`.
    
    # 进入虚拟机
    $ vagrant ssh web-server
    web:~$ hostname
    web
    web:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    
    $ vagrant ssh database
    db:~$ hostname
    db
    db:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    
    # 查看虚拟机配置
    $ vagrant ssh-config
    Host web-server
      HostName 127.0.0.1
      User vagrant
      Port 2222
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/JRL/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    Host database
      HostName 127.0.0.1
      User vagrant
      Port 2203
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/JRL/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    ```

    

### 创建多个虚拟机 - 优雅

- Vagrantfile

    ```ruby
    # 优雅创建多台虚拟机
    host_list = [
      {
        :name => "host1",
        :box => "generic/alpine38",
        :ssh => true
      },
      {
        :name => "host2",
        :box => "generic/alpine38",
        :ssh => false
      },
      {
        :name => "host3",
        :box => "generic/alpine38",
        :ssh => true
      }
    ]
    
    Vagrant.configure("2") do |config|
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
    $ vagrant up --provider virtualbox
    Bringing machine 'host1' up with 'virtualbox' provider...
    Bringing machine 'host2' up with 'virtualbox' provider...
    Bringing machine 'host3' up with 'virtualbox' provider...
    ==> host1: Importing base box 'generic/alpine38'...
    ==> host1: Matching MAC address for NAT networking...
    ==> host1: Checking if box 'generic/alpine38' version '4.2.0' is up to date...
    ==> host1: Setting the name of the VM: vagrantdemo_host1_1668092952921_92511
    ==> host1: Clearing any previously set network interfaces...
    ==> host1: Preparing network interfaces based on configuration...
        host1: Adapter 1: nat
    ==> host1: Forwarding ports...
        host1: 22 (guest) => 2222 (host) (adapter 1)
    ==> host1: Running 'pre-boot' VM customizations...
    ==> host1: Booting VM...
    ==> host1: Waiting for machine to boot. This may take a few minutes...
        host1: SSH address: 127.0.0.1:2222
        host1: SSH username: vagrant
        host1: SSH auth method: private key
        host1:
        host1: Vagrant insecure key detected. Vagrant will automatically replace
        host1: this with a newly generated keypair for better security.
        host1:
        host1: Inserting generated public key within guest...
        host1: Removing insecure key from the guest if it\'s present...
        host1: Key inserted! Disconnecting and reconnecting using new SSH key...
    ==> host1: Machine booted and ready!
    ==> host1: Checking for guest additions in VM...
        host1: The guest additions on this VM do not match the installed version of
        host1: VirtualBox! In most cases this is fine, but in rare cases it can
        host1: prevent things such as shared folders from working properly. If you see
        host1: shared folder errors, please make sure the guest additions within the
        host1: virtual machine match the version of VirtualBox you have installed on
        host1: your host and reload your VM.
        host1:
        host1: Guest Additions Version: 5.2.2 r119230
        host1: VirtualBox Version: 6.1
    ==> host1: Setting hostname...
    ==> host2: Importing base box 'generic/alpine38'...
    ==> host2: Matching MAC address for NAT networking...
    ==> host2: Checking if box 'generic/alpine38' version '4.2.0' is up to date...
    ==> host2: Setting the name of the VM: vagrantdemo_host2_1668092981883_32630
    ==> host2: Fixed port collision for 22 => 2222. Now on port 2203.
    ==> host2: Clearing any previously set network interfaces...
    ==> host2: Preparing network interfaces based on configuration...
        host2: Adapter 1: nat
    ==> host2: Forwarding ports...
        host2: 22 (guest) => 2203 (host) (adapter 1)
    ==> host2: Running 'pre-boot' VM customizations...
    ==> host2: Booting VM...
    ==> host2: Waiting for machine to boot. This may take a few minutes...
        host2: SSH address: 127.0.0.1:2203
        host2: SSH username: vagrant
        host2: SSH auth method: private key
    ==> host2: Machine booted and ready!
    ==> host2: Checking for guest additions in VM...
        host2: The guest additions on this VM do not match the installed version of
        host2: VirtualBox! In most cases this is fine, but in rare cases it can
        host2: prevent things such as shared folders from working properly. If you see
        host2: shared folder errors, please make sure the guest additions within the
        host2: virtual machine match the version of VirtualBox you have installed on
        host2: your host and reload your VM.
        host2:
        host2: Guest Additions Version: 5.2.2 r119230
        host2: VirtualBox Version: 6.1
    ==> host2: Setting hostname...
    ==> host3: Importing base box 'generic/alpine38'...
    ==> host3: Matching MAC address for NAT networking...
    ==> host3: Checking if box 'generic/alpine38' version '4.2.0' is up to date...
    ==> host3: Setting the name of the VM: vagrantdemo_host3_1668093009461_87937
    ==> host3: Fixed port collision for 22 => 2222. Now on port 2204.
    ==> host3: Clearing any previously set network interfaces...
    ==> host3: Preparing network interfaces based on configuration...
        host3: Adapter 1: nat
    ==> host3: Forwarding ports...
        host3: 22 (guest) => 2204 (host) (adapter 1)
    ==> host3: Running 'pre-boot' VM customizations...
    ==> host3: Booting VM...
    ==> host3: Waiting for machine to boot. This may take a few minutes...
        host3: SSH address: 127.0.0.1:2204
        host3: SSH username: vagrant
        host3: SSH auth method: private key
        host3:
        host3: Vagrant insecure key detected. Vagrant will automatically replace
        host3: this with a newly generated keypair for better security.
        host3:
        host3: Inserting generated public key within guest...
        host3: Removing insecure key from the guest if it's present...
        host3: Key inserted! Disconnecting and reconnecting using new SSH key...
    ==> host3: Machine booted and ready!
    ==> host3: Checking for guest additions in VM...
        host3: The guest additions on this VM do not match the installed version of
        host3: VirtualBox! In most cases this is fine, but in rare cases it can
        host3: prevent things such as shared folders from working properly. If you see
        host3: shared folder errors, please make sure the guest additions within the
        host3: virtual machine match the version of VirtualBox you have installed on
        host3: your host and reload your VM.
        host3:
        host3: Guest Additions Version: 5.2.2 r119230
        host3: VirtualBox Version: 6.1
    ==> host3: Setting hostname...
    
    # 查看虚拟机状态
    $ vagrant status
    Current machine states:
    
    host1                     running (virtualbox)
    host2                     running (virtualbox)
    host3                     running (virtualbox)
    
    This environment represents multiple VMs. The VMs are all listed
    above with their current state. For more information about a specific
    VM, run `vagrant status NAME`.
    
    # 查看虚拟机ssh配置
    $ vagrant ssh-config
    Host host1
      HostName 127.0.0.1
      User vagrant
      Port 2222
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile E:/vagrantdemo/.vagrant/machines/host1/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    Host host2
      HostName 127.0.0.1
      User vagrant
      Port 2203
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile C:/Users/JRL/.vagrant.d/insecure_private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    Host host3
      HostName 127.0.0.1
      User vagrant
      Port 2204
      UserKnownHostsFile /dev/null
      StrictHostKeyChecking no
      PasswordAuthentication no
      IdentityFile E:/vagrantdemo/.vagrant/machines/host3/virtualbox/private_key
      IdentitiesOnly yes
      LogLevel FATAL
    
    # 进入虚拟机
    $ vagrant ssh host1
    host1:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    $ vagrant ssh host2
    host2:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    $ vagrant ssh host3
    host3:~$ exit
    logout
    Connection to 127.0.0.1 closed.
    ```

## 同步文件

::: tip 提示

同步本地的文件或文件夹到 **vagrant**

[Sync Folers 文档](https://developer.hashicorp.com/vagrant/docs/synced-folders/rsync)

:::

### 预备

- 下载 **centos7** 镜像， 不能使用 **alpine** 镜像

  ```shell
  $ vagrant box add centos7 https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/CentOS-7.HyperV.box # hyper-v
  $ vagrant box add centos7 https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/CentOS-7.box # virtualbox
  $ vagrant box list # 查看镜像
  centos7          (hyperv, 0)
  centos7          (virtualbox, 0)
  generic/alpine37 (hyperv, 4.2.0)
  generic/alpine37 (virtualbox, 4.2.0)
  generic/alpine38 (hyperv, 4.2.0)
  generic/alpine38 (virtualbox, 4.2.0)
  ```

- 安装插件

  ```shell
  $ vagrant plugin install vagrant-vbguest --plugin-version 0.21  # 安装插件
  Installing the 'vagrant-vbguest --version '0.21'' plugin. This can take a few minutes...
  Fetching micromachine-3.0.0.gem
  Fetching vagrant-vbguest-0.21.0.gem
  Installed the plugin 'vagrant-vbguest (0.21.0)'!
  $ vagrant plugin list  # 查看插件列表
  vagrant-vbguest (0.21.0, global)
    - Version Constraint: 0.21
  ```
  
- 在Vagrantfile同级目录下新建项目文件

  ```shell
  $ tree /F 
  F:.
  │   test.py    # 项目文件
  │   Vagrantfile
  └───
  ```
  
  

### 只在创建虚拟机时同步宿主机文件

#### Virtualbox

- Vagrantfile

  ```ruby
  # 优雅创建多台虚拟机
  host_list = [
    {
      :name => "host1",
      :box => "centos7",
      :ssh => true
    },
  ]
  
  Vagrant.configure("2") do |config|
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
  $ vagrant up --provider virtualbox
  Bringing machine 'host1' up with 'virtualbox' provider...
  ==> host1: Importing base box 'centos7'...
  ==> host1: Matching MAC address for NAT networking...
  ==> host1: Setting the name of the VM: VagrantDemo2_host1_1668153309561_68538
  ==> host1: Clearing any previously set network interfaces...
  ==> host1: Preparing network interfaces based on configuration...
      host1: Adapter 1: nat
  ==> host1: Forwarding ports...
      host1: 22 (guest) => 2222 (host) (adapter 1)
  ==> host1: Booting VM...
  ==> host1: Waiting for machine to boot. This may take a few minutes...
      host1: SSH address: 127.0.0.1:2222
      host1: SSH username: vagrant
      host1: SSH auth method: private key
      host1:
      host1: Vagrant insecure key detected. Vagrant will automatically replace
      host1: this with a newly generated keypair for better security.
      host1:
      host1: Inserting generated public key within guest...
      host1: Removing insecure key from the guest if it's present...
      host1: Key inserted! Disconnecting and reconnecting using new SSH key...
  ==> host1: Machine booted and ready!
  [host1] No Virtualbox Guest Additions installation found.
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirror.sfo12.us.leaseweb.net
   * extras: mirror.keystealth.org
   * updates: bay.uchicago.edu
  Resolving Dependencies
  --> Running transaction check
  ---> Package centos-release.x86_64 0:7-8.2003.0.el7.centos will be updated
  ---> Package centos-release.x86_64 0:7-9.2009.1.el7.centos will be an update
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package             Arch        Version                     Repository    Size
  ================================================================================
  Updating:
   centos-release      x86_64      7-9.2009.1.el7.centos       updates       27 k
  
  Transaction Summary
  ================================================================================
  Upgrade  1 Package
  
  Total download size: 27 k
  Downloading packages:
  No Presto metadata available for updates
  Public key for centos-release-7-9.2009.1.el7.centos.x86_64.rpm is not installed
  warning: /var/cache/yum/x86_64/7/updates/packages/centos-release-7-9.2009.1.el7.centos.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
  Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  Importing GPG key 0xF4A80EB5:
   Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
   Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
   Package    : centos-release-7-8.2003.0.el7.centos.x86_64 (@anaconda)
   From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Updating   : centos-release-7-9.2009.1.el7.centos.x86_64                  1/2
    Cleanup    : centos-release-7-8.2003.0.el7.centos.x86_64                  2/2
    Verifying  : centos-release-7-9.2009.1.el7.centos.x86_64                  1/2
    Verifying  : centos-release-7-8.2003.0.el7.centos.x86_64                  2/2
  
  Updated:
    centos-release.x86_64 0:7-9.2009.1.el7.centos
  
  Complete!
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirror.sfo12.us.leaseweb.net
   * extras: mirror.keystealth.org
   * updates: bay.uchicago.edu
  Resolving Dependencies
  --> Running transaction check
  ---> Package kernel-devel.x86_64 0:3.10.0-1127.el7 will be installed
  --> Processing Dependency: perl for package: kernel-devel-3.10.0-1127.el7.x86_64
  --> Running transaction check
  ---> Package perl.x86_64 4:5.16.3-299.el7_9 will be installed
  --> Processing Dependency: perl-libs = 4:5.16.3-299.el7_9 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Socket) >= 1.3 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Scalar::Util) >= 1.10 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl-macros for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl-libs for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(threads::shared) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(threads) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(constant) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Time::Local) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Time::HiRes) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Storable) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Socket) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Scalar::Util) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Pod::Simple::XHTML) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Pod::Simple::Search) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Getopt::Long) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Filter::Util::Call) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Temp) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec::Unix) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec::Functions) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Path) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Exporter) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Cwd) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Carp) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: libperl.so()(64bit) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Running transaction check
  ---> Package perl-Carp.noarch 0:1.26-244.el7 will be installed
  ---> Package perl-Exporter.noarch 0:5.68-3.el7 will be installed
  ---> Package perl-File-Path.noarch 0:2.09-2.el7 will be installed
  ---> Package perl-File-Temp.noarch 0:0.23.01-3.el7 will be installed
  ---> Package perl-Filter.x86_64 0:1.49-3.el7 will be installed
  ---> Package perl-Getopt-Long.noarch 0:2.40-3.el7 will be installed
  --> Processing Dependency: perl(Pod::Usage) >= 1.14 for package: perl-Getopt-Long-2.40-3.el7.noarch
  --> Processing Dependency: perl(Text::ParseWords) for package: perl-Getopt-Long-2.40-3.el7.noarch
  ---> Package perl-PathTools.x86_64 0:3.40-5.el7 will be installed
  ---> Package perl-Pod-Simple.noarch 1:3.28-4.el7 will be installed
  --> Processing Dependency: perl(Pod::Escapes) >= 1.04 for package: 1:perl-Pod-Simple-3.28-4.el7.noarch
  --> Processing Dependency: perl(Encode) for package: 1:perl-Pod-Simple-3.28-4.el7.noarch
  ---> Package perl-Scalar-List-Utils.x86_64 0:1.27-248.el7 will be installed
  ---> Package perl-Socket.x86_64 0:2.010-5.el7 will be installed
  ---> Package perl-Storable.x86_64 0:2.45-3.el7 will be installed
  ---> Package perl-Time-HiRes.x86_64 4:1.9725-3.el7 will be installed
  ---> Package perl-Time-Local.noarch 0:1.2300-2.el7 will be installed
  ---> Package perl-constant.noarch 0:1.27-2.el7 will be installed
  ---> Package perl-libs.x86_64 4:5.16.3-299.el7_9 will be installed
  ---> Package perl-macros.x86_64 4:5.16.3-299.el7_9 will be installed
  ---> Package perl-threads.x86_64 0:1.87-4.el7 will be installed
  ---> Package perl-threads-shared.x86_64 0:1.43-6.el7 will be installed
  --> Running transaction check
  ---> Package perl-Encode.x86_64 0:2.51-7.el7 will be installed
  ---> Package perl-Pod-Escapes.noarch 1:1.04-299.el7_9 will be installed
  ---> Package perl-Pod-Usage.noarch 0:1.63-3.el7 will be installed
  --> Processing Dependency: perl(Pod::Text) >= 3.15 for package: perl-Pod-Usage-1.63-3.el7.noarch
  --> Processing Dependency: perl-Pod-Perldoc for package: perl-Pod-Usage-1.63-3.el7.noarch
  ---> Package perl-Text-ParseWords.noarch 0:3.29-4.el7 will be installed
  --> Running transaction check
  ---> Package perl-Pod-Perldoc.noarch 0:3.20-4.el7 will be installed
  --> Processing Dependency: perl(parent) for package: perl-Pod-Perldoc-3.20-4.el7.noarch
  --> Processing Dependency: perl(HTTP::Tiny) for package: perl-Pod-Perldoc-3.20-4.el7.noarch
  ---> Package perl-podlators.noarch 0:2.5.1-3.el7 will be installed
  --> Running transaction check
  ---> Package perl-HTTP-Tiny.noarch 0:0.033-3.el7 will be installed
  ---> Package perl-parent.noarch 1:0.225-244.el7 will be installed
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package                  Arch     Version               Repository        Size
  ================================================================================
  Installing:
   kernel-devel             x86_64   3.10.0-1127.el7       C7.8.2003-base    18 M
  Installing for dependencies:
   perl                     x86_64   4:5.16.3-299.el7_9    updates          8.0 M
   perl-Carp                noarch   1.26-244.el7          C7.0.1406-base    19 k
   perl-Encode              x86_64   2.51-7.el7            C7.0.1406-base   1.5 M
   perl-Exporter            noarch   5.68-3.el7            C7.0.1406-base    28 k
   perl-File-Path           noarch   2.09-2.el7            C7.0.1406-base    26 k
   perl-File-Temp           noarch   0.23.01-3.el7         C7.0.1406-base    56 k
   perl-Filter              x86_64   1.49-3.el7            C7.0.1406-base    76 k
   perl-Getopt-Long         noarch   2.40-3.el7            C7.5.1804-base    56 k
   perl-HTTP-Tiny           noarch   0.033-3.el7           C7.0.1406-base    38 k
   perl-PathTools           x86_64   3.40-5.el7            C7.0.1406-base    82 k
   perl-Pod-Escapes         noarch   1:1.04-299.el7_9      updates           52 k
   perl-Pod-Perldoc         noarch   3.20-4.el7            C7.0.1406-base    87 k
   perl-Pod-Simple          noarch   1:3.28-4.el7          C7.0.1406-base   216 k
   perl-Pod-Usage           noarch   1.63-3.el7            C7.0.1406-base    27 k
   perl-Scalar-List-Utils   x86_64   1.27-248.el7          C7.0.1406-base    36 k
   perl-Socket              x86_64   2.010-5.el7           C7.8.2003-base    49 k
   perl-Storable            x86_64   2.45-3.el7            C7.0.1406-base    77 k
   perl-Text-ParseWords     noarch   3.29-4.el7            C7.0.1406-base    14 k
   perl-Time-HiRes          x86_64   4:1.9725-3.el7        C7.0.1406-base    45 k
   perl-Time-Local          noarch   1.2300-2.el7          C7.0.1406-base    24 k
   perl-constant            noarch   1.27-2.el7            C7.0.1406-base    19 k
   perl-libs                x86_64   4:5.16.3-299.el7_9    updates          690 k
   perl-macros              x86_64   4:5.16.3-299.el7_9    updates           44 k
   perl-parent              noarch   1:0.225-244.el7       C7.0.1406-base    12 k
   perl-podlators           noarch   2.5.1-3.el7           C7.0.1406-base   112 k
   perl-threads             x86_64   1.87-4.el7            C7.0.1406-base    49 k
   perl-threads-shared      x86_64   1.43-6.el7            C7.0.1406-base    39 k
  
  Transaction Summary
  ================================================================================
  Install  1 Package (+27 Dependent packages)
  
  Total download size: 29 M
  Installed size: 74 M
  Downloading packages:
  No Presto metadata available for C7.8.2003-base
  --------------------------------------------------------------------------------
  Total                                              1.1 MB/s |  29 MB  00:25
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Installing : 1:perl-parent-0.225-244.el7.noarch                          1/28
    Installing : perl-HTTP-Tiny-0.033-3.el7.noarch                           2/28
    Installing : perl-podlators-2.5.1-3.el7.noarch                           3/28
    Installing : perl-Pod-Perldoc-3.20-4.el7.noarch                          4/28
    Installing : 1:perl-Pod-Escapes-1.04-299.el7_9.noarch                    5/28
    Installing : perl-Encode-2.51-7.el7.x86_64                               6/28
    Installing : perl-Text-ParseWords-3.29-4.el7.noarch                      7/28
    Installing : perl-Pod-Usage-1.63-3.el7.noarch                            8/28
    Installing : 4:perl-macros-5.16.3-299.el7_9.x86_64                       9/28
    Installing : perl-Storable-2.45-3.el7.x86_64                            10/28
    Installing : perl-Exporter-5.68-3.el7.noarch                            11/28
    Installing : perl-constant-1.27-2.el7.noarch                            12/28
    Installing : perl-Socket-2.010-5.el7.x86_64                             13/28
    Installing : perl-Time-Local-1.2300-2.el7.noarch                        14/28
    Installing : perl-Carp-1.26-244.el7.noarch                              15/28
    Installing : 4:perl-Time-HiRes-1.9725-3.el7.x86_64                      16/28
    Installing : perl-PathTools-3.40-5.el7.x86_64                           17/28
    Installing : perl-Scalar-List-Utils-1.27-248.el7.x86_64                 18/28
    Installing : 1:perl-Pod-Simple-3.28-4.el7.noarch                        19/28
    Installing : perl-File-Temp-0.23.01-3.el7.noarch                        20/28
    Installing : perl-File-Path-2.09-2.el7.noarch                           21/28
    Installing : perl-threads-shared-1.43-6.el7.x86_64                      22/28
    Installing : perl-threads-1.87-4.el7.x86_64                             23/28
    Installing : perl-Filter-1.49-3.el7.x86_64                              24/28
    Installing : 4:perl-libs-5.16.3-299.el7_9.x86_64                        25/28
    Installing : perl-Getopt-Long-2.40-3.el7.noarch                         26/28
    Installing : 4:perl-5.16.3-299.el7_9.x86_64                             27/28
    Installing : kernel-devel-3.10.0-1127.el7.x86_64                        28/28
    Verifying  : perl-HTTP-Tiny-0.033-3.el7.noarch                           1/28
    Verifying  : perl-threads-shared-1.43-6.el7.x86_64                       2/28
    Verifying  : perl-Storable-2.45-3.el7.x86_64                             3/28
    Verifying  : perl-Exporter-5.68-3.el7.noarch                             4/28
    Verifying  : perl-constant-1.27-2.el7.noarch                             5/28
    Verifying  : perl-PathTools-3.40-5.el7.x86_64                            6/28
    Verifying  : 4:perl-macros-5.16.3-299.el7_9.x86_64                       7/28
    Verifying  : 1:perl-parent-0.225-244.el7.noarch                          8/28
    Verifying  : perl-Socket-2.010-5.el7.x86_64                              9/28
    Verifying  : perl-File-Temp-0.23.01-3.el7.noarch                        10/28
    Verifying  : kernel-devel-3.10.0-1127.el7.x86_64                        11/28
    Verifying  : 1:perl-Pod-Simple-3.28-4.el7.noarch                        12/28
    Verifying  : perl-Time-Local-1.2300-2.el7.noarch                        13/28
    Verifying  : 1:perl-Pod-Escapes-1.04-299.el7_9.noarch                   14/28
    Verifying  : perl-Carp-1.26-244.el7.noarch                              15/28
    Verifying  : 4:perl-Time-HiRes-1.9725-3.el7.x86_64                      16/28
    Verifying  : perl-Scalar-List-Utils-1.27-248.el7.x86_64                 17/28
    Verifying  : perl-Pod-Usage-1.63-3.el7.noarch                           18/28
    Verifying  : perl-Encode-2.51-7.el7.x86_64                              19/28
    Verifying  : perl-Pod-Perldoc-3.20-4.el7.noarch                         20/28
    Verifying  : perl-podlators-2.5.1-3.el7.noarch                          21/28
    Verifying  : 4:perl-5.16.3-299.el7_9.x86_64                             22/28
    Verifying  : perl-File-Path-2.09-2.el7.noarch                           23/28
    Verifying  : perl-threads-1.87-4.el7.x86_64                             24/28
    Verifying  : perl-Filter-1.49-3.el7.x86_64                              25/28
    Verifying  : perl-Getopt-Long-2.40-3.el7.noarch                         26/28
    Verifying  : perl-Text-ParseWords-3.29-4.el7.noarch                     27/28
    Verifying  : 4:perl-libs-5.16.3-299.el7_9.x86_64                        28/28
  
  Installed:
    kernel-devel.x86_64 0:3.10.0-1127.el7
  
  Dependency Installed:
    perl.x86_64 4:5.16.3-299.el7_9
    perl-Carp.noarch 0:1.26-244.el7
    perl-Encode.x86_64 0:2.51-7.el7
    perl-Exporter.noarch 0:5.68-3.el7
    perl-File-Path.noarch 0:2.09-2.el7
    perl-File-Temp.noarch 0:0.23.01-3.el7
    perl-Filter.x86_64 0:1.49-3.el7
    perl-Getopt-Long.noarch 0:2.40-3.el7
    perl-HTTP-Tiny.noarch 0:0.033-3.el7
    perl-PathTools.x86_64 0:3.40-5.el7
    perl-Pod-Escapes.noarch 1:1.04-299.el7_9
    perl-Pod-Perldoc.noarch 0:3.20-4.el7
    perl-Pod-Simple.noarch 1:3.28-4.el7
    perl-Pod-Usage.noarch 0:1.63-3.el7
    perl-Scalar-List-Utils.x86_64 0:1.27-248.el7
    perl-Socket.x86_64 0:2.010-5.el7
    perl-Storable.x86_64 0:2.45-3.el7
    perl-Text-ParseWords.noarch 0:3.29-4.el7
    perl-Time-HiRes.x86_64 4:1.9725-3.el7
    perl-Time-Local.noarch 0:1.2300-2.el7
    perl-constant.noarch 0:1.27-2.el7
    perl-libs.x86_64 4:5.16.3-299.el7_9
    perl-macros.x86_64 4:5.16.3-299.el7_9
    perl-parent.noarch 1:0.225-244.el7
    perl-podlators.noarch 0:2.5.1-3.el7
    perl-threads.x86_64 0:1.87-4.el7
    perl-threads-shared.x86_64 0:1.43-6.el7
  
  Complete!
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirror.sfo12.us.leaseweb.net
   * extras: mirror.keystealth.org
   * updates: bay.uchicago.edu
  Package 1:make-3.82-24.el7.x86_64 already installed and latest version
  Package 4:perl-5.16.3-299.el7_9.x86_64 already installed and latest version
  Package bzip2-1.0.6-13.el7.x86_64 already installed and latest version
  Resolving Dependencies
  --> Running transaction check
  ---> Package binutils.x86_64 0:2.27-43.base.el7 will be updated
  ---> Package binutils.x86_64 0:2.27-44.base.el7_9.1 will be an update
  ---> Package gcc.x86_64 0:4.8.5-44.el7 will be installed
  --> Processing Dependency: libgomp = 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: cpp = 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libgcc >= 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: glibc-devel >= 2.2.90-12 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libmpfr.so.4()(64bit) for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libmpc.so.3()(64bit) for package: gcc-4.8.5-44.el7.x86_64
  --> Running transaction check
  ---> Package cpp.x86_64 0:4.8.5-44.el7 will be installed
  ---> Package glibc-devel.x86_64 0:2.17-326.el7_9 will be installed
  --> Processing Dependency: glibc-headers = 2.17-326.el7_9 for package: glibc-devel-2.17-326.el7_9.x86_64
  --> Processing Dependency: glibc = 2.17-326.el7_9 for package: glibc-devel-2.17-326.el7_9.x86_64
  --> Processing Dependency: glibc-headers for package: glibc-devel-2.17-326.el7_9.x86_64
  ---> Package libgcc.x86_64 0:4.8.5-39.el7 will be updated
  ---> Package libgcc.x86_64 0:4.8.5-44.el7 will be an update
  ---> Package libgomp.x86_64 0:4.8.5-39.el7 will be updated
  ---> Package libgomp.x86_64 0:4.8.5-44.el7 will be an update
  ---> Package libmpc.x86_64 0:1.0.1-3.el7 will be installed
  ---> Package mpfr.x86_64 0:3.1.1-4.el7 will be installed
  --> Running transaction check
  ---> Package glibc.x86_64 0:2.17-307.el7.1 will be updated
  --> Processing Dependency: glibc = 2.17-307.el7.1 for package: glibc-common-2.17-307.el7.1.x86_64
  ---> Package glibc.x86_64 0:2.17-326.el7_9 will be an update
  ---> Package glibc-headers.x86_64 0:2.17-326.el7_9 will be installed
  --> Processing Dependency: kernel-headers >= 2.2.1 for package: glibc-headers-2.17-326.el7_9.x86_64
  --> Processing Dependency: kernel-headers for package: glibc-headers-2.17-326.el7_9.x86_64
  --> Running transaction check
  ---> Package glibc-common.x86_64 0:2.17-307.el7.1 will be updated
  ---> Package glibc-common.x86_64 0:2.17-326.el7_9 will be an update
  ---> Package kernel-headers.x86_64 0:3.10.0-1160.80.1.el7 will be installed
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package             Arch        Version                     Repository    Size
  ================================================================================
  Installing:
   gcc                 x86_64      4.8.5-44.el7                base          16 M
  Updating:
   binutils            x86_64      2.27-44.base.el7_9.1        updates      5.9 M
  Installing for dependencies:
   cpp                 x86_64      4.8.5-44.el7                base         5.9 M
   glibc-devel         x86_64      2.17-326.el7_9              updates      1.1 M
   glibc-headers       x86_64      2.17-326.el7_9              updates      691 k
   kernel-headers      x86_64      3.10.0-1160.80.1.el7        updates      9.1 M
   libmpc              x86_64      1.0.1-3.el7                 base          51 k
   mpfr                x86_64      3.1.1-4.el7                 base         203 k
  Updating for dependencies:
   glibc               x86_64      2.17-326.el7_9              updates      3.6 M
   glibc-common        x86_64      2.17-326.el7_9              updates       12 M
   libgcc              x86_64      4.8.5-44.el7                base         103 k
   libgomp             x86_64      4.8.5-44.el7                base         159 k
  
  Transaction Summary
  ================================================================================
  Install  1 Package (+6 Dependent packages)
  Upgrade  1 Package (+4 Dependent packages)
  
  Total download size: 55 M
  Downloading packages:
  No Presto metadata available for base
  No Presto metadata available for updates
  --------------------------------------------------------------------------------
  Total                                               93 kB/s |  55 MB  10:00
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Updating   : libgcc-4.8.5-44.el7.x86_64                                  1/17
    Updating   : glibc-2.17-326.el7_9.x86_64                                 2/17
    Updating   : glibc-common-2.17-326.el7_9.x86_64                          3/17
    Installing : mpfr-3.1.1-4.el7.x86_64                                     4/17
    Installing : libmpc-1.0.1-3.el7.x86_64                                   5/17
    Installing : cpp-4.8.5-44.el7.x86_64                                     6/17
    Updating   : binutils-2.27-44.base.el7_9.1.x86_64                        7/17
    Updating   : libgomp-4.8.5-44.el7.x86_64                                 8/17
    Installing : kernel-headers-3.10.0-1160.80.1.el7.x86_64                  9/17
    Installing : glibc-headers-2.17-326.el7_9.x86_64                        10/17
    Installing : glibc-devel-2.17-326.el7_9.x86_64                          11/17
    Installing : gcc-4.8.5-44.el7.x86_64                                    12/17
    Cleanup    : libgomp-4.8.5-39.el7.x86_64                                13/17
    Cleanup    : binutils-2.27-43.base.el7.x86_64                           14/17
    Cleanup    : glibc-common-2.17-307.el7.1.x86_64                         15/17
    Cleanup    : glibc-2.17-307.el7.1.x86_64                                16/17
    Cleanup    : libgcc-4.8.5-39.el7.x86_64                                 17/17
    Verifying  : binutils-2.27-44.base.el7_9.1.x86_64                        1/17
    Verifying  : glibc-common-2.17-326.el7_9.x86_64                          2/17
    Verifying  : glibc-2.17-326.el7_9.x86_64                                 3/17
    Verifying  : mpfr-3.1.1-4.el7.x86_64                                     4/17
    Verifying  : glibc-devel-2.17-326.el7_9.x86_64                           5/17
    Verifying  : cpp-4.8.5-44.el7.x86_64                                     6/17
    Verifying  : glibc-headers-2.17-326.el7_9.x86_64                         7/17
    Verifying  : gcc-4.8.5-44.el7.x86_64                                     8/17
    Verifying  : libmpc-1.0.1-3.el7.x86_64                                   9/17
    Verifying  : libgcc-4.8.5-44.el7.x86_64                                 10/17
    Verifying  : libgomp-4.8.5-44.el7.x86_64                                11/17
    Verifying  : kernel-headers-3.10.0-1160.80.1.el7.x86_64                 12/17
    Verifying  : glibc-common-2.17-307.el7.1.x86_64                         13/17
    Verifying  : binutils-2.27-43.base.el7.x86_64                           14/17
    Verifying  : libgcc-4.8.5-39.el7.x86_64                                 15/17
    Verifying  : libgomp-4.8.5-39.el7.x86_64                                16/17
    Verifying  : glibc-2.17-307.el7.1.x86_64                                17/17
  
  Installed:
    gcc.x86_64 0:4.8.5-44.el7
  
  Dependency Installed:
    cpp.x86_64 0:4.8.5-44.el7
    glibc-devel.x86_64 0:2.17-326.el7_9
    glibc-headers.x86_64 0:2.17-326.el7_9
    kernel-headers.x86_64 0:3.10.0-1160.80.1.el7
    libmpc.x86_64 0:1.0.1-3.el7
    mpfr.x86_64 0:3.1.1-4.el7
  
  Updated:
    binutils.x86_64 0:2.27-44.base.el7_9.1
  
  Dependency Updated:
    glibc.x86_64 0:2.17-326.el7_9       glibc-common.x86_64 0:2.17-326.el7_9
    libgcc.x86_64 0:4.8.5-44.el7        libgomp.x86_64 0:4.8.5-44.el7
  
  Complete!
  Copy iso file E:\Program Files\Oracle\VirtualBox\VBoxGuestAdditions.iso into the box /tmp/VBoxGuestAdditions.iso
  Mounting Virtualbox Guest Additions ISO to: /mnt
  mount: /dev/loop0 is write-protected, mounting read-only
  Installing Virtualbox Guest Additions 7.0.2 - guest version is unknown
  Verifying archive integrity...  100%   MD5 checksums are OK. All good.
  Uncompressing VirtualBox 7.0.2 Guest Additions for Linux  100%
  VirtualBox Guest Additions installer
  /opt/VBoxGuestAdditions-7.0.2/bin/VBoxClient: error while loading shared libraries: libX11.so.6: cannot open shared object file: No such file or directory
  /opt/VBoxGuestAdditions-7.0.2/bin/VBoxClient: error while loading shared libraries: libX11.so.6: cannot open shared object file: No such file or directory
  VirtualBox Guest Additions: Starting.
  VirtualBox Guest Additions: Setting up modules
  VirtualBox Guest Additions: Building the VirtualBox Guest Additions kernel
  modules.  This may take a while.
  VirtualBox Guest Additions: To build modules for other installed kernels, run
  VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup <version>
  VirtualBox Guest Additions: or
  VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup all
  VirtualBox Guest Additions: Building the modules for kernel
  3.10.0-1127.el7.x86_64.
  Redirecting to /bin/systemctl start vboxadd.service
  Redirecting to /bin/systemctl start vboxadd-service.service
  Unmounting Virtualbox Guest Additions ISO from: /mnt
  ==> host1: Checking for guest additions in VM...
  ==> host1: Setting hostname...
  ==> host1: Rsyncing folder: /cygdrive/f/VagrantDemo2/ => /vagrant  # 文件同步成功
  
  # 进入虚拟机
  $ vagrant ssh
  [vagrant@host1 ~]$ cd /
  bin/     dev/     home/    lib64/   mnt/     proc/    run/     srv/     tmp/     vagrant/
  boot/    etc/     lib/     media/   opt/     root/    sbin/    sys/     usr/     var/
  [vagrant@host1 ~]$ cd /vagrant/
  [vagrant@host1 vagrant]$ ls # 查看同步的文件
  test.py  Vagrantfile
  [vagrant@host1 vagrant]$ cat test.py
  print("hello world!")
  # ...
  # 在本地项目目录下创建一个新的test.py文件
  # ...
  [vagrant@host1 vagrant]$ ls # 再次查看同步的文件
  test.py  Vagrantfile
  [vagrant@host1 vagrant]$ exit # 退出虚拟机
  logout
  Connection to 127.0.0.1 closed.
  
  # 删除虚拟机
  $ vagrant destroy -f
  ==> host1: Forcing shutdown of VM...
  ==> host1: Destroying VM and associated drives...
  ```

### 虚拟机与主机双向实时同步文件

#### Virtualbox

- Vagrantfile

  ```ruby
  # 优雅创建多台虚拟机
  host_list = [
    {
      :name => "host1",
      :box => "centos7",
      :ssh => true
    },
  ]
  
  Vagrant.configure("2") do |config|
    host_list.each do |item|
      config.vm.define item[:name] do |host|
          host.vm.hostname = item[:name] # 设置名称
          host.vm.box = item[:box] # 设置镜像
          host.ssh.insert_key = item[:ssh] # 是否使用安全的key
          host.vm.synced_folder ".", "/vagrant", type: "smb" # 实时双向同步
        end
    end
  end
  ```

- 执行

  ```shell
  # 创建虚拟机
  $ vagrant up --provider virtualbox
  Bringing machine 'host1' up with 'virtualbox' provider...
  ==> host1: Importing base box 'centos7'...
  ==> host1: Matching MAC address for NAT networking...
  ==> host1: Setting the name of the VM: VagrantDemo2_host1_1668155102661_40008
  ==> host1: Preparing SMB shared folders...
      host1: You will be asked for the username and password to use for the SMB
      host1: folders shortly. Please use the proper username/password of your
      host1: account.
      host1:
      host1: Username (user[@domain]): Administrator
      host1: Password (will be hidden):
  
  Vagrant requires administrator access to create SMB shares and
  may request access to complete setup of configured shares.
  ==> host1: Clearing any previously set network interfaces...
  ==> host1: Preparing network interfaces based on configuration...
      host1: Adapter 1: nat
  ==> host1: Forwarding ports...
      host1: 22 (guest) => 2222 (host) (adapter 1)
  ==> host1: Booting VM...
  ==> host1: Waiting for machine to boot. This may take a few minutes...
      host1: SSH address: 127.0.0.1:2222
      host1: SSH username: vagrant
      host1: SSH auth method: private key
      host1:
      host1: Vagrant insecure key detected. Vagrant will automatically replace
      host1: this with a newly generated keypair for better security.
      host1:
      host1: Inserting generated public key within guest...
      host1: Removing insecure key from the guest if it\'s present...
      host1: Key inserted! Disconnecting and reconnecting using new SSH key...
  ==> host1: Machine booted and ready!
  [host1] No Virtualbox Guest Additions installation found.
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirrors.ustc.edu.cn
   * extras: mirrors.ustc.edu.cn
   * updates: mirrors.ustc.edu.cn
  Resolving Dependencies
  --> Running transaction check
  ---> Package centos-release.x86_64 0:7-8.2003.0.el7.centos will be updated
  ---> Package centos-release.x86_64 0:7-9.2009.1.el7.centos will be an update
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package             Arch        Version                     Repository    Size
  ================================================================================
  Updating:
   centos-release      x86_64      7-9.2009.1.el7.centos       updates       27 k
  
  Transaction Summary
  ================================================================================
  Upgrade  1 Package
  
  Total download size: 27 k
  Downloading packages:
  No Presto metadata available for updates
  Public key for centos-release-7-9.2009.1.el7.centos.x86_64.rpm is not installed
  warning: /var/cache/yum/x86_64/7/updates/packages/centos-release-7-9.2009.1.el7.centos.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
  Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  Importing GPG key 0xF4A80EB5:
   Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
   Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
   Package    : centos-release-7-8.2003.0.el7.centos.x86_64 (@anaconda)
   From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Updating   : centos-release-7-9.2009.1.el7.centos.x86_64                  1/2
    Cleanup    : centos-release-7-8.2003.0.el7.centos.x86_64                  2/2
    Verifying  : centos-release-7-9.2009.1.el7.centos.x86_64                  1/2
    Verifying  : centos-release-7-8.2003.0.el7.centos.x86_64                  2/2
  
  Updated:
    centos-release.x86_64 0:7-9.2009.1.el7.centos
  
  Complete!
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirrors.ustc.edu.cn
   * extras: mirrors.ustc.edu.cn
   * updates: mirrors.ustc.edu.cn
  Resolving Dependencies
  --> Running transaction check
  ---> Package kernel-devel.x86_64 0:3.10.0-1127.el7 will be installed
  --> Processing Dependency: perl for package: kernel-devel-3.10.0-1127.el7.x86_64
  --> Running transaction check
  ---> Package perl.x86_64 4:5.16.3-299.el7_9 will be installed
  --> Processing Dependency: perl-libs = 4:5.16.3-299.el7_9 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Socket) >= 1.3 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Scalar::Util) >= 1.10 for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl-macros for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl-libs for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(threads::shared) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(threads) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(constant) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Time::Local) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Time::HiRes) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Storable) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Socket) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Scalar::Util) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Pod::Simple::XHTML) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Pod::Simple::Search) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Getopt::Long) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Filter::Util::Call) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Temp) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec::Unix) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec::Functions) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Spec) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(File::Path) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Exporter) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Cwd) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: perl(Carp) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Processing Dependency: libperl.so()(64bit) for package: 4:perl-5.16.3-299.el7_9.x86_64
  --> Running transaction check
  ---> Package perl-Carp.noarch 0:1.26-244.el7 will be installed
  ---> Package perl-Exporter.noarch 0:5.68-3.el7 will be installed
  ---> Package perl-File-Path.noarch 0:2.09-2.el7 will be installed
  ---> Package perl-File-Temp.noarch 0:0.23.01-3.el7 will be installed
  ---> Package perl-Filter.x86_64 0:1.49-3.el7 will be installed
  ---> Package perl-Getopt-Long.noarch 0:2.40-3.el7 will be installed
  --> Processing Dependency: perl(Pod::Usage) >= 1.14 for package: perl-Getopt-Long-2.40-3.el7.noarch
  --> Processing Dependency: perl(Text::ParseWords) for package: perl-Getopt-Long-2.40-3.el7.noarch
  ---> Package perl-PathTools.x86_64 0:3.40-5.el7 will be installed
  ---> Package perl-Pod-Simple.noarch 1:3.28-4.el7 will be installed
  --> Processing Dependency: perl(Pod::Escapes) >= 1.04 for package: 1:perl-Pod-Simple-3.28-4.el7.noarch
  --> Processing Dependency: perl(Encode) for package: 1:perl-Pod-Simple-3.28-4.el7.noarch
  ---> Package perl-Scalar-List-Utils.x86_64 0:1.27-248.el7 will be installed
  ---> Package perl-Socket.x86_64 0:2.010-5.el7 will be installed
  ---> Package perl-Storable.x86_64 0:2.45-3.el7 will be installed
  ---> Package perl-Time-HiRes.x86_64 4:1.9725-3.el7 will be installed
  ---> Package perl-Time-Local.noarch 0:1.2300-2.el7 will be installed
  ---> Package perl-constant.noarch 0:1.27-2.el7 will be installed
  ---> Package perl-libs.x86_64 4:5.16.3-299.el7_9 will be installed
  ---> Package perl-macros.x86_64 4:5.16.3-299.el7_9 will be installed
  ---> Package perl-threads.x86_64 0:1.87-4.el7 will be installed
  ---> Package perl-threads-shared.x86_64 0:1.43-6.el7 will be installed
  --> Running transaction check
  ---> Package perl-Encode.x86_64 0:2.51-7.el7 will be installed
  ---> Package perl-Pod-Escapes.noarch 1:1.04-299.el7_9 will be installed
  ---> Package perl-Pod-Usage.noarch 0:1.63-3.el7 will be installed
  --> Processing Dependency: perl(Pod::Text) >= 3.15 for package: perl-Pod-Usage-1.63-3.el7.noarch
  --> Processing Dependency: perl-Pod-Perldoc for package: perl-Pod-Usage-1.63-3.el7.noarch
  ---> Package perl-Text-ParseWords.noarch 0:3.29-4.el7 will be installed
  --> Running transaction check
  ---> Package perl-Pod-Perldoc.noarch 0:3.20-4.el7 will be installed
  --> Processing Dependency: perl(parent) for package: perl-Pod-Perldoc-3.20-4.el7.noarch
  --> Processing Dependency: perl(HTTP::Tiny) for package: perl-Pod-Perldoc-3.20-4.el7.noarch
  ---> Package perl-podlators.noarch 0:2.5.1-3.el7 will be installed
  --> Running transaction check
  ---> Package perl-HTTP-Tiny.noarch 0:0.033-3.el7 will be installed
  ---> Package perl-parent.noarch 1:0.225-244.el7 will be installed
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package                  Arch     Version               Repository        Size
  ================================================================================
  Installing:
   kernel-devel             x86_64   3.10.0-1127.el7       C7.8.2003-base    18 M
  Installing for dependencies:
   perl                     x86_64   4:5.16.3-299.el7_9    updates          8.0 M
   perl-Carp                noarch   1.26-244.el7          C7.0.1406-base    19 k
   perl-Encode              x86_64   2.51-7.el7            C7.0.1406-base   1.5 M
   perl-Exporter            noarch   5.68-3.el7            C7.0.1406-base    28 k
   perl-File-Path           noarch   2.09-2.el7            C7.0.1406-base    26 k
   perl-File-Temp           noarch   0.23.01-3.el7         C7.0.1406-base    56 k
   perl-Filter              x86_64   1.49-3.el7            C7.0.1406-base    76 k
   perl-Getopt-Long         noarch   2.40-3.el7            C7.5.1804-base    56 k
   perl-HTTP-Tiny           noarch   0.033-3.el7           C7.0.1406-base    38 k
   perl-PathTools           x86_64   3.40-5.el7            C7.0.1406-base    82 k
   perl-Pod-Escapes         noarch   1:1.04-299.el7_9      updates           52 k
   perl-Pod-Perldoc         noarch   3.20-4.el7            C7.0.1406-base    87 k
   perl-Pod-Simple          noarch   1:3.28-4.el7          C7.0.1406-base   216 k
   perl-Pod-Usage           noarch   1.63-3.el7            C7.0.1406-base    27 k
   perl-Scalar-List-Utils   x86_64   1.27-248.el7          C7.0.1406-base    36 k
   perl-Socket              x86_64   2.010-5.el7           C7.8.2003-base    49 k
   perl-Storable            x86_64   2.45-3.el7            C7.0.1406-base    77 k
   perl-Text-ParseWords     noarch   3.29-4.el7            C7.0.1406-base    14 k
   perl-Time-HiRes          x86_64   4:1.9725-3.el7        C7.0.1406-base    45 k
   perl-Time-Local          noarch   1.2300-2.el7          C7.0.1406-base    24 k
   perl-constant            noarch   1.27-2.el7            C7.0.1406-base    19 k
   perl-libs                x86_64   4:5.16.3-299.el7_9    updates          690 k
   perl-macros              x86_64   4:5.16.3-299.el7_9    updates           44 k
   perl-parent              noarch   1:0.225-244.el7       C7.0.1406-base    12 k
   perl-podlators           noarch   2.5.1-3.el7           C7.0.1406-base   112 k
   perl-threads             x86_64   1.87-4.el7            C7.0.1406-base    49 k
   perl-threads-shared      x86_64   1.43-6.el7            C7.0.1406-base    39 k
  
  Transaction Summary
  ================================================================================
  Install  1 Package (+27 Dependent packages)
  
  Total download size: 29 M
  Installed size: 74 M
  Downloading packages:
  No Presto metadata available for C7.8.2003-base
  http://vault.centos.org/7.5.1804/os/x86_64/Packages/perl-Getopt-Long-2.40-3.el7.noarch.rpm: [Errno 12] Timeout on https://vault.centos.org/7.5.1804/os/x86_64/Packages/perl-Getopt-Long-2.40-3.el7.noarch.rpm: (28, 'Operation timed out after 30765 milliseconds with 0 out of 0 bytes received')
  Trying other mirror.
  --------------------------------------------------------------------------------
  Total                                              813 kB/s |  29 MB  00:36
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Installing : 1:perl-parent-0.225-244.el7.noarch                          1/28
    Installing : perl-HTTP-Tiny-0.033-3.el7.noarch                           2/28
    Installing : perl-podlators-2.5.1-3.el7.noarch                           3/28
    Installing : perl-Pod-Perldoc-3.20-4.el7.noarch                          4/28
    Installing : 1:perl-Pod-Escapes-1.04-299.el7_9.noarch                    5/28
    Installing : perl-Encode-2.51-7.el7.x86_64                               6/28
    Installing : perl-Text-ParseWords-3.29-4.el7.noarch                      7/28
    Installing : perl-Pod-Usage-1.63-3.el7.noarch                            8/28
    Installing : 4:perl-macros-5.16.3-299.el7_9.x86_64                       9/28
    Installing : perl-Storable-2.45-3.el7.x86_64                            10/28
    Installing : perl-Exporter-5.68-3.el7.noarch                            11/28
    Installing : perl-constant-1.27-2.el7.noarch                            12/28
    Installing : perl-Socket-2.010-5.el7.x86_64                             13/28
    Installing : perl-Time-Local-1.2300-2.el7.noarch                        14/28
    Installing : perl-Carp-1.26-244.el7.noarch                              15/28
    Installing : 4:perl-Time-HiRes-1.9725-3.el7.x86_64                      16/28
    Installing : perl-PathTools-3.40-5.el7.x86_64                           17/28
    Installing : perl-Scalar-List-Utils-1.27-248.el7.x86_64                 18/28
    Installing : 1:perl-Pod-Simple-3.28-4.el7.noarch                        19/28
    Installing : perl-File-Temp-0.23.01-3.el7.noarch                        20/28
    Installing : perl-File-Path-2.09-2.el7.noarch                           21/28
    Installing : perl-threads-shared-1.43-6.el7.x86_64                      22/28
    Installing : perl-threads-1.87-4.el7.x86_64                             23/28
    Installing : perl-Filter-1.49-3.el7.x86_64                              24/28
    Installing : 4:perl-libs-5.16.3-299.el7_9.x86_64                        25/28
    Installing : perl-Getopt-Long-2.40-3.el7.noarch                         26/28
    Installing : 4:perl-5.16.3-299.el7_9.x86_64                             27/28
    Installing : kernel-devel-3.10.0-1127.el7.x86_64                        28/28
    Verifying  : perl-HTTP-Tiny-0.033-3.el7.noarch                           1/28
    Verifying  : perl-threads-shared-1.43-6.el7.x86_64                       2/28
    Verifying  : perl-Storable-2.45-3.el7.x86_64                             3/28
    Verifying  : perl-Exporter-5.68-3.el7.noarch                             4/28
    Verifying  : perl-constant-1.27-2.el7.noarch                             5/28
    Verifying  : perl-PathTools-3.40-5.el7.x86_64                            6/28
    Verifying  : 4:perl-macros-5.16.3-299.el7_9.x86_64                       7/28
    Verifying  : 1:perl-parent-0.225-244.el7.noarch                          8/28
    Verifying  : perl-Socket-2.010-5.el7.x86_64                              9/28
    Verifying  : perl-File-Temp-0.23.01-3.el7.noarch                        10/28
    Verifying  : kernel-devel-3.10.0-1127.el7.x86_64                        11/28
    Verifying  : 1:perl-Pod-Simple-3.28-4.el7.noarch                        12/28
    Verifying  : perl-Time-Local-1.2300-2.el7.noarch                        13/28
    Verifying  : 1:perl-Pod-Escapes-1.04-299.el7_9.noarch                   14/28
    Verifying  : perl-Carp-1.26-244.el7.noarch                              15/28
    Verifying  : 4:perl-Time-HiRes-1.9725-3.el7.x86_64                      16/28
    Verifying  : perl-Scalar-List-Utils-1.27-248.el7.x86_64                 17/28
    Verifying  : perl-Pod-Usage-1.63-3.el7.noarch                           18/28
    Verifying  : perl-Encode-2.51-7.el7.x86_64                              19/28
    Verifying  : perl-Pod-Perldoc-3.20-4.el7.noarch                         20/28
    Verifying  : perl-podlators-2.5.1-3.el7.noarch                          21/28
    Verifying  : 4:perl-5.16.3-299.el7_9.x86_64                             22/28
    Verifying  : perl-File-Path-2.09-2.el7.noarch                           23/28
    Verifying  : perl-threads-1.87-4.el7.x86_64                             24/28
    Verifying  : perl-Filter-1.49-3.el7.x86_64                              25/28
    Verifying  : perl-Getopt-Long-2.40-3.el7.noarch                         26/28
    Verifying  : perl-Text-ParseWords-3.29-4.el7.noarch                     27/28
    Verifying  : 4:perl-libs-5.16.3-299.el7_9.x86_64                        28/28
  
  Installed:
    kernel-devel.x86_64 0:3.10.0-1127.el7
  
  Dependency Installed:
    perl.x86_64 4:5.16.3-299.el7_9
    perl-Carp.noarch 0:1.26-244.el7
    perl-Encode.x86_64 0:2.51-7.el7
    perl-Exporter.noarch 0:5.68-3.el7
    perl-File-Path.noarch 0:2.09-2.el7
    perl-File-Temp.noarch 0:0.23.01-3.el7
    perl-Filter.x86_64 0:1.49-3.el7
    perl-Getopt-Long.noarch 0:2.40-3.el7
    perl-HTTP-Tiny.noarch 0:0.033-3.el7
    perl-PathTools.x86_64 0:3.40-5.el7
    perl-Pod-Escapes.noarch 1:1.04-299.el7_9
    perl-Pod-Perldoc.noarch 0:3.20-4.el7
    perl-Pod-Simple.noarch 1:3.28-4.el7
    perl-Pod-Usage.noarch 0:1.63-3.el7
    perl-Scalar-List-Utils.x86_64 0:1.27-248.el7
    perl-Socket.x86_64 0:2.010-5.el7
    perl-Storable.x86_64 0:2.45-3.el7
    perl-Text-ParseWords.noarch 0:3.29-4.el7
    perl-Time-HiRes.x86_64 4:1.9725-3.el7
    perl-Time-Local.noarch 0:1.2300-2.el7
    perl-constant.noarch 0:1.27-2.el7
    perl-libs.x86_64 4:5.16.3-299.el7_9
    perl-macros.x86_64 4:5.16.3-299.el7_9
    perl-parent.noarch 1:0.225-244.el7
    perl-podlators.noarch 0:2.5.1-3.el7
    perl-threads.x86_64 0:1.87-4.el7
    perl-threads-shared.x86_64 0:1.43-6.el7
  
  Complete!
  Loaded plugins: fastestmirror
  Loading mirror speeds from cached hostfile
   * base: mirrors.ustc.edu.cn
   * extras: mirrors.ustc.edu.cn
   * updates: mirrors.ustc.edu.cn
  Package 1:make-3.82-24.el7.x86_64 already installed and latest version
  Package 4:perl-5.16.3-299.el7_9.x86_64 already installed and latest version
  Package bzip2-1.0.6-13.el7.x86_64 already installed and latest version
  Resolving Dependencies
  --> Running transaction check
  ---> Package binutils.x86_64 0:2.27-43.base.el7 will be updated
  ---> Package binutils.x86_64 0:2.27-44.base.el7_9.1 will be an update
  ---> Package gcc.x86_64 0:4.8.5-44.el7 will be installed
  --> Processing Dependency: libgomp = 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: cpp = 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libgcc >= 4.8.5-44.el7 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: glibc-devel >= 2.2.90-12 for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libmpfr.so.4()(64bit) for package: gcc-4.8.5-44.el7.x86_64
  --> Processing Dependency: libmpc.so.3()(64bit) for package: gcc-4.8.5-44.el7.x86_64
  --> Running transaction check
  ---> Package cpp.x86_64 0:4.8.5-44.el7 will be installed
  ---> Package glibc-devel.x86_64 0:2.17-326.el7_9 will be installed
  --> Processing Dependency: glibc-headers = 2.17-326.el7_9 for package: glibc-devel-2.17-326.el7_9.x86_64
  --> Processing Dependency: glibc = 2.17-326.el7_9 for package: glibc-devel-2.17-326.el7_9.x86_64
  --> Processing Dependency: glibc-headers for package: glibc-devel-2.17-326.el7_9.x86_64
  ---> Package libgcc.x86_64 0:4.8.5-39.el7 will be updated
  ---> Package libgcc.x86_64 0:4.8.5-44.el7 will be an update
  ---> Package libgomp.x86_64 0:4.8.5-39.el7 will be updated
  ---> Package libgomp.x86_64 0:4.8.5-44.el7 will be an update
  ---> Package libmpc.x86_64 0:1.0.1-3.el7 will be installed
  ---> Package mpfr.x86_64 0:3.1.1-4.el7 will be installed
  --> Running transaction check
  ---> Package glibc.x86_64 0:2.17-307.el7.1 will be updated
  --> Processing Dependency: glibc = 2.17-307.el7.1 for package: glibc-common-2.17-307.el7.1.x86_64
  ---> Package glibc.x86_64 0:2.17-326.el7_9 will be an update
  ---> Package glibc-headers.x86_64 0:2.17-326.el7_9 will be installed
  --> Processing Dependency: kernel-headers >= 2.2.1 for package: glibc-headers-2.17-326.el7_9.x86_64
  --> Processing Dependency: kernel-headers for package: glibc-headers-2.17-326.el7_9.x86_64
  --> Running transaction check
  ---> Package glibc-common.x86_64 0:2.17-307.el7.1 will be updated
  ---> Package glibc-common.x86_64 0:2.17-326.el7_9 will be an update
  ---> Package kernel-headers.x86_64 0:3.10.0-1160.80.1.el7 will be installed
  --> Finished Dependency Resolution
  
  Dependencies Resolved
  
  ================================================================================
   Package             Arch        Version                     Repository    Size
  ================================================================================
  Installing:
   gcc                 x86_64      4.8.5-44.el7                base          16 M
  Updating:
   binutils            x86_64      2.27-44.base.el7_9.1        updates      5.9 M
  Installing for dependencies:
   cpp                 x86_64      4.8.5-44.el7                base         5.9 M
   glibc-devel         x86_64      2.17-326.el7_9              updates      1.1 M
   glibc-headers       x86_64      2.17-326.el7_9              updates      691 k
   kernel-headers      x86_64      3.10.0-1160.80.1.el7        updates      9.1 M
   libmpc              x86_64      1.0.1-3.el7                 base          51 k
   mpfr                x86_64      3.1.1-4.el7                 base         203 k
  Updating for dependencies:
   glibc               x86_64      2.17-326.el7_9              updates      3.6 M
   glibc-common        x86_64      2.17-326.el7_9              updates       12 M
   libgcc              x86_64      4.8.5-44.el7                base         103 k
   libgomp             x86_64      4.8.5-44.el7                base         159 k
  
  Transaction Summary
  ================================================================================
  Install  1 Package (+6 Dependent packages)
  Upgrade  1 Package (+4 Dependent packages)
  
  Total download size: 55 M
  Downloading packages:
  No Presto metadata available for base
  No Presto metadata available for updates
  --------------------------------------------------------------------------------
  Total                                              7.2 MB/s |  55 MB  00:07
  Running transaction check
  Running transaction test
  Transaction test succeeded
  Running transaction
    Updating   : libgcc-4.8.5-44.el7.x86_64                                  1/17
    Updating   : glibc-2.17-326.el7_9.x86_64                                 2/17
    Updating   : glibc-common-2.17-326.el7_9.x86_64                          3/17
    Installing : mpfr-3.1.1-4.el7.x86_64                                     4/17
    Installing : libmpc-1.0.1-3.el7.x86_64                                   5/17
    Installing : cpp-4.8.5-44.el7.x86_64                                     6/17
    Updating   : binutils-2.27-44.base.el7_9.1.x86_64                        7/17
    Updating   : libgomp-4.8.5-44.el7.x86_64                                 8/17
    Installing : kernel-headers-3.10.0-1160.80.1.el7.x86_64                  9/17
    Installing : glibc-headers-2.17-326.el7_9.x86_64                        10/17
    Installing : glibc-devel-2.17-326.el7_9.x86_64                          11/17
    Installing : gcc-4.8.5-44.el7.x86_64                                    12/17
    Cleanup    : libgomp-4.8.5-39.el7.x86_64                                13/17
    Cleanup    : binutils-2.27-43.base.el7.x86_64                           14/17
    Cleanup    : glibc-common-2.17-307.el7.1.x86_64                         15/17
    Cleanup    : glibc-2.17-307.el7.1.x86_64                                16/17
    Cleanup    : libgcc-4.8.5-39.el7.x86_64                                 17/17
    Verifying  : binutils-2.27-44.base.el7_9.1.x86_64                        1/17
    Verifying  : glibc-common-2.17-326.el7_9.x86_64                          2/17
    Verifying  : glibc-2.17-326.el7_9.x86_64                                 3/17
    Verifying  : mpfr-3.1.1-4.el7.x86_64                                     4/17
    Verifying  : glibc-devel-2.17-326.el7_9.x86_64                           5/17
    Verifying  : cpp-4.8.5-44.el7.x86_64                                     6/17
    Verifying  : glibc-headers-2.17-326.el7_9.x86_64                         7/17
    Verifying  : gcc-4.8.5-44.el7.x86_64                                     8/17
    Verifying  : libmpc-1.0.1-3.el7.x86_64                                   9/17
    Verifying  : libgcc-4.8.5-44.el7.x86_64                                 10/17
    Verifying  : libgomp-4.8.5-44.el7.x86_64                                11/17
    Verifying  : kernel-headers-3.10.0-1160.80.1.el7.x86_64                 12/17
    Verifying  : glibc-common-2.17-307.el7.1.x86_64                         13/17
    Verifying  : binutils-2.27-43.base.el7.x86_64                           14/17
    Verifying  : libgcc-4.8.5-39.el7.x86_64                                 15/17
    Verifying  : libgomp-4.8.5-39.el7.x86_64                                16/17
    Verifying  : glibc-2.17-307.el7.1.x86_64                                17/17
  
  Installed:
    gcc.x86_64 0:4.8.5-44.el7
  
  Dependency Installed:
    cpp.x86_64 0:4.8.5-44.el7
    glibc-devel.x86_64 0:2.17-326.el7_9
    glibc-headers.x86_64 0:2.17-326.el7_9
    kernel-headers.x86_64 0:3.10.0-1160.80.1.el7
    libmpc.x86_64 0:1.0.1-3.el7
    mpfr.x86_64 0:3.1.1-4.el7
  
  Updated:
    binutils.x86_64 0:2.27-44.base.el7_9.1
  
  Dependency Updated:
    glibc.x86_64 0:2.17-326.el7_9       glibc-common.x86_64 0:2.17-326.el7_9
    libgcc.x86_64 0:4.8.5-44.el7        libgomp.x86_64 0:4.8.5-44.el7
  
  Complete!
  Copy iso file E:\Program Files\Oracle\VirtualBox\VBoxGuestAdditions.iso into the box /tmp/VBoxGuestAdditions.iso
  Mounting Virtualbox Guest Additions ISO to: /mnt
  mount: /dev/loop0 is write-protected, mounting read-only
  Installing Virtualbox Guest Additions 7.0.2 - guest version is unknown
  Verifying archive integrity...  100%   MD5 checksums are OK. All good.
  Uncompressing VirtualBox 7.0.2 Guest Additions for Linux  100%
  VirtualBox Guest Additions installer
  /opt/VBoxGuestAdditions-7.0.2/bin/VBoxClient: error while loading shared libraries: libX11.so.6: cannot open shared object file: No such file or directory
  /opt/VBoxGuestAdditions-7.0.2/bin/VBoxClient: error while loading shared libraries: libX11.so.6: cannot open shared object file: No such file or directory
  VirtualBox Guest Additions: Starting.
  VirtualBox Guest Additions: Setting up modules
  VirtualBox Guest Additions: Building the VirtualBox Guest Additions kernel
  modules.  This may take a while.
  VirtualBox Guest Additions: To build modules for other installed kernels, run
  VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup <version>
  VirtualBox Guest Additions: or
  VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup all
  VirtualBox Guest Additions: Building the modules for kernel
  3.10.0-1127.el7.x86_64.
  Redirecting to /bin/systemctl start vboxadd.service
  Redirecting to /bin/systemctl start vboxadd-service.service
  Unmounting Virtualbox Guest Additions ISO from: /mnt
  ==> host1: Checking for guest additions in VM...
  ==> host1: Setting hostname...
  ==> host1: Mounting SMB shared folders...
      host1: F:/VagrantDemo2 => /vagrant
      
  # 进入虚拟机
  $ vagrant ssh
  [vagrant@host1 ~]$ ls /vagrant/ # 查看同步的目录
  test.py  Vagrantfile
  # ...
  # 在主机目录中编辑test.py文件
  # ...
  [vagrant@host1 ~]$ cat /vagrant/test.py # 查看文件内容
  print("hello world!")
  print("hello world!")
  # ...
  # 在主机目录中创建test1.py文件
  # ...
  [vagrant@host1 ~]$ ls /vagrant/ # 再次查看目录
  test1.py  test.py  Vagrantfile
  [vagrant@host1 ~]$ cd /vagrant/
  [vagrant@host1 vagrant]$ ls
  test1.py  test.py  Vagrantfile
  [vagrant@host1 vagrant]$ touch test2.py # 创建一个新的文件
  [vagrant@host1 vagrant]$ ls
  test1.py  test2.py  test.py  Vagrantfile
  # ...
  # 在主机目录中同样也能看到 test2.py 文件
  # ...
  [vagrant@host1 vagrant]$ exit # 退出虚拟机
  logout
  Connection to 127.0.0.1 closed.
  
  # 虚拟机关机
  $ vagrant halt
  ==> host1: Attempting graceful shutdown of VM...
  ```

#### hyper-V

- 查看 **Terminal** 版本 【版本必须大于3.0】

  ```shell
  $ Get-Host | Select-Object Version
  
  Version
  -------
  7.2.7
  ```

- Vagrantfile

  ```ruby
  # 优雅创建多台虚拟机
  host_list = [
    {
      :name => "host1",
      :box => "centos7",
      :ssh => true
    },
  ]
  
  Vagrant.configure("2") do |config|
    host_list.each do |item|
      config.vm.define item[:name] do |host|
          host.vm.hostname = item[:name] # 设置名称
          host.vm.box = item[:box] # 设置镜像
          host.ssh.insert_key = item[:ssh] # 是否使用安全的key
          host.vm.synced_folder '.', '/vagrant', type: "smb" # 实时同步
        end
    end
  end
  ```

- 执行

  ```shell
  # 创建虚拟机
  $ vagrant up --provider=hyperv
  Bringing machine 'host1' up with 'hyperv' provider...
  ==> host1: Verifying Hyper-V is enabled...
  ==> host1: Verifying Hyper-V is accessible...
  ==> host1: Importing a Hyper-V instance
      host1: Creating and registering the VM...
      host1: Successfully imported VM
      host1: Please choose a switch to attach to your Hyper-V instance.
      host1: If none of these are appropriate, please open the Hyper-V manager
      host1: to create a new virtual switch.
      host1:
      host1: 1) Default Switch
      host1: 2) WSL
      host1:
      host1: What switch would you like to use? 1
      host1: Configuring the VM...
      host1: Setting VM Enhanced session transport type to disabled/default (VMBus)
  ==> host1: Starting the machine...
  ==> host1: Waiting for the machine to report its IP address...
      host1: Timeout: 120 seconds
      host1: IP: 172.24.23.193
  ==> host1: Waiting for machine to boot. This may take a few minutes...
      host1: SSH address: 172.24.23.193:22
      host1: SSH username: vagrant
      host1: SSH auth method: private key
      host1:
      host1: Vagrant insecure key detected. Vagrant will automatically replace
      host1: this with a newly generated keypair for better security.
      host1:
      host1: Inserting generated public key within guest...
      host1: Removing insecure key from the guest if it's present...
      host1: Key inserted! Disconnecting and reconnecting using new SSH key...
  ==> host1: Machine booted and ready!
  ==> host1: Preparing SMB shared folders...
      host1: You will be asked for the username and password to use for the SMB
      host1: folders shortly. Please use the proper username/password of your
      host1: account.
      host1:
      host1: Username (user[@domain]): Administrator
      host1: Password (will be hidden):
  
  Vagrant requires administrator access to create SMB shares and
  may request access to complete setup of configured shares.
  ==> host1: Setting hostname...
  ==> host1: Mounting SMB shared folders...
      host1: F:/VagrantDemo1 => /vagrant  # 主机目录与虚拟机目录同步
  
  # 进入虚拟机
  $ vagrant ssh
  [vagrant@host1 ~]$ cd /vagrant/  # 切换至挂载目录
  [vagrant@host1 vagrant]$ ls  # 查看目录
  test.py  Vagrantfile
  [vagrant@host1 vagrant]$ touch test1.py # 创建test1.py文件
  [vagrant@host1 vagrant]$ ls # 查看目录
  test1.py  test.py  Vagrantfile
  # ...
  # 宿主机目录中同样能看到新创建的test1.py文件
  # ...
  # ...
  # 在宿主机目录中创建test2.py文件
  # ...
  [vagrant@host1 vagrant]$ ls
  test1.py  test2.py  test.py  Vagrantfile
  [vagrant@host1 vagrant]$ exit # 退出虚拟机
  logout
  Connection to 172.24.23.193 closed.
  
  # 关闭虚拟机
  $ vagrant halt
  ==> host1: Attempting graceful shutdown of VM...
  ```

  

### 同时适应于 Hyper-V 和 VirtualBox的 Vagrantfile

```ruby
# 优雅创建多台虚拟机
host_list = [
  {
    :name => "host1",
    :box => "centos7",
    :ssh => true
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

