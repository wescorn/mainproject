swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description:
          "This is an APIGateway that unifies Swagger docs of the different microservices, made of varying technologies",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
      },
      servers: [

      ],
    },
    apis: ["http://products/swagger", "http://orders/swagger"],
  };

const specs = swaggerJsdoc(options);
const SetupSwagger = (app) => {
    app.use(
        "/swagger",
        swaggerUi.serve,
        swaggerUi.setup(specs)
      );
}
  
module.exports = {
    SetupSwagger
}
