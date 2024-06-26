const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport=>{
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    User.findOne({where:{id:jwt_payload.id}})
    .then(user=>{
        if(user){
            return done(null,user);
        }
        return done(null,false); 
    }
    )
    }));

}