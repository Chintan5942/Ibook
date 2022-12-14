var jwt = require('jsonwebtoken');
var jwt_secret=('firstcheckyourkeydude');
const fetchusers = (req,res,next) =>{
    //get user information from jwttoken and add id to ther req object
    const token=req.header('auth-token');
    if (!token) {
        res.status(401).send({error: 'please authenticate with valid token'});
    }
    try {
        const data=jwt.verify(token,jwt_secret);
        req.user=data.user;
        next()
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}
module.exports = fetchusers;