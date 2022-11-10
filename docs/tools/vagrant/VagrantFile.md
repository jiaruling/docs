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
  Connection to 172.24.29.166 closed.
  ```

  