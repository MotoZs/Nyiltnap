import express from "express";
import db from "./db.js";

const PORT = 3321;
const URL = "/nyiltnap/api/v1";
const app = express();
app.use(express.json());

app.get(`${URL}/telepules`, (req, res) => {
  const telepules = req.query.nev;
  const diakByTelepules = db
    .prepare("SELECT * FROM diakok WHERE telepules = ?")
    .all(telepules);
  res.status(200).json(diakByTelepules);
});

app.get(`${URL}/tanora`, (req, res) => {
  const tanora = req.query.ora;
  const oraAdatai = db
    .prepare(
      "SELECT datum, terem, orasorszam FROM orak WHERE targy = ? ORDER BY datum ASC, orasorszam ASC",
    )
    .all(tanora);
  res.status(200).json(oraAdatai);
});

app.get(`${URL}/9-matematika-fizika`, (req, res) => {
  const kilencEvfolyam = db
    .prepare(
      `
        SELECT csoport, targy, datum 
        FROM orak 
        WHERE csoport LIKE '9%' AND (targy = 'matematika' OR targy = 'fizika')
        ORDER BY targy ASC, datum ASC
    `,
    )
    .all();
  res.status(200).json(kilencEvfolyam);
});

app.listen(PORT, () => {
  console.log(`A szerver fut a ${PORT}-es porton`);
});
