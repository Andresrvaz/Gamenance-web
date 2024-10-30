import express from "express";
import "dotenv/config";
import { sequelize } from "./models/index";
import routes from "./routes";
import bodyParser from "body-parser";

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json({ limit: '2mb' }));

routes(app)

app.listen(port, () => {
  console.log("%c⧭", "color: #ff0000", `server up and running on port ${port}`);
  (async () => {
    try {
      await sequelize.authenticate();
      console.log(
        "%c⧭",
        "color: #00a3cc",
        "Connection has been established successfully"
      );
    } catch (e) {
      console.log("%c⧭ Unable to connect to the database", "color: #733d00", e);
    }
  })();
});
