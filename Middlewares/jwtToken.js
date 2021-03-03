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

module.exports.verifyToken = function (resetLink) {
    return new Promise((resolve,reject)=>{
        jwt.verify(resetLink, process.env.secretKey, function(err, decodeData){
            if(err){
                console.log('Incorrect token or token expired')
                reject(err);
            }else if(decodeData){
                resolve(decodeData ? true : false);
            }
    
    
        })
    })
    
}