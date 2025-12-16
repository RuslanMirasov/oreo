export const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const fixHeaderOnScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  let isFixed = false;

  const onScroll = () => {
    const shouldBeFixed = window.scrollY > 0;

    if (shouldBeFixed !== isFixed) {
      header.classList.toggle('fix', shouldBeFixed);
      isFixed = shouldBeFixed;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

export const hidePreloader = () => {
  const preloader = document.querySelector('[data-preloader]');
  if (!preloader) return;

  document.body.classList.add('loaded');

  setTimeout(() => {
    preloader.remove();
  }, 1800);
};

export const initNavigationMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.navigation ');
  const menuLinks = document.querySelectorAll('.menu__link');

  const toggleMenu = () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
};
