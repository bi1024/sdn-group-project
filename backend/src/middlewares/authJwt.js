import jwt from 'jsonwebtoken';
import { secretKey } from '../config/authConfig.js';

function verifyToken(req, res, next) {
    const token = req.cookies.auth;
    if(!token) {
        return res.status(401).json({errors: 'Unauthenticated: No token provided!'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({errors: 'Unauthenticated: Token is invalid!'});
        }

        req.userID = decoded.userID;
        next();
    })
}

export { verifyToken };