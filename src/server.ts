import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
