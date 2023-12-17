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
  database: "cyberincident",
});

// app.post("/api/login", (req, res) => {
//   const userType = req.body.userType;
//   const username = req.body.username;
//   const password = req.body.password;
//   console.log("step 1 is called");
//   if (userType == "fStaff") {
//     const sql = "SELECT * FROM user WHERE Username = ? AND Password = ?";
//     const values = [username, password];
//     const jwt = require("jsonwebtoken");
//     const secretKey = "albaniaaa"; // Replace with your own secret key

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.json({ success: false, message: "Login failed" });
//       }
//       if (result.length > 0) {
//         const userId = result[0].User_ID; // Assuming the user ID is stored in the 'id' column
//         const token = jwt.sign({ userId, userType }, secretKey, {
//           expiresIn: "1h",
//         }); // Create a token with the user ID

//         // Store the token in the sessions object
//         sessions[token] = userId;

//         return res.json({
//           success: true,
//           data: result,
//           token,
//         });
//       } else {
//         console.log("Login failed");
//         return res.json({ success: false, message: "Login failed" });
//       }
//     });
//   } else if (userType == "handler") {
//     const sql = "SELECT * FROM handler WHERE Username = ? AND Password = ?";
//     const values = [username, password];
//     const jwt = require("jsonwebtoken");
//     const secretKey = "braaazill"; // Replace with your own secret key

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.json({ success: false, message: "Login failed" });
//       }
//       if (result.length > 0) {
//         const handlerId = result[0].Handler_id; // Assuming the user ID is stored in the 'id' column
//         const token = jwt.sign({ handlerId, userType }, secretKey); // Create a token with the user ID

//         // Store the token in the sessions object
//         sessions[token] = handlerId;

//         return res.json({
//           success: true,
//           data: result,
//           token,
//         });
//       } else {
//         console.log("Login failed");
//         return res.json({ success: false, message: "Login failed" });
//       }
//     });
//   }
// });

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType;
  const jwt = require("jsonwebtoken");
  const secretKey = "Albaniaaa"; // Replace with your own secret key

  const sql =
    "SELECT * FROM users WHERE username = ? AND password = ? AND role = ?";
  const values = [username, password, userType];
  console.log("user type is " + userType);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Login failed" });
    }
    if (result.length > 0) {
      const userID = result[0].userID; // Assuming the user ID is stored in the 'id' column
      const token = jwt.sign({ userID, userType }, secretKey, {
        expiresIn: "1h",
      }); // Create a token with the user ID and type

      // Store the token in the sessions object
      sessions[token] = userID;

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
});

app.get("/api/getUserInfo", (req, res) => {
  console.log("getUserInfo is called with userid: " + req.query.UserID);
  const userID = req.query.UserID;
  console.log(userID);
  const sql = "SELECT * FROM users WHERE userID = ?";
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
});

