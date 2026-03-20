<script>
/* ========================================
   SECTION: Hero Slideshow (section-hero1)
   ======================================== */

function initHeroSlideshow() {
  var isMobile = window.innerWidth <= 768;
  var slideDuration = isMobile ? 4000 : 5000;
  var totalSlides = 4;
  var currentSlide = 0;
  var slideInterval;

  var slides = document.querySelectorAll('.hero-slide');
  var overlay = document.querySelector('.hero-overlay');
  var textContent = document.querySelector('.hero-text-content');

  if (!slides.length || !overlay || !textContent) return;

  function startSlideshow() {
    slides[0].classList.add('active', 'animated');

    slideInterval = setInterval(function() {
      var nextSlide = currentSlide + 1;

      if (nextSlide >= totalSlides) {
        slides[currentSlide].classList.remove('active');
        clearInterval(slideInterval);
        showText();
        return;
      }

      slides[nextSlide].classList.add('preparing', 'animated');

      setTimeout(function() {
        slides[currentSlide].classList.remove('active');
        slides[nextSlide].classList.remove('preparing');
        slides[nextSlide].classList.add('active');
        currentSlide = nextSlide;
      }, 50);

    }, slideDuration);
  }

  function showText() {
    overlay.classList.add('active');
    setTimeout(function() {
      textContent.classList.add('active');
    }, 500);
  }

  startSlideshow();

  var lastWidth = window.innerWidth;
  window.addEventListener('resize', function() {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      location.reload();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlideshow);
} else {
  initHeroSlideshow();
}


/* ========================================
   SECTION: Features Accordion (section-features3)
   ======================================== */

function initFeatures() {
  var accordionCards = document.querySelectorAll('.feature-accordion-card');

  accordionCards.forEach(function(card) {
    var header = card.querySelector('.feature-accordion-header');

    header.addEventListener('click', function() {
      accordionCards.forEach(function(otherCard) {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
        }
      });

      card.classList.toggle('active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeatures);
} else {
  initFeatures();
}


/* ========================================
   SECTION: FAQ (section-faq7)
   ======================================== */

function initAccordion() {
  var items = document.querySelectorAll('.faq-item');

  items.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      var openItem = item.closest('.faq-accordion').querySelector('.faq-item.active');
      if (openItem && openItem !== item) {
        openItem.classList.remove('active');
      }
      item.classList.toggle('active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordion);
} else {
  initAccordion();
}
</script>
