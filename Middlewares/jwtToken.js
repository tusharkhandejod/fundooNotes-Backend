const jwt = require('jsonwebtoken');

module.exports.generateToken = function (payload) {
    try {
        const token = jwt.sign(payload, process.env.secretKey, {expiresIn: '1d'});
        let msg = {
            message: "Token generated successfully",
            token: token
        }
        return msg;
    } catch (error) {
        console.log("Error token not generated")
    }
}

module.exports.TokenVerification = function (req) {
   
}