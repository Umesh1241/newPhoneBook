const mongoose = require('mongoose');

const PhoneSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
       type: Number,
       required: true,
       unique: true
    }
})

module.exports=mongoose.model('PhoneSchema', PhoneSchema);