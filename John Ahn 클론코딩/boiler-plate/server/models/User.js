const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10; //salt의 자리 수
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,    //공백제거
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{       // 토큰 유효기간
        type: Number
    }
})

// 몽구스 메소드로서 index.js에서 유저 정보 저장하기 전에 비밀번호 암호화 시켜주기
userSchema.pre('save', function(next){

    var user = this;  // 위에서 생성한 userSchema 객체

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);    // index.js의 user.save 로 이동함
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash   // 유저 패스워드를 헤시로 변경
                next()    // index.js의 user.save 로 이동함
            })
        })
    } else {
        next() // 비밀번호를 만들거나 변경하는 경우가 아닌 경우에는 그냥 user.save로 이동
    }   
});

// 유저가 입력한 plainPassword와 DB의 암호화된 password가 같은지 체크하는 메소드
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {  //jwt 토큰 생성하기
    
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;     // user에 토큰 저장
    user.save(function(err,user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰 해독하기
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾고, 클라이언트에서 받은 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);  // 스키마를 모델로 감싸주기

module.exports = { User }