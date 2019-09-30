const productsModel = require('../models/products.models')

exports.getHome = (req, res, next) => {
    console.log(req.session.userId)
    
    let category =  req.query.category
    let validCategory = ['clother', 'phones', 'computer']
    let productsPromise;
    if (category && validCategory.includes(category)) productsPromise =  productsModel.getAllProductsByCatecory(category)
    else productsPromise =  productsModel.getAllProducts()
    
    productsPromise.then(products => {
        res.render('index', {products, 
            isUser: req.session.userId,
            validnErr: req.flash('validationErr')[0]
        })
    })
};


