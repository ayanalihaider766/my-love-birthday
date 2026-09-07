// ============================================================
// Utility
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeText(el, text, speed, onDone) {
  if (prefersReducedMotion) {
    el.textContent = text;
    if (onDone) onDone();
    return;
  }
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (onDone) onDone();
    }
  }, speed);
}

// ============================================================
// Background particles (canvas)
// ============================================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = window.innerWidth < 700 ? 45 : 90;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    speedY: Math.random() * 0.25 + 0.05,
    drift: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.15,
    hue: Math.random() > 0.5 ? '255,143,179' : '165,107,255'
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(${p.hue},0.8)`;
    ctx.fill();

    p.y -= p.speedY;
    p.x += p.drift;

    if (p.y < -5) {
      p.y = canvas.height + 5;
      p.x = Math.random() * canvas.width;
    }
    if (p.x < -5) p.x = canvas.width + 5;
    if (p.x > canvas.width + 5) p.x = -5;
  }
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});
if (!prefersReducedMotion) requestAnimationFrame(animateParticles);
else ctx.clearRect(0, 0, canvas.width, canvas.height);

// ============================================================
// Floating hearts
// ============================================================
const heartsWrap = document.getElementById('floating-hearts');

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = '❤';
  const size = Math.random() * 16 + 10;
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = size + 'px';
  heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  const duration = Math.random() * 8 + 9;
  heart.style.animationDuration = duration + 's';
  heartsWrap.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
  }

