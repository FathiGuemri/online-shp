const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/online-shop' 

const orderSchema = mongoose.Schema({
    productName: String,
    productId: String,
    userId: String,
    amount: Number,
    cost : Number,
    address: String,
    status: Boolean,
    time: String
})

const Order = mongoose.model('order', orderSchema)

exports.addToOrder = data => {
    return new Promise((resolve, reject) =>{
        mongoose.connect(DB_URL).then(() => {
        return Order.find({productId: data.productId})
            
            .then(orders => {
                  if (orders.length === 0) {
                        let order = new Order(data)
                        return  order.save()
                  } else {

                     return Order.updateOne({productId: data.productId}, data)
                  }

          
                
            }).catch(err => {
                console.log(err)
            })
        }).then(() => {
            mongoose.disconnect()
            resolve()
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
    
}

exports.getAllOrdersByUserId = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Order.find({userId: userId})
        }).then(orders => {
            mongoose.disconnect()
            resolve(orders)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
} 

exports.deleleOrder = orderId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
           return Order.deleteOne({_id: orderId})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleleAllOrder = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
           return Order.deleteMany({userId: userId})
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}