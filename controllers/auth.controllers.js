const authModel = require('../models/auth.model')
exports.getSingup =  (req, res, next) => {
    res.render('singup')
}

exports.postSingup = (req, res, next) => {
    authModel.createNewUser(req.body.username, req.body.email, req.body.password).then(() => {
        res.redirect('/login')
    }).catch(err => {
        console.log(err)
        res.redirect('/singup')
    } )
}

exports.getLogin = (req, res, next) => {
    res.render('login', {authErr: req.flash('authErr')[0]})
}

exports.postLogin = (req, res, next) => {
    authModel
        .login(req.body.email, req.body.password)
        .then((id) => {
           req.session.userId = id
            res.redirect('/')
        }).catch(err => {
            req.flash('authErr', err)
            res.redirect('/login')
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}