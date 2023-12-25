import "./styles.css";
/*
1. Get the user's name
2. Show a menu
3. Menu items:
  a. Start New Game
  b. See Leaderboard
  c. Update Name
*/
const myGameContainer = document.getElementById("game");

class Game {
  constructor(container) {
    this.container = container;
    this.inputField = document.getElementById("input-seen-num");
    this.submitBtn = document.getElementById("submit-btn");
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  start() {
    this.name = prompt("Enter your name:") || "Guest";
    this.displayMenu();
  }

  handleMenuClick = function (event) {
    switch (event.target.dataset?.val) {
      case "1":
        this.updateLevel(1);
        this.gameLoop();
        break;
      case "2":
        console.log("Will Show Leaderboard Now...");
        break;
      case "3":
        this.name = prompt("Enter name to be updated:") || this.name;
        this.displayMenu();
    }
  }.bind(this);

  displayMenu() {
    document.querySelector(".username").innerText = `${this.name}`;
    this.container.addEventListener("click", this.handleMenuClick);
  }
  updateLevel(level = 1) {
    this.generatedNumbers = [];
    this.level = level;
  }

  generateNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      this.generatedNumbers.push(this.randomNumber());
    }
  }

  displayNumbersForLevel() {
    document.querySelector(".start-menu").classList.add("hide");
    document.querySelector(".show-num-screen").classList.remove("hide");
    let timer = document.querySelector(".frttimer");
    let randomNo = document.querySelector(".number");
    let index = 0;
    let x = 450;
    let a;
    timer.style.width = "120px";
    x += 550;
    a = (40 * timer.clientWidth) / x;
    let b = setInterval(() => {
      timer.style.width = timer.clientWidth - a + "px";
      if (timer.clientWidth <= 5) {
        timer.style.width = "120px";
      }
    }, 120);

    randomNo.innerHTML = this.generatedNumbers[index];
    index++;
    let c = setInterval(() => {
      if (index < this.level) {
        randomNo.innerHTML = this.generatedNumbers[index];
        index++;
      } else {
        clearInterval(b);
        clearInterval(c);
        document.querySelector(".show-num-screen").classList.add("hide");
        document.querySelector(".enter-showed-num").classList.remove("hide");
        this.inputField.value = "";
        this.getNumbersFromUser();
      }
    }, 2880);
  }

  getNumbersFromUser() {
    this.submitBtn.addEventListener("click", () => {
      if (this.inputField.value.replace(/\s/g, "").length != 0) {
        if (this.verifyLevel()) {
          this.updateLevel(this.level + 1);
          this.gameLoop();
        } else {
          document.querySelector(".show-result").classList.remove("hide");
          document.querySelector(".score").innerText = `${this.level}`;
          document
            .querySelector(".play-again")
            .addEventListener("click", this.handleMenuClick);
        }
      }
    });
    this.inputField.addEventListener("keypress", (e) => {
      if (
        this.inputField.value.replace(/\s/g, "").length != 0 &&
        e.key === "Enter"
      ) {
        if (this.verifyLevel()) {
          this.updateLevel(this.level + 1);
          this.gameLoop();
        } else {
          document.querySelector(".show-result").classList.remove("hide");
          document.querySelector(".score").innerText = `${this.level}`;
          document
            .querySelector(".play-again")
            .addEventListener("click", this.handleMenuClick);
        }
      }
    });
  }

  verifyLevel() {
    document.querySelector(".enter-showed-num").classList.add("hide");
    this.enteredNumbers = this.inputField.value.split("").map(Number);
    for (let i = 0; i < this.level; i++) {
      if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
    }
    return true;
  }

  gameLoop() {
    this.generateNumbersForLevel();
    document
      .querySelector(".play-Btn")
      .addEventListener("click", this.displayNumbersForLevel());
  }
}

let myGameInstance = new Game(myGameContainer);
myGameInstance.start();
document
  .querySelector(".fa-pen-to-square")
  .addEventListener("click", myGameInstance.handleMenuClick);
