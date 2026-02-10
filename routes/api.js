const express = require('express');
const router = express.Router();

const applyController = require('../controllers/applyController');
const resultController = require('../controllers/resultController');
const deadlineController = require('../controllers/deadlineController');

router.post('/apply', applyController.apply);
router.post('/result', resultController.getResult);

router.get('/deadline', deadlineController.getDeadline);

module.exports = router;