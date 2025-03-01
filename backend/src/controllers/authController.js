import { createUser, getUserFromEmail, getUserFromUsername } from "../services/userService.js";
import { isCorrectPassword, signJwt } from "../services/authService.js";

async function signup(req, res) {
    const userData = req.body;
    console.log(userData);

    try {
        const response = await createUser(userData);
        res.json(response);
    } catch(err) {
        res.status(500).json(err);
    }
}

async function signin(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    // const inputEmail = req.body.email;
    // const inputPassword = req.body.password;
    console.log('here');
    try {
        const user = await getUserFromEmail(email);
        if(!user) {
            return res.status(404).json({errors: 'Email không đúng!'});
        }

        const isCorrectPass = await isCorrectPassword(user, password);
        if(!isCorrectPass) {
            return res.status(401).json({
                accessToken: null,
                errors: 'Password không đúng!'
            })
        }

        const token = await signJwt(user);
        console.log(token);
        res.cookie('auth', token, { httpOnly: true });

        res.status(200).send({
            userID: user._id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } catch(err) {
        res.status(500).json(err);
    }
}

function logout(req, res) {
    res.clearCookie('auth');
    res.json('Logged out successfully!');
}

export { signup, signin, logout };