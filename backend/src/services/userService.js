import bcryptjs from "bcryptjs";
import User from "../models/userSchema.js";

async function createUser(userData) {
    const { username, email, password, fullname, birthday, avatarUrl } = userData;

    try {
        await User.create({
            username,
            email,
            hashedPassword: bcryptjs.hashSync(password, 8),
            fullname,
            birthday,
            avatarUrl
        });

        return Promise.resolve({message: 'Đăng ký thành công'});

    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

async function getUserFromUsername(username) {
    try {
        const user = await User.findOne({
            username: username
        })
        return Promise.resolve(user);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

async function getUserFromEmail(email) {
    try {
        const user = await User.findOne({
            email: email
        });
        return Promise.resolve(user);
    } catch(err) {
        return Promise.reject({errors: err.message});
    }
}

export { getUserFromUsername, getUserFromEmail, createUser };

