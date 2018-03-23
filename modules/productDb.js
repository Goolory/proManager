var __connectDb = require('./db')

//查找数据
exports.finds = function(callback){
    __connectDb(function(connection){

        var sql = 'select * from product'

       connection.query(sql, function(err, result){
           callback(err, result)

       })
       connection.end()
    })
}

//插入数据

exports.insert = function(params, callback) {
   __connectDb(function(connection){
        var addSql = 'insert into product set ?'
        connection.query(addSql, params, function(err, result, fields){
            callback(err, result, fields)
        })
        connection.end()
   })
}

exports.deleteOne = function(id, callback) {
    __connectDb(function(connection) {
        var sql = 'delete from product where id=?'
        var query = connection.query(sql, id, function(err, result, fields) {
            callback(err, result, fields)
        })
        console.log(query.sql)
        connection.end()
    })
}

exports.findById = function(id, callback) {
    __connectDb(function(connection) {
        var sql = 'select * from product where id=?'
        var query = connection.query(sql, id, function(err, result, fields) {
            callback(err, result, fields)

        })
        console.log(query.sql)
        connection.end()
    })
}