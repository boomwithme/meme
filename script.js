(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');
  const toast = document.querySelector('.toast');

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget || '');
      if (!target) return;
      const value = target.textContent.trim();
      if (!value || value.startsWith('[')) {
        if (toast) {
          toast.textContent = 'Mint address not added yet';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1800);
        }
        return;
      }
      try {
        await navigator.clipboard.writeText(value);
        if (toast) {
          toast.textContent = 'Mint address copied';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1800);
        }
      } catch {
        button.textContent = 'Select address above';
      }
    });
  });

  document.querySelectorAll('.placeholder-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('[')) {
        event.preventDefault();
        if (toast) {
          toast.textContent = 'Official link will be added at launch';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1800);
        }
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
