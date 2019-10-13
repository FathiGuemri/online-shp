const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://ftahi:est*367426@cluster0-cr3v6.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
    name: String,
    price: String,
    amount :Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const CartItem = mongoose.model('cart', cartSchema)

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
          return CartItem.findOne({productId: data.productId}).then(cart => {
                if (cart) {
                    let amount = +cart.amount + +data.amount
                    data.amount = amount
                    return CartItem.updateOne({productId: data.productId}, data)  
                } else {
                    let item = new CartItem(data)
                    return item.save()
                }
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })

            
          
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getItemByUser = userId => {
    return new  Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
         return CartItem.find({userId: userId}, {} , {sort: {timestamp: 1}})
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL)
        .then(() => {
           return CartItem.updateOne({_id: id}, newData)
        }).then(items => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteCart = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
          return CartItem.findByIdAndDelete(id).then(() => {
                mongoose.disconnect()
                resolve()
          }).catch(err => reject(err))
        })
    })
}

exports.getCartById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
         return CartItem.findOne({_id: id})
        }).then(cart => {
            mongoose.disconnect()
            resolve(cart)
        }).catch(err => reject(err))
    })
}

exports.deleteAllCart = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.deleteMany({userId: userId})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}