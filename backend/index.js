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
        const token = jwt.sign({ userId, userType }, secretKey, {
          expiresIn: "1h",
        }); // Create a token with the user ID

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
        const handlerId = result[0].Handler_id; // Assuming the user ID is stored in the 'id' column
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

app.get("/api/getUserInfo", (req, res) => {
  if (req.query.UserType == "fStaff") {
    console.log("getUserInfo is called with userid: " + req.query.UserID);
    const userID = req.query.UserID;
    console.log(userID);
    const sql = "SELECT * FROM user WHERE User_ID = ?";
    const values = [userID];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Login failed" });
      } else {
        console.log(result);
        return res.json({ success: true, result });
      }
    });
  }
  if (req.query.UserType == "handler") {
    console.log("getUserInfo is called with handlerid: " + req.query.HandlerID);
    const handlerID = req.query.HandlerID;
    const sql = "SELECT * FROM handler WHERE Handler_id = ?";
    const values = [handlerID];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Login failed" });
      } else {
        console.log(result);
        return res.json({ success: true, result });
      }
    });
  }
});

app.post("/api/submitForm", (req, res) => {
  const incidentName = req.body.incidentName;
  const incidentType = req.body.incidentType;
  const otherIncidentType = req.body.otherIncidentType;
  const description = req.body.description;
  const incidentDate = req.body.incidentDate;
  const incidentTime = req.body.incidentTime;
  const incidentLocation = req.body.incidentLocation;
  const media = req.body.media;
  const userID = req.body.userID;
  const incidentStatus = req.body.incidentStatus;

  const sql =
    "INSERT INTO user_report (Incident_name, Incident_type, Other_incident_type, Description, Incident_status, Location, Date, Time, Picture, User_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
  const values = [
    incidentName,
    incidentType,
    otherIncidentType,
    description,
    incidentStatus,
    incidentLocation,
    incidentDate,
    incidentTime,
    media,
    userID,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Insert Unsuccessful" });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

app.get("/api/getIncidents", (req, res) => {
  db.query(
    "SELECT user_report.Report_id,user_report.Incident_name,user_report.Incident_status,user_report.Date,handler_report.Handler_reportid,handler_report.Criticality FROM user_report JOIN handler_report ON user_report.Report_id = handler_report.Report_id WHERE handler_report.Criticality <> 'Resolved';",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        return res.json({ incidents: result });
      }
    }
  );
});

app.get("/api/getIncidentDetails", (req, res) => {
  const reportID = req.query.ReportID;
  console.log("The parsed in ID is" + reportID);
  const sql =
    "SELECT * FROM user_report JOIN handler_report ON user_report.Report_id = handler_report.Report_id WHERE user_report.Report_id = ?";
  const values = [reportID];
  console.log(reportID);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Login failed" });
    } else {
      console.log("WOOHOOOOO");
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

app.post("/api/submitHandlerReport", (req, res) => {
  const reportID = req.body.reportID;
  const handlerID = req.body.handlerID;
  const sql =
    "INSERT INTO handler_report (Report_id, Criticality, Description) VALUES (?,?,?)";
  const values = [reportID, criticality, description];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Insert Unsuccessful" });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

// app.use("/api", require("./router.js"));
// router.route("http://localhost:3000/create").post(create_user);
