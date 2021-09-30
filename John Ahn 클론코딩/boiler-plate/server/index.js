const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}));  // 정보 분석해서 가져오게 해줌
app.use(bodyParser.json()); 
app.use(cookieParser());

// mongoDB의 데이터베이스와 연결하기
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB connected...'))
  .catch(err=>console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {
  // 클라이언트에서 회원가입 정보를 가져오면, 데이터베이스에 넣어줌
  const user = new User(req.body)

  user.save((err, userInfo) => {  // MongoDB 기능으로 DB에 정보를 저장함
    if(err) return res.json( {success: false, err})  // json 형식 에러 전달
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/login', (req, res) => {

  // 요청된 email이 DB에 있는지 확인
  User.findOne({email: req.body.email}, (err, user) => {  // findOne은 mongoDB 메소드
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "찾고자 하는 유저가 없습니다."
      })
    }

    // 있다면 비밀번호 일치 확인 : user모델에서 만든 메소드 사용
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다."})

      // 맞다면 토큰 생성 : user 모델에서 만든 메소드 사용
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰을 쿠키에 저장하기
        res.cookie("x_auth", user.token)  // x_auth라는 쿠키에 토큰이 들어감
        .status(200)
        .json({ loginSuccess: true, userId:user._id})
      })
    })
  })
})

app.get('/api/hello', (req,res) => {
  res.send('안녕하세요')
})

app.get('/api/users/auth', auth, (req,res) => {
  // 페이지 이동 때마다 로그인 상태 및 관리자 유저인지 체트
  // auth 미들웨어를 통과해야지(true) 여기까지 올 수 있음. 안 그러면(false) 중간에 이탈
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,    // role 0이면 일반유저
    isAuth: true,
    email : req.user.email,
    name : req.user.name,
    lastname: req.user.lastname,
    role : req.user.role,
    image : req.user.iamge
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  // DB의 토큰을 삭제하면 인증이 안되서 로그아웃 됨
  User.findOneAndUpdate({_id:req.user._id}, 
    {token:""},
    (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})