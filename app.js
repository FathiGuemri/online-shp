const express = require('express')
const path = require('path')
const app = express();


const homeRouter = require('./routes/home.routes')
const productRouter = require('./routes/product.route')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

app.set('view engine', 'pug')


app.use('/', homeRouter)
app.use('/product', productRouter)

app.listen(3000, err =>  {
if (err) console.log(err)
   console.log('server rening in port 3000')
});


