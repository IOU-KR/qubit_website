const fs = require('fs');
const path = require('path');
const Application = require('../utils/application');

/**@typedef {string} ApplicationResult */
/**@typedef {{form: Application, result: ApplicationResult, created: Date, editedCount: number, result_message: string}} SavedApplication */

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'applications.json');

function ensureDataFile() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]'); // JSON.stringify([], null, 2)
}

/**
 * @returns {[SavedApplication]} applications
 */
function loadAll() {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8')).map(data => {
        data.form = Application.Create.fromSavedJSON(data.form);
        data.created = new Date(data.created);
        return data;
    });
}

/**
 * @param {[SavedApplication]} applications
 */
function saveAll(applications) {
    fs.writeFileSync(dataFile, JSON.stringify(applications.map(data => {
        data.form = data.form.toSavedJSON();
        data.created = data.created.toISOString();
        return data;
    }), null, 2));
}

module.exports = { loadAll, saveAll };
