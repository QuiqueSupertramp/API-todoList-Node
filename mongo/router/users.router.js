const express = require('express')
const router = express.Router()

// Import Folder model and CRUD functions
const Folders = require('../models/Folder')
const {getUsers, addUser, getUserById, getUserByMail} = require('../controllers/users.controllers')

// Folders Endpoints-----------------------------------
router.post('/', addUser)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/checkuser', getUserByMail)

module.exports = router;