app.post("/api/submitForm", (req, res) => {
  const {
    incidentName,
    incidentType,
    otherIncidentType,
    description,
    incidentDate,
    incidentTime,
    incidentLocation,
    media,
    userID,
    incidentStatus,
  } = req.body;

  const sql =
    "INSERT INTO incidents (incidentName, incidentTypeID, otherIncidentType, description, status, location, dateOccur, timeOccur, picture) VALUES (?,?,?,?,?,?,?,?,?)";
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
  ];

  const newDate = new Date();
  const timeZoneOffset = 7 * 60; // Thailand time offset in minutes (GMT+7)

  // Adjust the date and time
  const adjustedDate = new Date(newDate.getTime() + timeZoneOffset * 60000);

  // Format date and time
  const dateReported = adjustedDate.toISOString().split("T")[0]; // yyyy-mm-dd
  const timeReported = adjustedDate.toISOString().split("T")[1].split(".")[0]; // xx:xx:xx

  console.log(dateReported);
  console.log(timeReported);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Insert Unsuccessful" });
    } else {
      const reportID = result.insertId;
      db.query(
        "INSERT INTO incident_report (incidentID, reporterUserID, dateReported, timeReported) VALUES (?,?,?,?)",
        [reportID, userID, dateReported, timeReported],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.json({
              success: false,
              message: "Insert Unsuccessful2",
            });
          } else {
            db.query(
              "INSERT INTO handler_report (incidentID, criticalID) VALUES (?,?)",
              [reportID, "4"],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res.json({
                    success: false,
                    message: "Insert Unsuccessful3",
                  });
                } else {
                  return res.json({ success: true, result });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.get("/api/getIncidents", (req, res) => {
  db.query(
    "SELECT incidents.incidentID,incidents.incidentName,incidents.status,incident_report.dateReported, incident_report.timeReported, handler_report.handlerReportID,handler_report.criticalID, criticalities.criticalName AS criticality FROM incidents JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN criticalities ON handler_report.criticalID = criticalities.criticalID JOIN incident_report ON incidents.incidentID = incident_report.incidentID WHERE incidents.status<>'Resolved';",
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

app.get("/api/getResolvedIncidents", (req, res) => {
  db.query(
    "SELECT incidents.incidentID,incidents.incidentName,handler_report.handlerReportID, incident_type.incidentTypeName AS incidentTypeName, incident_report.dateResolved as dateResolved FROM incidents JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN incident_type ON incidents.incidentTypeID = incident_type.IncidentTypeID JOIN incident_report ON incidents.incidentID = incident_report.incidentID WHERE incidents.status='Resolved';",
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

app.get("/api/getIncidentTypes", (req, res) => {
  const month = req.body.month;
  db.query("SELECT * FROM incident_type", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result);
      return res.json({ incidentTypes: result });
    }
  });
});

// app.get("/api/getIncidentDetails", (req, res) => {
//   const reportID = req.query.ReportID;
//   console.log("The parsed in ID is" + reportID);
//   const sql =
//     "SELECT * FROM incidents JOIN handler_report ON incidents.incidentID = handler_report.incidentID WHERE incidents.incidentID = ?";
//   const values = [reportID];
//   console.log(reportID);
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.json({ success: false, message: "Login failed" });
//     } else {
//       console.log("WOOHOOOOO");
//       console.log(result);
//       return res.json({ success: true, result });
//     }
//   });
// });

app.get("/api/getIncidentDetails", (req, res) => {
  const incidentID = req.query.incidentID;
  console.log("The parsed in ID is" + incidentID);
  const sql =
    "SELECT incidents.*, incident_report.*, handler_report.*, criticalities.criticalName AS criticality, incident_type.incidentTypeName FROM incidents JOIN incident_report ON incidents.incidentID = incident_report.incidentID JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN criticalities ON handler_report.criticalID = criticalities.criticalID JOIN incident_type ON incidents.incidentTypeID = incident_type.IncidentTypeID WHERE incidents.incidentID = ?;";
  db.query(sql, [incidentID], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Select Unsuccessful" });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

app.get("/api/getPicture", (req, res) => {
  const reportID = req.body.ReportID;
  console.log("The parsed in ID is" + reportID);
  const sql = "SELECT picture FROM incidents WHERE incidentID = ?";
  const values = [reportID];
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
  const responseDescription = req.body.responseDescription;
  const criticality = req.body.criticalityLevel;
  const affectedHosts = req.body.affectedHosts;
  const IPAddress = req.body.IPAddress;
  const sourceIP = req.body.sourceIP;
  const comHost = req.body.comHost;
  const otherApp = req.body.otherApp;
  const impactAssessment = req.body.impactAssessment;
  const actionTaken = req.body.actionTaken;
  const plannedAction = req.body.plannedAction;
  const additionalNotes = req.body.additionalNotes;
  const handlerID = req.body.handlerID;
  // auto-fill
  const incidentID = req.body.incidentID;
  const userID = req.body.userID;
  const media = req.body.media;
  const sql =
    "UPDATE handler_report SET affectedHost = ?, IPAddress = ?, sourceIP = ?, computerHost = ?, otherApplication = ?, criticalID=?, responseDescription = ?, handlerPicture = ?, impactAssessment=?, actionTaken=?, plannedAction=?, additionalNote=? WHERE incidentID = ?";
  const values = [
    affectedHosts,
    IPAddress,
    sourceIP,
    comHost,
    otherApp,
    criticality,
    responseDescription,
    media,
    impactAssessment,
    actionTaken,
    plannedAction,
    additionalNotes,
    incidentID,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Insert Unsuccessful" });
    } else {
      console.log(result);
      db.query(
        "UPDATE incident_report SET handlerID = ? WHERE incidentID = ?",
        [handlerID, incidentID],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.json({ success: false, message: "Insert Unsuccessful" });
          } else {
            db.query(
              "UPDATE incidents SET status = 'Ongoing' WHERE incidentID = ?",
              [incidentID],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res.json({
                    success: false,
                    message: "update3 Unsuccessful",
                  });
                } else {
                  return res.json({ success: true, result });
                }
              }
            );
          }
        }
      );
    }
  });
});

// count no. incidents that are
app.get("/api/getIncidentCount", (req, res) => {
  const year = req.query.year;
  const month = req.query.month;
  const sql =
    "SELECT COUNT(*) as incidentCount FROM incidents WHERE MONTH(dateOccur) = ? and YEAR(dateOccur) = ?";
  db.query(sql, [month, year], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "getIncidentCount unsuccessful",
      });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

// count and calculate avg resolve time
app.get("/api/getAverageResolveTime", (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const sql =
    "SELECT AVG(TIMESTAMPDIFF(HOUR, TIMESTAMP(dateOccur, timeOccur), TIMESTAMP(dateResolved, timeResolved))) as averageResolveTime FROM incidents JOIN incident_report ON incidents.incidentID = incident_report.incidentID WHERE MONTH(dateOccur) = ? AND YEAR(dateOccur) = ? AND status = 'Resolved'";
  db.query(sql, [month, year], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "getAvgResolveTime unsuccessful",
      });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

// count no. incidents for each month starting from current month (loop for 12 month)
app.get("/api/getIncidentsPerMonth", (req, res) => {
  const year = req.query.year;
  const sql = `SELECT all_months.month, IFNULL(incident_counts.incidentCount, 0) as incidentCount
    FROM 
      (SELECT 1 as month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) as all_months
    LEFT JOIN
      (SELECT MONTH(dateOccur) as month, COUNT(*) as incidentCount FROM incidents WHERE YEAR(dateOccur) = ? GROUP BY MONTH(dateOccur)) as incident_counts
    ON all_months.month = incident_counts.month
    ORDER BY all_months.month`;
  db.query(sql, [year], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
        message: "getIncidentsPerMonth unsuccessful",
      });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});

// count no. incidents of each incident type
app.get("/api/getIncidentsPerType", (req, res) => {
  console.log("THIS API IS CALLED");
  const month = req.query.month;
  const year = req.query.year;
  const sql =
    "SELECT incident_type.incidentTypeName, COUNT(*) as incidentCount FROM incidents JOIN incident_type ON incidents.incidentTypeID = incident_type.incidentTypeID WHERE MONTH(dateOccur) = ? AND YEAR(dateOccur) = ? GROUP BY incident_type.incidentTypeName";
  db.query(sql, [month, year], (err, result) => {
    if (err) {
      console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      console.error(err);
      return res.json({
        success: false,
        message: "getIncidentsPerType unsuccessful",
      });
    } else {
      console.log(result);
      return res.json({ success: true, result });
    }
  });
});
app.get("/api/getIncidentHistory", (req, res) => {
  const userID = req.query.userID;
  db.query(
    "SELECT incidents.incidentID,incidents.incidentName,handler_report.criticalID, criticalities.criticalName AS criticality, incident_report.dateResolved, incident_report.dateReported FROM incidents JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN criticalities ON handler_report.criticalID = criticalities.criticalID JOIN incident_report ON incidents.incidentID =  incident_report.incidentID WHERE incidents.status='Resolved' AND incident_report.reporterUserID = ?;",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result);
        return res.json({ incidents: result });
      }
    }
  );
});
app.get("/api/getIncidentProgress", (req, res) => {
  const userID = req.query.userID;
  console.log("The parsed in ID is" + userID);
  const sql =
    "SELECT incidents.incidentID, incidents.incidentName, incident_report.dateReported, incidents.status, handler_report.criticalID, criticalities.criticalName AS HandlerCriticality FROM incidents JOIN incident_report ON incidents.incidentID = incident_report.incidentID JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN criticalities ON handler_report.criticalID = criticalities.criticalID WHERE incident_report.reporterUserID = ? AND incidents.status <> 'Resolved';";
  db.query(sql, [userID], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ success: false, message: "Select Unsuccessful" });
    } else {
      console.log(result);
      //   db.query("SELECT Criticality FROM handler_report WHERE Report_id = ?", [
      //     result[0].Report_id,
      //   ]);
      return res.json({ success: true, result });
    }
  });
});

