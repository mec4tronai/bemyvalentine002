const container = document.getElementById("container");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

let userName = "You";
let musicUnlocked = false;
let noCount = 0;

/* Sounds */
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

/* Question */
function showQuestion() {
  container.classList.add("fade-out");
  setTimeout(() => {
    container.innerHTML = `
      <h1>${userName} 💖</h1>
      <p>Will you be my Valentine?</p>

      <div class="buttons">
        <button id="yesBtn">Yes ❤️</button>
        <button id="noBtn">No 🙃</button>
      </div>
    `;
    container.classList.remove("fade-out");
    setupButtons();
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
    const r = Math.min(150, 40 + noCount * 20);
    noBtn.style.transform =
      `translate(${Math.random()*r-r/2}px, ${Math.random()*r-r/2}px)`;
  };
}

/* WIN */
function win() {
  container.classList.add("fade-out");
  setTimeout(() => {
    container.innerHTML = `
      <h1>YAYYYY!! 🎉🥹</h1>
      <p>
        ${userName}, you’re officially<br>
        <strong>my Valentine ❤️</strong><br><br>
        This just made my heart so happy 💕
      </p>
    `;
    container.classList.remove("fade-out");
    if (musicUnlocked) bgMusic.play();
    blastCelebration();
  }, 700);
}

/* Celebration */
function blastCelebration() {
  // Heart explosion
  for (let i = 0; i < 30; i++) {
    spawnHeart(true);
  }
  // Confetti rain
  setInterval(spawnConfetti, 150);
}

/* Continuous hearts */
function spawnHeart(blast = false) {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (blast ? 3 : 5 + Math.random() * 3) + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}

setInterval(() => spawnHeart(), 400);

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
