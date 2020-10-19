const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    username: { 
        type: String,
        required : true
    },
    email: { 
        type: String,
        index: true,
        unique : true,
        required : true
    },
    password: { 
        type: String,
        required : true
    },
    confirmPassword: { 
        type: String,
        required : true
    }
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}
schema.statics.hashConfirmPassword = function hashConfirmPassword(confirmPassword){
    return bcrypt.hashSync(confirmPassword,10);
}

schema.methods.compare = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

const Users = mongoose.model('Users',schema);
module.exports = Users;
