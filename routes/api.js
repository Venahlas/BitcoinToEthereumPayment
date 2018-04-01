const payment = require('../payment/index')
const express = require('express');
const router = express.Router();
var depositAddress="";
var paymentChecker;
router.post('/initiatepayment', function(req, res, next) {
  //Ideally we would setup some sort of way to monitor multiple trasctions
  //but since this is a proof of concept just clearing it out if there is a new
  //request is fine for now.
  if(paymentChecker!=null){
    clearInterval(paymentChecker);
  }
  console.log("initiatepayment")
  console.log(req.body);
  payment.initiatePayment(req.body.returnAddress, req.body.amount).then(
    function(parsedBody){
      console.log(parsedBody);
      depositAddress=parsedBody.success.deposit;
      paymentChecker=setInterval(checkOnPayment, 30000)
      res.json(parsedBody);
  });
});

//monitors the transaction every 30 seconds until it fails or completes
function checkOnPayment(){
  payment.checkOnPaymentStatus(depositAddress).then(
    function(parsedBody){
      console.log(parsedBody);
      if(parsedBody.status=="no_deposits"){
        payment.checkOnTransactionStatus(depositAddress).then(
          function(parsedBody){
            console.log(parsedBody);
            if(parsedBody.status=="expired"){
              clearInterval(paymentChecker)
            }
          });
      } else if(parsedBody.status=="complete" || parsedBody.status=="failed"){
        clearInterval(paymentChecker);
      };
    })
}
module.exports = router;
