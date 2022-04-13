const http = require('http')
const port = 8080;
const Rx = require('rxjs')
const fs =require ('fs')
const { fromEvent }= require( 'rxjs');
const { map } =require('rxjs/operators');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
  
    const html = fs.readFile(__dirname + "/index.html", function (error, html) {
      if (error) {
        throw error;
      }
      const requests = Rx.Observable.fromEvent(server, 'request', Array.of);

      requests.subscribe(([request, response]) => {
    
        console.log('new request', request.url);

    });
    
      res.end(html);
    });
  });

  

server.listen(port, (err) => {
    if (err) return console.log('Error:', err);

    console.log(`Listening on ${port}`);
})

