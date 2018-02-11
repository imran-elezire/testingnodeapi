var express = require('express');
var router = express.Router();


/* GET groups listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM groups WHERE status=1', function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


//GET groups using user id
router.get('/my/:uid', function(req, res, next) {
	connection.query('SELECT * FROM groups WHERE status=1 AND id IN(SELECT group_id from group_users WHERE status=1 AND student_id=?)',[req.params.uid], function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


//GET groups using group id
router.get('/:id', function(req, res, next) {
	connection.query('SELECT * FROM groups WHERE status=1 AND id='+req.params.id, function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


router.get('/:id/users', function(req, res, next) {
	connection.query('SELECT * FROM users WHERE user_id IN (SELECT student_id FROM group_users WHERE group_id = ?)',[req.params.id], function (error, results, fields) {
	  	if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.post('/',function(req,res){
  	var name = req.body.name;
  	var description = req.body.description;
  	var trainer_id = req.body.trainer_id;
	connection.query('INSERT INTO groups SET name = ?, description = ?, trainer_id = ?',[name,description,trainer_id], function (error, results, fields) {

		if(error){
	  		res.setHeader('Content-Type', 'application/json');
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
			  
	  		//res.charset = 'utf8';
	  		res.setHeader('Content-Type', 'application/json; charset=utf-8');
  			res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Inserted "+results.insertId}}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	});
  });
  
  
  router.put('/:id',function(req,res){
	var id = req.params.id;
	var name = req.body.name;
	var description = req.body.description;
	var trainer_id = req.body.trainer_id;
  connection.query('UPDATE groups SET name = ?, description = ?, trainer_id = ? WHERE id = ?',[name,description,trainer_id,id], function (error, results, fields) {

	  if(error){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
			//If there is error, we send the error in the error section with 500 status
		} else {
			
			//res.charset = 'utf8';
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.send(JSON.stringify({"status": 200, "error": null, "response": {msg: "Record Updated "}}));
			//If there is no error, all is good and response is 200OK.
		}
  });
});
  
  
  router.delete('/:id',function(req,res){
	connection.query('UPDATE groups SET status=0 WHERE id ='+req.params.id, function (error, results, fields) {});
	connection.query('UPDATE group_users SET status=0 WHERE group_id ='+req.params.id, function (error, results, fields) {});
	res.end("Record Deleted");
	});
  

module.exports = router;
