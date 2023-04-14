const JwtStrategy = require("passport-jwt").Strategy; // used to check things inside JWT
const ExtractJwt = require("passport-jwt").ExtractJwt; // used to extract things out of token

// getting setting
const key = process.env.SECRET_KEY;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //tells the strategy to extract the JWT
//  from the Authorization header's Bearer token.

opts.secretOrKey = key;

const user_db = {
  user: [
    {
      id: 1,
      name: "Raj",
      username: "raj",
      password: "$2a$10$kYQvNEOWJmh6ERvIdCkfw.i.V/B/pUPn.al6crDwL4zWAUhu6wCna", // 123456
    },
  ],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const user = user_db.user;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};

// opts is used to how to extract jwt from the incoming req and verify it
