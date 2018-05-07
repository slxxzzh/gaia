// 从Videojs中获取一个基础组件
var Component = videojs.getComponent('Component')

// videojs.extend方法用来实现继承，等同于ES6环境中的class titleBar extends Component用法
var LiveContral = videojs.extend(Component, {
  // 这个构造函数接收两个参数：
  // player将被用来关联options中的参数
  constructor: function (player, options) {
    // 在做其它事之前先调用父类的构造函数是很重要的，
    // 这样可以使父组件的所有特性在子组件中开箱即用。
    Component.apply(this, arguments)
    // 如果在options中传了text属性，那么更新这个组件的文字显示
    if (options.text) {
      this.updateTextContent(options.text)
    }
  },
  // 创建一个DOM元素
  createEl: function () {
    let vjsLiveControl = videojs.dom.createEl('div', {
      // 给元素加vjs-开头的样式名，是videojs内置样式约定俗成的做法
      className: 'vjs-live-control vjs-control'
    })
    let vjsLiveDisplay = videojs.dom.createEl('div', {
      className: 'vjs-live-display',
      // innerHTML: '1080P CRF23'
    })
    vjsLiveControl.appendChild(vjsLiveDisplay)
    return vjsLiveControl
  },
  // 这个方法可以在任何需要更新这个组件内容的时候调用
  updateTextContent: function (text) {
    // 如果options中没有提供text属性，默认显示Text Unknow
    if (typeof text !== 'string') {
      text = 'Text Unknown'
    }
    // 使用Video.js提供的DOM方法来操作组件元素
    videojs.dom.emptyEl(this.el().children[0])
    videojs.dom.appendContent(this.el().children[0], text)
  }
})

var LogoControl = videojs.extend(Component, {
  // 这个构造函数接收两个参数：
  // player将被用来关联options中的参数
  constructor: function (player, options) {
    // 在做其它事之前先调用父类的构造函数是很重要的，
    // 这样可以使父组件的所有特性在子组件中开箱即用。
    Component.apply(this, arguments)
  },
  // 创建一个DOM元素
  createEl: function () {
    let vjsLogoControl = videojs.dom.createEl('button', {
      // 给元素加vjs-开头的样式名，是videojs内置样式约定俗成的做法
      className: 'vjs-play-control vjs-logo-control vjs-control vjs-button',
      title: '返回首页'
    })
    return vjsLogoControl
  },
})
// 在videojs中注册这个组件，才可以使用哦.
videojs.registerComponent('LiveContral', LiveContral)
videojs.registerComponent('LogoControl', LogoControl)
