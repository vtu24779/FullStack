const express = require("express")
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname))

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"prathibha",
database:"campus_events"
})

db.connect(err=>{
if(err) throw err
console.log("MySQL Connected")
})

/* REGISTER */

app.post("/register",(req,res)=>{

const {name,email,password}=req.body

db.query(
"INSERT INTO users(name,email,password) VALUES(?,?,?)",
[name,email,password],
(err,result)=>{
if(err) return res.send(err)
res.send("Registered Successfully")
})

})

/* LOGIN */

app.post("/login",(req,res)=>{

const {email,password}=req.body

db.query(
"SELECT * FROM users WHERE email=? AND password=?",
[email,password],
(err,result)=>{

if(result.length===0)
return res.send("Invalid credentials")

res.json(result[0])

})

})

/* GET EVENTS */

app.get("/events",(req,res)=>{

db.query("SELECT * FROM events",(err,result)=>{
res.json(result)
})

})

/* CREATE EVENT */

app.post("/create-event",(req,res)=>{

const {title,location,date,price,user_id}=req.body

db.query(
"INSERT INTO events(title,location,date,price,user_id) VALUES(?,?,?,?,?)",
[title,location,date,price,user_id],
(err,result)=>{

if(err) return res.send(err)

res.send("Event Added Successfully")

})

})

/* BOOK EVENT */

app.post("/book",(req,res)=>{

const {user_id,event_id}=req.body

db.query(
"INSERT INTO bookings(user_id,event_id) VALUES(?,?)",
[user_id,event_id],
(err,result)=>{
if(err) return res.send(err)
res.send("Event Booked")
})

})
app.delete("/delete-event/:id",(req,res)=>{

db.query(
"DELETE FROM events WHERE id=?",
[req.params.id],
(err,result)=>{

if(err) return res.send(err)

res.send("Event Deleted")

})

})
function deleteEvent(id){

fetch("/delete-event/"+id,{
method:"DELETE"
})

.then(res=>res.text())
.then(msg=>{
alert(msg)
location.reload()
})

}

/* USER BOOKINGS */

app.get("/mybookings/:id",(req,res)=>{

db.query(
`SELECT events.title,events.date
FROM bookings
JOIN events ON bookings.event_id=events.id
WHERE bookings.user_id=?`,
[req.params.id],
(err,result)=>{
res.json(result)
})

})

app.listen(3000,()=>{
console.log("Server running http://localhost:3000/home.html")
})