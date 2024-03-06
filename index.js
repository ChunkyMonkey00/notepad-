function gel(id) {
  return document.getElementById(id);
}

const typer = gel("typer");
var caret = false;
var typing = false;

var keys = [];
var forbiddenKeys = ["Tab", "Control", "Ctrl", "Alt", "Escape", "Esc"];

function callBeforeTyping(e) {
  if (forbiddenKeys.includes(e.key)) {e.preventDefault(); handleSpecial(e); return;}
  removeCaret();

  if(!keys.includes(e.key)) keys.push(e.key);

  allKeyHandler(e);
}

function callAfterTyping(e) {
  if (forbiddenKeys.includes(e.key)) return;
  keys.splice(keys.indexOf(e.key), 1);

  allKeyHandler(e);
}

function allKeyHandler(e) {

  typing = keys.length>=1 ? true : false;
}

document.body.addEventListener('keydown', callBeforeTyping);

document.body.addEventListener('keyup', callAfterTyping);

setInterval(function() {
  caret = !caret;
  if(caret && !typing) {
      addCaret();
  } else {
    removeCaret();
  }
}, 500);

function removeCaret() {
  if (typer.value.substring(typer.value.length - 1, typer.value.length) == "_") {
    typer.value = typer.value.substring(0, typer.value.length - 1);
  }
}

function addCaret() {
  if (typer.value.substring(typer.value.length - 1, typer.value.length) != "_") {
  typer.value += "_";
}
}

function hidePages() {
  var pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.style.display = "none";
  });
}

function showPage(id) {
  gel(id).style.display = "block";
}

function navTo(id) {
  hidePages();
  showPage(id);
}

function navTo(id) {
  hidePages();
  showPage(id);
}

function navHome() {
  navTo('home');
}

function navStore() {
  navTo('store');
}

function navNp() {
  navTo('notepad');
  if(!clearInt) {
  clearInt = setInterval(() => {
    clear();
  }, p.cr);
  }
}

navHome();

function setupButtons() {
  var homes = document.querySelectorAll('.homeBtn');

  homes.forEach((home) => {
    home.onclick = navHome;
  });

  var store = document.querySelectorAll('.storeBtn');

  store.forEach((home) => {
    home.onclick = navStore;
  });

  var nps = document.querySelectorAll('.notepadBtn');

  nps.forEach((home) => {
    home.onclick = navNp;
  });
}
setupButtons();

/* Back-end game */
function getClearScore(largerString, subString) {
  largerString = largerString.toLowerCase();
  subString = subString.toLowerCase();
  let oc = 0;
  let index = -1;

  // Loop until there are no more occurrences
  while ((index = largerString.indexOf(subString, index + 1)) !== -1) {
    oc++
  }

  return oc * p.wb;
}

function clear() {
  p.money += getClearScore(typer.value, p.o);
  typer.value = "";
}

function toggleSettings() {
  let menu = gel("settings");
  if(menu.style.display == "block") menu.style.display = "none"; else menu.style.display = "block";
}

/* Game setup */
/* 
ac = autocomplete
wb = word booster (amt score per word)

o = objective
j = journey
j = journey index

cr = clear rate
*/

var p = {
  /* vars */
  money: 0,
  /* store */
  ac: 0,
  wb: 1,
  /* objective */
  o: "No Russian",
  j: "",
  ji: 0,
  /* clearing */
  cr: 10000,
}

/* intervals */
var clearInt;

/* features/store */
function handleSpecial(e) {
  var key = e.key;
  console.log(key)
  if (key == "Tab") {
    autoComplete();
  }
  if(key == "Escape" || key == "Esc") {
    toggleSettings();
  }
}

function autoComplete() {

}
