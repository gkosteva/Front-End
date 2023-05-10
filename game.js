import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
    import {
      getDatabase,
      ref,
      set,
      onValue,
      get,
      child,
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

    const usernameStorage=window.localStorage.username;
    function checkForWin(username,timeToDo,flipsCounted)
    {
        const dbref=ref(getDatabase());
        get(child(dbref, 'Users')).then((snapshot)=>{
            const data=snapshot.val();
            var user=Object.values(data).filter(k=>k.firstname===username)[0];

            if(timeToDo<user.score)
            {
                user.score=timeToDo;
                user.flips=flipsCounted;
                const userRef=ref(database,'Users/'+username);
                set(userRef,user);
            }
            else if(timeToDo==user.score && flipsCounted<user.flips)
            {
                user.score=timeToDo;
                user.flips=flipsCounted;
                const userRef=ref(database,'Users/'+username);
                set(userRef,user);
            }
            console.log(user);
        })
    }


class AudioController{
    constructor(){
        this.flipSound=new Audio('Assets/Assets_Audio_flip.wav');
        this.matchSound=new Audio('Assets/Assets_Audio_match.wav');
        this.victorySound=new Audio('Assets/Assets_Audio_victory.wav');
        this.gameOverSound=new Audio('Assets/Assets_Audio_gameover.wav');
        this.ticTac=new Audio('Assets/tic-tac-27828.mp3');
    }
    flip(){
        this.flipSound.play();
    }
    match(){
        this.matchSound.play();
    }
    gameOver(){
        this.gameOverSound.play();
    }
    victory(){
        this.victorySound.play();
    }
}
var timeToDo=0;
var flipsCounted=0;
var victoryGames=0;
var lostGames=0;
class GameClass{
    constructor(totalTime,cards){
        this.cardsArr=cards;
        this.totalTime=totalTime;
        this.timeRemaining=totalTime;
        this.timer=document.getElementById('time-remaining');
        this.ticker=document.getElementById('flips');
        this.soundController=new AudioController();
    }

    shuffleCards(cardsArr){
        for (let i = cardsArr.length - 1; i > 0; i--) {
            //shuffle algorithm
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArr[randIndex].style.order= i; // changing css grid 
            cardsArr[i].style.order= randIndex;
        }
    }

    startGame(){
        this.cardToCheck=null;
        this.totalClicks=0;
        this.timeRemaining=this.totalTime;
        this.matchedCards=[];
        setTimeout(() => {
            this.shuffleCards(this.cardsArr);
            this.countdown = this.startCountdown();
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
        this.timer.style.color="#7cb07c";
        
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining<=10)
            {
                this.timer.style.color="red";
            }
            if(this.timeRemaining === 0)
            {
                this.gameOver();
            }
        }, 1000);
    }
    gameOver() {
        lostGames++;
        clearInterval(this.countdown);
        this.soundController.gameOver();
        document.getElementById('gameOver').classList.add('visible');
        flipsCounted=this.totalClicks;
        timeToDo=100-this.timeRemaining;
        if(lostGames>1)
        {
            document.getElementById('gameOver').removeChild(document.getElementById('gameOver').lastChild);
        }
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <span class="overlay-butt-Extra-small">Flips: ${flipsCounted}</span>
        <span  class="overlay-butt-Extra-small">Time: ${timeToDo}s</span>
      `;
      document.getElementById('gameOver').appendChild(newDiv);
      checkForWin(usernameStorage,timeToDo,flipsCounted);
    }
    victory() {
        victoryGames++;
        clearInterval(this.countdown);
        this.soundController.victory();
        document.getElementById('victory').classList.add('visible');
        flipsCounted=this.totalClicks;
        timeToDo=100-this.timeRemaining;
        if(victoryGames>1)
        {
            document.getElementById('victory').removeChild(document.getElementById('victory').lastChild);
        }
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <span class="overlay-butt-Extra-small">Flips: ${flipsCounted}</span>
        <span  class="overlay-butt-Extra-small">Time: ${timeToDo}s</span>
      `;
      document.getElementById('victory').appendChild(newDiv);
      checkForWin(usernameStorage,timeToDo,flipsCounted);

    }
    hideCards() {
        this.cardsArr.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card){

        if(this.canFlipCard(card))
        {
            this.soundController.flip();
            this.totalClicks++;
            this.ticker.innerText=this.totalClicks;
            card.classList.add('visible');
            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }

    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.soundController.match();
        if(this.matchedCards.length === this.cardsArr.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
        }, 1000);
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
   
    canFlipCard(card){
        return (!this.matchedCards.includes(card) && this.cardToCheck!==card);
    }
};


function ready(){
    var arrCards=Array.from(document.getElementsByClassName('card'));
    let overlays = Array.from(document.getElementsByClassName('overlay-butt'));
    var game=new GameClass(100,arrCards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    arrCards.forEach(card =>{
        card.addEventListener('click', ()=>{
            game.flipCard(card);
            
        });
    });
};

if(document.readyState==='loading')
{
    document.addEventListener("DOMContentLoaded", ready());
}
else{
    ready();
}

const homeP=document.getElementsByClassName("home-page-butt")[0];
homeP.addEventListener('click', () => {
    window.location.assign("/homePage.html");
});

const rankGo=document.getElementsByClassName("ranking-butt")[0];
rankGo.addEventListener('click', () => {
  window.location.assign("/rank.html");
});