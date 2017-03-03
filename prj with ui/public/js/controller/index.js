'use strict';

var app = require('angular').module('movieApp');

app.controller('BookingController', require('./bookingController'));
app.controller('CancellationController', require('./cancellationController'));
app.controller('HomeController', require('./homeController'));
app.controller('TicketBookingController', require('./ticketBookingController'));
app.controller('RateController', require('./rateController'));
app.controller('ConfirmController', require('./confirmController'));
app.controller('RegisterController', require('./registerController'));
app.controller('LoginController', require('./loginController'));
app.controller('LogoutController', require('./logoutController'));
app.controller('SampleController', require('./sampleController'));
