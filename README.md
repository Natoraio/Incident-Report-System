# Incident-Report-System
"SIIT Cyber Incident Reporting Management System" is a project created to make reporting cyber incidents easier for the SIIT staff members, as well as to utilize collected data to notice trends and generate monthly report summaries.

### Setting up MAMP database
Since our solution is based on the MAMP (local mysql database), we recommend you to install MAMP, and import our database (attached in the email) into your localhost to test our functionalities to their full potential. The database name is ```cyberincident```. After importing the database, make sure that both Apache and MySQL servers are running.

### Command for Installations
There are several packages and libraries that are referenced and used within this project. Direct pulling from Github shouldn't post any issues, however, if you encounter any error regarding missing packages, functions, libraries, or undefined variables, make sure to use the following commands accordingly. Here are a few examples of how we did it.
```
npm install sweetalert2
npm install axios
npm install recharts
... // and other necessary packages / libraries
```
### Commands for Running the Web Pages
Since our solution runs on a React website, it requires you to run certain commands to run both the backend server and the frontend services.
For backend server, make sure you are directed to the 'backend' directory : ```cd backend```, then run the server using : ```npm run dev```.
For the frontend service, direct your terminal to the 'frontend' directory : ```cd frontend```, then run the service using : ```npm run dev```.

### LocalHost link
After running the frontend and backend codes, visit this link to test our solution using a browser of your choice : ```http://localhost:5173/```
If the visited website has a black / dark grey background, consider toggling your display mode from dark to light mode. (I know that this is not ideal, but we have a deadline to meet!)

### Database Error Encounters
If you happen to have a different user, host, and/or password in your MySQL, make changes to these lines of code into your information :
```
// Located in backend/index.js  lines 14 to 19
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "cyberincident",
});
```

### Login Information
The test accounts for this project are:
1. Kenji (Faculty Staff) - Username: ```staff1``` Password: ```1234```
2. Uno (Facultyy Staff) - Username: ```uno4``` Password: ```4444```
3. Henry (Incident Handler) - Username: ```henry3``` Password: ```3333```

## Enjoy!
