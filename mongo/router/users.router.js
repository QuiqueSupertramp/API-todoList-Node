const express = require('express')
const router = express.Router()

// Import Folder model and CRUD functions
const Folders = require('../models/Folder')
const {getUsers, addUser, getUserById} = require('../controllers/users.controllers')

// Folders Endpoints-----------------------------------
router.post('/', addUser)
router.get('/', getUsers)
router.get('/:id', getUserById)

module.exports = router;
