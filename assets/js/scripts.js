import { hidePreloader, initNavigationMenu, fixHeaderOnScroll, initDownloadPdf } from './helpers.js';
import { initSliders, heroSliderChange, faqSliderChange, cookieSliderChange } from './sliders.js';
import { initAccordeons } from './accordeon.js';
import { popup } from './popup.js';

popup.init();
window.popup = popup;

initNavigationMenu();
fixHeaderOnScroll();
initSliders();
initAccordeons();
initDownloadPdf();

setTimeout(() => {
  hidePreloader();
}, 300);

document.addEventListener('DOMContentLoaded', () => {
  heroSliderChange();
  faqSliderChange();
  cookieSliderChange();
});
