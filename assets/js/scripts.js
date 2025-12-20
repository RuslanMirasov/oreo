import { hidePreloader, initNavigationMenu, fixHeaderOnScroll } from './helpers.js';
import { initSliders, heroSliderChange, faqSliderChange, cookieSliderChange } from './sliders.js';
import { popup } from './popup.js';

popup.init();
window.popup = popup;

initNavigationMenu();
fixHeaderOnScroll();
initSliders();

setTimeout(() => {
  hidePreloader();
}, 300);

document.addEventListener('DOMContentLoaded', () => {
  heroSliderChange();
  faqSliderChange();
  cookieSliderChange();
});
