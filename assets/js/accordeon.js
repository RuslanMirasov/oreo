export const initAccordeons = () => {
  const accordeons = document.querySelectorAll('[data-accordeons]');

  if (!accordeons.length) return;

  const accordeonToggle = e => {
    if (!e.target.hasAttribute('data-accordeon-toggle')) return;

    const accordeon = e.target.closest('.accordeon');
    const accordeonBody = accordeon.querySelector('.answer');
    const activeAccordeon = e.target.closest('[data-accordeons]')?.querySelector('.accordeon.open');
    const activeAccordeonBody = activeAccordeon?.querySelector('.answer');

    if (accordeon !== activeAccordeon) {
      activeAccordeon?.classList.remove('open');
      if (activeAccordeonBody) activeAccordeonBody.style.height = '0px';
    }

    if (accordeon.classList.contains('open')) {
      accordeon.classList.remove('open');
      accordeonBody.style.height = '0px';
      return;
    }

    accordeon.classList.add('open');
    accordeonBody.style.height = accordeonBody.scrollHeight + 'px';
  };

  accordeons.forEach(el => {
    el.addEventListener('click', accordeonToggle);
  });
};
