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

源码包`src/runtime/map.go:hmap`定义了map的数据结构

:::

```go
type hmap struct {
	// Note: the format of the hmap is also encoded in cmd/compile/internal/gc/reflect.go.
	// Make sure this stays in sync with the compiler's definition.
	count     int // # live cells == size of map.  Must be first (used by len() builtin)
	flags     uint8
	B         uint8  // log_2 of # of buckets (can hold up to loadFactor * 2^B items)
	noverflow uint16 // approximate number of overflow buckets; see incrnoverflow for details
	hash0     uint32 // hash seed

	buckets    unsafe.Pointer // array of 2^B Buckets. may be nil if count==0.
	oldbuckets unsafe.Pointer // previous bucket array of half the size, non-nil only when growing
	nevacuate  uintptr        // progress counter for evacuation (buckets less than this have been evacuated)

	extra *mapextra // optional fields
}
```

:::tip channel实现原理

源码包`src/runtime/chan.go:hchan`定义了channel的数据结构

:::

```go
type hchan struct {
	qcount   uint           // total data in the queue
	dataqsiz uint           // size of the circular queue
	buf      unsafe.Pointer // points to an array of dataqsiz elements
	elemsize uint16
	closed   uint32
	elemtype *_type // element type
	sendx    uint   // send index
	recvx    uint   // receive index
	recvq    waitq  // list of recv waiters
	sendq    waitq  // list of send waiters

	// lock protects all fields in hchan, as well as several
	// fields in sudogs blocked on this channel.
	//
	// Do not change another G's status while holding this lock
	// (in particular, do not ready a G), as this can deadlock
	// with stack shrinking.
	lock mutex
}
```





## 内存对齐

[参考](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkyNzI1NzM5NQ==&action=getalbum&album_id=1932365789899096067&scene=173&from_msgid=2247486198&from_itemidx=1&count=3&nolastread=1#wechat_redirect)

## 栈内存、堆内存、逃逸分析

## 垃圾回收机制

