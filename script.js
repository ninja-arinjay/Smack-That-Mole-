const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const hs=document.querySelector('.highestScore');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('.btn');
const level=document.querySelector('.game_level');
const start=document.querySelector('.start');
let lastHole;
let time;
let run=0;
let timeUp = false;
let flag=true;
let score = 0;
let highest = localStorage.getItem('highest');
if(highest == null)
{
  highest=0;
}
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Same hole');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  running=1;
  if(level.value==0)
  {
    time = randomTime(800, 1000);
    console.log('Easy');
  }
  else if(level.value==1){
    time = randomTime(600, 800);
    console.log('Medium');
  }
  else{
    time = randomTime(200,600);
    console.log('Hard');
  }
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  console.log("Game Started");
  run=1;
  scoreBoard.textContent = 0;
  timeUp=false;
  score = 0;
  peep();
  setTimeout(() =>{
    timeUp = true;
    run=0;
  }, 10000)
}
function endGame(){
  console.log("Game Ended");
  timeUp=true;
  run=0;
}
function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
  if(score>highest)
  {
    highest=score;
  }
  hs.innerHTML=highest;
}
function test(){
  if(run==0)
  {
    startGame();
  }
  else{
    console.warn('Cannot Start Now!');
  }
}
start.addEventListener('click', test);
moles.forEach(mole => mole.addEventListener('click', bonk));