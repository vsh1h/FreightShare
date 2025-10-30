const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

function protect(req, res, next) {
    const authHeader=req.headers['authorization']
    if (!authHeader || authHeader.length<7){
        return res.status(401).json({"message": "Access Denied: No token provided"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,JWT_SECRET,function(err,decoded){
        if (err){
            return res.status(403).json({"message": "Access Denied: Invalid or expired token"})
        }
        req.user=decoded // {email}
        next()
    })
}
function authorizeRoles(...roles){
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)){
            return res.status(403).json({ message: "Forbidden: Access denied" })
        }
        next()
    }
}

module.exports = { protect, authorizeRoles };