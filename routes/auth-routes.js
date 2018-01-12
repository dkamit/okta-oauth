const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with okta
router.get('/okta', passport.authenticate('okta', {
    scope: ['profile','openid','email']
}));

// callback route for okta to redirect to
// hand control to passport to use code to grab profile info
router.get('/okta/callback', passport.authenticate('okta'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
