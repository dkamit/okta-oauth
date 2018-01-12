const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    console.log(JSON.stringify(req.user, null, 2));
    res.render('profile', { user: req.user });
});

module.exports = router;
