const http = require('http')

const server = http.createServer((req,res)=>{
  res.writeHead(400, {'Content-type': 'text/html; charset=utf-8'})
  res.statusCode = 400;
  res.write('<h1>Hello Node!</h1>')
  res.write('<p>Hello server</p>')
  res.end('<p>Hello ZeroCho</p>')
})

.listen(8080)

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기 중입니다.')
})

server.on('error', (error) => {
  console.log(error)
})
