import express from 'express'

var app = express();

// Middleware: Parse incoming json + urlencoded body
app.use(express.json())
app.use(express.urlencoded())

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/user/:id',(req,res)=>{
    res.status(200).json({ user: "test", id : req.params.id })
})

app.post('/user/:id',(req,res)=>{
    res.status(200).json({ status: "success", id : req.params.id })
})

var port = 3000
console.log(`Application running at ${port}`)
app.listen(port);
