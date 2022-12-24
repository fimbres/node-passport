import { model, Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

export interface IUser extends Document {
    email: string;
    password: string;
    comparePasswords: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: false,
        required: true,
        lowercase: false,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);    
    user.password = hash;

    next();
});

userSchema.methods.comparePasswords = async function (password: string): Promise<Boolean> {
    const user = this;

    return await bcrypt.compare(password, user.password);
}

export default model<IUser>('User', userSchema);
