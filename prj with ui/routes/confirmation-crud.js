
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var confirmSchema = mongoose.Schema({
  cnbookingid:String,
  cnUser:String,
  Title:String,
  cnCityName:String,
  cnHallName:String,
    cnDay:String,
  cnShowTime:String,
    cnAmount:String,
    cnNoTickets:String,
   cnseatnumbers:String,
   cnMail:String
 });
var Confirm = mongoose.model('Confirm',confirmSchema,'confirmTable');


router.get('/con', function (req, res) {
    console.log("REACHED GET FUNCTION ON confirmation SERVER");
    Confirm.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/con/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON confirmation SERVER");
     Confirm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/con', function(req, res){
  console.log(req.body);
  var cId = req.body.cnbookingid;
  var cuser = req.body.cnUser;
  var cMovie = req.body.Title;
  var cCity= req.body.cnCityName;
  var ctheater = req.body.cnHallName;
 var cDate= req.body.cnDay;
  var cShow = req.body.cnShowTime;
  var cAmnt = req.body.cnAmount;
  var cNumbers = req.body.cnNoTickets;
  var cSeat = req.body.cnseatnumbers;
  var mail = req.body.cnMail;


var confirm1 = new Confirm({
  cnbookingid:cId,
  cnUser:cuser,
  Title:cMovie,
    cnMail:mail,
    cnCityName:cCity,
    cnHallName:ctheater,
    cnDay:cDate,
    cnShowTime:cShow,
    cnAmount:cAmnt,
    cnNoTickets:cNumbers,
    cnseatnumbers:cSeat
});

  confirm1.save(function(err, docs){
    if ( err ) throw err;
    console.log("confirmation Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/con/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Confirm.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/con/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Confirm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
