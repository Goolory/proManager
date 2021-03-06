var express = require('express')

var router = express.Router();

var login = require('./admin/login.js')
var product = require('./admin/product.js')


router.use((req, res, next) => {
    if (req.url == '/login' || req.url == '/login/doLogin') {
        next();
    } else {
        if (req.session.userinfo && req.session.userinfo.username !="") {
           req.app.locals['userinfo'] = req.session.userinfo
           next()
        }else {
            res.redirect('/admin/login')
        }
    }
})

router.use('/login', login)
router.use('/product', product)


module.exports = router;