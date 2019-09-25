const productsModel = require('../models/products.models')

exports.getHome = (req, res, next) => {
    productsModel.getAllProducts().then(products => {
        res.render('index', {products})
    })
    
    
}


