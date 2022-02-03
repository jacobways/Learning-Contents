const { User } = require("../models/User");

let auth = (req, res, next) => {  // 인증처리

    // 클라이언트 쿠키에서 토큰을 가져오기
    let token = req.cookies.x_auth;

    // 복호화 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;

        // 유저가 없어 인증 실패
        if(!user) return res.json({isAuth:false, error:true});

        // 유저가 있는 경우
        req.token = token;   // 이 미들웨어세 다음으로 넘어갈 때, req에서 사용할 수 있도록 넣어주기
        req.user = user;
        next();
    })
}

module.exports = { auth };