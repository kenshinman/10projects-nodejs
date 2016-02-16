var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
    'html' : 'text/html',
    'jpeg' : 'image/jpeg',
    'jpg' : 'image/jpg',
    'png' : 'image/png',
    'js' : 'text/javasrcipt',
    'css' : 'text/css'
};

http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('loading : '+uri);
    
    var stats;
    
    try{
        stats = fs.lstatSync(fileName);
    }catch(e){
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.write('<h3>404 not found</h3> Go back <a href="index.html">home</a>');
        res.end();
        return;
    }
    
    //check if file or directory
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
        res.writeHead(200, {'Content-Type' : mimeType});
        
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
        
    }else if(stats.isDirectory()){
        res.writeHead(302, {'Location': 'index.html'});
        res.end();
    }else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('<h1>500 Internal server error</h1>')
    }
}).listen(1337);