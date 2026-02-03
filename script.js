const container = document.getElementById("container");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

let userName = "You";
let musicUnlocked = false;
let noCount = 0;

/* Typing utility */
function typeText(el, text, speed = 60, cb) {
  el.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(timer);
      if (cb) cb();
    }
  }, speed);
}

/* Sound */
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(()=>{});
}

/* Unlock music */
function unlockMusic() {
  if (!musicUnlocked) {
    bgMusic.volume = 0.6;
    bgMusic.play().then(() => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      musicUnlocked = true;
    }).catch(()=>{});
  }
}

/* Start */
document.getElementById("startBtn").onclick = () => {
  playClick();
  const v = document.getElementById("nameInput").value.trim();
  if (v) userName = v;
  showQuestion();
};

/* Question screen */
function showQuestion() {
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = `
      <h1>${userName} 💖</h1>

      <p style="opacity:0.9">
        I’ve been wanting to ask you something too 💖
      </p>

      <p id="valentineText"
         style="font-size:1.1rem; font-weight:600; min-height:1.6rem"></p>

      <div class="buttons" id="choiceButtons" style="opacity:0">
        <button id="yesBtn">Yes ❤️</button>
        <button id="noBtn">No 🙃</button>
      </div>
    `;
    container.classList.remove("fade-out");

    const valText = document.getElementById("valentineText");
    const buttons = document.getElementById("choiceButtons");

    typeText(valText, "Will you be my Valentine?", 70, () => {
      buttons.style.opacity = 1;
      setupButtons();
    });

  }, 700);
}

/* Buttons */
function setupButtons() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  yesBtn.onclick = () => {
    playClick();
    unlockMusic();
    win();
  };

  noBtn.onmouseenter = noBtn.ontouchstart = () => {
    playClick();
    noCount++;
    const r = Math.min(160, 40 + noCount * 20);
    noBtn.style.transform =
      `translate(${Math.random()*r-r/2}px, ${Math.random()*r-r/2}px)`;
  };
}

/* Win screen */
function win() {
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = `
      <h1 id="yayText"></h1>
      <p id="finalText" style="min-height:4.8rem"></p>
    `;
    container.classList.remove("fade-out");

    const yay = document.getElementById("yayText");
    const finalText = document.getElementById("finalText");

    typeText(yay, "YAYYYY!! 🎉🥹", 80, () => {
      typeText(
        finalText,
        `${userName}, you’re officially my Valentine ❤️\n\nThis just made my heart so happy 💕`,
        45,
        () => {
          if (musicUnlocked) bgMusic.play();
          blastCelebration();
        }
      );
    });
  }, 700);
}

/* Celebration */
function blastCelebration() {
  for (let i = 0; i < 40; i++) spawnHeart(true);
  setInterval(spawnConfetti, 150);
}

/* Hearts */
function spawnHeart(blast = false) {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = Math.random() > 0.2 ? "❤️" : "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration =
    (blast ? 3 : 4 + Math.random() * 3) + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}

/* Continuous hearts */
setInterval(() => {
  spawnHeart();
  if (Math.random() > 0.5) spawnHeart();
  if (Math.random() > 0.8) spawnHeart();
}, 220);

/* Confetti */
function spawnConfetti() {
  const c = document.createElement("div");
  c.className = "confetti";
  c.style.left = Math.random() * 100 + "vw";
  c.style.background =
    ["#ff4d6d", "#ffd166", "#ffffff"][Math.floor(Math.random() * 3)];
  c.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 5000);
}
