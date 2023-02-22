const express = require('express')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
  console.log('1모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  console.log('2모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  console.log('3모든 요청에 실행하고 싶어요!')
  next()
},(req, res, next) => {
  throw new Error('error')
})

app.get('/category/javascript', (req, res) => {
  res.send(`<h2>Hello JAVASCRIPT!</h2>`)
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

app.use((req, res, next) => {
  res.status(404).send('404')
})

/**
 * 에러 미들웨어
 * @params 반드시 매개변수 4개를 지정
 */
app.use((err, req, res, next) => {
  console.log(err)
  res.status(200).send('error')
})

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행')
})