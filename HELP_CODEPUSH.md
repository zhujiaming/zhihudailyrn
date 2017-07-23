#### codepush 使用
参考：http://www.jianshu.com/p/9e3b4a133bcc

1.先去创建一个CodePush 账号

2.集成codepush到项目中

3.发布项目正式包

3.使用命令行命令codepush热更新

    code-push release-react MyApp-iOS ios  --t 1.0.0 --dev false --d Production --des "1.优化操作流程" --m true

其中参数--t为二进制(.ipa与apk)安装包的的版本；--dev为是否启用开发者模式(默认为false)；--d是要发布更新的环境分Production与Staging(默认为Staging)；--des为更新说明；--m 是强制更新。

关于code-push release-react更多可选的参数，可以在终端输入code-push release-react进行查看。

注意：
react-native-code-push  各版本不是都兼容react-native的，参考：
https://www.npmjs.com/package/react-native-code-push#supported-react-native-platforms