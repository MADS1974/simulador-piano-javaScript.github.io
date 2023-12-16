const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audioMap = {};

pianoKeys.forEach((key) => {
  const keyName = key.dataset.key;
  audioMap[keyName] = new Audio(`src/tunes/${keyName}.wav`);


  key.addEventListener("mousedown", () => {
    key.classList.add("active");
    audioMap[keyName].currentTime = 3;
    audioMap[keyName].play();
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove("active");
    audioMap[keyName].pause();
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("active");
    audioMap[keyName].pause();
  });

  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

let isInputFocused = false;

function disableKeyboardListener(disable) {
  isInputFocused = disable;
}

document.addEventListener("keydown", (e) => {
  const keyPressed = e.key.toLowerCase(); // Converte a tecla pressionada para minúscula
  if (mapedKeys.includes(keyPressed) && !isInputFocused) {
    e.preventDefault(); // Impede o comportamento padrão associado à tecla pressionada
    playTune(keyPressed);
    audioMap[keyPressed].isPlaying = true;
  }
});

document.addEventListener("keyup", (e) => {
  const keyReleased = e.key.toLowerCase(); // Converte a tecla liberada para minúscula
  if (mapedKeys.includes(keyReleased)) {
    audioMap[keyReleased].pause();
    audioMap[keyReleased].isPlaying = false;
  }
});

const handleVolume = (e) => {
  for (const key in audioMap) {
    audioMap[key].volume = e.target.value;
  }
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

$(document).ready(function () {
  $('.switcher').click(function () {
    $('.switcher__button').toggleClass('switcher__button-before');
    $('.switcher').toggleClass('switcher-before');
  });
});

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

function playTune(key) {
  audioMap[key].currentTime = 0;
  audioMap[key].play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setInterval(() => {
    clickedKey.classList.remove("active");
  },500);
}

function playNotes() {
  const notesInput = document.getElementById("notes");
  const notes = notesInput.value.toLowerCase().split(/\s+/);

  let delay = 0;

  for (const note of notes) {
    if (mapedKeys.includes(note)) {
      setTimeout(() => {
        if (!isInputFocused) {  // Verifica se o campo de entrada de notas não está em foco
          playTune(note);
        }
      }, delay);
      // Aumenta o tempo de atraso para o próximo setTimeout
      delay += audioMap[note].duration * 40;
    }
  }
}

function playTune(key) {
  audioMap[key].currentTime = 0;
  audioMap[key].play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");

  // Adiciona a classe "pressed" para indicar a tecla sendo pressionada
  clickedKey.classList.add("pressed");

  // Agende a remoção da classe "active" após um curto período
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 100);
}