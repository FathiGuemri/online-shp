const express = require('express')
const path = require('path')
const app = express();

const session = require("express-session")
const SessionStore = require('connect-mongodb-session')(session)

const flash = require('connect-flash')

const homeRouter = require('./routes/home.routes')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.router')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
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

app.listen(3000, err =>  {
if (err) console.log(err)
   console.log('server rening in port 3000')
});


