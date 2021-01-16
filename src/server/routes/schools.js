const router = require('express').Router();
module.exports = router;

// root route is /api/schools

router.get('/', async(req, res, next) => {
    res.send('/api/schools route');
});