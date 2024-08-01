
const morseAlphabet = {
  'а': '.-', 'б': '-...', 'в': '.--', 'г': '--.', 'д': '-..', е: '.', ж: '...-', з: '--..', 
  и: '..', й: '.---', к: '-.-', л: '.-..', м: '--', н: '-.', о: '---', п: '.--.', 
  р: '.-.', с: '...', т: '-', у: '..-', ф: '..-.', х: '....', ц: '-.-.', ч: '---.', 
  ш: '----', щ: '--.-', ъ: '--.--', ы: '-.--', ь: '-..-', э: '..-..', ю: '..--', я: '.-.-',
  '-': '-....-', '.': '.-.-.-', ',': '--..--', '?': '..--..'
};

const textMap = Object.fromEntries(Object.entries(morseAlphabet).map(([k, v]) => [v, k]));

export function translate(text) {
  return text.toLowerCase().split('').map(char => morseAlphabet[char] || '').join(' ');
}

export function codemorse(morse) {
  return morse.split(' ').map(code => textMap[code] || '').join('');
}
