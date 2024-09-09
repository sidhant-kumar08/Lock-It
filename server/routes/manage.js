import express from 'express'
import { addPassword, getPasswords, deletePassword, updatePassword } from '../controllers/manage.js'

const router = express.Router()


router.get('/', getPasswords)
router.post('/add', addPassword)
router.post('/delete/:id', deletePassword)
router.put('/update/:id', updatePassword)


export default router