const authService = require('../auth/service');

function cookieOptions({httpOnly = true, maxAge = 0} = {}){
    return {
        httpOnly,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge
    };
}

const ACCESS_TOKEN_MAX_AGE = 15*60*1000;
const REFRESH_TOKEN_MAX_AGE = 7*24*60*60*1000;

async function login(req,res){
    try{
        const {email,password} = req.body;
        const {accessToken, refreshToken} = await authService.login({email, password});
        res.cookie('access_token',accessToken,cookieOptions({maxAge: ACCESS_TOKEN_MAX_AGE}));
        res.cookie('refresh_token',refreshToken,cookieOptions({maxAge: REFRESH_TOKEN_MAX_AGE}));

        return res.json({ message: "Login Success", accessToken,refreshToken }).status(200);
    }catch(err){
        return res.status(401).json({error: err.message});
    }
}
async function refresh(req,res){
    try{
        const oldRefreshToken = req.cookies?.refresh_token;
        
        if(!oldRefreshToken) return res.status(401).json({error: 'No refresh token'});

        const { accessToken, refreshToken } = await authService.refresh(oldRefreshToken);

        res.cookie('access_token',accessToken,cookieOptions({maxAge: ACCESS_TOKEN_MAX_AGE}));
        res.cookie('refresh_token',refreshToken,cookieOptions({maxAge: REFRESH_TOKEN_MAX_AGE}));

        return res.json({ message: "Refresh Success", accessToken,refreshToken});
    }catch(err){
        return res.status(401).json({error: err.message});
    }
}

async function logout(req, res) {
  try {
    const userId = req.body.userId;
    await authService.logout(userId);
    
    // clear cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  login,
  refresh,
  logout
};