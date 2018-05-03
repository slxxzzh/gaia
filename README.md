# gaia项目多页应用webpack构建

## 拟定目录结构

* build : 项目构建
* src： 项目文件目录 /src/pages 项目业务代码 /src/common第三方库 公共css
* test： 测试模板

## 操作
* npm run server 开启本地项目 默认访问为9000端口下具体页面
* npm run build 构建应用
* npm run test 运行测试程序 默认访问为9090端口下具体页面
## 待解决问题
* 多页面应用热加载
* 自动引入文件构建多页面程序 （当前build页面以及test为手动引入入口文件）
* purifycss功能疑似失效

## 所涉及知识点链接
* [thymeleaf](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
* [wangeditor](https://www.kancloud.cn/wangfupeng/wangeditor3/332599)
* [jquery ui](http://jqueryui.com/demos/)
* [qunit](http://qunitjs.com/cookbook/)

---
by yjx 2018年05月02日15:27:58
