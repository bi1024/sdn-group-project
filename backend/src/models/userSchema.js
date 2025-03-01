import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is not valid']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be at least 3 characters'],
        maxLength: [64, 'Username is limited to 64 characters']
    },

    hashedPassword: {
        type: String,
        required: [true, 'Hashed Password is required'],
        maxLength: [72, 'Maximum bcrypt password is limited to 72 characters']
    },

    fullname: {
        type: String,
        required: false,
        maxLength: [64, 'Full name is limited to 64 characters'],
        default: '',
    },

    birthday: {
        type: Date,
        required: false,
        default: null,
    },

    avatarUrl: {
        type: String,
        required: false,
        default: '',
    }
}, 

{
    timestamps: true    
}

)

const User = mongoose.model('User', userSchema, 'User');
export default User;