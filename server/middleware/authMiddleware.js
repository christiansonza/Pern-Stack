const jwt =  require('jsonwebtoken')
const userModel = require('../Models/userModel')


const Authmiddleware = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message:'no token | unauthorized'})

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')
    if(!user) return res.status(401).json({message:'no user found | unauthorized'})

    req.user = user
    next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:'expired token | unauthorized'})
    }
}

module.exports = Authmiddleware