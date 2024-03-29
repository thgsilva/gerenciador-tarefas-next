import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

        name: {type: String, required: true},
        pass: {type: String, required: true},
        email: {type: String, required: true}
});

export const UserModel = (mongoose.models.users 
    || mongoose.model('users', UserSchema));

