'use strict';


var angular = require('angular');
require('angular-route');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('angularjs-dropdown-multiselect');

// require('../css/app.scss');

var app = angular.module('movieApp', [ 'ngRoute', 'angularjs-dropdown-multiselect']);


require('./controller');
require('./service');

app.filter('unique', function() {

   return function(collection, keyname) {

      var output = [],
          keys = [];


      angular.forEach(collection, function(item) {

          var key = item[keyname];

          if(keys.indexOf(key) === -1) {

              keys.push(key);

              output.push(item);
          }
      });

      return output;
   };
});







app.config(function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
  })

  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
  .when('/booking', {
    templateUrl: 'views/booking.html',
    controller: 'BookingController',
    access: {restricted: true}})
    .when('/cancellation', {
      templateUrl: 'views/cancellation.html',
      controller: 'CancellationController',
    })
    .when('/moviebook', {
      templateUrl: 'views/moviebook.html',
      controller: 'TicketBookingController',
    })
    .when('/trailer', {
      templateUrl: 'views/trailer.html',
      controller: 'HomeController',

    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
    })
    .when('/movie-rate', {
      templateUrl: 'views/movie-rate.html',
      controller: 'RateController',
    })
    .when('/Confirm', {
      templateUrl: 'views/Confirm.html',
      controller: 'ConfirmController',
    })
    .when('/sample', {
      templateUrl: 'views/sample.html',
      // controller: 'SampleController',
    })
    .otherwise({
      redirectTo: '/home',
    });



});

app.directive("datepicker1", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "dd/mm/yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
