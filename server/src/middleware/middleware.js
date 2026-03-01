const jwt = require('jsonwebtoken');
function authenticate(req,res,next){
    try{
        const token = req.cookies?.access_token || (req.headers.authorization || '').replace('Bearer ', '');
        if(!token) return res.status(401).json({ error: 'No token'});

        const JWT_SECRET = process.env.JWT_SECRET;

        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    }catch(err){
        return res.status(401).json({error: 'Wrong JWT'});
    }
}

module.exports = authenticate;