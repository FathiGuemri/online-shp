const cartModel = require('../models/cart.model')
const orderModel = require('../models/order.model')



exports.postToOrderAddress = (req, res, next) => {
    cartModel.getCartById(req.body.cartId).then(cart => {
        res.render('orede-adrass', {cart: cart, isUser: true, isAdmin: true})
    }).catch(err => next(err))
}

exports.postOrder = (req, res, next) => {
    orderModel.addToOrder({
        productName: req.body.productName,
        productId: req.body.productId,
        userId: req.body.userId,
        email: req.session.email,
        amount: req.body.amount,
        cost: req.body.cost,
        address: req.body.address,
        status: 'P',
        time: Date()
    }).then(() => {
       
        res.redirect('/orders')
    }).catch(err => next(err))
} 

exports.getOrders = (req, res) => {
    orderModel.getAllOrdersByUserId(req.session.userId).then(orders => {
        res.render('orders',  {title: 'orders',orders: orders, isUser: true, isAdmin: req.session.isAdmin})
    }).catch(err => next(err))
}

exports.postCansel = (req, res, next) => {
    orderModel.deleleOrder(req.body.orderId).then(() => {
        res.redirect('/orders')
    }) 
}

exports.postCanselAll = (req, res, next) => {
    orderModel.deleleAllOrder(req.session.userId).then(() => {
        res.redirect('/orders')
    }) 
}