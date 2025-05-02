const validCodes = ["test001", "test002", "test003", "test004", "test005", "test006", "test007"];
let codeActivated = false;

// Блокируем кнопку запуска до активации
document.getElementById("spinBtn").disabled = true;

const prizes = [
  { name: "50FS", img: "https://i.imgur.com/Rzr3g1x.png", weight: 1 },
  { name: "10FS", img: "https://i.imgur.com/27ConO3.png", weight: 2 },
  { name: "Lottery", img: "https://i.imgur.com/2Vvvg12.png", weight: 6 },
  { name: "Airpods", img: "https://i.imgur.com/VDE2X6G.png", weight: 1 },
];

const strip = document.getElementById("strip");
const resultEl = document.getElementById("result");
const blockWidth = 110;

function getWeightedPrize() {
  const total = prizes.reduce((sum, p) => sum + p.weight, 0);
  let rand = Math.random() * total;
  for (const prize of prizes) {
    rand -= prize.weight;
    if (rand <= 0) return prize;
  }
  return prizes[0];
}

function createStrip(prize, cycles = 5) {
  strip.innerHTML = "";

  const visible = 21;
  const centerIndex = Math.floor(visible / 2);

  const allItems = [];
  const totalCopies = cycles * prizes.length + visible;

  for (let i = 0; i < totalCopies; i++) {
    const p = i === totalCopies - centerIndex - 1 ? prize : prizes[i % prizes.length];
    const img = document.createElement("img");
    img.src = p.img;
    allItems.push(img);
  }

  allItems.forEach(img => strip.appendChild(img));

  return totalCopies - centerIndex - 1; // целевой индекс
}


function spin() {
  const input = document.getElementById("codeInput").value.trim();
  const codeIndex = validCodes.indexOf(input);
  if (!codeActivated || codeIndex === -1) return;

  validCodes.splice(codeIndex, 1);
  codeActivated = false;
  document.getElementById("spinBtn").disabled = true;
  document.getElementById("codeInput").value = "";

  const prize = getWeightedPrize();
  const cycles = 5; // сколько оборотов
  const centerIndex = createStrip(prize, cycles);

  strip.style.transition = "none";
  strip.style.transform = `translateX(0px)`;

  setTimeout(() => {
    strip.style.transition = "transform 5s ease-out";
    const offset = centerIndex * blockWidth - blockWidth;
    strip.style.transform = `translateX(-${offset}px)`;
    resultEl.textContent = "Вы выиграли: " + prize.name;
  }, 50);
}

// ... уже есть код выше

document.getElementById("codeInput").addEventListener("input", () => {
  const input = document.getElementById("codeInput").value.trim();
  const btn = document.getElementById("spinBtn");
  const result = document.getElementById("result");

  if (validCodes.includes(input)) {
    codeActivated = true;
    btn.disabled = false;
    result.textContent = "Код активирован! Нажмите 'Запустить'";
  } else {
    codeActivated = false;
    btn.disabled = true;
    result.textContent = "";
  }
});

// ⬇️ ЭТО НУЖНО ДОБАВИТЬ
document.getElementById("spinBtn").addEventListener("click", spin);
