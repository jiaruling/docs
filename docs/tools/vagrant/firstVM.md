---
title: 创建第一台虚拟机
---

## Hyper-V

- 在 **Vagrant Cloud** 中查找需要的镜像（本例使用 **generic/alpine38** ）

- 在命令行窗口中执行以下命令

  ```shell
  # 创建文件夹并进入
  $ mkdir VagrantDemo && cd VagrantDemo
  
  # 生成vagrantfile文件, vagrant使用generic/alpine38镜像
  $ vagrant init generic/alpine38
  A `Vagrantfile` has been placed in this directory. You are now
  ready to `vagrant up` your first virtual environment! Please read
  the comments in the Vagrantfile as well as documentation on
  `vagrantup.com` for more information on using Vagrant.
  
  # 查看vagrant启动的帮助文档
  $ vagrant up --help
  Usage: vagrant up [options] [name|id]
  
  Options:
  
          --[no-]provision             Enable or disable provisioning
          --provision-with x,y,z       Enable only certain provisioners, by type or by name.
          --[no-]destroy-on-error      Destroy machine if any fatal error happens (default to true)
          --[no-]parallel              Enable or disable parallelism if provider supports it
          --provider PROVIDER          Back the machine with a specific provider
          --[no-]install-provider      If possible, install the provider if it isn\'t installed
          --[no-]color                 Enable or disable color output
          --machine-readable           Enable machine readable output
      -v, --version                    Display Vagrant version
          --debug                      Enable debug output
          --timestamp                  Enable timestamps on log output
          --debug-timestamp            Enable debug output with timestamps
          --no-tty                     Enable non-interactive output
      -h, --help                       Print this help
  
  # vagrant up 指定 provider 为 hyper-V, --color 控制台彩色输出
  $ vagrant up --provider hyperv --color
  Bringing machine 'default' up with 'hyperv' provider...
  ==> default: Verifying Hyper-V is enabled...
  ==> default: Verifying Hyper-V is accessible...
  ==> default: Box 'generic/alpine38' could not be found. Attempting to find and install...
      default: Box Provider: hyperv
      default: Box Version: >= 0
  ==> default: Loading metadata for box 'generic/alpine38'
      default: URL: https://vagrantcloud.com/generic/alpine38
  ==> default: Adding box 'generic/alpine38' (v4.2.0) for provider: hyperv
      default: Downloading: https://vagrantcloud.com/generic/boxes/alpine38/versions/4.2.0/providers/hyperv.box
      default:
      default: Calculating and comparing box checksum...
  ==> default: Successfully added box 'generic/alpine38' (v4.2.0) for 'hyperv'!
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
      default: IP: 172.24.21.146
  ==> default: Waiting for machine to boot. This may take a few minutes...
      default: SSH address: 172.24.21.146:22
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
  
  # 查看虚拟机状态
  $ vagrant status
  Current machine states:
  
  default                   running (hyperv)
  ```

## Virtual Box

- 在 **Vagrant Cloud** 中查找需要的镜像（本例使用 **generic/alpine38** ）

- **Virtual Box** 安装路径要加入系统环境变量 **Path**，并重新打开命令行窗口 

- 在命令行窗口中执行以下命令

  ```shell
  # 创建文件夹并进入
  $ mkdir VagrantDemo && cd VagrantDemo
  
  # 生成vagrantfile文件, vagrant使用generic/alpine38镜像
  $ vagrant init generic/alpine38
  A `Vagrantfile` has been placed in this directory. You are now
  ready to `vagrant up` your first virtual environment! Please read
  the comments in the Vagrantfile as well as documentation on
  `vagrantup.com` for more information on using Vagrant.
  
  # vagrant up 指定 provider 为 virtualbox, --color 控制台彩色输出
  $ vagrant up --provider virtualbox --color
  Bringing machine 'default' up with 'virtualbox' provider...
  ==> default: Box 'generic/alpine38' could not be found. Attempting to find and install...
      default: Box Provider: virtualbox
      default: Box Version: >= 0
  ==> default: Loading metadata for box 'generic/alpine38'
      default: URL: https://vagrantcloud.com/generic/alpine38
  ==> default: Adding box 'generic/alpine38' (v4.2.0) for provider: virtualbox
      default: Downloading: https://vagrantcloud.com/generic/boxes/alpine38/versions/4.2.0/providers/virtualbox.box
      default:
      default: Calculating and comparing box checksum...
  ==> default: Successfully added box 'generic/alpine38' (v4.2.0) for 'virtualbox'!
  ==> default: Importing base box 'generic/alpine38'...
  ==> default: Matching MAC address for NAT networking...
  ==> default: Checking if box 'generic/alpine38' version '4.2.0' is up to date...
  ==> default: Setting the name of the VM: VagrantDemo2_default_1668065004730_10093
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
      default:
      default: Vagrant insecure key detected. Vagrant will automatically replace
      default: this with a newly generated keypair for better security.
      default:
      default: Inserting generated public key within guest...
      default: Removing insecure key from the guest if it's present...
      default: Key inserted! Disconnecting and reconnecting using new SSH key...
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
      default: VirtualBox Version: 7.0
  
  # 查看虚拟机状态
  $ vagrant status
  Current machine states:
  
  default                   running (virtualbox)
  
  The VM is running. To stop this VM, you can run `vagrant halt` to
  shut it down forcefully, or you can run `vagrant suspend` to simply
  suspend the virtual machine. In either case, to restart it again,
  simply run `vagrant up`.
  ```

  
