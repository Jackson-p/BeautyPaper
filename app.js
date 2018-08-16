const url = require('url');
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
const koa = require('koa');

const app = new koa();
const dir = './images';
const tUrl = 'https://unsplash.com/';

//https://www.pexels.com/ .photo-item__img srcset
//https://pixabay.com/ 


var download = function(src, dir, filename){
    superagent.get(src).pipe(fs.createWriteStream(dir + "/" + filename));
};


superagent.get(tUrl)
    .end((err, res) => {
        if (err) {
            return console.log(err);
        }
        var $ = cheerio.load(res.text);
        $('._2zEKz').each((index, element) => {
            var $src = $(element).attr('srcset');
            console.log("正在下载");
            download($src, dir, Math.floor(Math.random()*1000) + $src.substr(-3,4) + '.jpg');
        });
        console.log("下载完成");
    });






app.use(async ctx => {

    ctx.body = "hello world";
});
app.listen(3000);

// 常用Api : 
// addClass(className) : 给标签添加class名,方便抓取数据
// text() : 获取标签的文本内容
// find('img') : 查找某类型的标签或者class
// toArray : 可以把一个伪数组变成数组
// each : 循环遍历得到的数组,参数分别是(index,element);

/*今天的话基本上学会了爬虫，不过还有一个问题就是其实爬过来的内容并非是按照
原来内容排版而传过来的，可能是因为异步，先传完都就先传回来了，没准这一点是可以改善的呢
*/