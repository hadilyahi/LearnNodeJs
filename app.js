const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth")
const  mongoose  = require("mongoose");
const logger = require("./middlewares/logger");
const {notFound ,errorHandler} = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();
// connection To Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB..."))
  .catch((error) => console.log("Connection Failed To MongoDB", error));
// init App :
const app = express();
 
// Apply Middlwares :
app.use(express.json());
app.use(logger);
// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);
//Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
