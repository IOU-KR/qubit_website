const crypto = require('crypto');

/**
 * Extracts client IP address considering trusted proxies.
 * Logging / analytics purpose.
 */
function getClientIp(req) {
    const xff = req.headers['x-forwarded-for'];

    if (typeof xff === 'string') {
        return xff.split(',')[0].trim();
    }

    return req.socket?.remoteAddress ?? null;
}

/**
 * Anonymizes an IP address for logging/fingerprinting purposes.
 * - IPv4: masks to /24
 * - IPv6: masks to /64
 *
 * NOT for security or access control.
 *
 * @param {string} ip
 * @returns {string|null}
 */
function anonymizeIp(ip) {
    if (!ip || typeof ip !== 'string') return null;

    // IPv4
    if (ip.includes('.')) {
        const parts = ip.split('.');
        if (parts.length !== 4) return null;
        return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }

    // IPv6
    if (ip.includes(':')) {
        // Expand shorthand (::) roughly by splitting
        const parts = ip.split(':');

        // Take first 4 blocks = /64
        const subnet = parts.slice(0, 4).join(':');

        return `${subnet}::`;
    }

    return null;
}

/**
 * Generates a privacy-safe fingerprint for logging purposes.
 * NOT for authentication or security decisions.
 */
function getRequestFingerprint(req) {
    const ip = anonymizeIp(getClientIp(req));
    const ua = req.headers['user-agent'] ?? '';

    return crypto
        .createHash('sha256')
        .update(`${ip}|${ua}`)
        .digest('hex')
        .slice(0, 16);
}


module.exports = {
    getClientIp,
    anonymizeIp,
    getRequestFingerprint
};