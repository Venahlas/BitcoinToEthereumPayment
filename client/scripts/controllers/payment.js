'use strict';

angular.module('BitcoinToEthereum')
  .controller('PaymentController', ['$scope', 'PaymentService',
    function ($scope, PaymentService) {
      $scope.depositAddress='';
      $scope.returnAddress='';
      $scope.amount=0;
      $scope.error='';
      $scope.initiatePayment = function(){
        PaymentService.initiatePayment($scope.returnAddress, $scope.amount).then(
          function(data){
            console.log(data);
            var data = data.data;
            if(data.error) {
              $scope.error = data.error
            }
            else {
              $scope.error='';
              $scope.expiration=new Date(data.success.expiration).toTimeString();
              $scope.depositAddress=data.success.deposit;
              $scope.depositAmount=data.success.depositAmount;
            }
          }).catch(function(err){
            console.log(err);
          });;
      }
    }
  ]);
