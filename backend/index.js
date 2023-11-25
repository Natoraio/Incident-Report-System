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
    const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
    const values = [username, password];
    const jwt = require("jsonwebtoken");
    const secretKey = "albaniaaa"; // Replace with your own secret key

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Login failed" });
      }
      if (result.length > 0) {
        const userId = result[0].User_ID; // Assuming the user ID is stored in the 'id' column
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
  } else if (userType == "handler") {
    const sql = "SELECT * FROM handler WHERE Username = ? AND Password = ?";
    const values = [username, password];
    const jwt = require("jsonwebtoken");
    const secretKey = "braaazill"; // Replace with your own secret key

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Login failed" });
      }
      if (result.length > 0) {
        const handlerId = result[0].Handler_ID; // Assuming the user ID is stored in the 'id' column
        const token = jwt.sign({ handlerId, userType }, secretKey); // Create a token with the user ID

        // Store the token in the sessions object
        sessions[token] = handlerId;

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

app.post("/api/submitForm", (req, res) => {
  const incidentName = req.body.incidentName;
  let incidentType;
  if (req.body.otherIncidentType == null) {
    incidentType = req.body.incidentType;
  } else {
    incidentType = req.body.otherIncidentType;
  }
  const description = req.body.description;
  const incidentDate = req.body.incidentDate;
  const incidentTime = req.body.incidentTime;
  const incidentLocation = req.body.incidentLocation;
  const media = req.body.media;
  const userID = req.body.userID;

  const sql =
    "INSERT INTO user_report (Incident_name, Incident_type, Description, Incident_status, Location, Date, Time, Picture, User_id) VALUES (?,?,?,?,?,?,?,?)";
  const values = [
    incidentName,
    incidentType,
    description,
    "Pending",
    incidentLocation,
    incidentDate,
    incidentTime,
    media,
    userID,
  ];
});

// app.use("/api", require("./router.js"));
// router.route("http://localhost:3000/create").post(create_user);
