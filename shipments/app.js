const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const database = require('./infrastructure/database')
const app = express();
const { SetupSwagger } = require('./middleware/swagger');
const shipmentRoute = require('./routes/shipmentRoute');
const {setupTracing} = require("./middleware/setup-tracing");
const {setupRouteTracing} = require("./middleware/setup-route-tracing");
const { simulateShipmentUpdates } = require('./rabbitmq/shipmentSimulation');
const accessLog = require('./middleware/accessLog');

setupTracing();
setupRouteTracing(app);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());


app.use('/shipments', accessLog, shipmentRoute);
SetupSwagger(app);

database.initialize();
simulateShipmentUpdates();

app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`);
});
