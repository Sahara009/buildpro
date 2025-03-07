document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header__sticky');
  if (!header) return;

  // Настройки для разных разрешений
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  };

  // Параметры заголовка
  const headerSettings = {
    bgColor: {
      default: 'rgba(34, 34, 34, 1)',
      scrolled: 'rgba(25, 25, 25, 1)'
    },
    scrollThreshold: 100
  };

  // Обновление параметров при ресайзе
  const updateHeaderSettings = () => {
    const width = window.innerWidth;

    if (width < breakpoints.mobile) {
      headerSettings.scrollThreshold = 50;
    } else if (width < breakpoints.tablet) {
      headerSettings.scrollThreshold = 80;
    } else {
      headerSettings.scrollThreshold = 100;
    }
  };

  // Обработчик скролла
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    const isScrolled = currentScroll > headerSettings.scrollThreshold;
    const width = window.innerWidth;

    // Обновляем цвет фона
    header.style.backgroundColor = isScrolled
      ? headerSettings.bgColor.scrolled
      : headerSettings.bgColor.default;

    // Настройка ширины в зависимости от скролла и разрешения
    if (width < breakpoints.mobile) {
      // Мобильные стили
      header.style.position = 'fixed';
      header.style.width = '100%';
      header.style.maxWidth = '100%';
    } else {
      // Десктопные стили
      header.style.position = 'fixed';

      if (isScrolled) {
        // При скролле - максимальная ширина
        header.style.width = '100%';
        header.style.maxWidth = '1920px';
      } else {
        // До скролла - подстраиваемся под hero__content
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
          const heroWidth = heroContent.offsetWidth;
          header.style.width = `${heroWidth}px`;
          header.style.maxWidth = `${heroWidth}px`;
        }
      }
    }
  };

  // Инициализация
  const init = () => {
    updateHeaderSettings();

    // Оптимизация обработчика скролла
    let isTicking = false;
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          isTicking = false;
        });
        isTicking = true;
      }
    });

    // Обновление при ресайзе
    window.addEventListener('resize', () => {
      updateHeaderSettings();
      handleScroll();
    });

    // Первоначальный вызов
    handleScroll();
  };
  init();

  // Обработка отправки формы
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Проверяем, что согласие с политикой конфиденциальности получено
      const privacyCheckbox = form.querySelector('#privacy-policy');
      if (!privacyCheckbox.checked) {
        alert('Please accept the Privacy Policy to continue.');
        return;
      }

      const formData = new FormData(form);
      // Здесь обычно отправка данных на сервер
      alert('Thank you for your submission! We will contact you soon.');
      form.reset();
    });
  }

});
