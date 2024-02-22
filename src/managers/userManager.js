const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt')

const PRIVATE_KEY = '126de7eb-5b12-485b-b19d-d39a15fds94n';

exports.login = async (username, password) => {
    const user = await User.findOne({username});

    if(!user) {
        throw new Error ('Username or password is wrong!')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error ('Username or password is wrong!')
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, PRIVATE_KEY, {expiresIn: '2d'});

    return token;
};

exports.register = async (userData) => {
    const user = await User.findOne({username: userData.username});

    if(user) {
        throw new Error('This username already exists!')
    }

    return User.create(userData);
}

exports.logout = () => {

};