const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult;
exports.getSingup =  (req, res, next) => {
    res.render('singup', {
        validetinErrors: req.flash('validetinErrors'),
        isUser: req.session.userId,
        authErr: req.flash('authErr')
    })
}

exports.postSingup = (req, res, next) => {
    let name  = req.body.username,
        email = req.body.email,
        password = req.body.password;
    if (validationResult(req).isEmpty()) {

        authModel.createNewUser(name , email, password).then(() => {
            res.redirect('/login')
        }).catch(err => {
            req.flash('authErr', err)
            res.redirect('/singup')
        } )
    } else {
        req.flash('validetinErrors', validationResult(req).array())
        res.redirect('/singup')
    }
}

exports.getLogin = (req, res, next) => {
    res.render('login', 
    {   authErr: req.flash('authErr')[0],
        ivalidetinErr: req.flash('ivalidetinErr'),
        isUser: req.session.userId
        });
}

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {

        authModel
            .login(req.body.email, req.body.password)
            .then(result => {
               req.session.userId = result.id
               req.session.isAdmin = result.isAdmin
                res.redirect('/') 
            }).catch(err => {
                req.flash('authErr', err)
                res.redirect('/login')
            })
    } else {
        req.flash('ivalidetinErr', validationResult(req).array())
        res.redirect('/login')
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}