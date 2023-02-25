const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const multer = require('multer')

app.set('port', 3001)

try{
  fs.readdirSync('uploads')
}catch (error) {
  console.error('upload 폴더가 없어 uploads 파일을 생성합니다')
  fs.mkdirSync('uploads')
}

const upload = multer({
  // 업로드한 파일을 저장
  storage: multer.diskStorage({
    // destination: 어디에 저장할지
    destination(req, file, done){
      done(null, 'uploads/')
    },
    // filename: 어떤 이름으로 올릴지
    filename(req, file, done){
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024},
})

app.get('/upload', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('req',req)
  res.send('ok')

})

app.listen(app.get('port'), () => {
  console.log('form 서버 실행')
})