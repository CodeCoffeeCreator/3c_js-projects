const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const data = [
  {
    image: './img/bmw.jpg',
    text: 'There is I8 White Car Concept',
  },
  {
    image: './img/tech.jpg',
    text: 'Cloud technology now is our future',
  },
  {
    image: './img/engineer.jpg',
    text: "Engineer's vibe today",
  },
  {
    image: './img/qpc.jpg',
    text: 'Quantum dimensions as our future',
  },
  {
    image: './img/dark.jpg',
    text: 'Dark deep internet has danger',
  },
  {
    image: './img/it.jpg',
    text: 'Information Technology for e-commerce',
  },
  {
    image: './img/basketball.jpg',
    text: 'Take up the sport to live long and healthy',
  },
  {
    image: './img/nature.jpg',
    text: 'Nature created the best pictures',
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);
voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
