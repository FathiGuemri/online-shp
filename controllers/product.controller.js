const productsModel = require('../models/products.models')

exports.getProductById = (req, res, next) => {
    let id  = req.params.id
    productsModel.getAllProductsById(id).then(product => {
        res.render('product', {product: product})
        console.log(product);
        
    })
}

exports.getProduct = (req, res, next) => {
    let id  = req.params.id
    productsModel.getFristProducts().then(product => {
        res.render('product', {product})
        console.log(product);
        
    })
}