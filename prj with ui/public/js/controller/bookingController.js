'use strict';

module.exports = function($scope, $http,$log) {
  $scope.booking = 'booking';

 //    $(document).ready(function(){
 //     $('#datepicker').datepicker({ dateFormat: 'dd, M yy' });
 //    //  $('#addtime').click(function(){
 //    //      var data = ($('#hours').val())+" : "+($('#minutes').val())+" "+($('#ampm').val());
 //    //      $('#restime').append("<option value='"+data+"'>"+data+"</option>");
 //    //  });
 // });
  var self = this;
self.submit = function() {
   console.log('sucesssss form');
};



var refresh = function() {
    $http.get('/movie/movie').success(function(response) {
        console.log('READ IS SUCCESSFUL');
        $scope.moviList = response;
        $scope.movi = "";
    });
};

refresh();

$scope.addMovie = function(movi) {
    // $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function(response) {
      $http.get('http://www.omdbapi.com/?t='+$scope.movi.moviTitle+'&y='+$scope.movi.moviYear+'&plot=short&r=json').success(function (response){


        //console.log(response);
        var movieObj = {};
        for (var key in response) {
            if (key == 'Title' || key == 'Year' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors' || key == 'Plot') {
                movieObj[key] = response[key];

            }
        }
       // $http.defaults.headers.post["Content-Type"] = "application/json";

        $http({
                method: 'POST',
                url: '/movie/movie',
                 headers: {'Content-Type': 'application/json'},
                data: movieObj
            })
            .then(function(response) {
                console.log(response);
                console.log("CREATE IS SUCCESSFUL");
                $log.info(response);
                refresh();
            });


        // var serviceName = 'movi'
        // $http.post('/movie/addMovie', movieObj).success(function(response) {
        //     console.log(response);
        //     console.log("CREATE IS SUCCESSFUL");
        //     refresh();
        // });

    });
    console.log($scope.movi);

};

$scope.removeMovie = function(movie) {
    //console.log(id);
    $http.delete('/movie/movie/' + movie._id).success(function(response) {
        console.log(response);
        console.log('DELETED SUCCESSFULLY');
        refresh();
    });
};

$scope.editMovie = function(movie) {
    $http.get('/movie/movie/' + movie._id).success(function(response) {
        $scope.movi = response[0];
    });
};

$scope.updateMovie = function() {
    console.log("REACHED UPDATE");
    console.log($scope.movi._id);
    $http.put('/movie/movie/' + $scope.movi._id, $scope.movi).success(function(response) {
        console.log(response);
        refresh();
    })
}


var refreshTheat = function () {
      $http.get('/theater/theater').success(function (response) {
          console.log('theater READ IS SUCCESSFUL');
          $scope.thtrelist = response;
          $scope.thtre = "";
      });
  };

  refreshTheat();

  $scope.addTheater = function () {
      console.log($scope.thtre);
      $http.post('/theater/theater', $scope.thtre).success(function (response) {
          console.log(response);
          console.log("theater CREATE IS SUCCESSFUL");
          refreshTheat();
      });
  };




  $scope.removeTheater = function (id) {
      console.log(id);
      $http.delete('/theater/theater/' + id._id).success(function (response) {
          console.log(response);
          console.log('theater DELETED SUCCESSFULLY');
          refreshTheat();
      });
  };

  $scope.editTheater = function (id) {
       $http.get('/theater/theater/' + id._id).success(function (response) {
          $scope.thtre = response[0];
      });
  };

  $scope.updateTheater = function () {
      console.log("theater REACHED UPDATE");
      console.log($scope.thtre._id);
      $http.put('/theater/theater/' + $scope.thtre._id, $scope.thtre).success(function (response) {
          console.log(response);
          refreshTheat();
      })
  }





//city controllerr...........................
var refreshLocat = function () {
      $http.get('/cty/cty').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.loclist = response;
          $scope.loc = "";
      });
  };

  refreshLocat();

  $scope.addCity = function () {
      console.log($scope.loc);
      $http.post('/cty/cty', $scope.loc).success(function (response) {
          console.log(response);
          console.log("CREATE IS SUCCESSFUL");
          refreshLocat();
      });
  };

  $scope.removeCity = function (id) {
      console.log(id);
      $http.delete('/cty/cty/' + id._id).success(function (response) {
          console.log(response);
          console.log('DELETED SUCCESSFULLY');
          refreshLocat();
      });
  };

  $scope.editCity = function (id) {
       $http.get('/cty/cty/' + id._id).success(function (response) {
          $scope.loc = response[0];
      });
  };

  $scope.updateCity = function () {
      console.log("REACHED UPDATE");
      console.log($scope.loc._id);
      $http.put('/cty/cty/' + $scope.loc._id, $scope.loc).success(function (response) {
          console.log(response);
          refreshLocat();
      })
  }



