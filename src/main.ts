import './style.css'
import { keys } from './keys'

let shift_left: HTMLElement | null;
let caps_lock: HTMLElement | null;
let input_text: HTMLInputElement;
let ctrl_down = false;
let caps = false;
let keys_btn: NodeListOf<Element> = [] as unknown as NodeListOf<Element>;
let lang: 'en'|'ru'|'enShift'|'ruShift'|'enCaps'|'ruCaps'|'enCapsShift' = 'en';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <textarea class="text" name="story" rows="5" cols="33"></textarea>
  <div id="keyboard"></div>
`;

const renderKeyboard = (type: 'en'|'ru'|'enShift'|'ruShift'|'enCaps'|'ruCaps'|'enCapsShift') => {
  document.querySelector<HTMLDivElement>('#keyboard')!.innerHTML = `
    <div class="keyboard_wrapp">
      <div class="row">
        ${keys[0].map((key) => `<div class="${key['class']}" keyname="${key['keyname']}">${key[type]}</div>`).join('')}
      </div>
      <div class="row">
        ${keys[1].map((key) => `<div class="${key['class']}" keyname="${key['keyname']}">${key[type]}</div>`).join('')}
      </div>
      <div class="row">
        ${keys[2].map((key) => `<div class="${key['class']}" keyname="${key['keyname']}">${key[type]}</div>`).join('')}
      </div>
      <div class="row">
        ${keys[3].map((key) => `<div class="${key['class']}" keyname="${key['keyname']}">${key[type]}</div>`).join('')}
      </div>
      <div class="row">
        ${keys[4].map((key) => `<div class="${key['class']}" keyname="${key['keyname']}">${key[type]}</div>`).join('')}
      </div>
    </div>
  `;

  keys_btn = document.querySelectorAll('.keys');
  shift_left = document.querySelector('.shift_left');
  caps_lock = document.querySelector('.caps_lock');
  input_text = document.querySelector('.text') as HTMLInputElement;
  if (caps) caps_lock?.classList.add('active');

  keys_btn.forEach((key) => { 
    let keyCode = key.getAttribute('keyname') as string;
    if (keyCode == 'CapsLock1' || keyCode == 'ShiftLeft1') {
      keyCode = keyCode.slice(0, -1);
    }
    key.addEventListener('mousedown', () => {
      if (keyCode != 'ShiftLeft' && keyCode != 'CapsLock' && keyCode != 'Tab'
          && keyCode != 'Backspace' && keyCode != 'Del'  && keyCode != 'ShiftRight'
          && keyCode != 'ControlLeft' && keyCode != 'OSLeft' && keyCode != 'AltLeft'
          && keyCode != 'Space' && keyCode != 'AltRight' && keyCode != 'ControlRight'
          && keyCode != 'ArrowLeft' && keyCode != 'ArrowUp' && keyCode != 'ArrowDown' && keyCode != 'ArrowRight') {
            input_text.value += key.textContent as string;
      }
      if (keyCode == 'Del') {
        input_text.value = input_text.value.slice(0, -1);
      }
      if (keyCode == 'Space') {
        input_text.value += ' ';
      }
      if (keyCode == 'Backspace') {
        input_text.value = input_text.value.slice(0, -1);
      }
      const keydown = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, code : keyCode});
      key.dispatchEvent(keydown);
      input_text?.focus();
    });
    key.addEventListener('mouseup', () => {
      const keyup = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, code : keyCode});
      key.dispatchEvent(keyup)
      input_text?.focus();
    })
  });
};

renderKeyboard('en');

window.addEventListener('keydown', function(e) {
  input_text?.focus();
  console.log(e.code);
  for(let i = 0; i < keys_btn.length; i++) {
    if(e.code === keys_btn[i].getAttribute('keyname') || e.key === keys_btn[i].getAttribute('lowerCaseName')) {
      keys_btn[i].classList.add('active');
    }
    if(e.code == 'CapsLock') {
      if (caps) {
        if (lang == 'ruCaps') lang = 'ru';
        else if (lang == 'enCaps') lang = 'en';
        renderKeyboard(lang);
        caps_lock?.classList.remove('active');
      } else {
        if (lang == 'ru') lang = 'ruCaps';
        else if (lang == 'en') lang = 'enCaps';
        renderKeyboard(lang);
        caps_lock?.classList.add('active');
      }
      caps = !caps;
    }
    if (e.code == 'ControlLeft') {
      ctrl_down = true;
    }
    if(e.code == 'ShiftLeft') {
      if (caps) {
        renderKeyboard('enCapsShift');
      } else {
        renderKeyboard('enShift');
      }
      shift_left?.classList.add('active');
    }
    if(e.code == 'AltLeft' && ctrl_down) {
      if (lang == 'ru' || lang == 'ruCaps') {
        if (caps) lang = 'enCaps'
        else lang = 'en';
      }
      else if (lang == 'en' || lang == 'enCaps') {
        if (caps) lang = 'ruCaps'
        else lang = 'ru';
      }
      ctrl_down = false;
      renderKeyboard(lang);
    }
  }
});

window.addEventListener('keyup', function(e) {
  for(let i = 0; i < keys_btn.length; i++) {
    if(e.code === keys_btn[i].getAttribute('keyname' ) || e.key === keys_btn[i].getAttribute('lowerCaseName')) {
      keys_btn[i].classList.remove('active');
    }
    if (e.code == 'ControlLeft') {
      ctrl_down = false;
    }
    if(e.code == 'ShiftLeft') {
      if (caps) {
        renderKeyboard('enCaps');
        caps_lock?.classList.add('active');
      } else {
        renderKeyboard('en');
      }
      shift_left?.classList.remove('active');
    }
  }
});
