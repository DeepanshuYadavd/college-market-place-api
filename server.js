import app from "./app.js";
import { db } from "./cofig/db.js";

const port = process.env.PORT || 5000;

//  db
db()

//  localhost:
app.listen(port, () => {
  console.log(`localhost running at port ${port}`);
});
