import { hidePreloader, initNavigationMenu } from './helpers.js';

initNavigationMenu();

setTimeout(() => {
  hidePreloader();
}, 300);
