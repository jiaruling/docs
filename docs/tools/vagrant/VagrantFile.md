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
        :box => "generic/alpine37",
        :ssh => false
      },
      {
        :name => "host3",
        :box => "generic/alpine36",
        :ssh => true
      }
    
    ]
    
    Vagrant.configure("2") do |config|
      host_list.each do |item|
        config.vm.define item[:name] do |host|
            host.vm.hostname = item[:name] # 设置名称
            host.vm.box = item[:box] # 设置镜像
            host.ssh.insert_key = item[:ssh] # 是否使用安全key
          end
      end
    end
    ```

- 执行

    ```shell
    # 创建虚拟机
    $ vagrant up --provider virtualbox
    
    ```

    