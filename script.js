// ---------- config ----------
const INSTAGRAM_URL = "https://www.instagram.com/nitin__r12/"; // your link
const AUTO_DELAY_NORMAL = 2500;   // normal message visible time (ms)
const VOOOO_EXTRA = 3500;         // extra gap when 'Vooooo....' appears (ms)
const BETWEEN_FADE = 600;         // time to wait between fade out/in (ms)

// ---------- hearts generation ----------
const heartsEl = document.getElementById('hearts');
function rand(min,max){return Math.random()*(max-min)+min;}
const HEARTS = 22;
for(let i=0;i<HEARTS;i++){
  const h = document.createElement('div');
  h.className = 'heart';
  const size = Math.round(rand(10,28));
  h.style.width = h.style.height = size + 'px';
  h.style.left = rand(0,100)+'%';
  h.style.bottom = rand(-20,10)+'px';
  h.style.animationDuration = rand(9,18)+'s';
  h.style.opacity = (rand(0.15,0.35)).toFixed(2);
  heartsEl.appendChild(h);
}

// ---------- messages ----------
const messages = [
  {text:"Vaishnavi 💖", type:"light"},
  {text:"Tumse ek baat bolni hai...", type:"light"},
  {text:"Darr lag raha he, boludu kya 😅", type:"light", waitForClick:true}, // show Haa button
  {text:"Vooooo....", type:"light", extraDelay:VOOOO_EXTRA}, // big pause here
  {text:"I like you 💞", type:"accent"},
  {text:"Plz haan ya na kuch to bolna 😳", type:"light"},
  {text:"Click to my Insta 💫", type:"light", stopForInsta:true} // then show Open button
];

const bubble = document.getElementById('bubble');
const card = document.getElementById('card');
const controls = document.getElementById('controls');

let idx = 0;

function clearControls(){
  controls.innerHTML = '';
  controls.setAttribute('aria-hidden','true');
}

function showButton(text, cls, onClick){
  clearControls();
  const b = document.createElement('button');
  b.className = 'btn ' + (cls || '');
  b.innerText = text;
  b.onclick = onClick;
  b.classList.add('btn-bounce');
  controls.appendChild(b);
  controls.setAttribute('aria-hidden','false');
}

async function displayMessage(msgObj){
  bubble.textContent = msgObj.text;
  bubble.className = 'bubble ' + (msgObj.type || 'light');
  card.classList.add('show');

  if(msgObj.waitForClick){
    showButton('Haa 😊','primary', ()=>{
      clearControls();
      fadeOutThenNext(msgObj, AUTO_DELAY_NORMAL);
    });
    return;
  }

  if(msgObj.stopForInsta){
    setTimeout(()=>{
      showButton('Open ❤️','primary', ()=> window.open(INSTAGRAM_URL, '_blank'));
    }, 1200);
    return;
  }

  const visibleFor = (msgObj.extraDelay || 0) + AUTO_DELAY_NORMAL;
  setTimeout(()=> fadeOutThenNext(msgObj, visibleFor), visibleFor);
}

function fadeOutThenNext(msgObj, visibleFor){
  card.classList.remove('show');
  setTimeout(()=>{
    idx++;
    runSequence();
  }, BETWEEN_FADE);
}

function runSequence(){
  if(idx >= messages.length){
    clearControls();
    showButton('Open ❤️','primary', ()=> window.open(INSTAGRAM_URL, '_blank'));
    return;
  }
  displayMessage(messages[idx]);
}

setTimeout(()=>runSequence(), 900);

bubble.addEventListener('click', ()=>{
  if(idx >= messages.length) return;
  const cur = messages[idx];
  if(cur.waitForClick || cur.stopForInsta) return;
  card.classList.remove('show');
  setTimeout(()=>{ idx++; runSequence(); }, BETWEEN_FADE);
});
