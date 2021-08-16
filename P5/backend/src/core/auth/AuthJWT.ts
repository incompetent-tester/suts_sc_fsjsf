import * as passportJWT from 'passport-jwt';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'ultra_secret_secret_key'

const jwtOptions : passportJWT.StrategyOptions = {
    jwtFromRequest : passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRET_KEY
}

export const strategyJWT = new passportJWT.Strategy(jwtOptions, async (jwtPayload, next) => {
    if(jwtPayload.token == "this_is_your_token"){
        var authUser = {
            name: 'Admin',
            profileImage: ''
        }

        next(null,authUser)
    }else{
        next(null,false)
    }
})

export const generateJWT = () => {
    const payload = { token : "this_is_your_token" };
    const jwtToken = jwt.sign(payload, SECRET_KEY);

    return jwtToken
}