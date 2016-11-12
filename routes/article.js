/**
 * Created by weimin on 16-11-7.
 */
var async = require("async");
var model = require("../model")
var express = require("express")
var router = express.Router();
var categoryId = null;//这一句是为了设置一个统一的category id,开始默认为空，只有当url中cid有值时候才更新它，否则每次点击分页也会把cid置为0
router.get("/", function (req, res) {
    var cid = req.query.cid;//从url中读取cid
    var articles=[];//存储数据库中取出来的文章
    var categories=[];//存储数据库中取出来的文章分类
    async.parallel([ //之所以用parallel，是为了并行得到分类和文章
        function (cb) {
            model.category(cb);
        }, //先读取分类
        function (cb) { //将分类传入
            model.article(cb);
        }
    ], function (err, result) {
        categories=result[0];
        articles=result[1];
        if (cid) { //如果url中有cid，表明点击了分类
            categoryId=cid;//只有当点击了分类时候才修改categoryId值，这样简单的刷新页面不会修改这个值
           articles = articles.filter(function(item,index){//过滤出categoryId分类下的文章
               return item.cid==categoryId;
           })
        }
        res.render("index", {
            categories: categories,
            articles: articles,
            cid:categoryId
        })
    })

})

module.exports = router;
