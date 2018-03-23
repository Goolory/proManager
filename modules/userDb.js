var __connectDb = require('./db')

//查找数据登录操作
exports.findUser = function(params, callback) {
    __connectDb(function(connection) {
        var sql = 'select * from user where username=? and password=?'
        var query = connection.query(sql, params, function(err, result) {
            callback(err, result)

        })
        console.log(query.sql)
        connection.end()

    })

}

exports.finds = function(callback){
    __connectDb(function(connection){

        var sql = 'select * from product'

       connection.query(sql, function(err, result){
           callback(err, result)

       })
       connection.end()
    })
}

exports.insert = function(params, callback) {
    __connectDb(function(connection){
         var addSql = 'insert into prduct(name, img_path, price, fee) values (?,?,?,?)'
         connection.query(addSql, params, function(err, result){
             callback(err, result)
         })
         connection.end()
    })
 }