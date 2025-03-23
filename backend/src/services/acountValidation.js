import User from "../models/userSchema.js";

async function isExistedUsername(username) {
    try {
        let user = await User.findOne({username: username});
        return Promise.resolve(user !== null);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

async function isExistedEmail(email) {
    try {
        let user = await User.findOne({email: email});
        return Promise.resolve(user !== null);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

function isValidUsername(username) {
    return username && username.length >= 3 && username.length <= 64;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
}

function isValidPassword(password) {
    return password && password.length >= 6;
}

export {     
    isExistedUsername,
    isExistedEmail,
    isValidUsername,
    isValidEmail,
    isValidPassword,
};