 localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");

 
const email= document.getElementById("email");
const password=document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById ("login-form-submit");
const form = document.getElementById("login-form");


 
form.addEventListener('submit',function(e){

e.preventDefault();

//recupere les inputs
const information =new FormData(form);
const payload= new URLSearchParams(information);

console.log([...payload]);


fetch('http://localhost:5678/api/users/login',{
method:"POST",
 
body:payload,


})
.then(res=> res.json())
.then(data=> console.log(data))
.catch(err=> console.log((err)));



}) 


 