'use strict';

module.exports = function($scope, $http, $rootScope,$location) {

  var refresh = function() {
      $http.get('/movie/movie').success(function(response) {
          console.log('READ IS SUCCESSFUL');
          $scope.moviList = response;
          $scope.movi = "";
      });
  };
  refresh();


  var refreshMape = function () {
        $http.get('/map/map').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.maplist = response;
            $scope.map = "";

        });
    };

    refreshMape();

// $scope.searching

 $scope.bookTicket= function (m) {

                    //  $scope.searching=$scope.m.moviTitle;
                     $rootScope.bookedMovie=m;
  $location.path('/moviebook');
          };

          // $scope.submit= function (m) {
          //
          //                   $scope.searching=m;
          //                     $rootScope.bookedMovie=m;
          //  $location.path('/moviebook');
          //          };

          $scope.Rate= function (m) {


                              $rootScope.bookedMovie=m;
           // alert($rootScope.bookedMovie);
           $location.path('/movie-rate');
                   };


};
