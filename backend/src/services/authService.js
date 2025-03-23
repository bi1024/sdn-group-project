import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { secretKey } from "../config/authConfig.js";

async function isCorrectPassword(user, inputPassword) {
    try {
        const isCorrectPassword = bcryptjs.compareSync(
            inputPassword,
            user.hashedPassword,
        )
        return Promise.resolve(isCorrectPassword);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }   
}

async function signJwt(user) {
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
        return Promise.resolve(token);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

export { isCorrectPassword, signJwt }