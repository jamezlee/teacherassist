const express = require('express');
const router = express.Router();
var helper = require('../helper/helper');
var mysql = require('mysql');
var config = require('../config/config');
var db = mysql.createConnection(config.db);

// view all students
router.get('/viewallstd/all',(req,res)=>{
  let sql = 'SELECT * FROM students';
    db.query(sql,(err, rows,result)=>{
        //res.sendStatus(200);
        const users = rows.map((row) => {
          return {
            studentid:row.stdId,
            student: row.stdEmail}
        })
        res.json(users);
    });
});

// get student by id
router.get('/std/:id',(req,res)=>{
  const userId =req.params.id;
  let sql = 'SELECT * FROM students WHERE stdId = ?';
    db.query(sql,[userId],(err, result)=>{
      if(err){
        res.sendStatus(500);
       // throw err
        // res.end();
        return
      }
      res.sendStatus(200);
        //console.log(result);
        res.json(result);
    });
});

// 2. As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
// Endpoint: GET /api/commonstudents
// Success response status: HTTP 200
// Request example 1: GET /api/commonstudents?teacher=teacherken%40example.com
// Success response body 1:
// {
//   "students" :
//     [
//       "commonstudent1@gmail.com", 
//       "commonstudent2@gmail.com",
//       "student_only_under_teacher_ken@gmail.com"
//     ]
// }
// Request example 2: GET /api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com
// Success response body 2:
// {
//   "students" :
//     [
//       "commonstudent1@gmail.com", 
//       "commonstudent2@gmail.com"
//     ]
// }
router.get('/api/commonstudents',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
 // var queryParameter =
  const userId =req.query.teacher;
  //console.log(userId);
  var students=[];
  let sql = "SELECT s.stdEmail FROM students s where s.stdId in( SELECT enroll.stdId FROM enroll INNER JOIN supervisor on enroll.supId = supervisor.supId where supervisor.supEmail= ? )";
  db.query(sql,[userId],(err, rows,result)=>{
   
    rows.map((row) => {
      //return {
        students.push(row.stdEmail)
      //}
    });
    var studs={
      students
    };
   
    
    res.json(studs);
      //res.send(req.body);
  });


});







module.exports=router;