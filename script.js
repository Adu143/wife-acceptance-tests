const pages = document.querySelectorAll('.page');

function openPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome() {
  openPage('home');
}

/* Spin Wheel */
const topics = ['love', 'about', 'travel', 'parenthood', 'us'];
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const colors = ['#ff80ab', '#f06292', '#ba68c8', '#64b5f6', '#81c784'];
let angle = 0;

function drawWheel() {
  const slice = 2 * Math.PI / topics.length;
  topics.forEach((t, i) => {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150,150);
    ctx.arc(150,150,150, angle + i*slice, angle + (i+1)*slice);
    ctx.fill();
    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(angle + (i + 0.5)*slice);
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(t.toUpperCase(), 40, 5);
    ctx.restore();
  });
}

function spinWheel() {
  const spin = Math.random() * 3000 + 2000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    angle += 0.1;
    ctx.clearRect(0,0,300,300);
    drawWheel();

    if (progress < spin) {
      requestAnimationFrame(animate);
    } else {
      const index = Math.floor((topics.length - (angle / (2 * Math.PI) % topics.length)) % topics.length);
      openPage(topics[index]);
    }
  }
  requestAnimationFrame(animate);
}

drawWheel();
