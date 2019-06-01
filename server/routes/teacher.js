// contain all the student route
const express = require('express');
var helper = require('../helper/helper');
var mysql = require('mysql');
var config = require('../config/config');
var db = mysql.createConnection(config.db);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router();

// view all /api/register
router.get('/viewallteacher/all',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  let sql = 'SELECT * FROM supervisor';
    db.query(sql,(err, rows,result)=>{
        //res.sendStatus(200);
        const users = rows.map((row) => {
          return {
            teacherid: row.supId,
            teacher: row.supEmail
        }
        })
        res.json(users);
    });
});

router.get('/viewteacher/',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  helper.getTeacherId(req.body.id,function(result){
    console.log("helperteacer");
    res.json(result);

  });
});
// 1. As a teacher, I want to register one or more students to a specified teacher.
// A teacher can register multiple students. A student can also be registered to multiple teachers.

// Endpoint: POST /api/register
// Headers: Content-Type: application/json
// Success response status: HTTP 204
// Request body example:
// {
//   "teacher": "teacherken@gmail.com"
//   "students":
//     [
//       "studentjon@example.com",
//       "studenthon@example.com"
//     ]
// }

router.post('/api/register/teacher',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  const Supid = req.body.teacher;
  const Stdid = req.body.students;
  console.log(Supid);
    var newInsertQuery=[];

  for (var i = 0; i < Stdid.length; i++) {
    newInsertQuery.push([Supid,Stdid[i]]);
  }
  console.log(newInsertQuery);
  let sql = "INSERT INTO enroll (supId, stdId) VALUES ?";
  db.query(sql,[newInsertQuery],(err, result)=>{
    if(err){
      res.sendStatus(500);
      console.log(err);
      return
    }
      res.sendStatus(204);
      //res.send(req.body);
  });


});
// 3. As a teacher, I want to suspend a specified student.
// Endpoint: POST /api/suspend
// Headers: Content-Type: application/json
// Success response status: HTTP 204
// Request body example:
// {
//   "student" : "studentmary@gmail.com"
// }
router.post('/api/suspend',(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  const StdEmail = req.body.student;

  let sql = "UPDATE students SET status = ? WHERE stdEmail = ?" ;
  db.query(sql,[0,StdEmail],(err, result)=>{
    if(err){
      res.sendStatus(500);
      console.log(err);
      return
    }
    console.log(result);
      res.sendStatus(204);
      //res.send(req.body);
  });


});

// 4. As a teacher, I want to retrieve a list of students who can receive a given notification.
// A notification consists of:

// the teacher who is sending the notification, and
// the text of the notification itself.
// To receive notifications from e.g. 'teacherken@example.com', a student:

// MUST NOT be suspended,
// AND MUST fulfill AT LEAST ONE of the following:
// is registered with “teacherken@example.com"
// has been @mentioned in the notification
// The list of students retrieved should not contain any duplicates/repetitions.

// Endpoint: POST /api/retrievefornotifications
// Headers: Content-Type: application/json
// Success response status: HTTP 200
// Request body example 1:
// {
//   "teacher":  "teacherken@example.com",
//   "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
// }
// Success response body 1:
// {
//   "recipients":
//     [
//       "studentbob@example.com",
//       "studentagnes@example.com", 
//       "studentmiche@example.com"
//     ]   
// }
// In the example above, studentagnes@example.com and studentmiche@example.com can receive the notification from teacherken@example.com, regardless whether they are registered to him, because they are @mentioned in the notification text. studentbob@example.com however, has to be registered to teacherken@example.com.
// Request body example 2:
// {
//   "teacher":  "teacherken@example.com",
//   "notification": "Hey everybody"
// }
// Success response body 2:
// {
//   "recipients":
//     [
//       "studentbob@example.com",
//     ]   
// }

router.post('/api/retrievefornotifications',(req,res)=>{
  const teacher = req.body.teacher;
  const notification = req.body.notification;
  const stdEmail = req.body.stdEmail;
  var teacherid;
  var email=''; 
  var emailtransform='';
  var studentsid=[];
  var lastqueryId;
  // using regex to retreive email
  function extractEmails ( text ){
    var myRegexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    email = text.match(myRegexp);
    if(email!==null){
      for (var i = 0; i < email.length; i++) {
        var newString = email[i].replace('@','');
        if(i==0){
          emailtransform = '"'+newString+'"';
        }else{
          emailtransform = emailtransform + ","+'"'+newString+'"';
        }
        //students.push(newString);
      }
    }else{
      emailtransform = '';
    }
   
  }
 
  extractEmails(notification);
  if(emailtransform.length > 0){
    helper.getstdId(emailtransform,function(result){
      console.log("helperstud");
      studentsid = result
    });
  }else{
    helper.getcommonEmail(teacher,function(result){
      console.log("getcommonEmail");

      for (var i = 0; i < result.length; i++) {
        var newString = result[i].stdEmail;
        if(i==0){
          emailtransform = '"'+newString+'"';
        }else{
          emailtransform = emailtransform + ","+'"'+newString+'"';
        }
        studentsid.push(result[i].stdId)
        //students.push(newString);
      }
      // result.map((row) => {
      //   //return {
      //     emailtransform = '"'+row.stdEmail+'"';
      //     console.log(row.stdEmail);
      //     studentsid.push(row.stdId)
      //   //}
      // });
      console.log(emailtransform);
       //studentsid = result
    });
  }
  

  helper.getTeacherId(teacher,function(result){
    console.log("helperteacer");
    teacherid = result;
    var recipients;
    if(teacherid!=='not found'){
      let sql = "INSERT INTO message (message, createrId) VALUES (?,?)";
      db.query(sql,['"'+notification+'"',teacherid],(err, res)=>{
        if(err){
          console.log(err);
          return
        }
        lastqueryId = res.insertId;
        console.log(studentsid);
        
        helper.getMsgId(studentsid, lastqueryId,function(result){
          //console.log(result);
          if(result=='found'){
             
            //res.sendStatus(200);
            //res.json(recipients);
          }
        });
        
      });
      //res.sendStatus(200);
      o={}
      r='recipients'
      o[r]=[];

      var newData = emailtransform.replace(/[^a-zA-Z @,]/g, "");
      newData =newData.split(",");
      var value;
      for(key in newData) {
        if(newData.hasOwnProperty(key)) {
            o[r].push(newData[key]);
        }
      }
      res.json(JSON.stringify(o));
    }else{
      res.sendStatus(400);
    }
    
  });
 
 
  
  
  // insert into message
  
  
  
  // insert into messagerecipient
  // let sql2 = "INSERT INTO messagerecipient (kessage, recipientId,messageId) VALUES (?,?(SELECT supId FROM supervisor WHERE supEmail=?))";
  // for (var i = 0; i < students.length; i++) {
  //   newInsertQuery.push([Supid,students[i]]);
  // }
//res.end();
});




module.exports=router;