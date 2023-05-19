const { Router } =  require('express');
const { getItems, getItemById } = require('../controllers/itemDetailsControllers');

const router = Router();

router.get("/getItems", getItems);
router.get("/getItemById/:id", getItemById);

module.exports = router;