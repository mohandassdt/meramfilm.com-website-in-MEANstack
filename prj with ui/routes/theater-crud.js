var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var theaterSchema = mongoose.Schema({
  TheaterID:String,
  TheaterName: String,
  location: String,
  // showTimemodel:String,
 showTime:Array
 });
var Theater = mongoose.model('Theater',theaterSchema,'theaterTable');


router.get('/theater', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Theater.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/theater/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON dass SERVER");
     Theater.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/theater', function(req, res){
  console.log(req.body);
  var id = req.body.TheaterID;
  var name = req.body.TheaterName;
  var loc=req.body.location;
  // var model=req.body.showTimemodel;
  var time=req.body.showTime;
var theater1 = new Theater({
  TheaterID:id,
  TheaterName:name,
  location:loc,
  // showTimemodel:model,
  showTime:time

});

  theater1.save(function(err, docs){
    if ( err ) throw err;
    console.log("theater Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/theater/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Theater.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/theater/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Theater.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = router;