//showtime controllerr..............................

var refreshSho = function () {
      $http.get('/showt/showt').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.timlist = response;
          $scope.tim = "";
      });
  };

  refreshSho();
  $('#add').click(function(){
           var data = ($('#selecttime').val());
           $('#time').append("<option value='"+data+"'>"+data+"</option>");

       });

  $scope.addShow = function () {
// $scope.tim.showTime=document.getElementById("showt").value;
      // console.log($scope.tim);
      $http.post('/showt/showt', $scope.tim).success(function (response) {
          console.log(response);
          console.log("CREATE IS SUCCESSFUL");
          refreshSho();
      });
  };

  $scope.removeShow = function (id) {
      console.log(id);
      $http.delete('/showt/showt/' + id._id).success(function (response) {
          console.log(response);
          console.log('DELETED SUCCESSFULLY');
          refreshSho();
      });
  };

  $scope.editShow = function (id) {
       $http.get('/showt/showt/' + id._id).success(function (response) {
          $scope.tim = response[0];
      });
  };

  $scope.updateShow = function () {
      console.log("REACHED UPDATE");
      console.log($scope.tim._id);
      $http.put('/showt/showt/' + $scope.tim._id, $scope.tim).success(function (response) {
          console.log(response);
          refreshSho();
      })
  }



///////////////////mappingggggggggggga

  var refreshMape = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.maplist = response;
            $scope.map = "";

        });
    };

    refreshMape();

    $scope.f=function()
  {
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
  var day = currentTime.getDate()
  var year = currentTime.getFullYear()
  var cvalue=year + "/" + month + "/" + day;
  alert(cvalue);
  console.log(cvalue);
    var dvalue=document.getElementById("mapdate").value;
    alert(dvalue);
    console.log(dvalue);
    if(cvalue < dvalue)
    {
      alert("future date");
    }
    else
    {
      alert("past date");
    }

  }

$scope.d=function()
{
  var uniquetime=[];
  var d,k;
  var theater=$scope.thtrelist;
    $scope.map.From=document.getElementById("mapdate").value;
  var currentTime = new Date()
 var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
var currentDate= year+ "-" + month + "-" + day;
  d = new Date(new Date().getTime()).toLocaleTimeString();
alert($scope.map.From);
try{
for(k=0;k>theater.length;k++)
{
  if($scope.map.From==currentDate)
  {
    if(theater[k].showTime>d)
    {
      if(uniquetime.indexOf(theater[k].showTime) === -1){
      uniquetime.push(theater[k].showTime);
      alert(uniquetime);
    }}
    else {
        alert("pls select greater than machine time");
      }
  }
  else {
    if(uniquetime.indexOf(theater[k].showTime) === -1){
    uniquetime.push(theater[k].showTime);
    alert(uniquetime);
  }
}
}

}
 catch(e){}
};

