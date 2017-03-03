  'use strict';

module.exports = function($scope, $http,$log, $rootScope,$location) {
  $scope.movieinfo = $rootScope.bookedMovie;
  var date;
  var details=[];
$scope.seat=false;  var i;
$rootScope.seatArrange=[];
console.log(  $scope.movieinfo );

// document.getElementById("datebook").value=date;


var refreshBookin = function () {
      $http.get('/bok/bok').success(function (response) {
          console.log('book READ IS SUCCESSFUL');
          $scope.Booklist = response;
          $scope.book = "";
  });
  };

  refreshBookin();


// var now=moment().hour(Number);

//
// $scope.rt1=function(){
// var value=1;
// return value;
// }

var refreshConfirm = function () {

    $http.get('/con/con').success(function (response) {
        console.log('Confirm READ IS SUCCESSFUL');
        $scope.confirmlist = response;
        $scope.confirm = "";
});
};

refreshConfirm();






  //
  var selected=[];
  var reserved=[];

  $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
       $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ];

       $scope.getStatus = function(seatPos) {
         if(reserved.indexOf(seatPos) > -1) {
                       return 'reserved';
                   } else if(selected.indexOf(seatPos) > -1) {
                       return 'selected';
                   }

               }



$scope.seatClicked=function(seatPos){
  // if($scope.NumberOfSeats>$scope.book.NoTickets){
  var index = selected.indexOf(seatPos);
   if(index != -1) {
       // seat already selected, remove
       selected.splice(index, 1)
   } else {
       // new seat, push


       selected.push(seatPos);
        console.log(selected);





        document.getElementById("seatno").innerHTML=selected;
        // document.getElementById('myImage').src="img/seat1.gif";
// selected=document.getElementById("seatno").innerHTML;
$scope.book.NumberOfSeats=selected.length;
$scope.book.totalAmnt=150*$scope.book.NumberOfSeats;
if($scope.NumberOfSeats>$scope.book.NoTickets){
  alert("You cannot book more seats than you selected");
}
$scope.book.seatnumbers=selected;





}
};


//
// $scope.e=function(){
//   cityNmae=document.getElementById("citybook").value;
// alert(cityNmae);
// console.log(cityNmae);
// }




$scope.add =function()
{
      // $scope.seat = true;

// $scope.book.Day=date;
  $scope.book.Title=$scope.movieinfo.Film;
console.log($scope.book.Title);
console.log($scope.book.CityName);
console.log($scope.book.HallName);
console.log($scope.book.Day);

console.log($scope.book.ShowTime);


 // selectdate = document.getElementById("date").value;
 // console.log(selectdate);
// console.log($scope.book.ShowTime);

  //  details=$scope.confirmlist;
try
{
 for(i=0;i<=$scope.confirmlist.length;i++)
       {
         if($scope.confirmlist.length==0)
         {
           $scope.seat = true;
         }
         else{
           console.log($scope.confirmlist[i].Title);
           console.log($scope.confirmlist[i].cnCityName);
           console.log($scope.confirmlist[i].cnHallName);
           console.log($scope.confirmlist[i].cnDay);
           console.log($scope.confirmlist[i].cnShowTime);


// console.log($scope.confirmlist[i].Title);

       if ($scope.confirmlist[i].Title==$scope.book.Title && $scope.confirmlist[i].cnCityName==$scope.book.CityName  && $scope.confirmlist[i].cnHallName==$scope.book.HallName  && $scope.confirmlist[i].cnDay==$scope.book.Day && $scope.confirmlist[i].cnShowTime==$scope.book.ShowTime)
 {
       $scope.seat = true;
             console.log($scope.confirmlist[i].Title);
              console.log($scope.confirmlist[i].cnCityName);
            console.log($scope.confirmlist[i].cnHallName);
            console.log($scope.confirmlist[i].cnDay);
            console.log($scope.confirmlist[i].cnShowTime);

          // reserved.push($scope.confirmlist[i].cnseatnumbers);
          // selected.push($scope.confirmlist[i].cnseatnumbers);

          reserved=$scope.confirmlist[i].cnseatnumbers;
        console.log(reserved);

      }
       else
       {
          $scope.seat = true;
       }
     }
       }

    }
     catch(e){}

};


//
// $scope.touch=function(Booklist){
//   $scope.book.Title=$scope.movieinfo.moviTitle;
//   $http.post('/bok/bok', $scope.book).success(function (response) {
//           console.log(response);
//
//       });
//         refreshBookin();
// }



