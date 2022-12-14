const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchusers = require('../middleware/fetchuser');
var jwt_secret=('firstcheckyourkeydude');

//Route:1 to create user in database by "post method" "/api/auth/createuser". no login required
router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email', 'Enter A Valid  Email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=> {
    let success = false;
    const errors = validationResult(req);
    //if any errors are encountered return bed request error    
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    
    // check whether user with this  email  exists  already in database
    try {
        
        let user =await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({success,errors:"sorry a user with this email already exists"})
        }  
        const solt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,solt) 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })
        var data={
            user:{
                 id:user.id,
            }
        }
        var token = jwt.sign(data,jwt_secret);
        success=true;
        res.json({success,token});
} 
catch (error) {
console.log(error.message);
res.status(500).send({success,error:'some error has occurred'});
}
    // .then(user => res.json(user))
    //     .catch(err => console.log(err))
});

//Route:2 to login user in database by "post method" "/api/auth/login". no login required

router.post('/login', [
    body('email', 'Enter A Valid  Email').isEmail(),
    body('password','Password can not be Blank').exists(),
    
], async (req, res)=> {
    let success = false;
    const errors = validationResult(req);
    //if any errors are encountered return bed request error    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        const user =await User.findOne({email})
        if(!user){
            success=false;
            return res.status(404).json({success,error:"Please Try With Correct Credentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false;
            return res.status(404).json({success,error:"Please Try With Correct Credentials"})
        }
        var data={
            user:{
                id:user.id,
            }
        }
        var token = jwt.sign(data,jwt_secret);
        success=true;
        res.json({success,token});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error has occurred');
    }
})
//Route:3 get loggedin user Details by "post method" "/api/auth/getuser". login required

router.post('/getuser',fetchusers,async (req, res)=> {
    try {
     userId=req.user.id;
     const user=await User.findById(userId).select('-password'); 
     res.send(user);  
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error has occurred');
    }
})


module.exports = router;