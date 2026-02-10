function parseBoolean(string, defaultBoolean){
    return string === 'true'? true : string === 'false'? false : defaultBoolean;
}

const USE_HTTPS = parseBoolean(process.env.USE_HTTPS, true);
const HTTP_PORT = parseInt(process.env.HTTP_PORT ?? 80);
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT ?? 443);

const ENABLE_GEO_BLOCKING = parseBoolean(process.env.ENABLE_GEO_BLOCKING, false);
const ALLOWED_COUNTRY = process.env.ALLOWED_COUNTRY ?? 'KR';

// WARNING:
// Do NOT change the pepper value unless you know EXACTLY what you are doing.
// Changing this will invalidate all existing password hashes.
const SECRET_PEPPER = process.env.SECRET_PEPPER;

if(SECRET_PEPPER.length<20) console.warn("[CONFIG] SECURITY WARNING! SECRET_PEPPER's length is less than 20!");

const HTTPS_KEY_PATH = process.env.HTTPS_KEY_PATH;
const HTTPS_CERT_PATH = process.env.HTTPS_CERT_PATH;


module.exports = {
    USE_HTTPS,
    HTTP_PORT,
    HTTPS_PORT,
    ENABLE_GEO_BLOCKING,
    ALLOWED_COUNTRY,
    SECRET_PEPPER,
    HTTPS_KEY_PATH,
    HTTPS_CERT_PATH
};