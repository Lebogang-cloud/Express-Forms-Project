require("dotenv").config();

const {Client} = require("pg");
const client = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
});

client.connect();
const createTable = async () => {
  try {
    const sql = await client.query(
      `CREATE TABLE IF NOT EXISTS 
           Visitors(
            ID SERIAL PRIMARY KEY,
            visitor_name VARCHAR(100),
            assistant VARCHAR(100),
            visitor_age INTEGER,
            date_of_visit DATE,
            time_of_visit TIME,
            comments VARCHAR(225)
        );`
    );
  } catch (error) {
    console.log(e);
  }
};

const addNewVisitor = async (name, assistedby, age, date, time, comments) => {
  const sql =
    "INSERT INTO visitors(visitor_name,assistant,visitor_age,date_of_visit,time_of_visit,comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [name, assistedby, age, date, time, comments];
  try {
    let query = await client.query(sql, values);
    return query.rows;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addNewVisitor,
  createTable
};
