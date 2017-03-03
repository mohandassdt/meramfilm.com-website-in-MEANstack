'use strict';

module.exports = function($scope, $http,$log, $rootScope,$location) {
$scope.confirmInfo =$rootScope.confirmPage;
// $scope.cnSeatnumbers=$rootScope.seatArrange;
// $scope.confirm.movieName=$scope.confirmInfo.Title;
// $scope.confirm.CityName=$scope.confirmInfo.CityName;

console.log($scope.confirmInfo);

var refreshConfirm = function () {

    $http.get('/con/con').success(function (response) {
        console.log('Confirm READ IS SUCCESSFUL');
        $scope.confirmlist = response;
        $scope.confirm = "";
});
};

refreshConfirm();



$scope.ConfirmBook = function (confirmlist) {
  $scope.confirm.Title=$scope.confirmInfo.Title;
$scope.confirm.cnCityName=$scope.confirmInfo.CityName;
$scope.confirm.cnbookingid=$scope.confirmInfo.bookingid;
  $scope.confirm.cnHallName=$scope.confirmInfo.HallName;
  $scope.confirm.cnDay=$scope.confirmInfo.Day;
  $scope.confirm.cnShowTime=$scope.confirmInfo.ShowTime;
  $scope.confirm.cnAmount=$scope.confirmInfo.Amount;
  $scope.confirm.cnNoTickets=$scope.confirmInfo.NumberOfSeats;
  $scope.confirm.cnseatnumbers=$scope.confirmInfo.seatnumbers;
  $scope.confirm.cnAmount=$scope.confirmInfo.totalAmnt;

  // $scope.confirm.cnseatnumbers=$scope.cnSeatnumbers;


    $http.post('/con/con', $scope.confirm).success(function (response) {
            console.log(response);
alert("booking success...Thank You!!  PLEASE NOTE YOUR BOOKING ID AND SEAT NUMBERS")
            $location.path('/home');


        });

        refreshConfirm();

};


};
