const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/online-shop"

const ProductSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})

const Product = mongoose.model('product', ProductSchema)
exports.getAllProducts = () => {
    return new Promise((resolev, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then((products) => {
            mongoose.disconnect()
            resolev(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getAllProductsByCatecory = (category) => {
    return new Promise((resolev, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ category: category })
        }).then((products) => {
            mongoose.disconnect()
            resolev(products)
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getAllProductsById = id => {
    return new Promise((resolev, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findOne({ _id: id })
        }).then((product) => {
            mongoose.disconnect()
            resolev(product)
        }).catch(err => reject(err))
    })

}
exports.getFristProducts = () => {
    return new Promise((resolev, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findOne()
        }).then((product) => {
            mongoose.disconnect()
            resolev(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}