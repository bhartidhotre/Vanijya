
const mongoose = require('mongoose');

const AuthorizedPRNSchema = new mongoose.Schema({
    prn:{type:String, required:true, unique:true },
    name:String,
    createdAt: {type:Date, default: Date.now} 
});

module.exports = mongoose.model('AuthorizedPRN', AuthorizedPRNSchema);