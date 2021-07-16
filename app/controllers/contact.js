/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : controller handles request and responses for crud operations
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/contact.js
 * @overview    : Handles requests coming from clients for crud operation 
 * @module      : neccessary part (controller) of MVC Model of AddressBook
 *  API
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/
const contactService = require('../service/contact')
const {contactSchema} = require('../middlewares/contactValidation')
class contact{
    createContact(req,res){
        try {
            const contact = {
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                zipCode:req.body.zipCode,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email
            }

            const result = contactSchema.validate(contact)
            result.error ?
            res.status(422).send({success: false, message: result.error.details[0].message})
            :
            contactService.createContact(contact,(error,data)=>{
                error ?
                    res.status(500).send({
                        success: false, message: "Some error occurred while saving the contact"
                    })
                :
                    res.status(200).send({
                        success: true, message: "User created successfully!", token : data
                    });
            })
            
        } catch (error) {
            return res.send({message:error})
        }
    }
}
module.exports = new contact()