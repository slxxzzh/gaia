import moduleA from 'common/js/module'
import LiveContral from './components.js'
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

var player1 = videojs('my-player1', options, function onPlayerReady () {
  videojs.log('Your player is ready!')
  player1.controlBar.addChild('LiveContral', { text: '1080P CRF23' }, 5)
  player1.controlBar.addChild('LogoControl')
  this.on('ended', function () {
    videojs.log('Awww...over so soon?!')
  })
})

var player2 = videojs('my-player2', options, function onPlayerReady () {
  videojs.log('Your player is ready!')
  player2.controlBar.addChild('LiveContral', { text: '1080P CRF23' }, 5)
  player2.controlBar.addChild('LogoControl')
  this.on('ended', function () {
    videojs.log('Awww...over so soon?!')
  })
})
$('#btn').click(() => {
  player1.play()
  player2.play()
})
console.log(player.controlBar)
export { hello }
