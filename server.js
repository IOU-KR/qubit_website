const fs = require('fs');
const https = require('https');
const app = require('./app');
const config = require('./config');

function startServer() {
    if (config.USE_HTTPS) {
        const httpsOptions = {
            key: fs.readFileSync(config.HTTPS_KEY_PATH),
            cert: fs.readFileSync(config.HTTPS_CERT_PATH),
        };

        https.createServer(httpsOptions, app)
            .listen(config.HTTPS_PORT, () => {
                console.log(`[INIT] HTTPS listening on ${config.HTTPS_PORT}`);
            });
    } else {
        if (process.env.NODE_ENV === 'production') {
            console.warn('[SECURITY] WARNING! HTTPS is disabled in production.');
        } else {
            console.info('[INIT] HTTPS is disabled (development).');
        }

        app.listen(config.HTTP_PORT, () => {
            console.log(`[INIT] HTTP listening on ${config.HTTP_PORT}`);
        });
    }
}

module.exports = { startServer };
