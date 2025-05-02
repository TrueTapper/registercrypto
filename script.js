
const prizes = [
  { name: "50FS", img: "https://i.imgur.com/Rzr3g1x.png", weight: 2 },
  { name: "10FS", img: "https://i.imgur.com/27ConO3.png", weight: 3 },
  { name: "Lottery", img: "https://i.imgur.com/2Vvvg12.png", weight: 4 },
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

function createStrip(prize) {
  strip.innerHTML = "";

  const total = 21; // нечетное число
  const centerIndex = Math.floor(total / 2);

  for (let i = 0; i < total; i++) {
    const p = i === centerIndex ? prize : prizes[i % prizes.length];
    const img = document.createElement("img");
    img.src = p.img;
    strip.appendChild(img);
  }

  return centerIndex;
}

function spin() {
  const prize = getWeightedPrize();
  const centerIndex = createStrip(prize);

  strip.style.transition = "none";
  strip.style.transform = `translateX(0px)`;

  setTimeout(() => {
    strip.style.transition = "transform 1s ease-out";
    const offset = centerIndex * blockWidth - blockWidth;
    strip.style.transform = `translateX(-${offset}px)`;
    resultEl.textContent = "Вы выиграли: " + prize.name;
  }, 50);
}

document.getElementById("spinBtn").addEventListener("click", spin);

