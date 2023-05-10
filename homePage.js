const usernameStorage=window.localStorage.username;
console.log(usernameStorage);
document.getElementById("name").innerHTML=usernameStorage+'!';

const gameGo=document.getElementsByClassName("game-butt")[0];
gameGo.addEventListener('click', () => {
  window.location.assign("/game.html");
});

const rankGo=document.getElementsByClassName("ranking-butt")[0];
rankGo.addEventListener('click', () => {
  window.location.assign("/rank.html");
});
  const logOut=document.getElementsByClassName("logOut")[0];
  logOut.addEventListener('click', () => {
    window.location.assign("/openPage.html");
  });
  const profile=document.getElementsByClassName("profile")[0];
  profile.addEventListener('click', () => {
    window.location.assign("/profile.html");
  });

  
  let image=Array.from(document.getElementsByClassName('userImg'));
  let roll=document.getElementsByClassName("rollDown")[0];
  image.forEach(element => {
    element.addEventListener('click', ()=>{
      if(roll.style.display!=='flex')
      {
        roll.style.display='flex'
      }
      else
      {
        roll.style.display='none';
      }
    });
  });