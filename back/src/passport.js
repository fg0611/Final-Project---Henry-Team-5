const server = require("express").Router();
const { User } = require("./db.js");
const jwt = require("jsonwebtoken")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const BearerStrategy = require("passport-http-bearer").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { SECRET_JWT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, USE_PORT } = process.env;

/// ESTRATEGIA GOOGLE ///
passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/login/google/callback',
    session: false
  },
    async function (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, profile, done) {
      try {
        console.log(profile);
        const user = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile._json.email,
          isAdmin: false
          // aca habria que traer tambien la imagen de perfil
        }
        const foundUser = await User.findOne({ where: { email: user.email } })
        if (foundUser) {
          const updatedUser = await foundUser.update(user);
          done(null, updatedUser)
        }
        else {
          const createdUser = await User.create(user)
          done(null, createdUser)
        }
      } catch (err) {
        done(err, null)
      }
    }));


/// ESTRATEGIA LOCAL ///
passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password", session: false },
  async (email, password, done) => {
    const user = await User.findOne({ where: { email } })
    if (!user) { return done(null, false) }
    if (!user.verifyPassword(password)) { return done(null, false) }
    return done(null, user);
  })
)

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET_JWT, (err, user) => {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
