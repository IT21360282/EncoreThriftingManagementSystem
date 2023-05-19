const {Router} = require('express');
const { savePayment, getPayments, deletePayment } = require('../controllers/PaymentController');
const router = Router();

router.get('/getPayments', getPayments);
router.post('/savePayment', savePayment);
router.delete('/deletePayment/:id', deletePayment);

module.exports = router;