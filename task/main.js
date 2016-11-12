/**
 * Created by MWei2 on 11/6/2016.
 */
var read = require("./read");
var save = require("./save");
var url='http://top.baidu.com/category?c=10&fr-topcategory_c10';
var async = require("async");

var categories=[];
var articles=[];
async.series([
    function(done){
        read.category(url,function(err,list){
            categories = list;
            done();
        })
    },
    function(done){
        save.category(categories,done);
    },
    function(done){
        async.forEach(categories,function(category,next){
            read.article("http://top.baidu.com/buzz?b="+category.id+"&c=10&fr=topcategory_c10",category.id,function(err,list){
               articles=articles.concat(list);
                next();
            })
        },done);
    }
],function(err,res){
    if (err) console.error(err.stack)
   save.article(articles);
})