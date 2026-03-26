let user = JSON.parse(localStorage.getItem("user"))
/* REGISTER */

function register(){

fetch("/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:document.getElementById("name").value,
email:document.getElementById("email").value,
password:document.getElementById("password").value

})

})

.then(res=>res.text())
.then(data=>{
alert(data)
window.location="login.html"
})

}

/* LOGIN */

function login(){

fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:document.getElementById("email").value,
password:document.getElementById("password").value

})

})

.then(res=>res.json())
.then(data=>{

localStorage.setItem("user",JSON.stringify(data))
localStorage.setItem("role","user")

window.location="dashboard.html"

})

}

/* LOAD EVENTS */

fetch("/events")

.then(res=>res.json())

.then(events=>{

let html=""

events.forEach(e=>{

html+=`

<div class="card">

<img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30">

<div class="card-content">

<h3>${e.title}</h3>

<p>${e.location}</p>

<p>${e.date}</p>

<p>$${e.price}</p>

<button onclick="bookEvent(${e.id})">Book</button>

</div>

</div>

`

})

if(document.getElementById("events"))
document.getElementById("events").innerHTML=html

})

/* CREATE EVENT */

function createEvent(){

fetch("/create-event",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:document.getElementById("title").value,
location:document.getElementById("location").value,
date:document.getElementById("date").value,
price:document.getElementById("price").value

})

})

.then(res=>res.text())
.then(msg=>alert(msg))

}
function adminLogin(){

const username=document.getElementById("adminUser").value
const password=document.getElementById("adminPass").value

if(username==="admin" && password==="admin123"){

localStorage.setItem("role","admin")

window.location="admin-dashboard.html"

}else{

alert("Invalid Admin Credentials")

}


}
function addEvent(){

const user = JSON.parse(localStorage.getItem("user"))

fetch("/create-event",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:document.getElementById("title").value,
location:document.getElementById("location").value,
date:document.getElementById("date").value,
price:document.getElementById("price").value,
user_id:user.id

})

})

.then(res=>res.text())
.then(data=>{
alert(data)
window.location="dashboard.html"
})

}
function loadNavbar(){

const role = localStorage.getItem("role")

let nav=""

if(role==="admin"){

nav=`

<div class="navbar">

<div class="logo">Eventbux</div>

<div class="nav-links">
<a href="admin-dashboard.html">Admin Dashboard</a>
<a href="#" onclick="logout()">Logout</a>
</div>

</div>

`

}

else if(role==="user"){

nav=`

<div class="navbar">

<div class="logo">Eventbux</div>

<div class="nav-links">
<a href="home.html">Home</a>
<a href="dashboard.html">My Dashboard</a>
<a href="add-event.html">Add Event</a>
<a href="#" onclick="logout()">Logout</a>
</div>

</div>

`

}

else{

nav=`

<div class="navbar">

<div class="logo">Eventbux</div>

<div class="nav-links">
<a href="home.html">Home</a>
<a href="login.html">Login</a>
<a href="register.html">Register</a>
<a href="admin-login.html">Admin</a>
</div>

</div>

`

}

document.getElementById("navbar").innerHTML=nav

}
function protectPages(){

const role = localStorage.getItem("role")

const page = window.location.pathname

if(page.includes("admin-dashboard") && role!=="admin"){

alert("Admin access only")
window.location="home.html"

}

if(page.includes("dashboard") && role!=="user"){

alert("User access only")
window.location="home.html"

}

}
function logout(){

localStorage.clear()

window.location="home.html"

}


/* BOOK EVENT */

function bookEvent(id){

const user=JSON.parse(localStorage.getItem("user"))

fetch("/book",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

user_id:user.id,
event_id:id

})

})

.then(res=>res.text())
.then(msg=>alert(msg))

}


if(user && document.getElementById("myEvents")){

fetch("/events")

.then(res=>res.json())

.then(events=>{

let html=""

events.forEach(e=>{

if(e.user_id===user.id){

html+=`

<div class="card">

<div class="card-content">

<h3>${e.title}</h3>

<p>${e.location}</p>

<p>${e.date}</p>

<p>$${e.price}</p>

</div>

</div>

`

}

})

document.getElementById("myEvents").innerHTML=html

})

}

/* LOAD BOOKINGS */



if(user && document.getElementById("myEvents")){

fetch("/mybookings/"+user.id)

.then(res=>res.json())

.then(data=>{

let html=""

data.forEach(e=>{

html+=`<p>${e.title} - ${e.date}</p>`

})

document.getElementById("myEvents").innerHTML=html

})

}
/* LOAD EVENTS FOR ADMIN */

if(document.getElementById("adminEvents")){

fetch("/events")

.then(res=>res.json())

.then(events=>{

let html=""

events.forEach(e=>{

html+=`

<div class="card">

<div class="card-content">

<h3>${e.title}</h3>

<p>${e.location}</p>

<p>${e.date}</p>

<p>$${e.price}</p>

<button onclick="deleteEvent(${e.id})">Delete</button>

</div>

</div>

`

})

document.getElementById("adminEvents").innerHTML=html

})

}