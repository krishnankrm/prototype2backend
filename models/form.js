const mongoose = require('mongoose')


const FormSchema = new mongoose.Schema({
    firstname: {
            type: String,
            required: true
        },
    lastname: {
            type: String,
            required: true
        },
    middlename: {
            type: String,
            required: true,
        },
    address: {
            type: String,
            required: true
        },
    email: {
            type: String,
            required: true
        },
    phone: {
            type: String,
            required: true,
        },
    
    height: {
            type: String,
            required: true
        },
    weight: {
            type: String,
            required: true,
        },
    
})

module.exports = mongoose.model('Form',FormSchema)