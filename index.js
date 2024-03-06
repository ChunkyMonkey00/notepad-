function gel(id) {
  return document.getElementById(id);
}

function gal(str) {
  return document.querySelectorAll(str);
}

const typer = gel("typer");
var caret = false;
var typing = false;

var firstKey = true;

var keys = [];
var forbiddenKeys = ["Tab", "Control", "Ctrl", "Alt", "Escape", "Esc", "Enter"];

function clearUnderscores() {
  let str = typer.value;
  typer.value = str.replace(/_/g, '');
}

function callBeforeTyping(e) {
  clearUnderscores();

  if(firstKey) typer.value = ""; firstKey = false;

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
  if(clearInt) clearInterval(clearInt);

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
  if(!clearInt && p.acl) {
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

  gel("buyWordBooster").onclick = buyWordBooster;
  gel("buyAutoClear").onclick = buyAutoClear;
  gel("buyAutoComplete").onclick = buyAutoComplete;
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

  return (oc*phraseScore) * p.wb;
}

const phrases = [
  "No Russian",
  "It's-a me, Mario!",
  "Do a barrel roll!",
  "Wubba lubba dub dub!",
  "I've made a huge mistake",
  "That's what she said",
  "I am Groot",
  "Why so serious?",
  "You shall not pass!",
  "I'm surrounded by idiots",
  "To infinity and beyond!",
  "May the Force be with you",
  "That's a spicy meatball!",
  "I've fallen and I can't get up",
  "I'll be back",
  "Hasta la vista, baby!",
  "Here's Johnny!",
  "Houston, we have a problem",
  "I see dead people",
  "I'm king of the world!",
  "Say hello to my little friend!",
  "E.T. phone home",
  "I'm the captain now",
  "I'm Batman",
  "I'm not locked in here with you, you're locked in here with me",
  "Keep the change, ya filthy animal",
  "Release the Kraken!",
  "That's a bingo!",
  "That's what she said",
  "The dude abides",
  "They're taking the hobbits to Isengard",
  "This is Sparta!",
  "Toto, I've got a feeling we're not in Kansas anymore",
  "Wax on, wax off",
  "What's in the box?",
  "You can't handle the truth!",
  "You had me at hello",
  "You talking to me?",
  "You're gonna need a bigger boat",
  "You're killing me, Smalls!",
  "You're not you when you're hungry",
  "You're gonna need a bigger boat",
  "Here's looking at you, kid",
  "I'll have what she's having",
  "I love the smell of napalm in the morning",
  "I feel the need... the need for speed",
  "I'm walking here!",
  "Show me the money!",
  "I feel pretty, oh so pretty",
  "It's alive! It's alive!",
  "I'm not bad, I'm just drawn that way",
  "Here's Johnny!",
  "I'm the king of the world!",
  "You had me at 'hello'",
  "Hasta la vista, baby!",
  "Stupid is as stupid does",
  "There's no place like home",
  "I have nipples, Greg. Could you milk me?",
  "You can't handle the truth!",
  "I'll be back",
  "Shaken, not stirred",
  "Frankly, my dear, I don't give a damn",
  "Houston, we have a problem",
  "You can't handle the truth!",
  "Show me the money!",
  "It's alive! It's alive!",
  "I see dead people",
  "I'm king of the world!",
  "It's not a tumor!",
  "You're gonna need a bigger boat",
  "You had me at hello",
  "I'll get you, my pretty, and your little dog too!",
  "I'm ready for my close-up, Mr. DeMille",
  "Here's Johnny!",
  "I coulda been a contender",
  "Greed is good",
  "You talking to me?",
  "There's no crying in baseball!",
  "You can't handle the truth!",
  "I love the smell of napalm in the morning",
  "I'll be back",
  "I'm the king of the world!",
  "To infinity and beyond!",
  "May the Force be with you",
  "I am Groot",
  "Why so serious?",
  "You shall not pass!",
  "That's a spicy meatball!",
  "I've fallen and I can't get up"
];

var phraseScore = 1;

function newPhrase() {
  let rnd = Math.floor(Math.random() * phrases.length);
  let l = phrases[rnd];
  p.o = l;
  if(l.length <= 10) phraseScore = 1;
  if(l.length > 10 && l.length <= 15) phraseScore = 2;
  if(l.length > 15) phraseScore = 3;
}

function clear() {
  p.money += getClearScore(typer.value, p.o);
  newPhrase();
  typer.value = "";
  p.ji = 0;
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
acl = auto clear
*/

var p = {
  /* vars */
  money: 0,
  /* store */
  ac: 0,
  wb: 1,
  acl: false,
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
var prices = {
  wb: 10,
  acl: 50,
  ac: 500,
}

function handleSpecial(e) {
  var key = e.key;
  if (key == "Tab") {
    autoComplete(2);
  }
  if(key == "Escape" || key == "Esc") {
    toggleSettings();
  }
  if(key == "Enter") {
    clear();
  }
}

function buyWordBooster() {
  if(p.money >= prices.wb) {
    p.money -= prices.wb;
    p.wb++;
    prices.wb+=1.50*p.wb;
  }
}

function buyAutoClear() {
  if(p.money >= prices.acl && !p.acl) {
    p.money -=prices.acl;
    p.acl = true;
  }
}

function buyAutoComplete() {
  if(p.money >= prices.ac) {
    p.money -= prices.ac;
    p.ac++;
    prices.ac+=1.5*p.ac;
  }
}

/* autocomplete logic */
document.addEventListener('keypress', doJourney);

function doJourney(e) {
  if (event.key.toUpperCase() === p.o[p.ji].toUpperCase()) {
    p.ji++;
    if (p.ji === p.o.length) {
      p.ji = 0;
    }
  } else {
    p.ji = 0;
  }
}

function getNextStr(amt) {
  let ind = p.ji;
  let str = "";
  for(var i=0;i<amt;i++) {
    if(ind >= p.o.length) ind = 0;
    str+=p.o[ind];
    ind++;
  }
  p.ji = ind;
  return str;
}

function autoComplete(override = null) {
  let next;

  if (Number(override)) next = getNextStr(override);
  else next = getNextStr(p.ac);

  typer.value+=next;
}

/* HUD */
function updateHUD() {
  updateMonies();
  updateStore();
  updateObjectives();
}

function updateMonies() {
  gel("npMoney").innerHTML = "Money: $"+p.money;
}

function updateObjectives() {
  gal(".objective").forEach((pp) => {
    pp.innerHTML = p.o;
  })
}

function updateStore() {
  let wbi = gel("wordBoosterInfo");
  let aci = gel("autoCompleteInfo");
  let acli = gel("autoClearInfo");

  wbi.innerHTML = `Cost: $${prices.wb}, Quantity: ${p.wb - 1}`;
  aci.innerHTML = `Cost: $${prices.ac}, Quantity: ${p.ac}`;
  acli.innerHTML = p.acl ? "Bought" : `Cost: ${prices.acl}`;
}

/* Unity type shii */
function update() {
  // NOT to be used for calculations. Simply display
  updateHUD();
}

setInterval(update, 50);
