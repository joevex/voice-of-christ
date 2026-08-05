import { loginChurch } from "./auth.js";

const form=document.getElementById("loginForm");

const password=document.getElementById("password");

const toggle=document.getElementById("togglePassword");

toggle.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

toggle.innerHTML="🙈";

}else{

password.type="password";

toggle.innerHTML="👁";

}

});

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email =
document.getElementById("email").value.trim();

const pass=password.value;

try{

await loginChurch(email,pass);
window.location.href="dashboard.html";

}

catch(error){

    console.log(error);

    alert(error.code);
}

});