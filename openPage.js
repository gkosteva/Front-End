const form1=document.getElementsByTagName("form")[0];
const form2=document.getElementsByTagName("form")[1];

form1.addEventListener("submit", (event)=>{
event.preventDefault();
});
form2.addEventListener("submit", (event)=>{
    event.preventDefault();
    });  
  

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";  
  import {
    getDatabase,
    ref,
    set,
    push,
   remove,
   onValue} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB1-IyA_YjMqdfGI0sB3xQlA7afFEON37M",
    authDomain: "memory-matching-7a671.firebaseapp.com",
    databaseURL: "https://memory-matching-7a671-default-rtdb.firebaseio.com",
    projectId: "memory-matching-7a671",
    storageBucket: "memory-matching-7a671.appspot.com",
    messagingSenderId: "930630082537",
    appId: "1:930630082537:web:51d29918f52a921d53b578",
    measurementId: "G-144NK46TSV"
  };

const registerButt=document.querySelector("#registerButton");
const loginForm=document.querySelector("#loginform");
const registerform=document.querySelector("#regForm");
const prevRegButt=document.querySelector("#buttonSection");

registerButt.addEventListener('click', ()=>{
    loginForm.style.display = 'none';
    prevRegButt.style.display='none';
    registerform.classList.remove("hide");
    registerform.classList.add("registerForm");
});

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database=getDatabase(app);

function writeUserData(firstName,lastName, email, psassword,) {
    const database = getDatabase();
    set(ref(database, 'users/' + firstName+lastName), {
      firstname: firstName,
      lastname: lastName,
      email: email,
      psassword:psassword
    });
  }

     