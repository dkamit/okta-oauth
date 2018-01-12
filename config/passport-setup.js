const passport = require('passport');
const OktaStrategy = require("passport-okta-oauth").Strategy;
const keys = require('./keys');

const db = {};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, db[id]);
});

passport.use(
    new OktaStrategy({
        audience: keys.okta.audience,
        clientID: keys.okta.clientID,
        clientSecret: keys.okta.clientSecret,
        callbackURL: "http://localhost:3000/auth/okta/callback",
        scope: ["openid", "email", "profile"],
        response_type: 'code'
    }, (accessToken, refreshToken, profile, done) => {
        db[profile.id] = profile;     
        done(null, profile)   
    })
);
