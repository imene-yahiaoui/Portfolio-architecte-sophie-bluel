
 
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
.then(data=> {   console.log(data) 
 
//recupre le token dans le localStorage
    localStorage.setItem("token",data.token);
    //lien ver la page model 
        location.href ="/FrontEnd/index.html"

})


.catch(err=> console.log((err)));


}) 



