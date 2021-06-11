const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "ecoSystem",
});

app.post("/create", (req, res) => {
  const DateTime = req.body.DateTime;
  const OxUglerod = req.body.OxUglerod;
  const DioxSery = req.body.DioxSery;
  const DioxAzot = req.body.DioxAzot;
  const Formaldegid = req.body.Formaldegid;
  const Fenol = req.body.Fenol;

  db.query(
    "INSERT INTO airPollution (DateTime, OxUglerod, DioxSery, DioxAzot, Formaldegid, Fenol) VALUES (?,?,?,?,?,?)",
    [DateTime, OxUglerod, DioxSery, DioxAzot, Formaldegid, Fenol],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/airPollution", (req, res) => {
  db.query("SELECT * FROM airPollution", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM airPollution WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
