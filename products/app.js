const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const rabbitmq = require('./rabbitmq')
const app = express();

const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');
const userRoute = require('./routes/productRoute');

const accessLog = require('./middleware/accessLog');
const messageListener = require('./rabbitmq/rabbitmq');

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());


app.use('/test', accessLog, testRoute);
app.use('/user', accessLog, userRoute);
app.use('/product', accessLog, userRoute);

messageListener().catch((error) => {
  console.error('Error running message listener: ', error)
});

app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`);
});
