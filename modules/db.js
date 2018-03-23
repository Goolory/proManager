var mysql = require('mysql');
var config = {
    host: 'localhost',
    user: 'root',
    password: 'xys147852',
    database: 'proManager'
}

function __connectDb(callback) {
    var connection = mysql.createConnection(config);
    connection.connect()

    callback(connection)

   
}

module.exports = __connectDb



// function n(callback) {
//     __connectDb(function(connection){
//         var sql = 'select * from product'
//         connection.query(sql, function(err, result){
//             callback(err, result)
//         })
//     })
// }

// n((err, result)=>{
//     console.log(JSON.stringify(result))
// })