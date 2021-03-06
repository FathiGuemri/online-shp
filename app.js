const express = require('express')
const path = require('path')
const app = express();

const session = require("express-session")
const SessionStore = require('connect-mongodb-session')(session)

const flash = require('connect-flash')

const homeRouter = require('./routes/home.routes')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.router')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.router')
const adminRouter = require('./routes/admin.router')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb+srv://ftahi:est*367426@cluster0-cr3v6.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection: 'session'
})

app.use(session({
    secret: 'thi is my secret to hesh express sessions .......',
    saveUninitialized: false,
    store: STORE
}))
app.set('view engine', 'pug')


app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use('/admin', adminRouter)
app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error', { 
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin, title: 'erorr' })
})

app.get('/not-admin', (req, res, next) => {
    res.status(403)
    res.render('not-admin', { 
        isUser: req.session.userId,
        isAdmin: false, title: 'erorr'})
})

app.use(( error, req, res, next) => {
    res.redirect('/error')
})

app.use((req, res, next) => {
    res.render('not-found', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        title: 'erorr'
    })
})

let port = process.env.PORT || 3000

app.listen(port, err =>  {
if (err) console.log(err)
    console.log('server rening in port 3000')
});


