const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const rabbitmq = require('./rabbitmq/rabbitmq')
const database = require('./infrastructure/database')
const app = express();
const { SetupSwagger } = require('./middleware/swagger');
const testRoute = require('./routes/testRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const {setupTracing} = require("./middleware/setup-tracing");
const {setupRouteTracing} = require("./middleware/setup-route-tracing");

const accessLog = require('./middleware/accessLog');

setupTracing();
setupRouteTracing(app);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());


app.use('/tests', accessLog, testRoute);
app.use('/users', accessLog, userRoute);
app.use('/products', accessLog, productRoute);
SetupSwagger(app);

database.initialize();

rabbitmq.messageListener().catch((error) => {
  console.error('Error running message listener: ', error)
});

app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`);
});
