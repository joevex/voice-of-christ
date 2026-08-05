import { registerChurch } from "./auth.js";

const form=document.getElementById("registerForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const churchName=document.getElementById("churchName").value.trim();

const pastorName=document.getElementById("pastorName").value.trim();

const email =
document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

const confirm=document.getElementById("confirmPassword").value;

if(password!=confirm){

alert("Passwords do not match");

return;

}

try{

await registerChurch(
churchName,
pastorName,
email,
password
);

alert("Registration Successful");

window.location.href="index.html";

}

catch(error){

alert(error.message);

}

});