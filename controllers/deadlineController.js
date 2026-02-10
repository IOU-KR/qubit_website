const deadlineService = require('../services/deadlineService');

exports.getDeadline = (req, res) => {
    res.status(201).json({ deadline: deadlineService.deadline.toISOString(), result: deadlineService.result_date.toISOString() });
};
