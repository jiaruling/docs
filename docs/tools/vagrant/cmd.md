---
title: vagrant基础命令
---

## 基础命令
- **Start**: `vagrant up`
- **Check status**: `vagrant status`
- **SSH Connection**: `vagrant ssh <name>`
- **SSH cfg**: `vagrant ssh-config`
- **Supend/resume/reload/stop**: `vagrant suspend/resume/reload/halt <name>`
- **Delete/Remove**:`vagrant destroy <name>`

## 实践
```shell
# 进入文件夹
$ cd VagrantDemo

# 查看虚拟机状态
$ vagrant status
Current machine states:

default                   running (hyperv)

# 通过 ssh 进入虚拟机
$ vagrant ssh
# 虚拟机中的操作
alpine38:~$ ls
alpine38:~$ cd /
alpine38:/$ ls
bin         dev         home        lost+found  mnt         root        sbin        sys         usr
boot        etc         lib         media       proc        run         srv         tmp         var
alpine38:/$ exit
logout
Connection to 172.24.21.146 closed.

# 查看 ssh 的配置
$ vagrant ssh-config
Host default
  HostName 172.24.21.146
  User vagrant
  Port 22
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile F:/VagrantDemo/.vagrant/machines/default/hyperv/private_key
  IdentitiesOnly yes
  LogLevel FATAL

# 暂停虚拟机
$ vagrant suspend
==> default: Suspending the machine...
$ vagrant status
Current machine states:

default                   paused (hyperv)

# 恢复虚拟机
$ vagrant resume
==> default: Resuming the machine...
==> default: Waiting for the machine to report its IP address...
    default: Timeout: 120 seconds

==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 172.24.21.146:22
    default: SSH username: vagrant
    default: SSH auth method: private key
==> default: Machine booted and ready!
$ vagrant status
Current machine states:

default                   running (hyperv)

# 关闭虚拟机
$ vagrant halt
==> default: Attempting graceful shutdown of VM...
$ vagrant status
Current machine states:

default                   off (hyperv)

# 启动虚拟机
$ vagrant up
Bringing machine 'default' up with 'hyperv' provider...
==> default: Verifying Hyper-V is enabled...
==> default: Verifying Hyper-V is accessible...
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
==> default: Machine booted and ready!
==> default: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> default: flag to force provisioning. Provisioners marked to run always will still run.
$ vagrant status
Current machine states:

default                   running (hyperv)

# 重启虚拟机
$ vagrant reload
==> default: Attempting graceful shutdown of VM...
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
==> default: Machine booted and ready!
==> default: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> default: flag to force provisioning. Provisioners marked to run always will still run.

# 删除虚拟机
$ vagrant destroy
    default: Are you sure you want to destroy the 'default' VM? [y/N] y
==> default: Stopping the machine...
==> default: Deleting the machine...
```