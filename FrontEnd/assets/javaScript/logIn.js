const email= document.getElementById("email");
const password=document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById ("login-form-submit");


 function logInfrom(){


if (email =="sophie.bluel@test.tld" & password =="S0phie"){

href="/FrontEnd/assets/pages/pageAdmin.html"
console.log("true");
}
else{
    error.innerHTML="email ou mot de passe incorrect ";
    error.style.color="red";
    
console.log("false");
}

 }
valid.addEventListener("click",logInfrom)