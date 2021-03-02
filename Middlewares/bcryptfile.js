const bcrypt = require('bcrypt');
const User = require('../Model/userModel');


module.exports.encodePassword = function (password) {

    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt )

}

module.exports.VerifyPassword = function (password,dbpassword) {

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbpassword).then(data => {
            resolve(data ? true : false);
        }).catch(err => {
            reject(err);
        })
    })
  

}
