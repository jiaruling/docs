---
title: Vagrant 快速搭建实验环境
---

## 文件准备

- 项目结构

  ```shell{1}
  $ dir
          Directory: F:\VagrantDemo2


  Mode                LastWriteTime         Length Name
  ----                -------------         ------ ----
  -a---        2022/11/18     11:23            627   setup.sh
  -a---        2022/11/18     11:24           1142   Vagrantfile
  ```

- **Vagrantfile**

  ```ruby
  # -*- mode: ruby -*-
  # vi: set ft=ruby :

  Vagrant.require_version ">= 1.6.0"

  boxes = [
      {
          :name => "ansible-controller",
          :eth1 => "192.168.200.10",
          :mem => "1024",
          :cpu => "1"
      },
      {
          :name => "ansible-node1",
          :eth1 => "192.168.200.11",
          :mem => "1024",
          :cpu => "1"
      },
      {
          :name => "ansible-node2",
          :eth1 => "192.168.200.12",
          :mem => "1024",
          :cpu => "1"
      }
  ]

  Vagrant.configure(2) do |config|

    config.vm.box = "centos7"
    boxes.each do |opts|
      config.vm.define opts[:name] do |config|
        config.vm.hostname = opts[:name]
        config.vm.provider "vmware_fusion" do |v|
          v.vmx["memsize"] = opts[:mem]
          v.vmx["numvcpus"] = opts[:cpu]
        end
        config.vm.provider "virtualbox" do |v|
          v.customize ["modifyvm", :id, "--memory", opts[:mem]]
          v.customize ["modifyvm", :id, "--cpus", opts[:cpu]]
        end
        config.vm.network :private_network, ip: opts[:eth1]
      end
    end
    config.vm.provision "shell", privileged: false, path: "./setup.sh"
  end
  ```

- **setup.sh**

  ```shell
  #/bin/sh
  
  # install some tools
  sudo yum install -y epel-release git vim gcc glibc-static telnet
  
  # open password auth for backup if ssh key doesn't work, bydefault, username=vagrant password=vagrant
  sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
  sudo systemctl restart sshd
  
  # install ansible
  if [ "$HOSTNAME" = "ansible-controller" ]; then
      sudo yum install -y ansible
  fi
  
  # edit host file
  
  sudo sh -c "echo 192.168.200.10 ansible-controller >> /etc/hosts"
  sudo sh -c "echo 192.168.200.11 ansible-node1 >> /etc/hosts"
  sudo sh -c "echo 192.168.200.12 ansible-node2 >> /etc/hosts"
  ```

## 执行

```shell
# 创建虚拟机
$ vagrant up --provider=virtualbox

# 进入ansible-controller虚拟机
$ ssh vagrant@192.168.200.10

# ping node1 和 node2 是否可达
[vagrant@ansible-controller ~]$ ping ansible-node1

[vagrant@ansible-controller ~]$ ping ansible-node2

# 生成ssh证书
[vagrant@ansible-controller ~]$ ssh-keygen
Generating public/private rsa key pair.
## 指定生成证书的文件名
Enter file in which to save the key (/home/vagrant/.ssh/id_rsa): /home/vagrant/.ssh/ansible
## 剩余输入一直回车
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/vagrant/.ssh/ansible.
Your public key has been saved in /home/vagrant/.ssh/ansible.pub.
The key fingerprint is:
SHA256:Hn7PQbmuMq9r+U5Z3WXcx/K2pXJpHSQATW+EqqbDmfQ vagrant@ansible-controller
The key\'s randomart image is:
+---[RSA 2048]----+
|         .+o..   |
|           o+  o.|
|          .  +..B|
|         .  .oo=o|
|        S   + ..=|
|     . = . + . =+|
|    o * o.+ + =..|
|     * E=o + =   |
|      ..oO=.+    |
+----[SHA256]-----+
# 查看生成的ssh证书
[vagrant@ansible-controller ~]$ ls .ssh/
ansible  ansible.pub  authorized_keys
# 发送ssh证书至node1和node2
[vagrant@ansible-controller ~]$ ssh-copy-id -i .ssh/ansible.pub ansible-node1

[vagrant@ansible-controller ~]$ ssh-copy-id -i .ssh/ansible.pub ansible-node2
```

## 测试

```shell
# ansibel-controller 证书登录到 node1 和 node2
[vagrant@ansible-controller ~]$ ssh -i .ssh/ansible ansible-node1

[vagrant@ansible-controller ~]$ ssh -i .ssh/ansible ansible-node2
```

