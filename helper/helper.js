var mysql = require('mysql');
var config = require('../config/config');
var db = mysql.createConnection(config.db);


module.exports = {
  // get array of id and return
  getstdId: function getstudentId(value, callback) {
    return new Promise((resolve, reject) => {
      getcorsd = () => {
        return function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
          res.setHeader('Access-Control-Allow-Credentials', true); // If needed
          //next();
        }
      }
      var arrayValue=[];
      let sql = "SELECT stdId FROM students WHERE stdEmail IN ("+value+ ")";
      return db.query(sql,(err, result) => {
        if(err){
          //res.sendStatus(500);
         // throw err
          // res.end();
          return callback(err);
        }
        resolve(result);
        if(result.length){
          for(var i=0; i < result.length; i++){
            arrayValue.push(result[i].stdId)
          }
          return callback(arrayValue);
        }else{
          return callback('not found');
        }
        
      });
    });
   
  },
  // get teacher id by email and return
  getTeacherId:function getteacherId( value, callback) {
    // return the entire chain of promises
    return new Promise( (resolve, reject) => {
      
      let sql='SELECT supId FROM supervisor WHERE supEmail = ?';
      return db.query(sql,[value],(err, result)=>{
        if(err){
          //res.sendStatus(500);
         // throw err
          // res.end();
          resolve(result);
          return callback(err);
        }
        //res.sendStatus(200);
        resolve(result);
        if(result.length){
          return callback(result[0].supId);
        }else{
          return callback('not found');
        }
      });
    })   
  },
  getcommonEmail:function getcommonEmail(teacher, callback){
    return new Promise((resolve,reject)=>{
      var arrayValue=[];
      let sql = "SELECT s.stdId, s.stdEmail FROM students s where s.stdId in( SELECT enroll.stdId FROM enroll INNER JOIN supervisor on enroll.supId = supervisor.supId where supervisor.supEmail= ? )AND s.status = 1";
      db.query(sql,[teacher],(err, result)=>{
        if(err){
          console.log(err);
          return
        }
        //console.log(result.insertId);
        if(result.length){
         
          for(var i=0; i < result.length; i++){
            arrayValue.push(result[i])
          }
          console.log(arrayValue);
          callback(arrayValue);
          resolve(result);
        }else{
          return callback('not found');
        }
         
      });
    })
  },
  // insert messagerecipient as array  after getting from messageid
  getMsgId:function getMsgId(recipientid,messageId, callback){
    return new Promise( (resolve, reject) => {
      console.log("getMsgId-indsie");
      var arrayValue=[];
     
      for(var i=0; i < recipientid.length; i++){
        arrayValue.push([recipientid[i],messageId]);
      }
      console.log(arrayValue);
      let sql="INSERT INTO messagerecipient (recipientId,messageId) VALUES ?";
      db.query(sql,[arrayValue],(err, result)=>{
        if(err){
          console.log(err);
          return
        }
        //console.log(result.insertId);
        if(result.insertId){
          resolve(result);
          callback("found");
        }else{
          return callback('not found');
        }
         
      });
    })   
  }

};
