//entry.config.js
var path = require('path')
var fs = require('fs')
let entry_files = {}
function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            var file_path = dir + '/' + file;
            var fname = path.basename(file, '.js');
            entry_files[fname]=file_path;
        })
    } catch (e) {

    }
}
each_file('../src/pages')
//entry_files是一个object对象，也就是遍历js文件夹下的js文件，然后写成entry所需配置的格式。
console.log(entry_files)
module.exports=entry_files