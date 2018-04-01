const rp = require('request-promise');
const config = require('../config')
var payment = {
  initiatePayment: function(returnAddress, amount){
    var options = {
      method: 'POST',
      uri: 'https://shapeshift.io/sendamount',
      body: {
          pair:"btc_eth",
          amount:amount,
          withdrawal:config.ethereumWalletAddress,
        },
        json: true // Automatically stringifies the body to JSON
      };
      if(returnAddress!=''){
        options.body['returnAddress'] = returnAddress
      }
      return rp(options)
    },
    checkOnPaymentStatus: function(depositAddress) {
      var options = {
        method: 'GET',
        uri: 'https://shapeshift.io/txStat/'+depositAddress,
        json: true
      };
      return rp(options);
    },
    checkOnTransactionStatus: function(depositAddress) {
      var options = {
        method: 'GET',
        uri: 'https://shapeshift.io/timeremaining/'+depositAddress,
        json: true
      };
      return rp(options);
    }
};

module.exports = payment;
