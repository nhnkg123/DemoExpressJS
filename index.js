var express = require('express');
var app = express();// app luc nay la server

function myMiddleware (req, res, next){
    console.log('Hello from my Middleware');
    res.locals.massage = "My Middleware";
    next();
}

app.use(myMiddleware);

app.use(function(req, res, next){
    console.log('MyMiddleware 2');
    next();
});

app.get('/', function(req, res){
    res.send('Hello from ExpressJS ' + res.locals.massage);
});



app.get('/json', function(req, res){
    var json = {
        name: 'Ben',
        age: 10 
    };
    res.json(json);
});

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js'));

app.use(express.static(__dirname + '/images'));

app.get('/test.html', function(req, res){
    res.sendFile(__dirname + '/test.html');
});
   
//dau ? trong TH nay thi phia truoc no link co hay khong co ab deu duoc
// ab+cd => URL abcd abbbbbcd
// ab*cd => URL abRANDOMcd
// ab([*])cd => URL ab*cd
// a(bc)?d => URL có hay khong co bc deu duoc
app.get('/ab*cd', function(req, res){
    res.send('/ab*cd')
});

app.get('/products/:id', function(req, res){
    res.send(req.params.id);
});

app.get('/flights/:fromm-:to', function(req, res){
    res.send(req.params);
});

//Handle 404 not found
app.use(function (req, res){
    res.status(404).send('Error: Request not found!');
});

//Handle 500 internal server error
app.use(function(error, req, res, next){
    console.log(error);
    res.status(500).send('Error: Internal server error!');
});

app.listen(5000, function(){
    console.log('Server is listening on port 5000...');
});