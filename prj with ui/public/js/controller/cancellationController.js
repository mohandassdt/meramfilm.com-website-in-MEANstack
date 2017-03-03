'use strict';

module.exports = function($scope,$http,$location) {

console.log($scope.idNo);
console.log($scope.movie);
$scope.showd=false;
var i;

  // var refreshConfirm = function () {
  //
  // };
  //
  // refreshConfirm();

$scope.showdetails = function() {


        $http.get('/con/con').success(function (response) {
            // $scope.confirmlist = response;
            // $scope.confirm = "";
            console.log(response);
            for(i=0;i<=response.length;i++){
       console.log(response[i].cnbookingid);
              if(response[i].cnbookingid==$scope.idNo&&response[i].Title==$scope.movie){
           console.log($scope.idNo);
           console.log($scope.movie);
           $scope.cancellist = response[i];
           $scope.cancel = "";
           console.log(response[i]);
 // $scope.showd=true;
  $scope.showd=true;

       }
       }
    });


}


  $scope.cancelBook = function(id) {
    $http.delete('/con/con/' + id._id).success(function(response) {
        console.log(response);
        console.log('CANCELLED SUCCESSFULLY');
        alert('Cancellation Succesfull')
        $location.path('/home');
        // refreshConfirm();
});



  }




};
