# 99-游戏后台管理


> date: 20210712

## 一、技术选型

|名称|链接|安装方式|star|说明|
|:--:|:--:|:---|:---|:---|
|zap|[链接](https://github.com/uber-go/zap)|go get -u go.uber.org/zap|13.1k|高性能日志库|
|viper|[链接](https://github.com/spf13/viper)|go get github.com/spf13/viper|16.1k|golang 配置文件解决方案|
|gin|[链接](https://github.com/gin-gonic/gin)|go get -u github.com/gin-gonic/gin|49.4k|web框架|
|gorm|[链接](https://gorm.io/zh_CN/docs/index.html)|go get -u gorm.io/gorm|24.4k|orm模型库|
| | |go get -u gorm.io/driver/mysql| |gorm mysql数据库驱动|
|swaggo/swag|[链接](https://github.com/swaggo/swag)|go get -u github.com/swaggo/swag/cmd/swag|4.4k|swagger|
| |[参考](https://razeencheng.com/post/go-swagger.html) |go get github.com/swaggo/gin-swagger| | gin-swagger 中间件 |
| | |go get github.com/swaggo/gin-swagger/swaggerFiles| | swagger 内置文件 |
|golang-tree-menu|[链接](https://github.com/azhengyongqin/golang-tree-menu)|go get github.com/azhengyongqin/golang-tree-menu|25|生成树形菜单|
|go-playground/validator|[链接](https://github.com/go-playground/validator)|go get github.com/go-playground/validator|8.2k|验证器 gin框架的默认验证器|
|SimonWang00/goeureka|[链接](https://github.com/SimonWang00/goeureka)| go get github.com/SimonWang00/goeureka |7| eureka服务注册 |
|gohouse/converter|[链接](https://github.com/gohouse/converter)|go get github.com/gohouse/converter|184|数据库表结构转结构体|
|gotests|[链接](https://github.com/cweill/gotests)|go get -u github.com/cweill/gotests/...|3.3k|自动生成测试代码|
|gonum|[链接](https://github.com/gonum/gonum)|go get -u gonum.org/v1/gonum/...|5.1k|对标python numpy|
|gota|[链接](https://github.com/go-gota/gota)|go get github.com/go-gota/gota/...|1.7k|对标python pandas|
|air| | | | |
|Casbin| | | | |
|gjson|[链接](https://github.com/tidwall/gjson)|go get -u github.com/tidwall/gjson|8.8k|快速简单的解析json|



## 二、使用说明

### 模型的基本增删改查功能的实现

#### 遵循 [Restful设计规范](http://www.imooc.com/wiki/restapilesson/restfuspecification.html)

> **需求：现在需要添加一张表用户到数据库，并且完成基本的增删改查功能**
##### 1. 在 models 目录下创建一个 user.go 文件，定义结构体以及结构体的标签
```go
package models

/*
	用户模型
	外键约束含义:
		CASCADE
			删除：删除主表时自动删除从表。删除从表，主表不变
			更新：更新主表时自动更新从表。更新从表，主表不变
		SET NULL
			删除：删除主表时自动更新从表值为NULL。删除从表，主表不变
			更新：更新主表时自动更新从表值为NULL。更新从表，主表不变
*/

type User struct {
	BaseModel
	Username        string           `json:"username" gorm:"size:32;unique;not null" binding:"required,gte=4"`
	Password        string           `json:"password" gorm:"size:512;not null" binding:"required,gte=6"`
	Email           string           `json:"email" gorm:"size:32;unique" binding:"required,gte=6,email"`
	Token           string           `json:"token" gorm:"size:256"`
	IsSuperAdmin    bool             `json:"is_super_admin" gorm:"default:false"`
	IsAdmin         bool             `json:"is_admin" gorm:"default:false"`
	ISStaff         bool             `json:"is_staff" gorm:"default:false"`
	IsActivate      bool             `json:"is_activate" gorm:"default:false"`
	UserGroup       []Group          `json:"-" gorm:"many2many:user_group;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	UserPermissions []UserPermission `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}
```
##### 2. 将 User 模型注册到 models 目录下的 init.go 文件中
```go
package models

import (
	"GMManagement/global"

	"gorm.io/gorm"
)

/*
************************************************************************************************************************
	注册模型
		定义好模型之后需要做增删改查的模型需要在这里注册
		注册分为六个部分，这六个部分都要分别实现
************************************************************************************************************************
*/
func init() {
    // 第一部分 模型和数据库表名对应
    global.Tables = make(map[string]string)
    global.Tables["users"] = "users"

	// 第二部分
	global.Models = make(map[string]func() interface{})
	global.Models["users"] = func() interface{} { return new(User) }
	
	// 第三部分 专门用于 struct 的 tag 解析
	global.ModelsObj = make(map[string]func() interface{})
	global.ModelsObj["users"] = func() interface{} { return User{} }
	
	// 第四部分 专门用于列表查询
	global.ModelLists = make(map[string]func() interface{})
	global.ModelLists["users"] = func() interface{} { return new([]User) }
	
	// 第五部分 专门用于修改操作
	global.ModelsId = make(map[string]func(uint64) interface{})
	global.ModelsId["users"] = func(id uint64) interface{} {
		model := new(User)
		model.ID = id
		return model
	}
	
	// 第六部分 专门用于列表查询条件
	global.ModelScope = make(map[string]func() []func(db *gorm.DB) *gorm.DB)
	global.ModelScope["users"] = func() (scopeList []func(db *gorm.DB) *gorm.DB) {
		// 添加过滤条件
		scopeList = append(scopeList, OrderDesc) // 倒叙排列
		return
	}
}
```
##### 3. 将 User 模型添加到 initaize 目录下的 db_migrate.go 文件中
```go
package initialize

import (
	"GMManagement/global"
	"GMManagement/models"
)

// 迁移数据库
func InitAutoMigrate() (err error) {
	err = global.MysqlDb.DB.AutoMigrate(
		&models.User{},
	)
	if err != nil {
		return err
	}
	return
}

```
- main.go文件打包以后，在命令行中输入 `main.exe -migrate=true` 进行模型到数据库的迁移 

##### 4. 其他【非必须】
- 需要添加查询过滤条件

  1 在 models 目录下的 scopes.go 文件中添加 gorm 的 scpoe 格式的函数
  ```go
  // 倒序排
  func OrderDesc(db *gorm.DB) *gorm.DB {
    return db.Order("id desc")
  }  
  ```
  2 将添加的函数注册到 models 目录下的 init.go 文件中的 init 函数里的第五部分
  ```go
  global.ModelScope["users"] = func() (scopeList []func(db *gorm.DB) *gorm.DB) {
  	// 添加过滤条件
  	scopeList = append(scopeList, OrderDesc) // 倒叙排列
  	return  
  }
  ```
- 需要添加自定义验证器

  1 在 validate 目录下自定义验证器
  ```go
    package validate
    
    import (
        "regexp"
    
        "github.com/go-playground/validator/v10"
    )
    
    // 自定义邮箱验证器
    func ValidatorEmail(fl validator.FieldLevel) bool {
        // 获取参数数据
        mobile := fl.Field().String()
        // 使用正则表达式判断数据是否合法
        ok, _ := regexp.MatchString(`^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`, mobile)
        // 返回验证结果
        return ok
    }
  ```
  2 将自定义验证器注册到 initualize 目录下的 validators.go 文件中
  ```go
    package initialize
    
    import (
    	"github.com/gin-gonic/gin/binding"
    	ut "github.com/go-playground/universal-translator"
    	"github.com/go-playground/validator/v10"
    
    	"GMManagement/global"
    	"GMManagement/validate"
    )
    
    // 注册自定义验证器并进行错误翻译
    func InitValidator() (err error) {
    	// 注册自定义验证器并进行错误翻译
    	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
    		// 注册自定义验证器
    		if err = v.RegisterValidation("email", validate.ValidatorEmail); err != nil {
    			return
    		}
    
    		/*
    			对自定义验证器的错误信息进行翻译
    			格式参考: https://github.com/go-playground/validator/blob/v9/_examples/translations/main.go#L105
    		*/  
    		if err = v.RegisterTranslation("email", global.Trans, func(ut ut.Translator) error {
    			return ut.Add("email", "{0}非法的邮箱!", true) // see universal-translator for details
    		}, func(ut ut.Translator, fe validator.FieldError) string {
    			t, _ := ut.T("email", fe.Field())
    			return t
    		}); err != nil {
    			return
    		}
    	}
    	return
    }
  ```
  3 在结构体定义的时候使用自定的验证器标签
  ```go
   type User struct {
    //BaseModel
    //Username        string           `json:"username" gorm:"size:32;unique;not null" binding:"required,gte=4"`
    //Password        string           `json:"password" gorm:"size:512;not null" binding:"required,gte=6"`
    Email           string           `json:"email" gorm:"size:32;unique" binding:"required,gte=6,email"`
    //Token           string           `json:"token" gorm:"size:256"`
    //IsSuperAdmin    bool             `json:"is_super_admin" gorm:"default:false"`
    //IsAdmin         bool             `json:"is_admin" gorm:"default:false"`
    //ISStaff         bool             `json:"is_staff" gorm:"default:false"`
    //IsActivate      bool             `json:"is_activate" gorm:"default:false"`
    //UserGroup       []Group          `json:"-" gorm:"many2many:user_group;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
    //UserPermissions []UserPermission `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
   }
  ```
  
## 三、管理服数据库模型

> 游戏管理服的模型设计

### 0. 通用模型

```go
type BaseModel struct {
	ID        uint64         `json:"id" gorm:"primaryKey"`
	CreatedAt uint64         `json:"create_time" gorm:"autoCreateTime"`
	UpdatedAt uint64         `json:"update_time" gorm:"autoUpdateTime"`
	Remark    string         `json:"remark"`
	DeletedAt gorm.DeletedAt `json:"-"`
}
```

### 1. 游戏服节点模型

```go
type SeverNode struct {
	BaseModel
	Name                  string                 `json:"name" form:"name" gorm:"size:32;unique;comment:名字" binding:"required,gt=0,lte=16"`
	Url                   string                 `json:"url" form:"url" gorm:"size:256;unique;comment:域名" binding:"required,gt=4"`
	Area                  string                 `json:"area" form:"area" gorm:"size:32;comment:地区" binding:"required,gt=0"`
	Mysql                 string                 `json:"mysql" form:"mysql" gorm:"size:64;comment:数据库链接" binding:"required,db_string,db_ping"`
	Os                    string                 `json:"os" form:"os" gorm:"type:enum('android', 'ios');comment:平台" binding:"required,oneof='android' 'ios'"`
	User                  string                 `json:"user" form:"user" gorm:"size:64;comment:用户名" binding:"required"`
	Password              string                 `json:"password" from:"password" gorm:"size:64;comment:密码" binding:"required"`
	OneByOneExchangeCodes []OneByOneExchangeCode `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	HasManyExchangeCodes  []HasManyExchangeCode  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	AddRoles              []AddRole              `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	IllegalUsers          []IllegalUser          `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	IllegalDevices        []IllegalDevice        `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	SaleStatisticses      []SaleStatistics       `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	WhiteLists            []WhiteList            `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
```

###  2. 游戏服接口模型

```go
type GMInterface struct {
	BaseModel
	Api     string `json:"api" form:"api" gorm:"size:64;unique;comment:接口名" binding:"required,gt=0"`
	Methods string `json:"methods" form:"methods" gorm:"size:32;comment:请求方式" binding:"required,gte=4,lte=4"`
	Script  string `json:"script" form:"script" gorm:"size:64;comment:描述" binding:"required,gt=0"`
}
```

###  3. 登录公告模型

```go
type Announcement struct {
	BaseModel
	StartTime   uint64 `json:"start_time" gorm:"column:start_time;comment:开始时间" binding:"required"`
	EndTime     uint64 `json:"end_time" gorm:"column:end_time;comment:结束时间" binding:"required"`
	SeverNodeID string `json:"node" gorm:"column:node;comment:游戏服节点" binding:"required"`
	Title       string `json:"title" gorm:"column:title;size:64;comment:标题" binding:"required,gt=1"`
	Content     string `json:"content" gorm:"column:content;size:2048;comment:内容" binding:"required,gt=1"`
	Image       string `json:"image" gorm:"column:image;size:256;comment:图片"`
}
```

### 4. 邮件模型

```go
type Email struct {
	BaseModel
	SeverNodes              string `json:"node" gorm:"column:node;comment:游戏服节点" binding:"required"`
	Type                    string `json:"type" gorm:"column:type;type:enum('全服发送', '指定发送');comment:邮件类型" binding:"required,oneof='全服发送' '指定发送'"`
	Name                    string `json:"name" gorm:"column:name;comment:邮件名称" binding:"required"`
	Content                 string `json:"content" gorm:"column:content;comment:邮件内容" binding:"required"`
	Receiver                string `json:"receiver" gorm:"column:receiver;comment:接收人"`                  // 格式：{app_account_id:[1,17,29,36]}
	AccessoryGoods          string `json:"accessory_goods" gorm:"column:accessory_goods;comment:附件--物品"` // 格式：{id1:num1,id2:num2,id3:num3}
	AccessoryGift           string `db:"accessory_gift" gorm:"column:accessory_gift;comment:附件--礼包"`
	UpdateUser              string `json:"update_user" gorm:"column:update_user;comment:更新人员"`
	AlterTime               uint64 `json:"alter_time" gorm:"column:alter_time;comment:更新时间"`
	CheckUser               string `json:"check_user" gorm:"column:check_user;comment:审核人员"`
	Status                  string `json:"status" gorm:"column:status;type:enum('待审核', '通过', '未通过');default:待审核;comment:状态" binding:"oneof='待审核' '通过' '未通过'"`
	SendStatus              string `json:"send_status" gorm:"column:send_status;type:enum('未发送', '发送中', '发送成功', '发送失败');default:未发送;comment:发送状态"`
	PlayerRegisterTimeStart int    `json:"player_register_time_start" gorm:"column:player_register_time_start;comment:玩家注册时间-start"`
	PlayerRegisterTimeEnd   int    `json:"player_register_time_end" gorm:"column:player_register_time_end;comment:玩家注册时间-end"`
	Channel                 string `json:"channel" gorm:"column:channel;comment:渠道"`
	SendTime                int    `json:"send_time" gorm:"column:send_time;comment:发送时间" binding:"required"`
	ExpireTime              int    `json:"expire_time" gorm:"column:expire_time;comment:过期时间" binding:"required"`
	Source                  int    `json:"source" gorm:"column:source;comment:邮件来源"`
}
```

###  5. 兑换码模型

```go
type ExchangeCode struct {
	BaseModel
	Name                  string                 `json:"name" gorm:"column:name;comment:名称" binding:"required"`
	SeverNodes            string                 `json:"node" gorm:"column:node;comment:游戏服节点" binding:"required"`
	Type                  string                 `json:"type" gorm:"column:type;type:enum('一码通用', '一码一用');comment:兑换码类型" binding:"required,oneof='一码通用' '一码一用'"`
	Code                  string                 `json:"code" gorm:"column:code;comment:兑换码"`
	Batch                 uint64                 `json:"batch" gorm:"column:batch;comment:批次"`
	StartTime             uint64                 `json:"start_time" gorm:"column:start_time;comment:使用时间" binding:"required"`
	EndTime               uint64                 `json:"end_time" gorm:"column:end_time;comment:有效时间" binding:"required"`
	Status                string                 `json:"status" gorm:"column:status;comment:状态;type:enum('取消', '未开始', '进行中', '已结束')"`
	CodeCount             uint64                 `json:"code_count" gorm:"column:code_count;comment:兑换码数量" binding:"required"`
	UseCount              uint64                 `json:"use_count" gorm:"column:use_count;comment:领取次数;default:0"`
	OneByOneExchangeCodes []OneByOneExchangeCode `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	HasManyExchangeCodes  []HasManyExchangeCode  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

// 兑换码通用字段
type ExchangeCodeCommon struct {
	BaseModel
	PlayerID       uint64 `json:"player_id" gorm:"column:player_id;comment:玩家ID"`
	PlayerName     string `json:"player_name" gorm:"column:player_name;comment:玩家名称"`
	SeverNodeID    uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
	ExchangeCodeID uint64 `json:"exchange_code_id" gorm:"column:exchange_code_id;comment" binding:"required"`
}

// 一码一用
type OneByOneExchangeCode struct {
	ExchangeCodeCommon
	Code   string `json:"code" gorm:"column:code;comment:兑换码" binding:"required"`
	Status string `json:"status" gorm:"column:status;comment:状态;type:enum('未使用','已使用','取消','过期')"`
}

// 一码通用
type HasManyExchangeCode struct {
	ExchangeCodeCommon
}
```

### 6. 新增角色查询模型

```go
type AddRole struct {
	BaseModel
	StatisticsAt uint64 `json:"statistics_at" gorm:"column:statistics_at;comment:统计日期时间戳"`
	Total        int    `json:"total" gorm:"column:total;comment:总量"`
	Inc          int    `json:"inc" gorm:"column:inc;comment:增量"`
	SeverNodeId  uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
```

### 7. 封禁管理模型

```go
// 用户封禁
type IllegalUser struct {
	BaseModel
	AppAccountId uint64 `json:"app_account_id" gorm:"column:app_account_id"`
	ReleaseTime  int    `json:"release_time" gorm:"column:release_time"`
	UserName     string `json:"user_name" gorm:"column:user_name"`
	SeverNodeId  uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
// 设备封禁
type IllegalDevice struct {
	BaseModel
	DeviceId    string `json:"device_id" gorm:"column:device_id"`
	Username    string `json:"user_name" gorm:"column:user_name"`
	SeverNodeId uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
```

### 8. 商店销售统计模型

```go
type SaleStatistics struct {
	BaseModel
	ItemId      int     `json:"item_id" gorm:"column:item_id;comment:物品id"`
	ItemName    string  `json:"item_name" gorm:"column:item_name;comment:物品名称"`
	Price       float64 `json:"price" gorm:"column:price;comment:单价"`
	Type        int     `json:"type" gorm:"column:type;comment:物品类型"`
	Count       int     `json:"count" gorm:"column:count;comment:购买人数"`
	SeverNodeId uint64  `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
```

### 9. 白名单模型

```go
type WhiteList struct {
	BaseModel
	Name         string `json:"name" gorm:"column:name;comment:名字"`
	AppAccountId uint64 `json:"app_account_id" gorm:"column:app_account_id;comment:玩家ID"`
	Status       uint64 `json:"status" grom:"column:status;comment:状态;default:0"` // 1：表示白名单玩家，其他表示非白名单玩家
	SeverNodeId  uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
```

### 10 平台账户转换

```go
type WhiteList struct {
	BaseModel
	Name         string `json:"name" gorm:"column:name;comment:名字"`
	AppAccountId uint64 `json:"app_account_id" gorm:"column:app_account_id;comment:玩家ID"`
	Status       uint64 `json:"status" grom:"column:status;comment:状态;default:0"` // 1：表示白名单玩家，其他表示非白名单玩家
	SeverNodeId  uint64 `json:"node_id" gorm:"column:node_id;comment:游戏服节点"`
}
```



## 四、游戏服数据库模型

###  1. 成就模型

```sql
create table test_achieve
(
   id                   int not null auto_increment comment '主键',
   achieve_type         int not null comment '成就大类',
   achieve_group        int not null comment '成就组',
   achieve_id           int not null comment '成就ID',
   app_account_id       int not null comment '玩家ID',
   status               tinyint not null comment '状态: 0 完成任务；1已完成可领取；2 已领取奖励',
   create_at            int not null,
   update_at            int not null,
   primary key (id)
);
```

### 2. 公告模型

```sql
create table announcement
(
   id                   int not null auto_increment comment '主键ID',
   start_time           int not null comment '公告开始时间',
   end_time             int not null comment '公告结束时间',
   title                varchar(64) not null comment '公告标题',
   content              varchar(2048) not null comment '公告内容',
   image                varchar(256) comment '图片路径',
   uuid                 varchar(64) not null comment '唯一标识',
   create_at            int not null comment '创建时间',
   update_at            int not null comment '更新时间',
   primary key (id)
);
```

### 3. 白名单模型

```sql
create table white_list
(
   id                   int not null auto_increment comment '主键',
   app_account_id       int not null comment '玩家ID',
   status               tinyint not null comment '状态: 0 无效 1 有效',
   create_at            int not null comment '更新时间',
   update_at            int not null comment '更新时间',
   name                 varchar(64) comment '玩家名称',
   primary key (id)
);
```

### 4. 访问日志模型

```sql
create table logs
(
   id                   int not null auto_increment comment '主键ID',
   create_at            int not null comment '创建时间',
   uri                  varchar(128) comment '请求接口',
   body                 varchar(2048) comment '请求体',
   status               int not null comment '响应状态码 【400】表示失败 【200】表示成功',
   method               varchar(10) not null,
   primary key (id)
);
```

### 5. 玩家通关统计模型

```sql
CREATE TABLE `pass_stage_result` (
  `id`           int(11)      NOT NULL AUTO_INCREMENT,
  `stage`        int(11)      NOT NULL COMMENT '关卡id',
  `name`         varchar(100) NOT NULL COMMENT '关卡名称',
  `record_level` tinyint(4)   NOT NULL COMMENT '关卡等级',
  `count`        int(11)      NOT NULL COMMENT '次数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT COMMENT='通关次数记录表'
```

### 6. 有的逻辑库中需要添加 iap_amazon 表

```sql
# 表结构
create table iap_amazon
(
   id                   int not null auto_increment comment '自增主键',
   platform             char(1) not null comment '平台（渠道）',
   country_code         char(2) not null,
   app_account_id       int not null,
   bid                  smallint not null comment '购买的物品列表id',
   gid                  int not null comment '购买的礼包id，bid和gid必然有一个为0',
   received_item_id     int not null comment '购买的物品id',
   received_item_quantity int not null comment '购买的物品数量',
   bonus_item_id        int not null comment '赠送的物品id',
   bonus_item_quantity  int not null comment '赠送的物品数量',
   price                bigint unsigned not null comment '购买价格（原始价格乘以1百万后取整）',
   currency             char(3) not null comment '货币代码（ISO4217）',
   price_usd            bigint unsigned not null comment '转换成等值美元后的价格',
   receipt_id           varchar(100) not null comment '购买收据',
   receipt              text not null,
   ama_user_id          text not null,
   create_time          timestamp not null default CURRENT_TIMESTAMP,
   primary key (id)
);

# 索引
create unique index Index_1_AMAZON_TID_UNIQUE on iap_amazon
(
   receipt_id
);

```



## 五、部署

### 5.1 部署介绍

- 将配置文件和打包好的二进制可执行文件上传至服务器

  ```text
  # 文件目录结构
  - static  # 静态文件目录
    - upload
    - statistics
    - scratch
  - config  # 配置文件目录
    - config.yaml
  - GMManagement  # 可执行文件
  ```

- 修改可执行文件的权限 `chmod 777 GMManagement`

- 第一次运行，数据库中还没有对应的数据表，需要同步数据库。执行 `./GMManagement -migrate=true`

- 启动服务，执行 `nohup ./GMManagement > log.log 2>&1 &`

### 5.2 连接服务器数据库快捷方式

```shell
# 游戏服
$ mysql -h 173.255.254.83 -ujiaruling  -pJrlLibIi2021
# 或者
$ mysql -h 173.255.254.83 -ujiaruling  -pJrlLibIi2021 -A

# 管理服
$ mysql -h 192.168.0.142 -uroot -pxuejinyu
```

### 5.3 测试服务器

```shell
$ ssh root@192.168.0.142 # 密码 xuejinyu
$ mysql -h 192.168.0.142 -uroot -pxuejinyu

# 查看日志文件的最后几行
$ tail -n 5 log.log

# 查看当前所有tcp端口
$ netstat -ntlp 
# $ netstat -ntlp | grep 8080   # 查看所有8080端口使用情况
# $ netstat -ntlp | grep 3306   # 查看所有3306端口使用情况

# 杀掉进程
$ kill 26993 # $ kill PID
# $ kill -9 PID

# 应用在后台执行
$ nohup ./GMMangementV1 > log.log 2>&1 &

# 后端访问地址
# http://192.168.0.142:8080/health
# 前端访问地址
# http://192.168.0.21:8012/default-base

```

## 附件1 -- 复杂的查询sql语句
```sql
# select
# #        b.platform,
# #        a.app_account_id                                        as appAccountId,
# #        ld.device_id                                            as deviceId,
# #        aaf.fb_account_name                                     as fbname,
# #        aal.libii_account_id                                    as libiiAccountId,
# #        b.ifa,
# #        a.name,
# #        b.country_code                                          as countryCode,
# #        a.lvl,
# #        CONVERT_TZ(b.create_time, @@global.time_zone, '+00:00') as registerTime,
# #        CONVERT_TZ(a.update_time, @@global.time_zone, '+00:00') as lastPlayTime,
# #        a.stamina                                               as currentStamina,
# #        a.gold                                                  as currentGold,
# #        a.diamond                                               as currentDiamond,
# #        a.current_friend                                        as friendCnt,
# #        a.buy_cnt                                               as fashionBuyTimes,
# #        a.make_cnt                                              as makeTimes,
# #        a.gold_draw_cnt                                         as goldDrawTimes,
# #        a.diamond_draw_cnt                                      as diamondDrawTimes,
# #        a.competition_cnt                                       as competitionTimes,
# #        a.vote_cnt                                              as voteTimes,
# #        a.syn_draw_cnt                                          as syndrawTimes,
# #        ifnull(c.age, 0)                                        as age,
# #        a.dyeing_cnt                                            as dyeingTimes,
# #        a.stage_latest										   as stage_latest
# # from summary a
# #      inner join app_account b on a.app_account_id = b.id
# #      left join age_survey c on a.app_account_id = c.app_account_id
# #      LEFT JOIN associate_app_libii aal on aal.app_account_id = b.id
# #      LEFT JOIN login_device ld on ld.app_account_id = b.id
# #      LEFT JOIN associate_app_fb aaf on aaf.app_account_id = b.id
# # WHERE a.app_account_id=27;
# # # LIMIT 10 offset 0;

# 服饰查询
# select a.app_account_id, a.item_id, b.item_type from item_info as a left join config_item as b on a.item_id = b.item_id where a.app_account_id=17 and b.item_type > 30 and b.item_type < 60;
select count(1) from item_info as a left join config_item as b on a.item_id = b.item_id where a.app_account_id=17 and b.item_type > 30 and b.item_type < 60;

# 套装查询
select count(id) from suit_receive_info where app_account_id=17;

# 染色次数查询
select sum(num) as num from dyeing_atv_info where app_account_id=17;

# update app_account set country_code = 'CN' WHERE country_code='99';

# 查询国家代码
select country_name from country_info where country_code = 'CN';

# 用户信息查询
# select
#     *
# from
#     summary as a
# left join
#     login_device_ip_cheap as b on
# select
#     a.app_account_id as app_account_id,
#     b.price_usd * b.received_item_quantity / 1000000  as total_ios,
# #     c.price_usd  as price_usd_amazon,
#     d.price_usd * d.received_item_quantity as total_googleplay
# #     (b.price_usd + c.price_usd + d.price_usd) as sum_price
# #     (b.price_usd + d.price_usd) as sum_price
#
# from
#     login_device_ip_cheap as a
# left join iap_ios as b on a.app_account_id = b.app_account_id
# # left join iap_amazon as c on a.app_account_id = c.app_account_id
# left join iap_googleplay as d on a.app_account_id = d.app_account_id
# where (a.update_time between '2021-6-1 00:00:00' and  '2021-8-1 00:00:00') and (a.update_time between '2021-6-1 00:00:00' and  '2021-7-1 00:00:00');


# 苹果
# select
#     b.id,
#     a.app_account_id as app_account_id,
#     b.bid as bid,
#     b.gid as gid,
#     b.received_item_quantity as received_item_quantity,
#     e.create_time as register_time,
#     a.update_time as last_time,
#     f.stage_latest as stage_latest
# from
#     login_device_ip_cheap as a
# left join iap_ios as b on a.app_account_id = b.app_account_id
# left join app_account as e on e.id = a.app_account_id
# left join summary as f on f.app_account_id = a.app_account_id
# where (a.update_time between '2021-6-1 00:00:00' and  '2021-7-1 00:00:00') and (b.received_item_quantity is not null) and (b.price_usd is not null) into outfile '/tmp/iap_ios2.xlsx';

# # # 亚马逊
# select
#     c.id,
#     a.app_account_id as app_account_id,
#     c.bid as bid,
#     c.gid as gid,
#     c.received_item_quantity as received_item_quantity_amazon,
#     e.create_time as register_time,
#     a.update_time as last_time,
#     f.stage_latest as stage_latest
# from
#     login_device_ip_cheap as a
# left join iap_amazon as c on a.app_account_id = c.app_account_id
# left join app_account as e on e.id = a.app_account_id
# left join summary as f on f.app_account_id = a.app_account_id
# where (a.update_time between '2021-6-1 00:00:00' and  '2021-7-1 00:00:00') and (c.received_item_quantity is not null) and (c.price_usd is not null) into outfile '/tmp/iap_amazon2.xlsx';
# #
# # # google
# select
#     d.id,
#     a.app_account_id as app_account_id,
#     d.bid as bid,
#     d.gid as gid,
#     d.received_item_quantity as received_item_quantity,
#     e.create_time as register_time,
#     a.update_time as last_time,
#     f.stage_latest as stage_latest
# from
#     login_device_ip_cheap as a
# left join iap_googleplay as d on a.app_account_id = d.app_account_id
# left join app_account as e on e.id = a.app_account_id
# left join summary as f on f.app_account_id = a.app_account_id
# where (a.update_time between '2021-6-1 00:00:00' and  '2021-7-1 00:00:00') and (d.received_item_quantity is not null) and (d.price_usd is not null) into outfile '/tmp/iap_googleplay2.xlsx';


select a.stage, b.name, a.record_level, count(1) as count from stage_clear_record as a left join config_stage as b on a.stage=b.stage Group by a.stage, a.record_level, b.name having b.name is not null  limit 10;

# 查询指定玩家的消费
select
    b.app_account_id,
    ifnull(sum(d.rank) - count(c.bid!=0)*0.01, 0) as bid,
    ifnull(sum(f.rank) - (count(1) - count(c.bid!=0))*0.01, 0) as gid,
    ifnull(sum(d.rank), 0) + ifnull(sum(f.rank) - count(1)* 0.01 , 0)as total
from
    iap_amazon as b
left join config_iap as c on c.bid = b.bid
left join config_iap_rank_info as d on d.iap_id=c.iap_id

left join config_gift_pack as e on b.gid=e.pack_id
left join config_iap_rank_info as f on f.iap_id=e.iap_id
where b.app_account_id = 1048970 and (c.iap_type=3 or e.price_type=3);

# 查询所有玩家的消费
SELECT
    app_account_id,
    sum(bid) as t_bid,
    sum(gid) as t_gid,
    sum(total) as t_total
FROM (
    select
    b.app_account_id as app_account_id,
    ifnull(sum(d.rank) - count(c.bid!=0)*0.01, 0) as bid,
    ifnull(sum(f.rank) - (count(1) - count(c.bid!=0))*0.01, 0) as gid,
    ifnull(sum(d.rank), 0) + ifnull(sum(f.rank), 0) - count(1)* 0.01 as total
    from
        iap_amazon as b
    left join config_iap as c on c.bid = b.bid
    left join config_iap_rank_info as d on d.iap_id=c.iap_id

    left join config_gift_pack as e on b.gid=e.pack_id
    left join config_iap_rank_info as f on f.iap_id=e.iap_id
    GROUP BY b.app_account_id, c.iap_type, e.price_type HAVING c.iap_type=3 or e.price_type=3  limit 10) as alias
group by app_account_id limit 10;

# 新增角色查询
select
    date_format(create_time, '%Y-%m-%d') as dat,  # 日期
    count(1) as con,   # 今日新增数量
    (select count(1) from app_account where create_time < a.create_time) as total  # 当前总量
from
    app_account AS a
where
    create_time between '2021-06-01' and '2021-06-30'
group by
    date_format(create_time, '%Y-%m-%d')
limit 10;

# 商店售卖信息
select
	b.pack_id,
	b.pack_name,
	ifnull(d.rank - 0.01,0) as price,
	(case b.pack_type
     	when 1 then '普通礼包'
     	when 2 then '关卡激活型礼包'
     	when 3 then '类月卡礼包'
     	when 4 then '宝箱类礼包'
        when 5 then '每日礼包'
     	when 6 then '限时特惠'
     	when 7 then '通行证礼包'
     	when 8 then '定制礼包档位'
        when 9 then '砍价活动礼包'
     	when 10 then '限时任务礼包'
     	else 'null' end
    ) as type
from
	config_gift_pack as b
left join config_iap_rank_info as d on d.iap_id=b.iap_id
where b.price_type=3 limit 10;

## 砖石
select 
	b.bid as pack_id,
	concat('钻石', b.bitem_quantity) as pack_name,
	ifnull(d.rank - 0.01,0) as price,
	"砖石" as type
from
	config_iap as b
left join config_iap_rank_info as d on d.iap_id=b.iap_id
where b.iap_type=3 limit 10;

# 商店售卖情况 -- 统计过去5分钟内的有效订单
select 
	a.id, a.create_time
from
	iap_googleplay as a
join (select id from iap_googleplay order by id desc limit 5) as b on a.id=b.id
where a.create_time >= DATE_SUB(now(), INTERVAL 5 MINUTE);

## 测试使用
select
   a.bid,
  (d.rank - 0.01) as rank,
   count(a.bid)
from
   iap_googleplay as a
join (select id from iap_googleplay order by id desc limit 5) as b on a.id=b.id
left join config_iap as c on c.bid = a.bid
left join config_iap_rank_info as d on d.iap_id=c.iap_id
where a.create_time >= DATE_SUB('2021-07-06 00:00:00', INTERVAL 5 MINUTE)
group by a.bid;

select
   a.gid,
  (d.rank - 0.01) as rank,
   count(a.gid)
from
   iap_googleplay as a
join (select id from iap_googleplay order by id desc limit 5) as b on a.id=b.id
left join config_gift_pack as c on c.pack_id=a.gid
left join config_iap_rank_info as d on d.iap_id=c.iap_id
where a.create_time >= DATE_SUB('2021-07-06 00:00:00', INTERVAL 5 MINUTE)
group by a.gid;

## 采用方案
select
	alise.item as item_id,
	alise.price as price,
	count(alise.item) as count,
	ifnull(alise.name, concat('砖石', alise.quantity)) as item_name,
	ifnull(alise.type, 0) as type
from (
    select 
      a.gid + a.bid as item,
      ifnull((d.rank - 0.01), (f.rank -0.01)) as price,
      c.pack_type as type,
      c.pack_name as name,
      e.bitem_quantity as quantity
    from
       iap_ios as a
    join (select id from iap_ios order by id desc limit 100) as b on a.id=b.id
    left join config_gift_pack as c on c.pack_id=a.gid
    left join config_iap_rank_info as d on d.iap_id=c.iap_id
    
    left join config_iap as e on e.bid = a.bid
	left join config_iap_rank_info as f on f.iap_id=e.iap_id
    where a.create_time >= DATE_SUB(now(), INTERVAL 5 MINUTE) # 将 '2021-07-06 00:00:00' 替换为 now()
) as alise
group by alise.item;

select
	alise.item as item_id,
	alise.price as price,
	count(alise.item) as count,
	ifnull(alise.name, concat('砖石', alise.quantity)) as item_name,
	ifnull(alise.type, 0) as type
	from (
		select 
			a.gid + a.bid as item,
			ifnull((d.rank - 0.01), (f.rank -0.01)) as price,
			c.pack_type as type,
			c.pack_name as name,
			e.bitem_quantity as quantity
		from
			iap_ios as a
			left join config_gift_pack as c on c.pack_id=a.gid
			left join config_iap_rank_info as d on d.iap_id=c.iap_id
					
			left join config_iap as e on e.bid = a.bid
			left join config_iap_rank_info as f on f.iap_id=e.iap_id
		) as alise
group by alise.item;

# 新增角色查询 -- 全量
select 
	UNIX_TIMESTAMP(date_format(create_time, '%Y-%m-%d')) as dat, 
	count(id) as inc
from 
	app_account as a
group by date_format(create_time, '%Y-%m-%d');

# 新增角色查询 -- 增量
select 
	UNIX_TIMESTAMP(date_format(create_time, '%Y-%m-%d')) as dat, 
	count(id) as inc
from 
	app_account
where 
	to_days(create_time) = to_days(now())
group by 
	date_format(create_time, '%Y-%m-%d');

# 商城购买日志查询
select
	alise.item as item_id,
	alise.price as price,
	alise.create_time
from (
    select 
      a.id,
      a.gid + a.bid as item,
      ifnull((d.rank - 0.01), (f.rank -0.01)) as price,
      a.create_time
    from
       iap_googleplay as a
    join (select id from iap_googleplay where app_account_id=45) as b on a.id=b.id
    left join config_gift_pack as c on c.pack_id=a.gid
    left join config_iap_rank_info as d on d.iap_id=c.iap_id
    
    left join config_iap as e on e.bid = a.bid
	left join config_iap_rank_info as f on f.iap_id=e.iap_id
) as alise
order by alise.id desc;
 
# 角色信息查询
select
	a.app_account_id,
    a.device_id,
    a.ip,
    a.update_time,
    c.gold,
    c.diamond
from
	login_device_ip_cheap as a
join (select id from login_device_ip_cheap order by id desc limit 10 offset 0) as b on a.id=b.id
left join summary as c on c.app_account_id=a.app_account_id;

# 通关查询
select 
	stage,
	(case record_level
     	when 50 then '3星'
     	when 40 then '2.5星'
     	when 30 then '2星'
     	when 20 then '1星'
     	when 10 then '失败'
     	else 'null' end
    ) as level
from 
	stage_clear_record_299 
where 
	app_account_id=899
limit 10 offset 0;

// 查询经验上下范围值
select 
   sum(upg_exp) as exp_max,
   (sum(upg_exp) - (select upg_exp from config_level where lvl = 9)) as exp_min
from 
   config_level
where 
   lvl <= 9;
```