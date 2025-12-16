import { hidePreloader, initNavigationMenu, fixHeaderOnScroll } from './helpers.js';

initNavigationMenu();
fixHeaderOnScroll();

setTimeout(() => {
  hidePreloader();
}, 300);
