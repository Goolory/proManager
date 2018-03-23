var express = require('express')

var router = express.Router()

var proDb = require('../../modules/productDb')

var multiparty = require('multiparty')

var fs = require('fs')


router.get('/' ,(req, res) => {
    proDb.finds((err, result) => {
        res.render('admin/product/index', {
            list: JSON.parse(JSON.stringify(result))
        })
    })
    
})

router.get('/productadd', (req, res) => {
    res.render('admin/product/add')
})

router.post('/doAdd', (req, res) => {
    var form = new multiparty.Form()

    form.uploadDir = 'upload'

    form.parse(req, (err,fields, files) => {
        console.log(fields)
        var title = fields.title[0]
        var price = fields.price[0]
        var fee = fields.fee[0]
        var description = fields.description[0]
        var pic = files.pic[0].path

        proDb.insert({
            title: title,
            price: price,
            fee,
            description,
            pic
        }, (err, result, fields) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/admin/product')
            }
        })
    })
})

router.get('/edit', (req, res) => {
    var id = req.query.id;

    proDb.findById(id, (err, result, fields) => {
        console.log(JSON.stringify(result))
        console.log(JSON.parse(JSON.stringify(result)))
        if (err) {
            console.log(err)
        } else {
            res.render('admin/product/edit', {
                list: JSON.parse(JSON.stringify(result))[0]
            })
        }
    })
})

router.get('/delete', (req, res) => {
    var id = req.query.id;

    proDb.deleteOne(id, (err, result, fields) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/product')
        }
    })
})

module.exports = router