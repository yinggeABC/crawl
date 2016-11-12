/**
 * Created by MWei2 on 11/6/2016.
 */
var mysql = require("mysql")
var async = require("async")
var pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"1234567",
    database:"crawl",
    port:3306
})

exports.category = function(list,callback){
    pool.getConnection(function(err,conn){
        async.forEach(list,function(item,cb){
            pool.query("replace into category(id,name,url) values(?,?,?)",[item.id,item.name,item.url],cb);
        },callback);//replace没有记录则插入，有的话则更新
    })

}

exports.article = function(list){
    async.forEach(list,function(item,cb){
        pool.query("replace into article(name,url,cid) values(?,?,?)",[item.name,item.url,item.cid],cb);
    },function(){
        pool.end(function(err){
            if (!err) {
                console.log("crawl done")
            }
        });
    });
}


