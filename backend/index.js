const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

let sessions = {};

app.use(express.json());
app.use(cors());
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "incident",
});

app.post("/api/login", (req, res) => {
  const userType = req.body.userType;
  const username = req.body.username;
  const password = req.body.password;
  console.log("step 1 is called");
  if (userType == "fStaff") {
    console.log("The code is cargrgrgrgrglled");
    const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
    const values = [username, password];
    const jwt = require("jsonwebtoken");
    const secretKey = "albaniaaa"; // Replace with your own secret key

    // ...

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Login failed" });
      }
      if (result.length > 0) {
        const userId = result[0].User_ID; // Assuming the user ID is stored in the 'id' column
        const userType = result[0].userType; // Assuming the user type is stored in the 'userType' column
        const token = jwt.sign({ userId, userType }, secretKey); // Create a token with the user ID

        // Store the token in the sessions object
        sessions[token] = userId;

        return res.json({
          success: true,
          data: result,
          token,
        });
      } else {
        console.log("Login failed");
        return res.json({ success: false, message: "Login failed" });
      }
    });
  }
});

// app.use("/api", require("./router.js"));
// router.route("http://localhost:3000/create").post(create_user);
