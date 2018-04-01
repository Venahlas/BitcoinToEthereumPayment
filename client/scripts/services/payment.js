'use strict';

angular.module('BitcoinToEthereum')
  .factory('PaymentService', ['$http', '$q',
    function ($http, $q) {

      return {
        initiatePayment: function(returnAddress, amount) {
          var deferred = $q.defer();

          $http({
            method: 'POST',
            url : '/api/initiatepayment',
            data: {
              returnAddress : returnAddress,
              amount : amount
            }
          }).then(
            function (data) {
              deferred.resolve(data);
          },function (err) {
              deferred.reject(err);
          });

          return deferred.promise;
        },
      };
    }
  ]);
