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

module.exports.verifyToken = function (req,res, next) {
    
        var token = req.header('token') || req.params.token;
        console.log('token : ',token)
        
        let verification_msg = {
           "message": "Unauthorized user"
        }
        
        jwt.verify(token, process.env.secretKey, function(err, decodeData){
            if(err){
                console.log('Incorrect token or token expired')
                return res.status(401).send(verification_msg);
            }else if(decodeData){
                req.decoded = decodeData;
                console.log('decoded data : ',req.decoded);
                console.log('Token matched')
                next();

            }
    
    
        })
   
    
}