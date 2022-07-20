// global variabels

let cart = document.querySelectorAll("#div");
let cartImg = document.querySelectorAll(".img");
let cartBack = document.getElementsByClassName("black");
let starBtn = document.getElementById("start");
let lossCount = 10;
let time = 60;
let gameSetting;
let viweBforeStart;
let cartCuonter = 0;
let num;
let i = 0;
let firstClick;
let seccendClick;
let winercounter = 0;
let array = [];
let arr = [];
var itemCounter = {};

// add img in random items

function readd() {
  for (let i = 0; i < 8; i++) {
    if (itemCounter[i] === 1) {
      array.push(i);
    }
    if (itemCounter[i] > 2) {
      let index = array.indexOf(i);
      array.splice(index, 1);
      itemCounter[i]--;
      if (itemCounter[i] > 2) {
        let index = array.indexOf(i);
        array.splice(index, 1);
        itemCounter[i]--;
        if (itemCounter[i] > 2) {
          let index = array.indexOf(i);
          array.splice(index, 1);
          itemCounter[i]--;
          if (itemCounter[i] > 2) {
            let index = array.indexOf(i);
            array.splice(index, 1);
            itemCounter[i]--;
            if (itemCounter[i] > 2) {
              let index = array.indexOf(i);
              array.splice(index, 1);
              itemCounter[i]--;
              if (itemCounter[i] > 2) {
                let index = array.indexOf(i);
                array.splice(index, 1);
                itemCounter[i]--;
                if (itemCounter[i] > 2) {
                  let index = array.indexOf(i);
                  array.splice(index, 1);
                  itemCounter[i]--;
                  if (itemCounter[i] > 2) {
                    let index = array.indexOf(i);
                    array.splice(index, 1);
                    itemCounter[i]--;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function add() {
  for (let i = 0; i < 40; i++) {
    nums = Math.floor(Math.random() * 8);
    array.push(nums);
  }
  array.forEach((i) => {
    if (i in itemCounter) {
      itemCounter[i] = itemCounter[i] + 1;
    } else {
      itemCounter[i] = 1;
    }
  });
  readd();
}

// start event add start the game

starBtn.onclick = function () {
  add();

  gameSetting = document.getElementById("harder").value;
  if (gameSetting === "normal") {
    time = 60;
    lossCount = 10;
    viweBforeStart = 5000;
  }

  if (gameSetting === "esay") {
    time = 160;
    lossCount = 20;
    viweBforeStart = 9000;
  }

  if (gameSetting === "hard") {
    time = 45;
    lossCount = 5;
    viweBforeStart = 3000;
  }

  document.getElementById("attmpts").innerHTML = `Attmpts: ${lossCount}`;
  document.getElementById("time").innerHTML = `time: ${time} sec`;
  document.getElementById("normalaiz").classList.add("notClicked");
  document.getElementsByClassName("main")[0].style.opacity = "1";
  document.getElementsByTagName("p")[0].style.display = "none";
  star();
};

// add the img in the items

function star() {
  starBtn.classList.add("notClicked");
  cartCuonter = 0;
  winercounter = 0;
  window.requestAnimationFrame(seccend);
  cart.forEach((item) => {
    item.classList.remove("visibility");
    item.classList.add("active");
    setTimeout(function () {
      item.classList.remove("active");
    }, viweBforeStart);
    num = array[i];
    item.innerHTML = `<img src="./img/F${num}.png" id="${num}"/> 
        <div class="black"></div>
        `;
    i = i + 1;
  });

  game();
}

// click event for torn the img and check is it the same item clicked

function game() {
  cart.forEach((item) => {
    item.addEventListener("click", function () {
      cartCuonter++;
      item.classList.add("active");
      let img = item.getElementsByTagName("img");
      if (cartCuonter === 1) {
        firstClick = img[0];
        item.classList.add("notClicked");
      }
      if (cartCuonter === 2) {
        seccendClick = img[0];
        cart.forEach((item) => {
          item.classList.add("notClicked");
        });
        removeActive();
        loss(lossCount, time);
      }
    });
  });
  const removeActive = () => {
    if (cartCuonter === 2) {
      if (firstClick.id === seccendClick.id) {
        document.querySelectorAll(".active").forEach((item) => {
          item.classList.add("visibility");
          hasClass(item, "visibility");
        });
      } else {
        lossCount--;
      }
      setTimeout(function () {
        cart.forEach((item) => {
          item.classList.remove("active");
          item.classList.remove("notClicked");
          cartCuonter = 0;
        });
      }, 1000);
    }
  };
}

// check if all item is not visible and show the winer section

function winer() {
  if (winercounter === 16) {
    document.getElementsByClassName("winer")[0].style.display = "block";
    document.getElementsByClassName("main")[0].style.opacity = "0.3";
    document.getElementById("restart").addEventListener("click", function () {
      window.location.reload();
    });
  }
}

function hasClass(element, clsName) {
  winercounter++;
  if (winercounter === 16) {
    setTimeout(function () {
      winer();
    }, 1000);
  }
  return (" " + element.className + " ").indexOf(" " + clsName + " ") > -1;
}

// check if the attmpts and time add shw the loss section

function loss(lossCount, time) {
  document.getElementById("attmpts").innerHTML = `Attmpts: ${lossCount}`;

  if (lossCount === 0 || time === 0) {
    setTimeout(function () {
      document.getElementsByClassName("loss")[0].style.display = "block";
      document.getElementsByClassName("main")[0].style.opacity = "0.3";
      cart.forEach((item) => {
        item.classList.add("notClicked");
      });
      document.getElementById("restar").addEventListener("click", function () {
        window.location.reload();
      });
    }, 1500);
  }
}

// time
let lestRender = 0;
function seccend(currentTime) {
  window.requestAnimationFrame(seccend);
  const secondsSinceLestRender = (currentTime - lestRender) / 1000;
  if (time === 0) {
    loss(time);
    time = 0;
    document.getElementById("time").innerHTML = `time: ${0} sec`;
  }
  if (secondsSinceLestRender < 1 / 1) return;
  lestRender = currentTime;

  if (time !== 0 && winercounter !== 16 && lossCount !== 0) {
    time -= currentTime - currentTime + 1;
  }
  document.getElementById("time").innerHTML = `time: ${time} sec`;
}
