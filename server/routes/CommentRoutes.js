const {Router} = require('express');
const { getComments, saveComment, deleteComment, updateComment } = require('../controllers/CommentController');
const router = Router();

router.get('/getComments', getComments);
router.post('/saveComment', saveComment);
router.delete('/deleteComment/:id', deleteComment);
router.put('/updateComment/:id', updateComment);


module.exports = router;