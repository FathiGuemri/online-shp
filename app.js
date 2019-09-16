const express = require('express')
const path = require('path')
const app = express();



app.use(express.static(path.join('assets')))

app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
    res.render('index')
})
app.listen(3000, err => !err ? console.log('server rening in port 3000') : console.log(err))
