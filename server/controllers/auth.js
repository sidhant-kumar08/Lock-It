import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

const Token = mongoose.model('Token', new mongoose.Schema({ token: String }));



export const registerUser =  async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if(existingUser){
           return res.status(400).json({ message: 'user already exists'})
        }
    
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            fullName,
            username,
            email,
            password : hashedPassword
        })
    
        await newUser.save()
        
    
        res.status(201).json({ message: 'user created successfully'});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error'})
    }


}

export const loginUser = async (req,res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if(!user){
           return res.status(400).json({ message: 'user does not exist' })
        }

        

        const isSame = await bcrypt.compare(password, user.password)

        if(!isSame){
           return res.status(400).json({ message: 'invalid credentials' });
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token)
        res.status(200).json({ message: 'login successfully'})

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error'})
    }
}

export const logoutUser = async (req,res) => {
    res.cookie('token', '')
    return res.status(200).json({ message: 'logged out succesfully'})
}