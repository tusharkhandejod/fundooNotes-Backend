const User = require('../Model/userModel');


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



    //  let serviceResult = User.login(req)
    //  console.log("Servicse Result :",serviceResult)
    //  return serviceResult;
    // return User.login(req)
    // .then((result)=>{
    //     return ({ message: "Login successfull", data: result  })
    // }).catch((error)=>{
    //     return ({ message: "Login failed", data: error })
    // })
  }

  forgetPassword = (req, res) => {

    
    User.forgetPassword(req)
    // return User.forgetPassword(req).then((res) => {
    //   return ({ message: "Check your mail for reset password link", data: result })
    // }).catch((error) => {
    //   return ({ message: "Error occured...", data: error })
    //})
  }

  resetPassword = (req, res) => {
    return User.resetPassword(req).then((res) => {
      return ({ message: "Your password is changed", data: res })
    }).catch((error) => {
      return ({ message: "Error occured", data: error })
    })
  }

}







module.exports = new EmpServices();