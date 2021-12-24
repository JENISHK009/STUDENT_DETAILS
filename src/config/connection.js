import { set, connect, connection } from "mongoose";

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.qxwqo.mongodb.net/student";
const DATABASE_NAME = "student";

connect(CONNECTION_URL, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
export default { db };
