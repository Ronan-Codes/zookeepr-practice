const path = require('path');
const router = require('express').Router();

// serve index.html from Express.js
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
})
// "/" root route of the server (homepage)

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// Wildecard Route - defaults to root route (must be last route)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;