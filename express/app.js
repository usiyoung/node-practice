const express = require('express')
const morgan = require('morgan') // 요청과 응답을 기록하는 morgan
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')

app.set('port', process.env.PORT || 3000)

/**
 * 요청과 응답 중간에 위치하여 미들웨어
 * @param {} req 요청
 * @param {} res 응답 조작가능
 * @param {} next 다음 미들웨어로 넘어감
 *  */

/**
 * 미들웨어간 순서도 중요
 */
app.use(morgan('dev')) // app.use(morgan('combined')) 
app.use(cookieParser('usiyoung'))
app.use('/', express.static(__dirname, 'public')) // static 미들웨어는 해당 파일을 찾을 경우 next 실행이 되지 않는다
app.use(express.json()) // 클라이언트 json data 파싱
app.use(express.urlencoded({ extended: true })) // 클라이언트 form submit 파싱

app.use((req, res, next) => {
  console.log('미들웨어1 - 모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  console.log('미들웨어2 -모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  console.log('미들웨어3 -모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  try{
    console.log('미들웨어4 - 모든 요청에 실행하고 싶어요!')
    next()
  }catch(error){
    // next에 인수를 넣으면 다음 미들웨어로 넘어가지 않고 에러처리 미들웨어로 넘어감
    console.log(error)
    next(error)
  }
})

app.get('/', (req, res,next) => {
  console.log('get1 - ')
  res.send('hi')
  next('route')
},(req, res) => {
  console.log('위에 route있으면 실행 안된다던데..')
})

app.get('/', (req, res, next) => {
  console.log('get2 - ')
  next()
})

app.get('/', (req, res, next) => {
  // req.cookies
  // req.signedCookies
  res.cookie('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  })
})

app.get('/category/:content', (req, res) => {
  res.send(`<h2>Hello ${req.params.content}!</h2>`)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
  res.send('hello express')
})

app.get('/about', (req, res) => {
  res.send('hello express about')
})

// app.get('*', (req, res) => {
//   res.send('hello every')
// })

/**
 * 에러 미들웨어
 * @params 반드시 매개변수 4개를 지정
 */
app.use((err, req, res, next) => {
  // 에러가 발생해도 상태를 200으로 내려 보안 유지
  res.send('<h1>에러 미들웨어 존</h1>')
})

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행')
})