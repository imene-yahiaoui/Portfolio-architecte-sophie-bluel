const email= document.getElementById("email");
const password=document.getElementById("password");
const error = document.getElementById("error");
const valid = document.getElementById ("login-form-submit");


 function logInfrom(){


if (email == "sophie.bluel@test.tld"){

console.log("true");
}
else{
    error.innerHTML="le email ou le mpt de pass pas corect ";
    
console.log("false");
}

 }
valid.addEventListener("click",logInfrom)