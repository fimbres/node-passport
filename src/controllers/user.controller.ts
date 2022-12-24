import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import User, { IUser } from "../models/user";
import config from '../config';

const createToken = (user: IUser) => {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
        expiresIn: 86400
    });
}

export const signUp = async (request: Request, response: Response) : Promise<Response> => {
    if(!request.body.email || !request.body.password) {
        return response.status(400).json({message: 'You forgot to enter the password or the email'});
    }
    
    const user = await User.findOne({ email: request.body.email });

    if(user){
        return response.status(400).json({message: 'The user already exists'});
    }

    const newUser = new User(request.body);
    await newUser.save();

    return response.status(200).json(newUser);
}

export const logIn = async (request: Request, response: Response) => {
    console.log(request.body)
    if(!request.body.email || !request.body.password) {
        return response.status(400).json({message: 'You forgot to enter the password or the email'});
    }
    
    const user = await User.findOne({ email: request.body.email });
    if(!user){
        return response.status(400).json({message: 'The user does not exists'});
    }

    const isSamePassword = await user.comparePasswords(request.body.password);
    if(isSamePassword){
        return response.status(200).json({ token: createToken(user) });
    }

    return response.status(400).json({message: 'The password does not match'})
}
