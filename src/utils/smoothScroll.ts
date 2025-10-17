export function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(
        link.getAttribute('href') || ''
      );
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

export function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

export function scrollToElement(
  element: HTMLElement | null,
  options?: ScrollIntoViewOptions
) {
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    ...options,
  });
}

export function observeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
  animatedElements.forEach((el) => observer.observe(el));

  return observer;
}
