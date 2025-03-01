import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { secretKey } from "../config/authConfig.js";

async function isCorrectPassword(user, inputPassword) {
    console.log(user);
    console.log(inputPassword);
    console.log(user.hashedPassword);
    try {
        const isCorrectPassword = bcryptjs.compareSync(
            inputPassword,
            user.hashedPassword,
        )
        console.log(isCorrectPassword);
        return Promise.resolve(isCorrectPassword);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }   
}

async function signJwt(user) {
    console.log('SignJWT!!!');
    console.log(user._id);
    console.log(secretKey);
    try {
        const token = jwt.sign(
            {userID: user._id},
            secretKey,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 1 day
            }
        )
        console.log('token: ' + token);
        return Promise.resolve(token);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

export { isCorrectPassword, signJwt }