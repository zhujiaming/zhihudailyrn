##### 
#### 简介
---
> 这是一款使用ReactNative技术写的模仿《知乎日报》的客户端。
主要目的为学习ReactNative，掌握其API使用及原理等知识。
>  主要实现了《知乎日报》App的首页，详情页，评论页，专题页，抽屉页，登录页，主编页等页面的绘制与数据处理。（目前仅实现了Android端的适配。。）几乎90%+的代码在ReactNative端编写。

- 框架

项目使用的ReactNative版本为0.45.1，遵循ES6语法特性。
本着学习的目的，尽管项目不是大型项目，但还是采用了Redux架构，加深对Redux架构的理解，并且为之后的拓展打基础。并且采用了redux-thunk 中间件，来更加灵活的处理各类的异步操作。

- 页面路由

项目路由导航机制采用了时下facebook官方推荐的React-Navigation导航组件，其也采用了redux的架构思想，通过action的dispatch灵活进行路由操作，个人觉得与44版本之前的Navigator组件差别不是很大，甚至更加灵活。

- 数据缓存

项目中加入了数据缓存机制，对于不同页面的网络数据采用了不同的缓存策略（具体可参看源码注释），本来可以使用AsyncStorage来实现缓存，偶然发现了react-native-storage这个对AsyncStorage进一步封装的第三方JS库，功能挺完善，挺强大，由RN中文网维护。

- 网络

网络框架方面，对ReactNative提供的Fetch对象进行了简单的封装，通过添加定时任务，完善网络请求的超时功能，并且封装了统一请求头，请求类型等，对外返回Promise对象，异步处理请求结果。

- 动画

动画方面，既有ReactNative方面的动画涉及，也有android原生动画涉及，例如启动页的icon动画，与原App几乎无差别，但在有些地方想通过RN实现原生的动画确实有些困难，达不到那种流畅效果。

- web网页加载

web网页显示确实在当前RN版本中存在着一些坑，比如rn的webView控件在安卓端未提供网页滚动事件的监听而无法实现一些特殊效果，项目中的做法干脆就是直接通过原生WebView自定义RN的WebView,向RN回调滚动事件，效果还行。

- 其他

其他方面涉及到一些自定义View，各类ListView的使用，页面的绘制，一些效果的实现，以及遇到的一些坑等，会在其他笔记文章中记录及分析。

（默默的感谢下该知乎日报API的提供者，虽说接口不是很多，但正是有了这些API接口，才使得这个rn项目至少像那么回事，有动力写下去啦😉，有需要的可以网上搜搜或者联系我。）
#### ScreenShot
（截图图片压缩了，效果不是很清晰，可直接安装项目根目录下apk运行）
---

![欢迎页  首页](http://upload-images.jianshu.io/upload_images/1948083-dad44eebcedaf8d0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





![详情页 评论页](http://upload-images.jianshu.io/upload_images/1948083-ac42b517d585a40c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![登录页 抽屉页](http://upload-images.jianshu.io/upload_images/1948083-bcfd7a494fd559a1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






![专题页](http://upload-images.jianshu.io/upload_images/1948083-db9161e17e36a27e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#### 第三方依赖
---
- [react-redux/redux/redux-thunk](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
-  [react-navigation](https://reactnavigation.org)
- [react-native-extra-dimensions-android](https://github.com/Sunhat/react-native-extra-dimensions-android)
- [react-native-storage](https://github.com/sunnylqm/react-native-storage)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)



#### 安装配置
---
1. clone the repo
> git clone https://git.oschina.net/null_711_9174/zhihudailyrn.git
>cd zhihudailyrn

2. install dependencies 
> npm install

3. run on android 
> react-native run-android

#### 最后
由于本人从事的是Android开发工作，所以目前仅适配了Android端，近期会在IOS端做些工作，顺便学习下IOS的基础开发。
项目中还有很多问题和待优化的地方，我会持续更新这个项目。
如果发现有问题的地方或者建议等，很希望能告知联系，大家相互学习，共同进步呀😉。


邮箱：ah_zjm@163.com
QQ：771407650