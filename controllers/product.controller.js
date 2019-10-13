const productsModel = require('../models/products.models')

exports.getProductById = (req, res, next) => {
    let id  = req.params.id
    productsModel.getAllProductsById(id).then(product => {
        res.render('product', {product,  validnErr: req.flash('validationErr')[0],
        isUser: req.session.userId, isAdmin: req.session.isAdmin,  title: 'product'})
    })
}

exports.getProduct = (req, res, next) => {
    let id  = req.params.id
    productsModel.getFristProducts().then(product => {
        res.render('product', {product, 
            validnErr: req.flash('validationErr')[0],
            isUser: req.session.userId, isAdmin: req.session.isAdmin, title: 'product' })
    })
}