// Subtle Starfield Background Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta = -s.delta;
  }
  requestAnimationFrame(drawStars);
}

drawStars();

document.querySelectorAll('.pin').forEach((pin, i) => {
  pin.style.opacity = '0';
  setTimeout(() => {
    pin.style.transition = 'opacity 1s ease';
    pin.style.opacity = '1';
  }, i * 400);
});

const track = document.querySelector('.testimonial-track');
const cards = Array.from(document.querySelectorAll('.testimonial-card'));
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;

function updateCarousel() {
  const offset = -index * (cards[0].offsetWidth + 16); // gap between cards
  track.style.transform = `translateX(${offset}px)`;
}

next.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  updateCarousel();
});

prev.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
});

// Optional: Auto-scroll every 6s
setInterval(() => {
  next.click();
}, 6000);

// 🎧 Background Music Toggle
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.src = 'pics/play.png';
  } else {
    bgMusic.play();
    musicIcon.src = 'pics/pause.png';
  }
  isPlaying = !isPlaying;
});

window.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play();
    musicIcon.src = 'pics/pause.png';
    isPlaying = true;
  }
}, { once: true });