$scope.selposter=function(){
  var i,d;
  $scope.map.From=document.getElementById("mapdate").value;

for(i=0;i<$scope.moviList.length;i++){
  console.log($scope.moviList[i].moviTitle);
if($scope.map.Film==$scope.moviList[i].moviTitle){
  $scope.map.Poster=$scope.moviList[i].moviPoster;
  $scope.map.Year=$scope.moviList[i].moviYear;}}
  try
   {
   for(j=0;j<$scope.maplist.length;j++){
      if($scope.maplist[j].Film==$scope.map.Film && $scope.maplist[j].Language == $scope.map.Language && $scope.maplist[j].City == $scope.map.City && $scope.maplist[j].Hall==$scope.map.Hall &&  $scope.maplist[j].From==$scope.map.From && $scope.maplist[j].ShowTime== $scope.map.ShowTime)
     {
       alert("Already movie is assigned to this showtime...please select other showtime... ");
         }
}}  catch(e){}};
var j;



    $scope.addMap = function () {
console.log($scope.map);
var t;

for(t=0;t<$scope.moviList.length;t++){

   if($scope.moviList[t].moviTitle==$scope.map.Film){
$scope.map.Poster=$scope.moviList[t].moviPoster;
$scope.map.Year=$scope.moviList[t].moviYear;

    }
}

var uniqueShowTime=[];
var uniqueShowTime1=[];
// $scope.timeClick=function(){
//   var t;
//   for( t= 0; t< $scope.maplist.length; t++)
// }


    // d = new Date(new Date().getTime()).toLocaleTimeString();

  $http.post('/map/map',$scope.map).success(function (response) {
      console.log(response);
      console.log("mapping is done");
refreshMape();
      $scope.selloc=false;
          $scope.selthr=false;
              $scope.seldt=false;
                $scope.selst=false;

  });
};
// else {
// if($scope.maplist[j].Film==$scope.map.Film && $scope.maplist[j].Language == $scope.map.Language && $scope.maplist[j].City == $scope.map.City && $scope.maplist[j].Hall==$scope.map.Hall &&  $scope.maplist[j].From==$scope.map.From && $scope.maplist[j].ShowTime== $scope.map.ShowTime)
// {
//   alert("Already movie is assigned to this showtime...please select other showtime... ");
//     }
//       else {
//
//               $http.post('/map/map',$scope.map).success(function (response) {
//                   console.log(response);
//                   console.log("mapping is done");
// refreshMape();
//                   $scope.selloc=false;
//                       $scope.selthr=false;
//                           $scope.seldt=false;
//                             $scope.selst=false;
//
//               });
//       }}
//       }
//       }
//       catch(e){}
//     };

    $scope.removeMap = function (id) {
        console.log(id);
        $http.delete('/map/map/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refreshMape();
            $scope.selloc=false;
                $scope.selthr=false;
                    $scope.seldt=false;
                      $scope.selst=false;
        });
    };

    $scope.editMap = function (id) {
      $scope.selloc=true;
      $scope.selthr=true;
          $scope.seldt=true;
            $scope.selst=true;
         $http.get('/map/map/' + id._id).success(function (response) {
            $scope.map = response[0];

        });
    };

    $scope.updateMap = function () {
        console.log("REACHED UPDATE");
        console.log($scope.map._id);
        $http.put('/map/map/' + $scope.map._id, $scope.map).success(function (response) {
            console.log(response);
            refreshMape();
            $scope.selloc=false;
                $scope.selthr=false;
                    $scope.seldt=false;
                      $scope.selst=false;
        })
    }

    // $scope.dat=function(){
    //   date=document.getElementById("datepicker").value;
    // // alert(date);
    // console.log(date);
    // }

    $scope.selloc=false;
        $scope.selthr=false;
            $scope.seldt=false;
              $scope.selst=false;
$scope.moviclick=function(){
  var len=document.getElementById("sel").value;
  if(len.length>0){
  $scope.selloc=true;


  }
  else{
    $scope.selloc=false;
  }
}

$scope.th1click=function()
{
  var len=document.getElementById("selloc").value;
  if(len.length>0){
    $scope.selthr=true;
}}

$scope.thclick=function()
{
  var len=document.getElementById("selthr").value;
  if(len.length>0){
    $scope.seldt=true;
      $scope.selst=true;
}}

$scope.selshow=function()
  {
$scope.map.From=document.getElementById("mapdate").value;
console.log($scope.maplist);
console.log($scope.map.Film);
console.log($scope.map.Language);
console.log($scope.map.City);
console.log($scope.map.Hall);
console.log($scope.map.From);
console.log($scope.map.ShowTime);
var i;
  try
   {
   for(i=0;i<=$scope.maplist.length;i++){

if($scope.maplist[i].Film==$scope.map.Film && $scope.maplist[i].Language == $scope.map.Language && $scope.maplist[i].City == $scope.map.City && $scope.maplist[i].Hall==$scope.map.Hall &&  $scope.maplist[i].From==$scope.map.From && $scope.maplist[i].ShowTime== $scope.map.ShowTime)
{
  alert("Already movie is assigned to this showtime... ");
  alert("please select other showtime...");

  }
}
}
catch(e){}
};

$('#selecttime').change(function(){
  $scope.map.From=document.getElementById("mapdate").value;
  console.log($scope.maplist);
  console.log($scope.map.Film);
  console.log($scope.map.Language);
  console.log($scope.map.City);
  console.log($scope.map.Hall);
  console.log($scope.map.From);
  console.log($scope.map.ShowTime);
  var i;
    try
     {
     for(i=0;i<=$scope.maplist.length;i++){

  if($scope.maplist[i].Film==$scope.map.Film && $scope.maplist[i].Language == $scope.map.Language && $scope.maplist[i].City == $scope.map.City && $scope.maplist[i].Hall==$scope.map.Hall &&  $scope.maplist[i].From==$scope.map.From && $scope.maplist[i].ShowTime== $scope.map.ShowTime)
  {
    alert("Already movie is assigned to this showtime... ");
    alert("please select other showtime...");
    $('#selecttime').prop('selectedIndex',0);
  }
}
}
catch(e){}
});
// function emptyst() {
// $("#selecttime").empty();
// }
};
