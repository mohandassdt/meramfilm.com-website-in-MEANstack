

'use strict';

module.exports = function($scope, $http,$log, $rootScope,$location) {
// $rootScope.bookedMovie=true;
$scope.movieinfo = $rootScope.bookedMovie;
console.log(  $scope.movieinfo );


var refreshRate = function() {
    $http.get('/rt/rt').success(function(response) {
        console.log('ratingg IS SUCCESSFUL');
        $scope.rateList = response;
        $scope.rate = "";
        // $scope.rate.cnMail='';
    });
};
refreshRate();



var refreshMape = function () {
      $http.get('/map/map').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.maplist = response;
          $scope.map = "";

      });
  };

  refreshMape();
  var self = this;
self.submit = function() {
    console.log('Form is submitted with following user', self.user);}
var cnt=0;

$scope.doneRate= function (rateList) {
  $scope.rate.Title=$scope.movieinfo.Film;
$scope.rate.moviYear=$scope.movieinfo.Year;

  $scope.rate.moviLanguage=$scope.movieinfo.Language;
  // var mname=$scope.rate.Title;
  $http.post('/rt/rt', $scope.rate).success(function (response) {
            console.log(response);

            $http.get('/rt/rt').success(function (response) {
                 console.log(response);
                 var mname=$scope.rate.Title;
             var count=0;
             var i;
               try
                {
                for(i=0;i<=response.length;i++){


          if(response[i].Title==mname)
          {
              console.log(response[i].rating);
                cnt++;
                count+=parseInt(response[i].rating);
                  console.log(count);
                }

            }

                }
             catch(e){}

              if(count>0)
              {
                  $scope.rate.Total=Math.round(count*100/(cnt*5));
              console.log($scope.rate.Total);

                  }

                  });
                  });

           }

refreshRate();



$scope.confirmRate= function () {
                          console.log("REACHED UPDATE");
                          var i;
                          for(i=0;i<=$scope.maplist.length;i++){

                                  if($scope.maplist[i].Film== $scope.rate.Title){
                  console.log($scope.maplist[i]._id);

                            $scope.maplist[i].totalRating=$scope.rate.Total;
                            // $scope.maplist[i].user=$scope.rate.cnUser;
                            // $scope.maplist[i].comment=$scope.rate.comments;
                            console.log($scope.maplist[i]);
                            $http.put('/map/map/' + $scope.maplist[i]._id, $scope.maplist[i]).success(function (response) {
                                console.log(response);
                                refreshMape();
                                alert("rating succesfull");
                                $location.path('/home');
                              })
                            }
                          }
                        }
  };
