const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DB_URL = "mongodb://localhost:27017/online-shop"

const usresSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("user", usresSchema)

exports.createNewUser = (username, email, password) => {
    // check if email existe
    // yes  ===> error
    // no ===> create new acount

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashPass => {
            let user = new User({
                username: username,
                email: email,
                password: hashPass,
                isAdmin: false
            })
            return user.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    // chek for email
    //  no ===> error
    //  yes ===> chek for password
    // no ===> error 
    // yes ===> set cookie (isUser, boolean)
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
          return User.findOne({email: email})
        }).then(user => {
            if (!user) {
                mongoose.disconnect()
                reject('there is no user matches this  email ')
            }else {
                bcrypt.compare(password, user.password).then(same => {
                if (!same) {
                    mongoose.disconnect()
                    reject('password is incorrect')
                } else {
                    mongoose.disconnect()
                    resolve({
                        id: user._id,
                        isAdmin: user.isAdmin
                    })
                }
            })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}