---
title: 下载镜像
---

```shell
# 查看 vagrant 镜像
$ vagrant box list
generic/alpine38 (hyperv, 4.2.0)
generic/alpine38 (virtualbox, 4.2.0)

# 下载 hyperv 的镜像
$ vagrant box add generic/alpine37 --provider hyperv
==> box: Loading metadata for box 'generic/alpine37'
    box: URL: https://vagrantcloud.com/generic/alpine37
==> box: Adding box 'generic/alpine37' (v4.2.0) for provider: hyperv
    box: Downloading: https://vagrantcloud.com/generic/boxes/alpine37/versions/4.2.0/providers/hyperv.box
    box:
    box: Calculating and comparing box checksum...
==> box: Successfully added box 'generic/alpine37' (v4.2.0) for 'hyperv'!

# 下载 virtualbox 的镜像
$ vagrant box add generic/alpine37 --provider virtualbox
==> box: Loading metadata for box 'generic/alpine37'
    box: URL: https://vagrantcloud.com/generic/alpine37
==> box: Adding box 'generic/alpine37' (v4.2.0) for provider: virtualbox
    box: Downloading: https://vagrantcloud.com/generic/boxes/alpine37/versions/4.2.0/providers/virtualbox.box
    box:
    box: Calculating and comparing box checksum...
==> box: Successfully added box 'generic/alpine37' (v4.2.0) for 'virtualbox'!

# 查看 vagrant 镜像
$ vagrant box list
generic/alpine37 (hyperv, 4.2.0)
generic/alpine37 (virtualbox, 4.2.0)
generic/alpine38 (hyperv, 4.2.0)
generic/alpine38 (virtualbox, 4.2.0)

# 关于 vagrant 镜像的命令
$ vagrant box --help
Usage: vagrant box <subcommand> [<args>]

Available subcommands:
     add
     list
     outdated
     prune
     remove
     repackage
     update

For help on any individual subcommand run `vagrant box <subcommand> -h`
        --[no-]color                 Enable or disable color output
        --machine-readable           Enable machine readable output
    -v, --version                    Display Vagrant version
        --debug                      Enable debug output
        --timestamp                  Enable timestamps on log output
        --debug-timestamp            Enable debug output with timestamps
        --no-tty                     Enable non-interactive output
```