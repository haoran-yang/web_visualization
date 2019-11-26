## 流程及说明
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
