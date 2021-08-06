const mongoose = require('mongoose');
//plugin pour notre schema
const uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email)
};

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, validate: [validateEmail, 'Invalide '], 
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'invalide']},
    password: {type: String, required: true }
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
