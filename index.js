const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const api = require('./routes/api');
const app = express();
let port = process.env.PORT || 8888


app.set('views', path.join(__dirname +  '/client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index); //sets our home page route
app.use('/api', api);


app.listen(port, function() {
  console.log('Bitcoin Payments to Ethereum Wallet started on port: ', port);
});
