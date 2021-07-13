/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : controller handles request and responses of  user login & registartion
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/users.js
 * @overview    : Handles requests coming from clients to login & register 
 * @module      : neccessary part (controller) of MVC Model of AddressBook
 *  API
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/

 const userService = require('../service/user')

 class User {
 
     registerUser(req,res){
         try {
            const userData = {
                 firstName : req.body.firstName,
                 lastName : req.body.lastName,
                 email : req.body.email,
                 password : req.body.password
                }
            userService.registerUser(userData,(error,data)=>{
                 error ?
                     res.status(500).send({
                         success: false, message: "Some error occurred while registering user"
                     })
                 :
                     res.status(200).send({
                         success: true, message: "User created successfully!", data: data
                     });
                 }
             )
         }
          catch (error) {
             return res.send({message:error})
         } 
     }
}
 
 module.exports = new User()