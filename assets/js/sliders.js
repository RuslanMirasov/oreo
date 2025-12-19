import { registerNamedSwiper } from './goToSlide.js';

const sliders = document.querySelectorAll('[data-slider]');
const toBool = s => String(s).toLowerCase() === 'true';

export const initSliders = () => {
  if (sliders.length > 0) {
    sliders.forEach(sliderWrapper => {
      const swiper = sliderWrapper.querySelector('.swiper');
      const {
        effect = 'slide',
        speed = '600',
        spaceBetween = '0,0,0',
        slidesPerView = '1,1,1',
        slidesPerGroup = '1,1,1',
        centered = false,
        loop = false,
        initialSlide = '0,0,0',
        direction = 'horizontal',
        allowTouchMove = 'true',
        autoplay = null,
      } = sliderWrapper.dataset;

      const arrowPrev = sliderWrapper.querySelector('[data-arrow-prev]');
      const arrowNext = sliderWrapper.querySelector('[data-arrow-next]');
      const pagination = sliderWrapper.querySelector('[data-pagination]');

      const options = {
        allowTouchMove: toBool(allowTouchMove),
        effect,
        speed,
        loop,
        centeredSlides: centered,
        centeredSlidesBounds: centered,
        direction,
        breakpoints: {
          0: {
            slidesPerView: Number(slidesPerView.split(',')[2]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[2]),
            spaceBetween: Number(spaceBetween.split(',')[2]),
            initialSlide: Number(initialSlide.split(',')[2]),
          },
          768: {
            slidesPerView: Number(slidesPerView.split(',')[1]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[1]),
            spaceBetween: Number(spaceBetween.split(',')[1]),
            initialSlide: Number(initialSlide.split(',')[1]),
          },
          1280: {
            slidesPerView: Number(slidesPerView.split(',')[0]),
            slidesPerGroup: Number(slidesPerGroup.split(',')[0]),
            spaceBetween: Number(spaceBetween.split(',')[0]),
            initialSlide: Number(initialSlide.split(',')[0]),
          },
        },
      };

      if (arrowPrev && arrowNext) {
        options.navigation = {
          prevEl: arrowPrev,
          nextEl: arrowNext,
        };
      }

      if (pagination) {
        options.pagination = {
          el: pagination,
          clickable: true,
          dynamicBullets: true,
        };
      }

      if (autoplay) {
        options.autoplay = {
          delay: autoplay,
          disableOnInteraction: false,
        };
      }

      if (effect === 'coverflow') {
        options.coverflowEffect = {
          rotate: 0,
          depth: 0,
          scale: 1,
          stretch: 16,
          // modifier: 1,
          slideShadows: false,
        };
      }

      const instance = new Swiper(swiper, options);

      const rawKey = sliderWrapper.getAttribute('data-slider');
      const key = rawKey && rawKey.trim();
      if (key) {
        registerNamedSwiper(key, instance);
      }
    });
  }
};

const onHeroSlideChange = number => {
  if (!number) return;
  const activeImage = document.querySelector('.hero-image.active');
  const targeImage = document.querySelector(`[data-hero-image="${number}"]`);

  activeImage?.classList.remove('active');
  targeImage?.classList.add('active');
};

export const heroSliderChange = () => {
  const heroSlider = window.swipers?.['hero'];
  if (!heroSlider) return;

  heroSlider.on('slideChange', () => {
    const index = heroSlider.activeIndex;
    const slideEl = heroSlider.slides[index];
    const number = slideEl?.dataset?.number;
    if (number) {
      onHeroSlideChange(Number(number));
    }
  });
};

export const faqSliderChange = () => {
  const faqSlider = window.swipers?.['faq'];
  if (!faqSlider) return;
  const paginationEl = faqSlider.pagination?.el;
  if (!paginationEl) return;

  let isStepping = false;
  const DEFAULT_SPEED = faqSlider.params.speed;
  const STEP_SPEED = 150;

  const updateClasses = () => {
    const slides = faqSlider.slides;
    const activeIndex = faqSlider.activeIndex;

    slides.forEach((slide, index) => {
      slide.classList.remove('swiper-slide-prev-prev', 'swiper-slide-next-next', 'swiper-slide-before', 'swiper-slide-after');

      const diff = index - activeIndex;

      if (diff === -2) {
        slide.classList.add('swiper-slide-prev-prev');
      } else if (diff === 2) {
        slide.classList.add('swiper-slide-next-next');
      } else if (diff < -2) {
        slide.classList.add('swiper-slide-before');
      } else if (diff > 2) {
        slide.classList.add('swiper-slide-after');
      }
    });
  };

  faqSlider.on('slideChange', updateClasses);

  paginationEl.addEventListener(
    'click',
    e => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const bullet = e.target.closest('.swiper-pagination-bullet');
      if (!bullet || isStepping) return;

      const bullets = [...paginationEl.children];
      const targetIndex = bullets.indexOf(bullet);
      const current = faqSlider.activeIndex;

      if (targetIndex === current) return;

      const step = targetIndex > current ? 1 : -1;
      const steps = Math.abs(targetIndex - current);

      isStepping = true;
      faqSlider.allowTouchMove = false;

      faqSlider.params.speed = STEP_SPEED;
      faqSlider.el.classList.add('is-stepping');

      let i = 0;

      const walk = () => {
        if (i >= steps) {
          isStepping = false;
          faqSlider.allowTouchMove = true;
          faqSlider.params.speed = DEFAULT_SPEED;
          faqSlider.el.classList.remove('is-stepping');
          return;
        }

        faqSlider.slideTo(faqSlider.activeIndex + step);
        i++;

        setTimeout(walk, STEP_SPEED - 20);
      };

      walk();
    },
    true
  );

  faqSlider.on('sliderFirstMove', () => {
    if (isStepping) return;

    isStepping = true;

    faqSlider.params.speed = STEP_SPEED - 20;
    faqSlider.el.classList.add('is-stepping');
  });

  faqSlider.on('touchEnd', () => {
    faqSlider.params.speed = DEFAULT_SPEED;
    faqSlider.el.classList.remove('is-stepping');

    isStepping = false;
  });

  updateClasses();
};
