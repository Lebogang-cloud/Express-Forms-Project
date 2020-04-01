const {Client} = require("pg")
const express = require ("express")

const app = express();
app.use(express.json())

const client = new Client({
  "user": "user",
  "host": "localhost",
  "database": "db",
  "password": "pass",
  "port": 5432
})
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.get("/", async (req, res) =>{
  const rows = await readVisitor();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

app.post('/index.html', async (req, res) =>{
  let result = {}
  try{
    const reqJson = req.body.item;
    await addNewVisitor(reqJson.visitor);
    result.success = true;
    
  }
  catch (e){
   result.success=false
  }
  finally{
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
    res.send("Thanks for the info!")

  }
})

app.listen(3000, () => console.log("Web server is listening.. on http://localhost:[3000]"))

Start()
async function Start(){
  await connect();
  // const visitors = await readVisitor();
  // console.log(visitors)

  // const successCreate = await createVisitor("visitor created")
  // console.log(`Creating was ${successCreate}`)

}

async function connect() {
  try {
    await client.connect();
  }
    catch(e) {
      console.error(`Failed to connect ${e}`)
    }
}

async function readVisitor() {
  try {
    const results = await client.query("")
    return results.rows;
  }
  catch(e){
    return [];
  }
}
async function addNewVisitor(visitorText){
  try {
    await client.query("insert into visitors (text) values ($1)", [visitorText]);
    return true
  }
  catch(e) {
    return false;
  }
}
// app.use(express.urlencoded({extended:false}))


//   pool.connect()
//     .then(() =>
//       pool.query(
//         "create table visitors(id serial primary key, fullname varchar, age int, date_of_visit date, time_of_visit time, assisted_by varchar, comments varchar)",
//         (error, respond) => {
//           console.log(error, respond);
//         }
//       )
//     )
//     .then(() => console.log("successfully created the table"))
//     .catch(e => console.log(e))
//     .finally(() => client.end());





// app.post('/create-item', function(req, res){
//     console.log(req.body.item)
//     
// })
// })
