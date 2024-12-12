import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";
import apiRoutes from "./api/routes";
// Swagger UI và YAMLJS
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
// Load file template.yaml
const swaggerDocument = YAML.load("./template.yaml");

// show doc by Swagger UI.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cấu hình CORS
app.use(function (req, res, next) {
  let method = req.method;
  const allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000";
  const origin = req.headers.origin;

  if (allowedOrigins.split(",").includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (method == "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
apiRoutes(app);
connection(app);
