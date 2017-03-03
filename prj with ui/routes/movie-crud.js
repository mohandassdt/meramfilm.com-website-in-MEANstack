 var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

//
//
// var movieSchema = mongoose.Schema({
// Title:String,
// Year:Number,
// Language:String,
// Poster:String,
// Genre:String,
// Director:String,
// Actors:String,
// Runtime:String,
//
//   // :String,
//   // moviePlot:String,
//   // Poster:String,
// });
//
// var Movie = mongoose.model('Movie', movieSchema, 'moviecrud');
//
// // router.get('/movie/get', function (req, res,next) {
// //     console.log("REACHED GET FUNCTION ON SERVER");
// //     Movie.find({}, function (err, docs) {
// //          res.json(docs);
// //
// //     });
// // });
// router.get('/movie/get/', function (req,res,next) {
//
//     console.log("REACHED  GET omdb FUNCTION ON SERVER");
//     Movie.find({}, function (err, docs)
//     {
//          res.json(docs);
//          console.log(docs);
//
//     });
// });
//
// router.get('/movie/:id', function (req,res) {
//     console.log("REACHED GET ID FUNCTION ON SERVER");
//      Movie.find({_id: req.params.id}, function (err, docs) {
//          res.json(docs);
//
//     });
// });
//
// router.post('/movie', function(req, res){
//   console.log(req.body);
//   var name = req.body.Title;
//     var year = req.body.Year;
//     var lang = req.body.Language;
//     var post = req.body.Poster;
//    var genre = req.body.Genre;
//    var dir = req.body.Director;
//    var act = req.body.Actors;
//
//   var runtime = req.body.Runtime;
//
// var movie1 = new Movie({
//     Title:name,
//     Year:year,
//     Language:lang,
//     Poster:post,
//     Genre:genre,
//     Director:dir,
//     Actors:act,
//     Runtime:runtime
//   });
//
//   movie1.save(function(err, docs){
//     if ( err ) throw err;
//     console.log("movie Saved Successfully");
//     res.json(docs);
//   });
//   })
//
// router.delete('/movie/:id', function(req, res){
//    console.log("REACHED Delete FUNCTION ON SERVER");
//       Movie.remove({_id:req.params.id}, function(err, docs){
//         res.json(docs);
//     });
// })
//
// router.put('/movie/:id', function(req, res){
//     console.log("REACHED PUT");
//     console.log(req.body);
//     Movie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
//       res.json(data);
//     });
// })
//
// router.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// module.exports = router;



var movieSchema = mongoose.Schema({
     moviID: String,
    moviTitle: String,
    moviYear:String,
    moviLanguage:String,
    moviPoster:String,
    moviGenre:String,
    moviDirector:String,
    moviActors:String,
     moviPlot:String,
     moviRating:String

    });

var Movie = mongoose.model('Movie', movieSchema, 'movie');

// router.get('/movie/get/', function (req, res,next) {
//
//     console.log("REACHED  GET omdb FUNCTION ON SERVER");
//     Movie.find({}, function (err, docs)
//     {
//          res.json(docs);
//          console.log(docs);
//
//     });
// });


router.get('/movie', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Movie.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/movie/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Movie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/movie', function(req, res){
  console.log(req.body);
    // var id=req.body.moviID;
    var title = req.body.Title;
    var year=req.body.Year;
    var lang = req.body.Language;
    var poster = req.body.Poster;
    var genre = req.body.Genre;
    var dir=req.body.Director;
    var act=req.body.Actors;
     var desc=req.body.Plot;
    //  var r=req.body.avg;
   // //  var imdb=req.body.imdbRating;
   //  // var rates=req.body.Rating;
   //   var avg=req.body.AvgRating;
   var movie1 = new Movie({
    // moviID:id,
    moviTitle:title,

    moviYear:year,
    moviLanguage:lang,
    moviPoster:poster,
    moviGenre:genre,
    moviDirector:dir,
    moviActors:act,
     moviPlot:desc

     //imdbRating:imdb,
    // Rating:rates,
     //AvgRating:avg,
  });


  movie1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/movie/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Movie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/movie/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Movie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
