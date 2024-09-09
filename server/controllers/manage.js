import PasswordModel from "../models/password-model.js";
import jwt from 'jsonwebtoken'


export const getPasswords = async (req,res) => {

    try {
    const userId = req.user.id;


    const passwords = await PasswordModel.find({ user: userId })

    res.status(200).json(passwords)
    
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
}

export const addPassword = async (req,res) => {
    const {title, username, password} = req.body;
    const token = req.cookies.token

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    const user = decodedToken.id


    if(!title || !username || !password ){
        return res.status(400).json({ message: 'all fields are required' })
    }

    try {

        const newPasswordEntry = new PasswordModel({
            user,
            title,
            username,
            password
        })

        await newPasswordEntry.save()

        return res.status(200).json({ message: 'new password added' })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'internal server error'})
    }
}

export const deletePassword = async (req,res) => {
      const {id} = req.params;

  const deletedPassword = await PasswordModel.findOneAndDelete({ _id: id })
  return res.status(200).json({message : 'deleted successfully'});
}

export const updatePassword = async (req,res) => {
    try {
        const { id } = req.params;
        const updatedPassword = await PasswordModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPassword);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update password' });
      }
}
  