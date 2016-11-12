/**
 * Created by MWei2 on 11/6/2016.
 */

var request = require("request");//拉取网页内容
var cheerio = require("cheerio") //实现jquery功能
var iconv = require("iconv-lite") //把GBK转成UTF8
var urlM = require("url")

exports.category = function(url,callback){
    request({url:url,encoding:null},function(err,response,body){
        if (err) {return console.error(err)}
        //把GBK编码的BUFFER转成UTF8编码的字符串
        body = iconv.decode(body,"gbk");
        var $=cheerio.load(body);
        var items =[];
        $(".hd .title a").each(function(){
            var $me = $(this);
            var item ={
                name:$me.text().trim(),
                url:$me.attr("href")
            }
            var urlObj = urlM.parse(item.url,true);
            var b = urlObj.query.b;
            item.id =b;
            items.push(item);
        })
        callback(null,items);
    })
}

exports.article = function(url,cid,callback){
    request({url:url,encoding:null},function(err,response,body){ //设置encoding为null,就按照buffer读取进来，而不是默认的UTF8
        if (err) {return console.error(err)}
        //把GBK编码的BUFFER转成UTF8编码的字符串
        body = iconv.decode(body,"gbk");
        var $=cheerio.load(body);
        var items =[];
        $(".keyword a").each(function(){
            var $me = $(this);
            var item ={
                name:$me.text().trim(),
                url:$me.attr("href"),
                cid:cid
            }
            if (item.name!="search"){
                items.push(item);
            }
        })
        callback(null,items);
    })
}
