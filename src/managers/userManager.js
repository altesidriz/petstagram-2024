const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.login = async (username, password) => {
    const user = await User.findOne({username});

    if(!user) {
        throw new Error ('Username or password is wrong!')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error ('Username or password is wrong!')
    }

    res.render('/');
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