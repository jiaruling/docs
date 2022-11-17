---
title: Asible安装和配置
---

:::tip 资源

[ansible官网](https://docs.ansible.com/)

:::

## 安装ansible

在ansible-controller节点中安装ansible, Ansible安装[地址](https://docs.ansible.com/ansible/latest/installation_guide/index.html)

```shell
# 进入ansible-controller
$ vagrant ssh ansible-controller

# 安装ansible step1 
[vagrant@ansible-controller ~]$ sudo yum install epel-release
Loaded plugins: fastestmirror
Determining fastest mirrors
 * base: mirrors.ustc.edu.cn
 * extras: mirrors.ustc.edu.cn
 * updates: mirrors.ustc.edu.cn
base                                                                                             | 3.6 kB  00:00:00
extras                                                                                           | 2.9 kB  00:00:00
updates                                                                                          | 2.9 kB  00:00:00
(1/4): base/7/x86_64/group_gz                                                                    | 153 kB  00:00:00
(2/4): extras/7/x86_64/primary_db                                                                | 249 kB  00:00:00
(3/4): base/7/x86_64/primary_db                                                                  | 6.1 MB  00:00:02
(4/4): updates/7/x86_64/primary_db                                                               |  18 MB  00:00:05
Resolving Dependencies
--> Running transaction check
---> Package epel-release.noarch 0:7-11 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                          Arch                       Version                   Repository                  Size
========================================================================================================================
Installing:
 epel-release                     noarch                     7-11                      extras                      15 k

Transaction Summary
========================================================================================================================
Install  1 Package

Total download size: 15 k
Installed size: 24 k
Is this ok [y/d/N]: y
Downloading packages:
warning: /var/cache/yum/x86_64/7/extras/packages/epel-release-7-11.noarch.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
Public key for epel-release-7-11.noarch.rpm is not installed
epel-release-7-11.noarch.rpm                                                                     |  15 kB  00:00:00
Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Importing GPG key 0xF4A80EB5:
 Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
 Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
 Package    : centos-release-7-8.2003.0.el7.centos.x86_64 (@anaconda)
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
Is this ok [y/N]: y
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : epel-release-7-11.noarch                                                                             1/1
  Verifying  : epel-release-7-11.noarch                                                                             1/1

Installed:
  epel-release.noarch 0:7-11

Complete!

# 安装ansible step2
[vagrant@ansible-controller ~]$ sudo yum install ansible
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
epel/x86_64/metalink                                                                             | 7.7 kB  00:00:00
 * base: mirrors.ustc.edu.cn
 * epel: mirror.lzu.edu.cn
 * extras: mirrors.ustc.edu.cn
 * updates: mirrors.ustc.edu.cn
epel                                                                                             | 4.7 kB  00:00:00
(1/3): epel/x86_64/group_gz                                                                      |  98 kB  00:00:00
(2/3): epel/x86_64/updateinfo                                                                    | 1.0 MB  00:00:01
(3/3): epel/x86_64/primary_db                                                                    | 7.0 MB  00:00:05
Resolving Dependencies
--> Running transaction check
---> Package ansible.noarch 0:2.9.27-1.el7 will be installed
--> Processing Dependency: PyYAML for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python-httplib2 for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python-jinja2 for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python-paramiko for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python-setuptools for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python-six for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python2-cryptography for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: python2-jmespath for package: ansible-2.9.27-1.el7.noarch
--> Processing Dependency: sshpass for package: ansible-2.9.27-1.el7.noarch
--> Running transaction check
---> Package PyYAML.x86_64 0:3.10-11.el7 will be installed
--> Processing Dependency: libyaml-0.so.2()(64bit) for package: PyYAML-3.10-11.el7.x86_64
---> Package python-jinja2.noarch 0:2.7.2-4.el7 will be installed
--> Processing Dependency: python-babel >= 0.8 for package: python-jinja2-2.7.2-4.el7.noarch
--> Processing Dependency: python-markupsafe for package: python-jinja2-2.7.2-4.el7.noarch
---> Package python-paramiko.noarch 0:2.1.1-9.el7 will be installed
--> Processing Dependency: python2-pyasn1 for package: python-paramiko-2.1.1-9.el7.noarch
---> Package python-setuptools.noarch 0:0.9.8-7.el7 will be installed
--> Processing Dependency: python-backports-ssl_match_hostname for package: python-setuptools-0.9.8-7.el7.noarch
---> Package python-six.noarch 0:1.9.0-2.el7 will be installed
---> Package python2-cryptography.x86_64 0:1.7.2-2.el7 will be installed
--> Processing Dependency: python-idna >= 2.0 for package: python2-cryptography-1.7.2-2.el7.x86_64
--> Processing Dependency: python-cffi >= 1.4.1 for package: python2-cryptography-1.7.2-2.el7.x86_64
--> Processing Dependency: python-ipaddress for package: python2-cryptography-1.7.2-2.el7.x86_64
--> Processing Dependency: python-enum34 for package: python2-cryptography-1.7.2-2.el7.x86_64
---> Package python2-httplib2.noarch 0:0.18.1-3.el7 will be installed
---> Package python2-jmespath.noarch 0:0.9.4-2.el7 will be installed
---> Package sshpass.x86_64 0:1.06-2.el7 will be installed
--> Running transaction check
---> Package libyaml.x86_64 0:0.1.4-11.el7_0 will be installed
---> Package python-babel.noarch 0:0.9.6-8.el7 will be installed
---> Package python-backports-ssl_match_hostname.noarch 0:3.5.0.1-1.el7 will be installed
--> Processing Dependency: python-backports for package: python-backports-ssl_match_hostname-3.5.0.1-1.el7.noarch
---> Package python-cffi.x86_64 0:1.6.0-5.el7 will be installed
--> Processing Dependency: python-pycparser for package: python-cffi-1.6.0-5.el7.x86_64
---> Package python-enum34.noarch 0:1.0.4-1.el7 will be installed
---> Package python-idna.noarch 0:2.4-1.el7 will be installed
---> Package python-ipaddress.noarch 0:1.0.16-2.el7 will be installed
---> Package python-markupsafe.x86_64 0:0.11-10.el7 will be installed
---> Package python2-pyasn1.noarch 0:0.1.9-7.el7 will be installed
--> Running transaction check
---> Package python-backports.x86_64 0:1.0-8.el7 will be installed
---> Package python-pycparser.noarch 0:2.14-1.el7 will be installed
--> Processing Dependency: python-ply for package: python-pycparser-2.14-1.el7.noarch
--> Running transaction check
---> Package python-ply.noarch 0:3.4-11.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                                         Arch               Version                    Repository          Size
========================================================================================================================
Installing:
 ansible                                         noarch             2.9.27-1.el7               epel                17 M
Installing for dependencies:
 PyYAML                                          x86_64             3.10-11.el7                base               153 k
 libyaml                                         x86_64             0.1.4-11.el7_0             base                55 k
 python-babel                                    noarch             0.9.6-8.el7                base               1.4 M
 python-backports                                x86_64             1.0-8.el7                  base               5.8 k
 python-backports-ssl_match_hostname             noarch             3.5.0.1-1.el7              base                13 k
 python-cffi                                     x86_64             1.6.0-5.el7                base               218 k
 python-enum34                                   noarch             1.0.4-1.el7                base                52 k
 python-idna                                     noarch             2.4-1.el7                  base                94 k
 python-ipaddress                                noarch             1.0.16-2.el7               base                34 k
 python-jinja2                                   noarch             2.7.2-4.el7                base               519 k
 python-markupsafe                               x86_64             0.11-10.el7                base                25 k
 python-paramiko                                 noarch             2.1.1-9.el7                base               269 k
 python-ply                                      noarch             3.4-11.el7                 base               123 k
 python-pycparser                                noarch             2.14-1.el7                 base               104 k
 python-setuptools                               noarch             0.9.8-7.el7                base               397 k
 python-six                                      noarch             1.9.0-2.el7                base                29 k
 python2-cryptography                            x86_64             1.7.2-2.el7                base               502 k
 python2-httplib2                                noarch             0.18.1-3.el7               epel               125 k
 python2-jmespath                                noarch             0.9.4-2.el7                epel                41 k
 python2-pyasn1                                  noarch             0.1.9-7.el7                base               100 k
 sshpass                                         x86_64             1.06-2.el7                 extras              21 k

Transaction Summary
========================================================================================================================
Install  1 Package (+21 Dependent packages)

Total download size: 21 M
Installed size: 122 M
Is this ok [y/d/N]: y
Downloading packages:
(1/22): python-backports-1.0-8.el7.x86_64.rpm                                                    | 5.8 kB  00:00:00
(2/22): PyYAML-3.10-11.el7.x86_64.rpm                                                            | 153 kB  00:00:00
(3/22): python-backports-ssl_match_hostname-3.5.0.1-1.el7.noarch.rpm                             |  13 kB  00:00:00
(4/22): python-cffi-1.6.0-5.el7.x86_64.rpm                                                       | 218 kB  00:00:00
(5/22): libyaml-0.1.4-11.el7_0.x86_64.rpm                                                        |  55 kB  00:00:00
(6/22): python-ipaddress-1.0.16-2.el7.noarch.rpm                                                 |  34 kB  00:00:00
(7/22): python-idna-2.4-1.el7.noarch.rpm                                                         |  94 kB  00:00:00
(8/22): python-enum34-1.0.4-1.el7.noarch.rpm                                                     |  52 kB  00:00:00
(9/22): python-babel-0.9.6-8.el7.noarch.rpm                                                      | 1.4 MB  00:00:00
(10/22): python-ply-3.4-11.el7.noarch.rpm                                                        | 123 kB  00:00:00
(11/22): python-markupsafe-0.11-10.el7.x86_64.rpm                                                |  25 kB  00:00:00
(12/22): python-pycparser-2.14-1.el7.noarch.rpm                                                  | 104 kB  00:00:00
(13/22): python-six-1.9.0-2.el7.noarch.rpm                                                       |  29 kB  00:00:00
(14/22): python-paramiko-2.1.1-9.el7.noarch.rpm                                                  | 269 kB  00:00:00
(15/22): python-jinja2-2.7.2-4.el7.noarch.rpm                                                    | 519 kB  00:00:00
(16/22): python-setuptools-0.9.8-7.el7.noarch.rpm                                                | 397 kB  00:00:00
(17/22): python2-cryptography-1.7.2-2.el7.x86_64.rpm                                             | 502 kB  00:00:00
(18/22): python2-pyasn1-0.1.9-7.el7.noarch.rpm                                                   | 100 kB  00:00:00
(19/22): sshpass-1.06-2.el7.x86_64.rpm                                                           |  21 kB  00:00:00
warning: /var/cache/yum/x86_64/7/epel/packages/python2-jmespath-0.9.4-2.el7.noarch.rpm: Header V3 RSA/SHA256 Signature, key ID 352c64e5: NOKEY
Public key for python2-jmespath-0.9.4-2.el7.noarch.rpm is not installed
(20/22): python2-jmespath-0.9.4-2.el7.noarch.rpm                                                 |  41 kB  00:00:00
(21/22): python2-httplib2-0.18.1-3.el7.noarch.rpm                                                | 125 kB  00:00:01
(22/22): ansible-2.9.27-1.el7.noarch.rpm                                                         |  17 MB  00:00:13
------------------------------------------------------------------------------------------------------------------------
Total                                                                                   1.5 MB/s |  21 MB  00:00:14
Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
Importing GPG key 0x352C64E5:
 Userid     : "Fedora EPEL (7) <epel@fedoraproject.org>"
 Fingerprint: 91e9 7d7c 4a5e 96f1 7f3e 888f 6a2f aea2 352c 64e5
 Package    : epel-release-7-11.noarch (@extras)
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
Is this ok [y/N]: y
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : python2-pyasn1-0.1.9-7.el7.noarch                                                                   1/22
  Installing : python-ipaddress-1.0.16-2.el7.noarch                                                                2/22
  Installing : python-six-1.9.0-2.el7.noarch                                                                       3/22
  Installing : sshpass-1.06-2.el7.x86_64                                                                           4/22
  Installing : libyaml-0.1.4-11.el7_0.x86_64                                                                       5/22
  Installing : PyYAML-3.10-11.el7.x86_64                                                                           6/22
  Installing : python-backports-1.0-8.el7.x86_64                                                                   7/22
  Installing : python-backports-ssl_match_hostname-3.5.0.1-1.el7.noarch                                            8/22
  Installing : python-setuptools-0.9.8-7.el7.noarch                                                                9/22
  Installing : python2-httplib2-0.18.1-3.el7.noarch                                                               10/22
  Installing : python-babel-0.9.6-8.el7.noarch                                                                    11/22
  Installing : python2-jmespath-0.9.4-2.el7.noarch                                                                12/22
  Installing : python-ply-3.4-11.el7.noarch                                                                       13/22
  Installing : python-pycparser-2.14-1.el7.noarch                                                                 14/22
  Installing : python-cffi-1.6.0-5.el7.x86_64                                                                     15/22
  Installing : python-markupsafe-0.11-10.el7.x86_64                                                               16/22
  Installing : python-jinja2-2.7.2-4.el7.noarch                                                                   17/22
  Installing : python-idna-2.4-1.el7.noarch                                                                       18/22
  Installing : python-enum34-1.0.4-1.el7.noarch                                                                   19/22
  Installing : python2-cryptography-1.7.2-2.el7.x86_64                                                            20/22
  Installing : python-paramiko-2.1.1-9.el7.noarch                                                                 21/22
  Installing : ansible-2.9.27-1.el7.noarch                                                                        22/22
  Verifying  : python-backports-ssl_match_hostname-3.5.0.1-1.el7.noarch                                            1/22
  Verifying  : python-enum34-1.0.4-1.el7.noarch                                                                    2/22
  Verifying  : python-setuptools-0.9.8-7.el7.noarch                                                                3/22
  Verifying  : python-paramiko-2.1.1-9.el7.noarch                                                                  4/22
  Verifying  : python-jinja2-2.7.2-4.el7.noarch                                                                    5/22
  Verifying  : python-six-1.9.0-2.el7.noarch                                                                       6/22
  Verifying  : python-idna-2.4-1.el7.noarch                                                                        7/22
  Verifying  : python-markupsafe-0.11-10.el7.x86_64                                                                8/22
  Verifying  : python-ply-3.4-11.el7.noarch                                                                        9/22
  Verifying  : ansible-2.9.27-1.el7.noarch                                                                        10/22
  Verifying  : python2-jmespath-0.9.4-2.el7.noarch                                                                11/22
  Verifying  : python-babel-0.9.6-8.el7.noarch                                                                    12/22
  Verifying  : python2-httplib2-0.18.1-3.el7.noarch                                                               13/22
  Verifying  : python-backports-1.0-8.el7.x86_64                                                                  14/22
  Verifying  : python-cffi-1.6.0-5.el7.x86_64                                                                     15/22
  Verifying  : python-pycparser-2.14-1.el7.noarch                                                                 16/22
  Verifying  : libyaml-0.1.4-11.el7_0.x86_64                                                                      17/22
  Verifying  : python-ipaddress-1.0.16-2.el7.noarch                                                               18/22
  Verifying  : sshpass-1.06-2.el7.x86_64                                                                          19/22
  Verifying  : python2-pyasn1-0.1.9-7.el7.noarch                                                                  20/22
  Verifying  : PyYAML-3.10-11.el7.x86_64                                                                          21/22
  Verifying  : python2-cryptography-1.7.2-2.el7.x86_64                                                            22/22

Installed:
  ansible.noarch 0:2.9.27-1.el7

Dependency Installed:
  PyYAML.x86_64 0:3.10-11.el7                                          libyaml.x86_64 0:0.1.4-11.el7_0
  python-babel.noarch 0:0.9.6-8.el7                                    python-backports.x86_64 0:1.0-8.el7
  python-backports-ssl_match_hostname.noarch 0:3.5.0.1-1.el7           python-cffi.x86_64 0:1.6.0-5.el7
  python-enum34.noarch 0:1.0.4-1.el7                                   python-idna.noarch 0:2.4-1.el7
  python-ipaddress.noarch 0:1.0.16-2.el7                               python-jinja2.noarch 0:2.7.2-4.el7
  python-markupsafe.x86_64 0:0.11-10.el7                               python-paramiko.noarch 0:2.1.1-9.el7
  python-ply.noarch 0:3.4-11.el7                                       python-pycparser.noarch 0:2.14-1.el7
  python-setuptools.noarch 0:0.9.8-7.el7                               python-six.noarch 0:1.9.0-2.el7
  python2-cryptography.x86_64 0:1.7.2-2.el7                            python2-httplib2.noarch 0:0.18.1-3.el7
  python2-jmespath.noarch 0:0.9.4-2.el7                                python2-pyasn1.noarch 0:0.1.9-7.el7
  sshpass.x86_64 0:1.06-2.el7

Complete!

# 检查是否安装成功
[vagrant@ansible-controller ~]$ ansible --version
ansible 2.9.27
  config file = /etc/ansible/ansible.cfg
  configured module search path = [u'/home/vagrant/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python2.7/site-packages/ansible
  executable location = /usr/bin/ansible
  python version = 2.7.5 (default, Apr  2 2020, 13:16:51) [GCC 4.8.5 20150623 (Red Hat 4.8.5-39)]
```

## 增加DNS路由

```shell
# 修改dns配置文件
[vagrant@ansible-controller ~]$ sudo vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
127.0.1.1   ansible-controller ansible-controller
# -------------------------------
# 新增内容
172.24.19.67  ansible-controller
172.24.31.24  ansible-node1
172.24.17.197 ansible-node2
# -------------------------------

# 检查是否可达
[vagrant@ansible-controller etc]$ ping ansible-controller
PING ansible-controller (127.0.1.1) 56(84) bytes of data.
64 bytes from ansible-controller (127.0.1.1): icmp_seq=1 ttl=64 time=0.010 ms
64 bytes from ansible-controller (127.0.1.1): icmp_seq=2 ttl=64 time=0.027 ms
64 bytes from ansible-controller (127.0.1.1): icmp_seq=3 ttl=64 time=0.027 ms
64 bytes from ansible-controller (127.0.1.1): icmp_seq=4 ttl=64 time=0.026 ms
^C
--- ansible-controller ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 2999ms
rtt min/avg/max/mdev = 0.010/0.022/0.027/0.008 ms
[vagrant@ansible-controller etc]$ ping ansible-node1
PING ansible-node1 (172.24.31.24) 56(84) bytes of data.
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=1 ttl=64 time=0.264 ms
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=2 ttl=64 time=0.228 ms
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=3 ttl=64 time=0.196 ms
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=4 ttl=64 time=0.216 ms
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=5 ttl=64 time=0.201 ms
ansible-node164 bytes from ansible-node1 (172.24.31.24): icmp_seq=6 ttl=64 time=0.231 ms
64 bytes from ansible-node1 (172.24.31.24): icmp_seq=7 ttl=64 time=0.197 ms
^C
--- ansible-node1 ping statistics ---
7 packets transmitted, 7 received, 0% packet loss, time 6000ms
[vagrant@ansible-controller etc]$ ping ansible-node2
PING ansible-node2 (172.24.17.197) 56(84) bytes of data.
64 bytes from ansible-node2 (172.24.17.197): icmp_seq=1 ttl=64 time=0.301 ms
64 bytes from ansible-node2 (172.24.17.197): icmp_seq=2 ttl=64 time=0.204 ms
64 bytes from ansible-node2 (172.24.17.197): icmp_seq=3 ttl=64 time=0.233 ms
64 bytes from ansible-node2 (172.24.17.197): icmp_seq=4 ttl=64 time=0.184 ms
^C
--- ansible-node2 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3000ms
```

## 安装 VSCode 并实现本地和虚拟机文件同步

::: tip Step1: 虚拟机

- ansible-controller 允许 **密码登录** 和 **root登录** 

  ```shell
  # 修改ssh配置文件
  [vagrant@ansible-controller ~]$ sudo vi /etc/ssh/sshd_config
  ...
  #LoginGraceTime 2m
  PermitRootLogin yes  # 打开注释
  #StrictModes yes
  #MaxAuthTries 6
  #MaxSessions 10
  ...
  ...
  # To disable tunneled clear text passwords, change to no here!
  PasswordAuthentication yes # 打开注释
  #PermitEmptyPasswords no
  #PasswordAuthentication no # 注释掉
  ...
  
  # 重启sshd
  [vagrant@ansible-controller ~]$ sudo systemctl restart sshd
  ```

- 打开一个新的终端使用密码进行登录

  ```shell
  $ ssh vagrant@172.24.19.67
  The authenticity of host '172.24.19.67 (172.24.19.67)' can't be established.
  ECDSA key fingerprint is SHA256:d5Jqbnd9uBuStxDcA/DeFcb/jSTqadscT+DNH4GBc4I.
  Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
  Warning: Permanently added '172.24.19.67' (ECDSA) to the list of known hosts.
  vagrant@172.24.19.67's password:
  Last login: Mon Nov 14 06:25:11 2022 from 172.24.16.1
  [vagrant@ansible-controller ~]$
  ```

:::

:::tip Step2: 本地主机

- 安装 **VSCode** 软件

- 安装 **SFTP** 插件

- 本地新建 **ansible** 文件夹，并在该文件夹下新建 **inventory.txt** 文件

- 按下 **Ctrl + Shift + P**, 在输入框中输入 `SFTP: Config` ，并按下回车

  - 在 **ansible** 文件夹下会多出一个 **.vscode** 文件夹，文件夹下有一个 **sftp.json** 文件。目录结构如下所示

    ```tex
    F:.
    │   inventory.txt
    │
    └───.vscode
            sftp.json
    ```

  - **sftp.json** 文件内容修改如下所示

    ```json
    {
        "name": "ansible-controller",
        "host": "172.24.19.67",
        "protocol": "sftp",
        "port": 22,
        "username": "vagrant",
        "remotePath": "/home/vagrant/ansible-code",
        "uploadOnSave": true,
        "useTempFile": false,
        "openSsh": true
    }
    ```

  - 按下 **Ctrl + Shift + P**, 在输入框中输入 `SFTP: Sync Local -> Remote` ，并按下回车, 输入密码进行文件同步


:::

::: tip Step3: 虚拟机

- 进入虚拟机查看是否已经完成同步

  ```shell
  $ ssh vagrant@172.24.19.67
  vagrant@172.27.119.219's password:
  Last login: Thu Nov 17 06:18:50 2022 from 172.27.112.1
  [vagrant@ansible-controller ~]$ cd ansible-code/
  [vagrant@ansible-controller ansible-code]$ ls
  inventory.txt
  [vagrant@ansible-controller ansible-code]$ exit
  logout
  Connection to 172.27.119.219 closed.
  ```

:::
