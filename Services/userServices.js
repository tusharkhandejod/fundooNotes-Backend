const User = require('../Model/userModel');
const jwt_decode = require('jwt-decode')
const bcryptCheck = require('../Middlewares/bcryptfile');

class EmpServices {

  register = (req, res, next) => {

    return User.register(req).then((res) => {
      return ({ message: "Record added successfully", data: res })
    }).catch((error) => {
      return ({ message: "Failed to add the record", data: error })
    })



  }

  login = (req, callback) => {

    console.log(req.body)
    let loginData = {
      email: req.body.email,
      password: req.body.password
    }
    console.log('login data : ', loginData)
    try {
      return User.login(loginData, (err, data) => {
        if (err) {
          return callback(err)
        } else {
          return callback(null, data)
        }
      })
    } catch (error) {
       console.log(err)
       return callback(err)
    }

 }

  forgetPassword = (req, res) => {

    return User.forgetPassword(req)
    .then(res=>{
      console.log('Data received in services from model : ',res)
      return ({ message: "Reset password link is send on your Email kindly check", data: res })
    }).catch(error=>{
      console.log('Data received in services from model : ',res)
      return ({ error: "Reset password link error", data: error })
    })
   
  }

  resetPassword = (resetPasswordData, callback) => {
     
    
    let encodedNewPass = bcryptCheck.encodePassword(resetPasswordData.password);
    
    let finalresetPassObj = {
      id: resetPasswordData.id,
      email: resetPasswordData.email,
      password: encodedNewPass
    }

    return User.resetPassword(finalresetPassObj, (err, data)=>{
      if(err){
        return callback(err)
      }else{
        return callback(null, data)
      }

    })

  }

}


module.exports = new EmpServices();