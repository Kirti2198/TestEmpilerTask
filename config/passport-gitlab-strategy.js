const passport = require('passport');
var GitlabStrategy = require('passport-gitlab').Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new GitlabStrategy({
  clientID: 'c1929f062dc0e7b399a30ca84901bcb6df73befda84547e88488734c022640bc',
  clientSecret: 'a1a1c52ed8e0b14f0a78209753045bb9f96afd5f297034319845482dd868ab41',
  gitlabURL : "https://gitlab.com/",
  callbackURL: "http://localhost:8000/users/auth/gitlab/callback"
},
function (accessToken, refreshToken, profile, done) {
  // find a user
  User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
    if (err) { console.log('error in gitlab strategy-passport', err); return; }
    console.log(accessToken, refreshToken);
    console.log(profile);

    if (user) {
      // if found, set this user as req.user
      return done(null, user);
    } else {
      // if not found, create the user and set it as req.user
      User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      }, function (err, user) {
        if (err) { console.log('error in creating user gitlab strategy-passport', err); return; }

        return done(null, user);
      });
    }

  });
}
));