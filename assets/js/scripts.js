import { hidePreloader, initNavigationMenu, fixHeaderOnScroll } from './helpers.js';
import { initSliders, heroSliderChange, faqSliderChange, cookieSliderChange } from './sliders.js';
import { initAccordeons } from './accordeon.js';
import { popup } from './popup.js';

popup.init();
window.popup = popup;

initNavigationMenu();
fixHeaderOnScroll();
initSliders();
initAccordeons();

setTimeout(() => {
  hidePreloader();
}, 300);

document.addEventListener('DOMContentLoaded', () => {
  heroSliderChange();
  faqSliderChange();
  cookieSliderChange();
});
