## 一、运行流程
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126112355450.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
### 1.url地址
- 地址栏输入的url或者导航页面功能键关联的地址名，在urls.py文件中管理。
### 2.url分发器
- urls.py文件
- url分发器通过url或path name匹配对应视图函数，视图函数返回html文件并呈现在前端页面。
### 3.视图函数
- views.py文件
- 分为2种，第1种返回html文件，第2种从model中获取数据，序列化后返回给js文件。
### 4.html文件
- templates文件夹中
- base.html为主界面，包含导航栏。其他为各功能块html文件。
- html加载其中的js文件，js文件执行后一并呈现在前端页面。
### 5.js文件
- /static/js路径下，包含bootstrap和echarts等主题文件和各功能块js文件。
- js文件通过url匹配视图函数,使用ajax方法从model中获取序列化后的数据，echarts脚本将数据加工成图，返给html文件并呈现。

[Django框架搭建demo地址](https://blog.csdn.net/haoran_yang/article/details/102503945 "Django框架搭建demo地址")

## 二、图表展示
- 备注：**以下图表数据皆为虚构数据**。
### 1.导航栏
- 通过导航栏选择要查看的图表，且不会随着图表改变而改变

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126133250529.png)
### 2.组合图
- 顶部下拉框实现**三级联动**功能：前一级改变，后二级或一级会跟着改变。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126133425400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
### 2.线形图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126134424348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
### 3.对比图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126135407997.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
### 4.共轴图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126140717213.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
### 5.表格筛选
- 通过在js文件中设置编写特定规则（也可在后端操作），将符合条件的数据筛选出来并表格呈现，提供日期下拉选择和下载功能。
- "异常描述"内容为demo测试，无实际含义。真实数据用马赛克隐藏。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126141424276.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3Jhbl95YW5n,size_16,color_FFFFFF,t_70)
