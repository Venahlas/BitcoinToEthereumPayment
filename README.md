# BitcoinToEthereumPayment

A simple implementation of a website accepting payments to a cryptocurrency
wallet stored on the server. In this case the server wallet is Ethereum and
the paying currency is Bitcoin. The server makes a call to the ShapeShift API
to facilitate the transaction of converting Bitcoin to Ethereum. The user
inputs how much Ethereum they would like to send to the wallet and optionally
a return address for there Bitcoin if something goes wrong converting the cryptocurrency from the ShapeShift end. The Server calls the ShapeShift API with the parameters and then returns to the client the address to deposit Bitcoin into which also gets displayed as a QR code with the amount embedded into it. The address and then amount to send are also displayed below if you prefer to do it manually or have a desktop client you are using.

To setup, edit the config.js file ethereumWalletAddress field with your ethereum
wallet address. Otherwise you will end up paying my wallet that I have left in there as an example.

To install and run
```
npm install
cd client
bower install
cd ..
node index.js
```

then open a browser and navigate to localhost:8888

After the QR code returns after clicking start payment, the server will continually ping the ShapeShift API
for the status of the payment every 30 seconds until it fails or completes. I just console log out the return of the status call. I also then monitor the expiration of the transaction if no deposits have been made. If this were a real payment server we'd want a way to monitor multiple transactions happening but since this is a proof of concept I just clear out the monitor if a new transaction is started.

This is meant to be a very very simple example of my nodejs and angularjs coding skills and to show I have some basic knowledge of how cryptocurrency works for the job I am applying for. It is not supposed to be an optimal setup or exactly how I would structure things if I was developing a nodejs or angularjs application. I only spent one day working on this just to get simple proof of concept working so I would have a basic coding example to put with my application.  
