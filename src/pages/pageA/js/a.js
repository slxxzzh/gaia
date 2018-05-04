import moduleA from 'common/js/module'
import 'common/css/video-js.css'
import 'common/css/global.less'
import '../css/a.less'
// 引用中文路径
import 'common/js/lang/zh-CN.js'
const E = require('wangeditor')

let editor = new E('#editor')
editor.create()

console.log('i am a')
console.log(moduleA)
console.log($('.a').addClass('new add'))

let a = [...[1, 2, 3], 4, 5]
console.log(a)

function hello (params) {
  return params
}
hello('params')

$('#datepicker').datepicker({
  inline: true
})

var options = {
  autoplay: false,
  controls: true,
  preload: 'auto',
  controlBar: {
    children: [
      {
        name: 'playToggle'
      },
      {
        name: 'currentTimeDisplay'
      },
      {
        name: 'timeDivider'
      },
      {
        name: 'durationDisplay'
      },
      {
        name: 'progressControl'
      },
      {
        name: 'volumePanel',
        inline: false
      },
      {
        name: 'fullscreenToggle'
      }
    ]
  },
  language: 'zh-CN'
}

var player = videojs('my-player', options, function onPlayerReady () {
  videojs.log('Your player is ready!')
  this.on('ended', function () {
    videojs.log('Awww...over so soon?!')
  })
})
console.log(player.currentTime())
export { hello }
