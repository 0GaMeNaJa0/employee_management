
const userService = require('../users/service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../auth/repository');

async function login({email,password}){
    const user = await userService.getUserByEmail(email);
    if(!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error('Invalid credentials');

    const accessSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_SECRET;
    
    const accessToken = jwt.sign({ sub: user.id, email: user.email }, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id}, refreshSecret, { expiresIn: '7d' });
    
    const userId = user.userId;
    await authRepository.saveRefreshToken(refreshToken,userId);
    return {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email, name: user.name }
    }
}

async function refresh(oldRefreshToken){
    let payload;
    try{
        payload = jwt.verify(token, REFRESH_SECRET);
    }catch(err){
        throw new Error('Invalid refresh token');
    }
    
    const stored = await authRepository.findToken(oldRefreshToken);
    if(!stored) throw new Error('Refresh token not found or revoked');

    await authRepository.deleteToken(payload.sub);
    const newRefreshToken = jwt.sign({ sub: payload.sub }, REFRESH_SECRET, { expiresIn: '7d' });
    await authRepository.saveRefreshToken(newRefreshToken, payload.sub);

    const newAccessToken = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: '15m' });

    return {
        accessToken : newAccessToken,
        refreshToken : newRefreshToken
    }
}

async function logout(userId){

    if(userId) await authRepository.deleteToken(userId);
}

module.exports = {login,refresh,logout};