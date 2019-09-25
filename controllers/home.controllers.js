const productsModel = require('../models/products.models')

exports.getHome = (req, res, next) => {
    
    
    let category =  req.query.category
    let validCategory = ['clother', 'phones', 'computer']
    let productsPromise;
    if (category && validCategory.includes(category)) productsPromise =  productsModel.getAllProductsByCatecory(category)
    else productsPromise =  productsModel.getAllProducts()
    
    productsPromise.then(products => {
        res.render('index', {products})
    })
};


