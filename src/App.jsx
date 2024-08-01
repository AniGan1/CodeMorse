import { useState } from 'react';
import { translate, codemorse } from './morse';
import './App.css';

export default function App() {
  const [text, setText] = useState('');
  const [morseCode, setMorseCode] = useState('');

  function handleTextChange(e) {
    const inputText = e.target.value;
    setText(inputText);
    const translatedMorse = translate(inputText);
    setMorseCode(translatedMorse);
  }

  function handleMorseChange(e) {
    const inputMorse = e.target.value;
    setMorseCode(inputMorse);
    const translatedText = codemorse(inputMorse);
    setText(translatedText);
  }

  function handlePlayMorse(e) {
    e.preventDefault();
    playMorse(morseCode);
  }

  function handlePlayText(e) {
    e.preventDefault();
    playText(text);
  }

  return (
    <>
      <h1>CodeMorse</h1>
      <h3>Переводчик азбуки Морзе</h3>

      <form id="form">
        <label>
          <div className="top">
            <p>Текст</p>
            <button id="sound" onClick={handlePlayText}>
              <img src="./ssound.png" alt="" />
            </button>
          </div>
          <textarea
            id="text-one"
            rows={5}
            cols={40}
            onChange={handleTextChange}
            value={text}
          />
        </label>

        <label>
          <div className="top">
            <p>Азбука Морзе</p>
            <button id="sound" onClick={handlePlayMorse}>
              <img src="./ssound.png" alt="" />
            </button>
          </div>

          <textarea
            id="text-two"
            rows={5}
            cols={40}
            onChange={handleMorseChange}
            value={morseCode}
          />
        </label>
      </form>
    </>
  );
}

function playText(text){
  // Проверяем, поддерживается ли Web Speech API в браузере
  if ('speechSynthesis' in window) {
    // Создаем объект SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Настраиваем параметры, если нужно (например, голос, скорость, высота тона)
    utterance.lang = 'ru-RU'; // Устанавливаем язык
    utterance.rate = 1; // Скорость воспроизведения (0.1 до 10)
    utterance.pitch = 1; // Высота тона (0 до 2)

    // Проигрываем текст
    window.speechSynthesis.speak(utterance);
  } else {
    console.error('Web Speech API не поддерживается в этом браузере.');
  }
}
function playMorse(morseCode) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const dot = 0.1; // Длительность точки в секундах
  const dash = 0.3; // Длительность тире в секундах
  const gap = 0.1; // Промежуток между точками и тире
  let time = context.currentTime;

  morseCode.split('').forEach((char) => {
    if (char === '.') {
      beep(context, time, dot);
      time += dot + gap;
    } else if (char === '-') {
      beep(context, time, dash);
      time += dash + gap;
    } else if (char === ' ') {
      time += gap * 3;
    }
  });
}

function beep(context, time, duration) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, context.currentTime); 
  gainNode.gain.setValueAtTime(1, context.currentTime);

  oscillator.start(time);
  oscillator.stop(time + duration);
}
