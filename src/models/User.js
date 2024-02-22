const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter valid password!'],
    },
    email: {
        type: String,
        required: [true, 'E-mail is required!'],
    }
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Passwords dont match!')
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;