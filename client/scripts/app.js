'use strict';
var appName = 'BitcoinToEthereum'
angular.module(appName, ['ngRoute','monospaced.qrcode'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/payment.html',
        controller: 'PaymentController'
      }).otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
});
