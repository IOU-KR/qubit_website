const path = require('path');
const { getRequestFingerprint } = require('../utils/requestIdentity');
const express = require('express');
const router = express.Router();

const viewsDir = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
    console.log(`[PAGES] ${getRequestFingerprint(req)} GET /`);
    res.sendFile(path.join(viewsDir, 'index.html'));
});

router.get('/branding', (req, res) => {
    console.log(`[PAGES] ${getRequestFingerprint(req)} GET /branding`);
    res.sendFile(path.join(viewsDir, 'branding.html'));
});

router.get('/apply', (req, res) => {
    console.log(`[PAGES] ${getRequestFingerprint(req)} GET /apply`);
    res.sendFile(path.join(viewsDir, 'apply.html'));
});

router.get('/intro', (req, res) => {
    console.log(`[PAGES] ${getRequestFingerprint(req)} GET /intro`);
    res.sendFile(path.join(viewsDir, 'intro.html'));
});


router.get('/results', (req, res) => {
    console.log(`[PAGES] ${getRequestFingerprint(req)} GET /results`);
    res.sendFile(path.join(viewsDir, 'results.html'));
});




router.get('/image/:file', (req, res) => {
    res.sendFile(path.join(viewsDir, 'image', req.params.file));
});

router.get('/styles/:file', (req, res) => {
    res.sendFile(path.join(viewsDir, 'styles', req.params.file));
});

router.get('/scripts/:file', (req, res) => {
    res.sendFile(path.join(viewsDir, 'scripts', req.params.file));
});


router.get('/robots.txt', (req, res) => {
    console.log(`[ROBOTS] ${req.ip}`);
    res.sendFile(path.join(viewsDir, 'robots.txt'));
});

module.exports = router;