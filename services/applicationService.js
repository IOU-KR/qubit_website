const repo = require('../repositories/applicationRepository');
const Application = require('../utils/application');
const ApplicationResult = require('../utils/applicationResult');
const { isClosed } = require('./deadlineService');
/**@typedef {{realName: string, idNumber: string, career: string, reason: string, skills: string, other: string, plainPassword: string}} ClientJSON */

/**
 * @param {ClientJSON} raw
 * @returns {string} success message
 */
function submit(raw) {
    if (isClosed()) throw new Error('입부 신청이 마감되었습니다.');
    
    const parsedForm = Application.Create.fromClientJSON(raw); // throws
    
    const applications = repo.loadAll();

    const sameApplicationIndex = applications.findIndex(({ form }) => form.idNumber === parsedForm.idNumber && form.realName === parsedForm.realName && form.verifyPassword(raw.plainPassword));

    if (sameApplicationIndex === -1) { // needs to add a new application.
        applications.push({
            form: parsedForm,
            result: ApplicationResult.PENDING,
            editedCount: 0,
            created: new Date(),
            result_message: '',
        });

        repo.saveAll(applications);
        console.log(`[APPLICATION] ${parsedForm.realName}:${parsedForm.idNumber} is added.`);
        return '신청서가 추가되었습니다.';
    }
    // idNumber, realName, plainPassword is all same, so can be edited.
    
    applications[sameApplicationIndex].form = parsedForm;
    applications[sameApplicationIndex].editedCount++;
    repo.saveAll(applications);
    console.log(`[APPLICATION] ${parsedForm.realName}:${parsedForm.idNumber} is edited. (${applications[sameApplicationIndex].editedCount})`);
    return '신청서가 수정되었습니다.';
}

module.exports = { submit };