app.get("/api/getIncidentHistory", (req, res) => {
  const userID = req.query.userID;
  db.query(
    "SELECT incidents.incidentID,incidents.incidentName,handler_report.criticalID, criticalities.criticalName AS criticality, incident_report.dateResolved, incident_report.dateReported FROM incidents JOIN handler_report ON incidents.incidentID = handler_report.incidentID JOIN criticalities ON handler_report.criticalID = criticalities.criticalID JOIN incident_report ON incidents.incidentID =  incident_report.incidentID WHERE incidents.status='Resolved' AND incident_report.reporterUserID = ?;",
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: "Select Unsuccessful" });
      } else {
        // console.log(result);
        return res.json({ success: true, result });
      }
    }
  );
});

// API to get

// app.use("/api", require("./router.js"));
// router.route("http://localhost:3000/create").post(create_user);

app.post("/api/resolveIncident", (req, res) => {
  const incidentID = req.body.incidentID;
  const handlerID = req.body.handlerID;
  const newDate = new Date();

  const timeZoneOffset = 7 * 60; // Thailand time offset in minutes (GMT+7)

  // Adjust the date and time
  const adjustedDate = new Date(newDate.getTime() + timeZoneOffset * 60000);

  // Format date and time
  const date = adjustedDate.toISOString().split("T")[0]; // yyyy-mm-dd
  const time = adjustedDate.toISOString().split("T")[1].split(".")[0]; // xx:xx:xx

  console.log(dateReported);
  console.log(timeReported);

  const sql =
    "UPDATE incidents JOIN incident_report ON incidents.incidentID = incident_report.incidentID SET status = 'Resolved', incident_report.dateResolved = ?, incident_report.timeResolved = ?, incident_report.handlerID = ? WHERE incidents.incidentID = ?";
  const values = [date, time, handlerID, incidentID];
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
