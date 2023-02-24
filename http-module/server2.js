// fs 모듈로 html 파일 읽는 방식
const http = require('http')
const fs = require('fs').promises

const server = http.createServer(async(req,res)=>{
try{
	res.writeHead(200, { 'Content-type': 'text/html; charset-uft-8'})
	const data = await fs.readFile('./server2.html')
	res.end(data)
}catch(err){
	console.error(err)
	res.writeHead(200, { 'Content-type': 'text/plain; charset=utf-8'})
	res.end(err.message)
}
})
.listen(8080)

server.on('listening', () => {
console.log('8080번 포트에서 서버 대기 중입니다.')
})

server.on('error', (error) => {
console.log(error)
})
