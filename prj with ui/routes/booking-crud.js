
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  bookingid:String,
  Title:String,
  CityName:String,
  HallName:String,
    Day:String,
  ShowTime:String,
    Amount:Number,
    totalAmnt:String,
    NumberOfSeats:Number,
    seatnumbers:String
 });
var Book = mongoose.model('Book',bookSchema, 'bookTable');


router.get('/bok', function (req, res) {
    console.log("REACHED GET FUNCTION ON Booking SERVER");
    Book.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/bok/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON booking SERVER");
     Book.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/bok', function(req, res){
  console.log(req.body);
  var filmname = req.body.Title;
  var cityname= req.body.CityName;
  var theatname = req.body.HallName;
 var dayname= req.body.Day;
  var showname = req.body.ShowTime;
  var moneyamnt = req.body.Amount;
  var Quantity = req.body.NoTickets;
  var seat = req.body.seatnumbers;

var book1 = new Book({
    Title:filmname,
    CityName:cityname,
    HallName:theatname,
    Day:dayname,
    ShowTime:showname,
    Amount:moneyamnt,
    NoTickets:Quantity,
    seatnumbers:seat
});

  book1.save(function(err, docs){
    if ( err ) throw err;
    console.log("booking Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/bok/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Book.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/bok/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
  Book.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
