const express = require('express')
const router = express.Router()

// Import Folder model and CRUD functions
const Folders = require('../models/Folder')
const {getAllFolders, getFolderById, addNewFolder, deleteFolder, updateFolder} = require('../controllers/folders.controllers')

// Folders Endpoints-----------------------------------
router.post('/', addNewFolder)
router.get('/', getAllFolders)
router.get('/:id', getFolderById)
router.put('/:id', updateFolder)
router.delete('/:id', deleteFolder)

module.exports = router;
