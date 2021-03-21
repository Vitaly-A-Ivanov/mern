const {Router} = require('express') // get router from express
const bcrypt = require('bcrypt')  // hash the password and compare if required
const config = require('config') // const config entries
const {check, validationResult} = require('express-validator') // validate user details
const jwt = require('jsonwebtoken')
const User = require('../models/User') // get user model
const router = Router() // create router

// /api/auth/register
router.post('/register',
    //validation rules
    [
        check('email', 'Wrong email').isEmail(), // must be email
        check('password', 'Minimum password is 6 digits').isLength({min: 6}) // min 6 digits
    ],

    async (req, res)=> {
    try {

        const errors = validationResult(req) // get errors

        // if errors exists send them to the front-end
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration details'
            })
        }

        const{email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({message: 'This user already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password:hashedPassword})

        await user.save()

        res.status(201).json({message: 'User created'})

    } catch(e) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
})

// /api/auth/login
router.post('/login',
    // validation rules
    [
        check('email', 'Enter your email').normalizeEmail().isEmail(),
        check('password', 'Enter your password').exists()
    ],
    async (req, res)=> {
    try {
        const errors = validationResult(req) // get errors

        // if errors exists send them to the front-end
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login details'
            })
        }
        // check if user email exists in a database
        const {email, password} = req.body
        const user = await  User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }

        // check if password is match
        const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password, try again'})
            }

        const token = jwt.sign(
            {userId: user.id}, // data to be inside a token
            config.get('jwtSecret'), // get secret key  from config
            {expiresIn: '1h'} // token lifespan
        );

        res.json({ token, userId: user.id }) // respond to the user



    } catch(e) {
        res.status(500).json({message: 'Something went wrong, try again!'})
    }
})

// export router
module.exports = router