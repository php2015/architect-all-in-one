## SQL通用语法
- 1、SQL语句可以单行或者多行书写 以分号结尾
- 2、可以使用空格或者缩进来增强语句的可读性
- 3、mysql数据库的sql语句不区分大小写，关键字建议使用大写
- 4、3中注释
    * 单行注释：-- 注释内容 或者 # 注释内容 (mydq独有)
    * 多行注释：/* 注释 */ 


## SQL分类
- DDL (data defination language) 数据定义语言，用来定义数据库对象：数据库，表，列等，关键字 create drop alter 等
- DML (data manipulation language) 数据库操作语言 用来对数据库中的表的数据进行增删改 insert delete update 等
- DQL (data query language) 数据库查询语言，用来查询数据库中表的记录 关键字 select where 等
- DCL (data control language) 数据库控制语言 用来定义数据库的访问权限和安全级别。

## DDL:操作数据库、表
- 1、操作数据库 CRUD
  * c create  创建
  * r retrieve 查询
  * u update 修改
  * d delete 删除