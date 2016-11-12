/**
 * Created by MWei2 on 11/6/2016.
 */
var mysql = require("mysql")
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"1234567",
    database:"crawl",
    port:3306
})
exports.category = function(cb){
        pool.query("select * from category",function(err,rows,fields){
            if (err) console.error(err.stack);
            else {
                cb(null,rows)};
        });
}

exports.article = function(cb){
    pool.query("select * from article",function(err,rows,fields){
        if (err) console.error(err.stack);
        else {
            cb(null, rows)
        };
    });
}

exports.catArticles = function(cid){
    pool.query("select * from article where cid="+cid,function(err,rows,fields){
        if (err) console.error(err.stack);
        else {
            return rows;
        }
    })
}

