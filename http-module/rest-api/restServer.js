const http = require('http')
const fs = require('fs').promises 

const users = {}

const server = http.createServer(async (req, res) => {
  try {
    if(req.method === 'GET'){
      if(req.url === '/'){
        res.writeHead(200, { 'Content-type': 'text/html; charset-utf-8'})
        const data = await fs.readFile('./about.html')
        return res.end(data)
      }else if(req.url === '/login'){
        res.writeHead(200, { 'Content-type': 'text/html; charset-utf-8'})
        const data = await fs.readFile('./login.html')
        return res.end(data)
      }else {
        res.writeHead(200, {'Content-type': 'text/html; charset-utf-8'})
        const data = await fs.readFile(`.${req.url}`)
        return res.end(data)
      }
    }else if(req.method === 'POST'){
      if(req.url === '/user'){
        let body = ''
        req.on('data', (data) => body += data)

        return req.on('end', () => {
          const data = JSON.parse(body)
          const id = Date.now();
          users[id] = data
          res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'})
          res.end(JSON.stringify(data))
        })
      }
    }
  }catch(err) { 
    console.log(err)
  }
})
.listen(8082)

server.on('listening', () => {
  console.log('8082 실행중입니다.') 
})

server.on('error', err => {
  console.log(err)
})