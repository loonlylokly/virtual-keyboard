import './style.css'
import { keys } from './keys'

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
};

renderKeyboard('en');