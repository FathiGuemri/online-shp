const productsModel = require('../models/products.models')
const ordersModel = require('../models/order.model')
const validationResult = require('express-validator').validationResult
exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors : req.flash('validationErrors'),
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin, title: 'add-product'
    })
}

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {

        productsModel.addProduct({
        name: req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
        }).then(() => {
            res.redirect('/')
        }).catch(err => {
            next(err)
        }) 
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/admin/add')
    }
    
}

exports.getMOrders = (req, res, next) => {
   let ordersMOdel;
    if (req.query.email)  { 
        ordersMOdel =  ordersModel.fellterOrdersByEmail(req.query.email) }
    else ordersMOdel =  ordersModel.allOrdersByAdmin()
    
    ordersMOdel.then(orders => {
        res.render('m-orders', {
            orders, 
            validationErrors : req.flash('validationErrors'),
            isUser: true,
            isAdmin: true,
            title: 'products manage'})
    }).catch(err => {
        next(err)
    }) 
}

exports.getMOrdersFullter = (req, res, next) => {
    let promisFellter;
    
    if (req.params.fullter == 'pending') promisFellter =  ordersModel.fellterOrders('P')
    else if (req.params.fullter == 'sent') promisFellter =  ordersModel.fellterOrders('S')
    else if (req.params.fullter == 'completed') promisFellter =  ordersModel.fellterOrders('C')
    else {
        res.redirect('/admin/orders')
    }
    promisFellter.then(orders => {
        
        res.render('m-orders', {
            orders, 
            validationErrors : req.flash('validationErrors'),
            isUser: true,
            isAdmin: true,
            title: 'add-product'})
    }).catch(err => {
        next(err)
    }) 
}

exports.postEditOrder = (req, res, next) => {
    
    ordersModel.eidtOrder(req.body._id, req.body.status).then(() => {
        res.redirect('/admin/orders')
    })
}

