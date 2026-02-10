const geoip = require('geoip-lite');


/**
 * Resolves the country code for the given IP address.
 *
 * @param {string} ip - IP address
 * @returns {string|null} ISO country code (e.g. 'KR'), or null if unknown
 */
function getCountryCodeFromIp(ip) {
    const geo = geoip.lookup(ip);
    if (!geo) return null;
    return geo.country;
}

module.exports = { getCountryCodeFromIp };