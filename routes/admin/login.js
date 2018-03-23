var express = require('express')

var router = express.Router();

var bodyParser = require('body-parser')

var md5 = require('md5-node')
var db = require('../../modules/userDb')

router.use(bodyParser.urlencoded({extended :false}))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/doLogin', (req, res) => {
    var username = req.body.username
    var password = md5(req.body.password)
    console.log(username, password)
    db.findUser([username, password], (err, result) => {
        if (err) throw err;
        if (result.length>0) {
            console.log('登录成功');
            // 保存信息
            req.session.userinfo = JSON.parse(JSON.stringify(result))[0]
            console.log(JSON.parse(JSON.stringify(result))[0])
            res.redirect('/admin/product')
        } else {
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>")
        }
    })
})

router.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/login')
        }
    })
})
module.exports = router;
