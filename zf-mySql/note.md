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
    * 查询所有数据库的名称
      * show databases;
    * 查询某一个数据库的字符集：
      * show create database 数据库名称
  * u update 修改
  * d delete 删除

## DDL: 操作表
- C (create)
1、创建表
create table 表名(
  列名: 数据类型1,
  列名: 数据类型2,
  ...
  列名: 数据类型n
);
2、复制一张表
create table 表名1 like 表名2
- R: 
1、查询数据库中所有的表名称
show tables 
2、查询表结构
desc 表名
- D（删除操作）:
drop table 表名

- U(更新操作):
  * 1、修改表名
  ```sql
  alter table 表名 rename to 新的表名
  ```
  * 2、修改表的字符集
  ```sql
  alter table 表名 character set 字符集
  ```
  * 3、添加一列
  alter table 表名 add 列名 数据类型
  * 4、修改列名称 类型
  alter table 表名 change 列名 新列名  新的数据类型
  * 5、删除列
  alter table 表名 drop 列名
## 数据库类型
```
1、int 整数类型
2、double 小数类型
3、date 日期 只包含年月日 yyyy-MM-dd
4、datetime: 日期，包含年月日时分秒 yyyy-MM-dd HH:mm:ss
5、timestamp: 时间戳类型 如果不给赋值 自动使用系统时间
6、varchar：字符串类型 name varchar(20)
```

## DML: 增删改表中的数据
1、添加数据
  insert into 表名(列名，列名2，。。。列名n) values (值1，值2，值n)
注意: 
1、列名和值要一一对应
2、如果表名后面 不定义列名，则默认给所有的列添加值




## DQL：查询语句
select * from stu

