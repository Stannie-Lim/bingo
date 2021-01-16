const router = require('express').Router();
module.exports = router;

// root route is '/api'

router.get('/', async(req, res, next) => {
    res.send('/api route');
}); 

router.use('/schools', require('./routes/schools'));