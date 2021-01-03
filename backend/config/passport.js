const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

const { getDefaultPreferences } = require('../utils/auth');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user with given profile ID already exists in DB
      const currentUser = await User.findOne({ googleId: profile.id });

      if (currentUser) {
        console.log('found user!');
        done(null, currentUser);
      } else {
        // create new user if user with given profile ID is not stored in DB
        const newUser = await User.create({
          googleId: profile.id,
          givenName: profile._json.given_name,
          familyName: profile._json.family_name,
          email: profile._json.email,
          profileImage: profile._json.picture,
          preferences: getDefaultPreferences(),
        });
        console.log('created new user!');
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
