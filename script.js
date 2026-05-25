function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const bodyEl = document.body;
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  bodyEl.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    bodyEl.classList.toggle("dark");
    const isDark = bodyEl.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });
}

const scrollProgress = document.getElementById("scroll-progress");
function updateScrollProgress() {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  if (scrollProgress) scrollProgress.style.width = `${Math.max(0, Math.min(100, scrolled))}%`;
}
window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

const sectionEls = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
function setActiveNavLink() {
  const scrollY = window.scrollY + 130;
  sectionEls.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}
window.addEventListener("scroll", setActiveNavLink);
setActiveNavLink();

const revealTargets = document.querySelectorAll(
  ".details-container, .metric-card, .project-card, .text-container, .skills-toggle, .project-filters, .experience-chart-panel, .incident-game-panel"
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in-view");
  });
}, { threshold: 0.12 });
revealTargets.forEach((el) => revealObserver.observe(el));

const skillToggleBtns = document.querySelectorAll(".skill-toggle-btn");
const skillPanels = document.querySelectorAll(".skills-panel");
skillToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.skillView;
    skillToggleBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    skillPanels.forEach((panel) => {
      const category = panel.dataset.skillCategory;
      panel.classList.toggle("is-hidden", !(view === "all" || view === category));
    });
  });
});

const projectFilterBtns = document.querySelectorAll(".project-filter-btn");
const projectCards = document.querySelectorAll(".project-card");
projectFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    projectFilterBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    projectCards.forEach((card) => {
      const tags = card.dataset.projectType || "";
      card.classList.toggle("is-hidden", !(filter === "all" || tags.includes(filter)));
    });
  });
});

const impactFills = document.querySelectorAll(".impact-fill");
impactFills.forEach((fill) => {
  fill.style.setProperty("--target", Number(fill.dataset.value || 0));
});

const incidentPanel = document.querySelector(".incident-game-panel");
const startBtn = document.getElementById("incident-start");
const resolveBtn = document.getElementById("incident-resolve");
const incidentMessage = document.getElementById("incident-message");
const incidentScore = document.getElementById("incident-score");
const incidentTime = document.getElementById("incident-time");

let gameRunning = false;
let score = 0;
let timeLeft = 20;
let hasActiveAlert = false;
let gameTimer;
let alertTimer;

function randomAlertMessage() {
  const alerts = [
    "High latency detected in API gateway.",
    "Redis replica lag crossing threshold.",
    "Pod restart spike in production cluster.",
    "CloudWatch alarm burst in payments service.",
    "Database CPU saturation warning."
  ];
  return alerts[Math.floor(Math.random() * alerts.length)];
}

function triggerAlert() {
  if (!gameRunning) return;
  hasActiveAlert = true;
  if (incidentPanel) incidentPanel.classList.add("alert-live");
  if (incidentMessage) incidentMessage.textContent = randomAlertMessage();
}

function scheduleNextAlert() {
  clearTimeout(alertTimer);
  alertTimer = setTimeout(() => {
    if (!hasActiveAlert) triggerAlert();
    scheduleNextAlert();
  }, 1400 + Math.random() * 1600);
}

function endGame() {
  gameRunning = false;
  hasActiveAlert = false;
  clearInterval(gameTimer);
  clearTimeout(alertTimer);
  if (incidentPanel) incidentPanel.classList.remove("alert-live");
  if (resolveBtn) resolveBtn.disabled = true;
  if (startBtn) startBtn.disabled = false;
  if (incidentMessage) incidentMessage.textContent = `Shift complete. Final score: ${score}.`;
}

if (startBtn && resolveBtn) {
  startBtn.addEventListener("click", () => {
    gameRunning = true;
    score = 0;
    timeLeft = 20;
    hasActiveAlert = false;
    incidentScore.textContent = String(score);
    incidentTime.textContent = String(timeLeft);
    incidentMessage.textContent = "Monitoring active. Waiting for the first alert...";
    startBtn.disabled = true;
    resolveBtn.disabled = false;
    scheduleNextAlert();
    gameTimer = setInterval(() => {
      timeLeft -= 1;
      incidentTime.textContent = String(timeLeft);
      if (timeLeft <= 0) endGame();
    }, 1000);
  });

  resolveBtn.addEventListener("click", () => {
    if (!gameRunning) return;
    if (hasActiveAlert) {
      score += 1;
      hasActiveAlert = false;
      incidentPanel.classList.remove("alert-live");
      incidentMessage.textContent = "Alert resolved. Monitoring for next signal...";
    } else {
      score = Math.max(0, score - 1);
      incidentMessage.textContent = "No active alert. False-positive action detected.";
    }
    incidentScore.textContent = String(score);
  });
}

const typedCommand = document.getElementById("typed-command");
const typedOutput = document.getElementById("typed-output");
const commandScenarios = [
  { cmd: "kubectl get pods -n prod --watch", out: "Real-time pod health streaming..." },
  { cmd: "aws cloudwatch describe-alarms --state ALARM", out: "Alert noise reduced through pruning and thresholds." },
  { cmd: "gitlab-runner exec docker deploy_infra", out: "Infrastructure rollout completed with peer-reviewed pipeline." },
  { cmd: "psql -h aurora-prod -c \"select version();\"", out: "PostgreSQL upgrade validated with zero downtime." }
];

let scenarioIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseFrames = 0;

function typeLoop() {
  if (!typedCommand || !typedOutput) return;
  const current = commandScenarios[scenarioIndex];
  if (!deleting) {
    typedCommand.textContent = current.cmd.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex >= current.cmd.length) {
      deleting = true;
      pauseFrames = 16;
      typedOutput.textContent = current.out;
    }
  } else {
    if (pauseFrames > 0) {
      pauseFrames -= 1;
    } else {
      typedCommand.textContent = current.cmd.slice(0, Math.max(0, charIndex - 1));
      charIndex -= 1;
      if (charIndex <= 0) {
        deleting = false;
        scenarioIndex = (scenarioIndex + 1) % commandScenarios.length;
      }
    }
  }
  setTimeout(typeLoop, deleting ? 42 : 58);
}
typeLoop();

const proseBlocks = document.querySelectorAll(".prose-reveal");
proseBlocks.forEach((block) => {
  const original = block.textContent.trim();
  if (!original) return;
  const sentences = original.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [original];
  block.textContent = "";
  sentences.forEach((sentence, idx) => {
    const span = document.createElement("span");
    span.className = "reveal-sentence";
    span.style.animationDelay = `${idx * 110}ms`;
    span.textContent = `${sentence.trim()} `;
    block.appendChild(span);
  });
});

const aboutSection = document.getElementById("about");
const aboutOperateTitle = document.getElementById("about-operate-title");
const aboutTickerLine = document.getElementById("about-terminal-line");
const yearsCounter = document.getElementById("years-counter");
const aboutPillarCopyBlocks = document.querySelectorAll(".about-pillar-copy");

if (aboutOperateTitle) {
  const titleText = aboutOperateTitle.textContent.trim();
  aboutOperateTitle.textContent = "";
  [...titleText].forEach((char, idx) => {
    const span = document.createElement("span");
    span.className = "split-letter";
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.transitionDelay = `${idx * 22}ms`;
    aboutOperateTitle.appendChild(span);
  });
}

aboutPillarCopyBlocks.forEach((block) => {
  const words = block.textContent.trim().split(/\s+/);
  block.textContent = "";
  words.forEach((word, idx) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.transitionDelay = `${idx * 30}ms`;
    span.textContent = `${word} `;
    block.appendChild(span);
  });
});

let yearsAnimated = false;
function animateYearsCounter() {
  if (!yearsCounter || yearsAnimated) return;
  yearsAnimated = true;
  const duration = 1200;
  const start = performance.now();
  const from = 0;
  const to = 2;
  function step(now) {
    const progress = Math.min(1, (now - start) / duration);
    const value = Math.floor(from + (to - from) * progress);
    yearsCounter.textContent = progress >= 1 ? "2+" : `${value}`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if (aboutSection) {
  const onAboutScroll = () => {
    const rect = aboutSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    const raw = total > 0 ? (vh - rect.top) / total : 0;
    const progress = Math.max(0, Math.min(1, raw));
    aboutSection.classList.remove("phase-1", "phase-2", "phase-3", "phase-4");
    if (progress >= 0.12) {
      aboutSection.classList.add("phase-1");
      animateYearsCounter();
    }
    if (progress >= 0.35) aboutSection.classList.add("phase-2");
    if (progress >= 0.58) aboutSection.classList.add("phase-3");
    if (progress >= 0.78) aboutSection.classList.add("phase-4");
  };
  window.addEventListener("scroll", onAboutScroll);
  onAboutScroll();
}

const aboutTickerMessages = [
  "> uptime: 99.98%",
  "> incidents resolved: 47",
  "> pipelines automated: 12",
  "> on-call rotations: active"
];

let aboutTickerIndex = 0;
let aboutTickerChar = 0;
let aboutTickerDeleting = false;
let aboutTickerPause = 0;

function runAboutTicker() {
  if (!aboutTickerLine) return;
  const current = aboutTickerMessages[aboutTickerIndex];
  if (!aboutTickerDeleting) {
    aboutTickerLine.textContent = current.slice(0, aboutTickerChar + 1);
    aboutTickerChar += 1;
    if (aboutTickerChar >= current.length) {
      aboutTickerDeleting = true;
      aboutTickerPause = 22;
    }
  } else if (aboutTickerPause > 0) {
    aboutTickerPause -= 1;
  } else {
    aboutTickerLine.textContent = current.slice(0, Math.max(0, aboutTickerChar - 1));
    aboutTickerChar -= 1;
    if (aboutTickerChar <= 0) {
      aboutTickerDeleting = false;
      aboutTickerIndex = (aboutTickerIndex + 1) % aboutTickerMessages.length;
    }
  }
  setTimeout(runAboutTicker, aboutTickerDeleting ? 36 : 58);
}
runAboutTicker();
