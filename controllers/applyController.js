const applicationService = require('../services/applicationService');

exports.apply = (req, res) => {
    try {
        if (!req.body) throw new Error('body가 없습니다.');
        const message = applicationService.submit(req.body);
        res.status(201).json({ ok: true, message });
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
};
