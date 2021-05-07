let gamescore = 0;
let livescore = 3;

let hero = {
  top: 700,
  left: 600,
};

let rockDestoryer = {
  top: 790,
};

let rockerArr = []; 

let enemies = [
  { left: 100, top: 100 },
  { left: 200, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 700, top: 100 },
  { left: 600, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
  { left: 1000, top: 100 },
];

document.onkeydown = function (e) { //movehero
  if (e.keyCode === 65 && hero.left >= 15) {
    hero.left = hero.left - 30;
    drawHero1();
  } else if (e.keyCode === 68 && hero.left <= 1080) {
    hero.left = hero.left + 30;
    drawHero1();
  } else if (e.keyCode === 87 && hero.top >= 15) {
    hero.top = hero.top - 30;
    drawHero2();
  } else if (e.keyCode === 83 && hero.top <= 700) {
    hero.top = hero.top + 30;
    drawHero2();
  } else if (e.keyCode === 191) {
    rockerArr.push({
      left: hero.left + 20,
      top: hero.top,
    });
    createRockets();
  }
};

function drawHero1() { //draw hero new left and right
  document.getElementById("hero").style.left = hero.left + "px";
}

function drawHero2() { //draw hero new up and down
  document.getElementById("hero").style.top = hero.top + "px";
}

function createRockets() { //create weapon
  document.getElementById("missiles").innerHTML = "";
  for (var i = 0; i < rockerArr.length; i++) {
    document.getElementById(
      "missiles"
    ).innerHTML += `<div class='missile1' style='left:${rockerArr[i].left}px; top:${rockerArr[i].top}px'></div>`;
  }
}

function moveRocket() { //weapon speed
  for (let i = 0; i < rockerArr.length; i++) {
    rockerArr[i].top = rockerArr[i].top - 50;
  }
}

function spawnEnemies1() { //spawn ramdom ememy
  document.getElementById("enemy").innerHTML = "";
  for (let i = 0; i < 1; i++) {
    let RandomXPosition = Math.floor(Math.random() * 600 + 150);
    let RandomYPosition = Math.floor(Math.random() * 200);

    enemies.push({
      left: RandomXPosition,
      top: RandomYPosition,
    });

    document.getElementById(
      "enemy"
    ).innerHTML += `<div class='enemies' style='left:${enemies[i].left}px; top:${enemies[i].top}px;'></div>`;
  }
}

function spawnEnemies() {
  document.getElementById("enemy").innerHTML = "";
  for (let i = 0; i < enemies.length; i++) {
    document.getElementById(
      "enemy"
    ).innerHTML += `<div class='enemies' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
  }
}

function moveEnemeies() { //move enemy speed
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].top = enemies[i].top + 0.15;
  }
}

function collision() { //weapon and enemy collide
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < rockerArr.length; j++) {
      if (
        rockerArr[j].left >= enemies[i].left &&
        rockerArr[j].left <= enemies[i].left + 50 &&
        rockerArr[j].top <= enemies[i].top + 50 &&
        rockerArr[j].top >= enemies[i].top
      ) {
        document.getElementById(
          "enemydestory"
        ).innerHTML += `<div class='damage' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;

        enemies.splice(i, 1);
        rockerArr.splice(j, 1);
        gamescore = gamescore + 1;
        document.getElementById("score").innerHTML = "Score:" + gamescore;

        setTimeout(() => {
          removeElement("#enemydestory");
        }, 1000);
        spawnEnemies1();
      }
    }
  }
}

function heroCollision() { //hero and enemy collide
  for (let i = 0; i < enemies.length; i++) {
    if (
      hero.left >= enemies[i].left &&
      hero.left <= enemies[i].left + 91 &&
      hero.top <= enemies[i].top + 91 &&
      hero.top >= enemies[i].top
    ) {
      hero.left = 600;
      hero.top = 700;

      document.getElementById(
        "herodestory"
      ).innerHTML += `<div class='herodie' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
      setTimeout(() => {
        removeElement("#herodestory");
     
      }, 500);
      livescore = livescore - 1;
      document.getElementById("livescore").innerHTML = "Lives left:" + livescore;
    }
  }
}

function rockDestoryerDisapper() { //enemy exit zone
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].top + 46 >= rockDestoryer.top) {
      enemies.splice(i, 1);
    }
  }
}

function removeElement(game_element) { //remove collider divs
  let elements = document.querySelectorAll(game_element);

  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "";
  }
}

function GameOverText() { //game over text for score
  if (gamescore >=50) {
    setTimeout(() => {
      GameOver();
      console.log("damage is done");
    }, 500);
  }
}

function GameOverlife() { //game over text for life over
  if (livescore <=0) {
    setTimeout(() => {
      GameOver1();
      console.log("Game over");
    }, 500);
  }
}

function GameOver() { //game function for score
  document.location.reload();
  alert(`GAME OVER! You Win! Your score is ${gamescore}. Click okay to reply`);
  clearInterval();
  console.log("test");
}

function GameOver1() { //game function for life over
  document.location.reload();
  alert((`GAME OVER! You lose! Your score is ${gamescore}. Click okay to reply`));
  clearInterval();
  console.log("test");
}

setTimeout(() => { //game time limit to end
  GameOver();
}, 1222000);

const startingMinutes = 2; 
let time = startingMinutes * 60;
const timer = document.getElementById("countdown1");

setInterval(countdown, 1000);

function countdown() {
  const minutes = Math.floor(time / 60);
  let secounds = time % 60;

  timer.innerHTML = `${minutes} :  ${secounds} `;
  if (time >= 0) {
    time--;
  }
}

function render() {
  setTimeout(render, 2);
  GameOverlife()
  moveRocket();
  createRockets();
  moveEnemeies();
  spawnEnemies();
  collision();
  heroCollision();
  rockDestoryerDisapper();
  GameOverText();
}

render();
