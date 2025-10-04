import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}$/,'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
