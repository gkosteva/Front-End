
const form1=document.getElementsByTagName("form")[0];
const form2=document.getElementsByTagName("form")[1];

form1.addEventListener("submit", (event)=>{
event.preventDefault();
});

form2.addEventListener("submit", (event)=>{
    event.preventDefault();
});  

    const registerButt=document.querySelector("#registerButton");
    const prevRegButt=document.querySelector("#buttonSection");
    const buttonLogIn=document.getElementById("loginButtong");    
    const registerform=document.querySelector("#regForm");
    const loginForm=document.querySelector("#loginform");
    
    registerButt.addEventListener('click', ()=>{
        loginForm.style.display = 'none';
        prevRegButt.style.display='none';
        registerform.classList.remove("hide");
        registerform.classList.add("registerForm");
    });

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import {
      getDatabase,
      ref,
      set,
      onValue,
    } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    //write in db
        
    function writeUserData(firstName,lastName, email, psassword){
          set(ref(database, 'Users/' + firstName.value ), {
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            password: psassword.value,
            score: 100,
            flips:0
          });
        }
    


//read from db

var arrayDataUsers = new Array(); 
onValue(
  ref(database, 'Users'),
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      arrayDataUsers.push(
        new Object({
          firstname: childKey,
          lastname: childData.lastname,
          email: childData.email,
          password: childData.password,
          score: childData.score,
          flips: childData.flips
        })
      );
    });
  },
  {
    onlyOnce: true,
  }
);
console.log(arrayDataUsers);

//login
const emailLog = document.getElementById("emailLog");
const passwordLog = document.getElementById("passLog");

buttonLogIn.addEventListener("click", () => {
  let logIn = false;
  if (emailLog.value === "" || passwordLog.value === "") {
    alert("Invalid email or password!");
    return;
  }
 
  arrayDataUsers.forEach((user) => {
    if (user.email === emailLog.value && user.password === passwordLog.value) {
      logIn = true;
      window.localStorage.setItem("username", user.firstname);
      window.location.assign("/homePage.html");
    }
  });
 
  if (!logIn){
    alert("Invalid email or password!");
  }
});


       
//registration

const firstname = document.getElementById("firstNR");
const lastName=document.getElementById("lastNR");
const email = document.getElementById("emailR");
const password = document.getElementById("passR");
const passConfirm = document.getElementById("passRetype");
 
const regButtAfter=document.getElementById("registerButt");
regButtAfter.addEventListener("click", () => {
  if (password.value === passConfirm.value) {
    let available = true;
    if (firstname.value === ""|| lastName.value === "" || password.value === "" || email.value === "") {
      return;
    }
    arrayDataUsers.forEach((user) => {
      if (user.email === email.value) {
        available = false;
        alert("Unavailable username!");
        return;
      }
    });
 
    if (available) {
      writeUserData(firstname,lastName,email,password);
      alert("Successfully registered!");
      arrayDataUsers.push(
        new Object({
          firstname: firstname.value,
          lastname: lastName.value,
          email: email.value,
          password: password.value
        }));
        loginForm.style.display = 'flex';
        prevRegButt.style.display='flex';
        registerform.classList.add("hide");
      //window.location.assign("/homePage.html");
      console.log(arrayDataUsers);
    }
   else {
    alert("Repeat your password!");
  }}
});