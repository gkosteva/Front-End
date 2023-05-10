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
function compare( a, b ) {
    const scoreA = a.score;
    const scoreB = b.score;
    const flipsA=a.flips;
    const flipsB=b.flips;
    if(scoreA<scoreB){
        return -1;
    }
    else if(scoreA>scoreB){
        return 1;
    }
    else{
        if(flipsA<flipsB){
            return -1;
        }
        else if(flipsA>flipsB){
            return 1;
        }
        
    return 0;
    }
  }

var clickButtCount=0;
const rankingsBody = document.querySelector("#rankings > tbody");
function populateRankings (arrayDataUsers) {
    // Populate Leaderboard
    arrayDataUsers.sort(compare);
    console.log(arrayDataUsers);
    arrayDataUsers.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML=`<td>${user.firstname}</td>
        <td>${user.score}/s</td>
        <td>${user.flips}</td>`;
        console.log(tr.value);
        rankingsBody.appendChild(tr);
    });
}
const buut=document.getElementById("dort");
buut.addEventListener('click', ()=>{
    if(clickButtCount<1){
        populateRankings(arrayDataUsers);
    }
    else
    {
        alert("Rank is shown!");
    }
    clickButtCount++;
})

const homeP=document.getElementsByClassName("home-page-butt")[0];
homeP.addEventListener('click', () => {
    window.location.assign("/homePage.html");
});

const gameGo=document.getElementsByClassName("game-butt")[0];
gameGo.addEventListener('click', () => {
  window.location.assign("/game.html");
});