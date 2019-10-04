const cartModel = require('../models/cart.model')
const orderModel = require('../models/order.model')



exports.postToOrderAddress = (req, res, next) => {
    cartModel.getCartById(req.body.cartId).then(cart => {
        res.render('orede-adrass', {cart: cart, isUser: true})
    }).catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    orderModel.addToOrder({
        productName: req.body.productName,
        productId: req.body.productId,
        userId: req.body.userId,
        amount: req.body.amount,
        cost: req.body.cost,
        address: req.body.address,
        status: false,
        time: Date()
    }).then(() => {
       
        res.redirect('/orders')
    }).catch(err => console.log(err))
} 

exports.getOrders = (req, res) => {
    orderModel.getAllOrdersByUserId(req.session.userId).then(orders => {
        res.render('orders', {orders: orders, isUser: true})
    }).catch(err => console.log(err))
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