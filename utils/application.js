const cryptoUtils = require('./cryptoUtils');

class Application {
    /**@typedef {{realName: string, idNumber: string, career: string, reason: string, skills: string, other: string, plainPassword: string}} ClientJSON */
    /**@typedef {{realName: string, idNumber: number, career: string, reason: string, skills: string, other: string, hashedPassword: string, passwordSalt: string, lastModified: string}} SavedJSON */


    /**
     * @param {string} realName 
     * @param {number} idNumber 
     * @param {string} career 
     * @param {string} reason 
     * @param {string} skills 
     * @param {string} other 
     * @param {string} hashedPassword 
     * @param {string} passwordSalt 
     * @param {Date} lastModified 
     */
    constructor(
        realName,
        idNumber,
        career,
        reason,
        skills,
        other,
        hashedPassword,
        passwordSalt,
        lastModified = new Date()
    ){
        this.realName = realName;
        this.idNumber = idNumber;
        this.career = career;
        this.reason = reason;
        this.skills = skills;
        this.other = other;
        this.hashedPassword = hashedPassword;
        this.passwordSalt = passwordSalt;
        this.lastModified = lastModified;
    }
    /**
     * @param {string} plainPassword
     * @returns {boolean}
     */
    verifyPassword(plainPassword){
        return cryptoUtils.hashPassword(plainPassword, this.passwordSalt) === this.hashedPassword;
    }
    /**
     * @returns {SavedJSON}
     */
    toSavedJSON() {
        return {
            realName: this.realName,
            idNumber: this.idNumber,
            career: this.career,
            reason: this.reason,
            skills: this.skills,
            other: this.other,
            hashedPassword: this.hashedPassword,
            passwordSalt: this.passwordSalt,
            lastModified: this.lastModified.toISOString(),
        };
    }
    static Create = class {
        /**
         * @param {SavedJSON} savedJSON 
         * @returns {Application}
         */
        static fromSavedJSON(savedJSON) {
            return new Application(savedJSON.realName, savedJSON.idNumber, savedJSON.career, savedJSON.reason, savedJSON.skills, savedJSON.other, savedJSON.hashedPassword, savedJSON.passwordSalt, new Date(savedJSON.lastModified));
        }
        /**
         * @param {ClientJSON} clientJSON 
         * @returns {Application}
         */
        static fromClientJSON(clientJSON) {
            if(typeof clientJSON.realName != 'string' || clientJSON.realName.length<2 || clientJSON.realName.length>20){
                throw new Error('실명이 올바르지 않습니다.');
            }
            if(typeof clientJSON.idNumber != 'string' || clientJSON.idNumber.length<4 || 5<clientJSON.idNumber.length || isNaN(clientJSON.idNumber)){
                throw new Error('학반번호가 올바르지 않습니다.');
            }
            let parsedIdNumber = parseInt(clientJSON.idNumber);
            if(parsedIdNumber < 0 || parsedIdNumber !== parseFloat(clientJSON.idNumber)){
                throw new Error('학반번호가 올바르지 않습니다.');
            }
            if(typeof clientJSON.plainPassword != 'string' || clientJSON.plainPassword.length<9){
                throw new Error('비밀번호는 최소 9글자여야 합니다.');
            }
            if(typeof clientJSON.career != 'string' || clientJSON.career.length>500){
                throw new Error('자기 진로와의 연관성이 너무 깁니다.');
            }
            if(typeof clientJSON.reason != 'string' || clientJSON.reason.length>500){
                throw new Error('이 동아리를 선택한 이유가 너무 깁니다.');
            }
            if(typeof clientJSON.skills != 'string' || clientJSON.skills.length>500){
                throw new Error('사용해본 언어 및 기타 기술이 너무 깁니다.');
            }
            if(typeof clientJSON.other != 'string' || clientJSON.other.length>500){
                throw new Error('그외 자기소개가 너무 깁니다.');
            }


            if(clientJSON.idNumber.length == 4) parsedIdNumber = parsedIdNumber % 1000 + ((parsedIdNumber / 1000) | 0) * 10000; // 1203 -> 10203

            const passwordSalt = cryptoUtils.generateSaltHex();
            return new Application(
                clientJSON.realName,
                parsedIdNumber,
                clientJSON.career,
                clientJSON.reason,
                clientJSON.skills,
                clientJSON.other,
                cryptoUtils.hashPassword(clientJSON.plainPassword, passwordSalt),
                passwordSalt
            );
        }
    };
}

module.exports = Application;