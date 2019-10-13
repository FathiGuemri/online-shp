const cartModel = require('../models/cart.model')
const validationRusult = require('express-validator').validationResult
exports.getCart = (req, res, next) => {
    cartModel.getItemByUser(req.session.userId).then(items => {
        let totalAmoun = 0
        let totalCarts  = 0
        items.forEach(element => {
            total =  element.price * element.amount
            totalCarts = totalCarts + total
            totalAmoun = totalAmoun + element.amount 
    });
       
    res.render('cart', {totalCarts, title: 'cart', totalAmoun, items: items, isAdmin: req.session.isAdmin, isUser: true, validationErr: req.flash('validationErr')[0]})
    }).catch(err => next(err))
}
exports.postCart = (req, res, next) => {
    if (validationRusult(req).isEmpty()) {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart') 
        }).catch(err => next(err))
    } else {
        req.flash('validationErr', validationRusult(req).array())
        res.redirect(req.body.redirectTo)
    }
}


exports.postSave = (req, res, next) => {
    if (validationRusult(req).isEmpty()) {
        cartModel.editItem(
            req.body.cartId, 
            {amount: req.body.amount, timestamp: Date.now()}).
            then(items => {
                res.redirect('/cart')
            }).catch(err => next(err))
    } else {
        req.flash('validationErr', validationRusult(req).array())
        res.redirect('/cart')
    }
}

exports.postDelete = (req, res, next) => {
    cartModel.deleteCart(req.body.cartId).then(() => {
        res.redirect('/cart')
    }).catch(err =>next(err))
}

exports.postDeletAllCart = (req, res, next) => {
    cartModel.deleteAllCart(req.session.userId).then(() => {
        res.redirect('/cart')
    }).catch(err => next(err))
}
