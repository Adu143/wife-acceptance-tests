/* CONFIG */
const TIME_PER_QUESTION = 60; // seconds (change freely)

/* DATA */
const topics = {
  love: {
    title: "Love at First Sight 💕",
    questions: [
      "What was your first impression of me when you saw me in 2012?",
      "What was our first argument about?",
      "What was my weight when you met me in 2015?",
      "What was my salary when I left the job to go to Germany?",
      "Where did we go for our first dinner date after marriage?",
      "Which was the first place we visited in our BMW car?",
      "What day did we go for Malta?",
      "What is the name of the resort we stayed in Coorg?",
      "Which dish that I prepare do you like the most?"
    ]
  },
  about: {
    title: "About Me 😄",
    questions: [
      "What is my most annoying habit (that you secretly love)?",
      "What is one thing I always forget?",
      "What is my most repeated dialogue?",
      "When do you feel most connected to me?",
      "What is your favorite everyday moment with me?",
      "What is one thing I do that makes you feel most loved?",
      "What habit of mine surprised you after marriage?"
    ]
  },
  travel: {
    title: "Travel 🌍",
    questions: [
      "Which trip with me felt the most special to you?",
      "What was the most unplanned trip we ever took?",
      "Which place would you love to revisit together?",
      "What is one travel moment that still makes you laugh?",
      "Where did we have our most relaxed vacation?"
    ]
  },
  parenthood: {
    title: "Parenthood 👶",
    questions: [
      "What was your first thought when you held our baby?",
      "What moment of me as a father melted your heart?",
      "What is your favorite routine with our baby?",
      "What is one thing you want our child to learn from us?"
    ]
  },
  us: {
    title: "Us ❤️",
    questions: [
      "What changed the most after we got married?",
      "What does “home” mean to you now?",
      "What is your favorite “us” moment that no one else knows?",
      "What would you change if you time travel to our initial years of love?",
      "What would you say to us 10 years from now?"
    ]
  }
};

/* STATE */
let currentTopic, currentIndex, timer, timeLeft;

/* PAGE HANDLING */
const pages = document.querySelectorAll('.page');

function openPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome() {
  clearInterval(timer);
  openPage('home');
}

/* QUESTIONS */
function startTopic(key) {
  currentTopic = topics[key];
  currentIndex = 0;
  document.getElementById('topicTitle').innerText = currentTopic.title;
  openPage('questions');
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = TIME_PER_QUESTION;
  document.getElementById('timer').innerText = `⏳ ${timeLeft}`;

  const q = currentTopic.questions[currentIndex];
  document.getElementById('questionBox').innerHTML = `
    <p>${q}</p>
    <input type="text" placeholder="Your answer here 💕">
  `;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `⏳ ${timeLeft}`;
    if (timeLeft <= 0) clearInterval(timer);
  }, 1000);
}

function nextQuestion() {
  if (currentIndex < currentTopic.questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    alert("That was beautiful ❤️");
    goHome();
  }
}

/* WHEEL */
const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const keys = Object.keys(topics);
const colors = ['#ff80ab', '#f06292', '#ba68c8', '#64b5f6', '#81c784'];
let angle = 0;

function drawWheel() {
  const slice = 2 * Math.PI / keys.length;
  keys.forEach((k, i) => {
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
    ctx.fillText(topics[k].title.split(" ")[0].toUpperCase(), 50, 5);
    ctx.restore();
  });
}

function spinWheel() {
  const spins = Math.random() * 3000 + 2000;
  let start = null;

  function animate(ts) {
    if (!start) start = ts;
    const progress = ts - start;
    angle += 0.1;
    ctx.clearRect(0,0,300,300);
    drawWheel();

    if (progress < spins) {
      requestAnimationFrame(animate);
    } else {
      const index = Math.floor((keys.length - (angle / (2 * Math.PI) % keys.length)) % keys.length);
      startTopic(keys[index]);
    }
  }
  requestAnimationFrame(animate);
}

drawWheel();
