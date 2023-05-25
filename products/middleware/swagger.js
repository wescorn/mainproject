swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
      },
      servers: [
        {
          url: "http://localhost:3000", // this should really be http://products
        },
      ],
    },
    apis: ["./routes/*.js"],
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
