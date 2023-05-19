const { Router } = require('express');
const router = Router();

const { userSignup, userSignin, userData, updateUser, getUser, deleteUserById } = require('../controllers/UserControllers');

router.post('/Signup', userSignup);
router.post('/Signin', userSignin);
router.post('/MyProfile', userData);
router.put('/updateUser/:id', updateUser);
router.get('/getUser/:id', getUser)
router.delete('/deleteUserById/:id', deleteUserById)

module.exports = router;