---
title: 根源探索
---

## 内置基本类型

:::tip string实现原理

源码包`src/runtime/string.go:stringStruct`定义了string的数据结构

:::

```go
type stringStruct struct {
	str unsafe.Pointer
	len int
}
```

:::tip slice实现原理

源码包`src/runtime/slice.go:slice`定义了slice的数据结构

:::

```go
type slice struct {
	array unsafe.Pointer
	len   int
	cap   int
}
```

:::tip map实现原理

源码包`src/runtime/`定义了map的数据结构

:::

:::tip channel实现原理

源码包`src/runtime/定义了channel的数据结构

:::

## 内存对齐

## 栈内存、堆内存、逃逸分析

## 垃圾回收机制

