require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const logger = require('morgan');
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const zip = require('express-easy-zip');
const fileUpload = require('express-fileupload')

const userRouter = require("./routes/User.route");
const bookingRouter = require("./routes/Booking.route");


const port = process.env.PORT || 5000;

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//app.use(bodyParser.json());
app.use(express.json());
app.use(logger('dev'));
app.use(cors('*'));
app.use(zip());
app.use(fileUpload({}));



// Routes
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter);

// Swagger
const swaggerDefinition = {
  info: {
    title: 'Kaggle',
    version: '1.0.0',
    description: 'Kaggle api custom',
  },
  host: 'localhost:' + port,
  basePath: '/api',
};
const options = {
  swaggerDefinition,
  apis: ["routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/swagger.html'));
});
// End Swagger

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
