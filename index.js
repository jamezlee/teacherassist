const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('./public'));
// app.use(bodyParser.urlencoded({extended:false}));
const teacherrouter = require('./routes/teacher.js');
const stdrouter = require('./routes/student.js');
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    }
    next()
})
app.use(stdrouter,teacherrouter);

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOOT")
});
app.listen(9999),()=>{
  console.log('server started');
};