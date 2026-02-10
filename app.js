const express = require('express');
const config = require('./config');
const geoIpResolver = require('./utils/geoIpResolver');

const pagesRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();

app.set('trust proxy', true);

app.use(express.json());

// GEO blocking middleware
app.use((req, res, next) => {
    if (!config.ENABLE_GEO_BLOCKING) return next();

    const ip = req.ip;
    const country = geoIpResolver.getCountryCodeFromIp(ip);

    if (country !== config.ALLOWED_COUNTRY) {
        console.warn(`[GEO_BLOCK] ip=${ip} country=${country ?? 'UNKNOWN'}`);
        return req.socket.destroy();
    }

    next();
});

app.use('/', pagesRoutes);
app.use('/api', apiRoutes);

module.exports = app;
