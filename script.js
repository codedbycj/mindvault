let cards = JSON.parse(localStorage.getItem('cards')) || [];
let currentIndex = 0;
let showingFront = true;

const cardContainer = document.getElementById('card-container');
const flipBtn = document.getElementById('flip-btn');
const rememberedBtn = document.getElementById('remembered-btn');
const forgotBtn = document.getElementById('forgot-btn');
const addBtn = document.getElementById('add-card-btn');

const frontInput = document.getElementById('front-input');
const backInput = document.getElementById('back-input');

function showCard() {
  if (!cards.length) {
    cardContainer.textContent = "No cards yet.";
    return;
  }
  const card = cards[currentIndex];
  cardContainer.textContent = showingFront ? card.front : card.back;
}

function flipCard() {
  showingFront = !showingFront;
  showCard();
}

function addCard() {
  const front = frontInput.value.trim();
  const back = backInput.value.trim();
  if (front && back) {
    cards.push({ front, back, score: 0 });
    localStorage.setItem('cards', JSON.stringify(cards));
    frontInput.value = '';
    backInput.value = '';
    currentIndex = cards.length - 1;
    showingFront = true;
    showCard();
  }
}

function remembered() {
  cards[currentIndex].score++;
  nextCard();
}

function forgot() {
  cards[currentIndex].score = Math.max(cards[currentIndex].score - 1, 0);
  nextCard();
}

function nextCard() {
  cards.sort((a, b) => a.score - b.score);
  currentIndex = 0;
  showingFront = true;
  showCard();
  localStorage.setItem('cards', JSON.stringify(cards));
}

flipBtn.onclick = flipCard;
addBtn.onclick = addCard;
rememberedBtn.onclick = remembered;
forgotBtn.onclick = forgot;

showCard();