///////////////////////////////////////////////////
$scope.bk = function (Booklist) {
  var arr = [];
while(arr.length < 1){
    var randomnumber = Math.ceil(Math.random()*100000)
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
}
$scope.book.bookingid= arr;
console.log($scope.book.bookingid);
  $scope.book.Title=$scope.movieinfo.Film;

$scope.book.seatnumbers=selected;
// $scope.book.seatnumber=
    console.log($scope.book);
    $http.post('/bok/bok', $scope.book).success(function (response) {
            console.log(response);

        });
        $rootScope.confirmPage=$scope.book;
$location.path('/Confirm');
        refreshBookin();

};

//
// var uniqueNames = [];
//              var uniqueObj = [];
//        for(i = 0; i< data.length; i++){
//                if(uniqueNames.indexOf(data[i].City) === -1){
//                    uniqueObj.push(data[i])
//              uniqueNames.push(data[i].City);
//                }
//        }


var refreshLocat = function () {
      $http.get('/cty/cty').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.loclist = response;
          $scope.loc = "";



      });
  };

  refreshLocat();
  var uniqueNames = [];
var uniqueObj = [];
var uniqueHall=[];
var uniqueTheat=[];


  var refreshMape = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.maplist = response;
            console.log($scope.maplist);
            $scope.map = "";


               for(i = 0; i< $scope.maplist.length; i++){
                 if($scope.maplist[i].Film==$scope.movieinfo.Film){
               if(uniqueNames.indexOf($scope.maplist[i].City) === -1){
                   uniqueObj.push($scope.maplist[i]);
               uniqueNames.push($scope.maplist[i].City);

        }
           }}
           console.log(uniqueNames);

               console.log($scope.locMovie);
console.log($scope.book.CityName);



                          console.log(uniqueNames);
                            console.log(uniqueNames);

                              console.log($scope.locMovie);

        });

    };
    $scope.locMovie=uniqueNames;
    $scope.loctheat=uniqueHall;

    refreshMape();

$scope.sel=function(){

  var j;
  for( j= 0; j< $scope.maplist.length; j++){

if($scope.maplist[j].Film==$scope.movieinfo.Film&&$scope.maplist[j].City==$scope.book.CityName){
  if(uniqueHall.indexOf($scope.maplist[j].Hall) === -1){
      uniqueTheat.push($scope.maplist[j]);
  uniqueHall.push($scope.maplist[j].Hall);
console.log(uniqueHall);
}}
}
}


var uniquedate=[];
var uniqueDatelist=[];
$scope.DateSelect=function(){

  var l;
  for( l= 0; l< $scope.maplist.length; l++){

if($scope.maplist[l].Film==$scope.movieinfo.Film&&$scope.maplist[l].City==$scope.book.CityName&&$scope.maplist[l].Hall==$scope.book.HallName){
  if(uniqueDatelist.indexOf($scope.maplist[l].From) === -1){
      uniquedate.push($scope.maplist[l]);
  uniqueDatelist.push($scope.maplist[l].From);
console.log(uniqueDatelist);
$scope.singleDate=uniqueDatelist;

}}
}
}

var uniqueShow=[];
var uniqueShowTime=[];
var uniqueShowTime1=[];
$scope.tick=function(){
  //  $scope.book.Day=document.getElementById("datebook").text;
  // $scope.book.Day=document.getElementById("datebook").innerHTML;
  //  $scope.book.Day=document.getElementById("datebook").value;

  console.log($scope.book.Day);
  var dt=[];
  var k,d,j;

  var currentTime = new Date()
 var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
var currentDate= year+ "-" + month + "-" + day;
alert(currentDate);
  d = new Date(new Date().getTime()).toLocaleTimeString();

  for( k= 0; k< $scope.maplist.length; k++){

  if($scope.maplist[k].Film==$scope.movieinfo.Film&&$scope.maplist[k].City==$scope.book.CityName&&$scope.maplist[k].Hall==$scope.book.HallName&&$scope.maplist[k].From==$scope.book.Day)
  {
    var cdate=$scope.maplist[k].From;
    if(cdate==currentDate || $scope.maplist[k].ShowTime>d ){

        if(uniqueShowTime.indexOf($scope.maplist[k].ShowTime) === -1){
          uniqueShowTime.push($scope.maplist[k].ShowTime);
            console.log(uniqueShowTime);
            $scope.Showtime=uniqueShowTime;
      }
    }

      else
    {
  if(uniqueShowTime1.indexOf($scope.maplist[k].ShowTime) === -1){
    uniqueShowTime1.push($scope.maplist[k].ShowTime);
      console.log(uniqueShowTime1);
      $scope.Showtime=uniqueShowTime1;
}
}
}
}};




    var refreshTheat = function () {
          $http.get('/theater/theater').success(function (response) {
              console.log('theater READ IS SUCCESSFUL');
              $scope.thtrelist = response;
              $scope.thtre = "";

          });
      }

      refreshTheat();



    };
