const express = require('express') 
const router = express.Router()
const {getUser,postUser,updateUser,destroyUser, getUserId} = require('../controller/userController')

router.get('/getUser',getUser)
router.get('/getUserId/:id',getUserId)
router.post('/postUser/',postUser)
router.put('/putUser/:id',updateUser)
router.delete('/deleteUser/:id',destroyUser)


module.exports = router