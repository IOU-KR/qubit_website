const resultService = require('../services/resultService');

exports.getResult = (req, res) => {
    try {
        if (!req.body) throw new Error('body가 없습니다.');
        const application = resultService.result(req.body);
        const formWithoutPasswords = application.form.toSavedJSON();
        delete formWithoutPasswords.passwordSalt;
        delete formWithoutPasswords.hashedPassword;

        res.status(201).json({
            ok: true,
            form: formWithoutPasswords,
            result: application.result,
            created: application.created,
            editedCount: application.editedCount,
            result_message: application.result_message
        });
    } catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
};
