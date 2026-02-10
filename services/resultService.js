const repo = require('../repositories/applicationRepository');
const Application = require('../utils/application');
const ApplicationResult = require('../utils/applicationResult');
const { isResultPublished } = require('./deadlineService');
/**@typedef {{realName: string, idNumber: string, plainPassword: string}} ResultRequest */
/**@typedef {{form: Application, result: ApplicationResult, created: Date, editedCount: number, result_message: string}} SavedApplication */

/**
 * @param {ResultRequest} resultRequest
 * @returns {SavedApplication} application
 */
function result(resultRequest) {

    const parsedForm = Application.Create.fromClientJSON({realName: resultRequest.realName, idNumber: resultRequest.idNumber, plainPassword: resultRequest.plainPassword, career: '', other: '', reason: '', skills: ''}); // throws

    const applications = repo.loadAll();

    const sameApplicationIndex = applications.findIndex(({ form }) => form.idNumber === parsedForm.idNumber && form.realName === parsedForm.realName && form.verifyPassword(resultRequest.plainPassword));

    if (sameApplicationIndex === -1){
        console.log(`[RESULT] ${parsedForm.realName}:${parsedForm.idNumber} couldn't find their result.`);
        throw new Error('신청서가 없습니다. 이름, 학반번호, 비밀번호를 확인하세요.');
    }
    console.log(`[RESULT] ${parsedForm.realName}:${parsedForm.idNumber} found their result.`);

    const out = applications[sameApplicationIndex];
    if (!isResultPublished()) {
        out.result = ApplicationResult.PENDING;
        out.result_message = '';
    }

    return out;
}

module.exports = { result };