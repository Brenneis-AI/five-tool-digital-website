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
   SECTION: Features (section-features3)
   Desktop: Scroll-lock with progress bars
   Mobile: Accordion cards
   ======================================== */

function initFeatures() {

  // === DESKTOP: Scroll-lock feature interaction ===
  var runway = document.querySelector('.features-scroll-runway');
  var featureItems = document.querySelectorAll('.feature-item');
  var featureImages = document.querySelectorAll('.feature-image');
  var numFeatures = featureItems.length;

  if (runway && window.innerWidth > 1024 && numFeatures > 0) {
    runway.style.height = (numFeatures * 100) + 'vh';

    var ticking = false;
    var hoverOverride = false;
    var hoverTimeout;

    function updateFeatures() {
      ticking = false;
      if (hoverOverride) return;

      var rect = runway.getBoundingClientRect();
      var runwayHeight = runway.offsetHeight;
      var viewportHeight = window.innerHeight;

      var scrolled = -rect.top;
      var totalScroll = runwayHeight - viewportHeight;
      if (totalScroll <= 0) return;

      var progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      var featureProgress = progress * numFeatures;
      var activeIndex = Math.min(Math.floor(featureProgress), numFeatures - 1);
      var indexProgress = featureProgress - activeIndex;

      featureItems.forEach(function(item, i) {
        var bar = item.querySelector('.feature-progress-bar');
        if (i === activeIndex) {
          item.classList.add('active');
          if (bar) bar.style.height = Math.round(indexProgress * 100) + '%';
        } else if (i < activeIndex) {
          item.classList.remove('active');
          if (bar) bar.style.height = '100%';
        } else {
          item.classList.remove('active');
          if (bar) bar.style.height = '0%';
        }
      });

      featureImages.forEach(function(img) { img.classList.remove('active'); });
      var activeFeature = featureItems[activeIndex].dataset.feature;
      var activeImg = document.getElementById('img-' + activeFeature);
      if (activeImg) activeImg.classList.add('active');
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateFeatures);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    updateFeatures();

    featureItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        hoverOverride = true;
        clearTimeout(hoverTimeout);

        featureItems.forEach(function(i) { i.classList.remove('active'); });
        featureImages.forEach(function(img) { img.classList.remove('active'); });

        item.classList.add('active');
        var feature = item.dataset.feature;
        var img = document.getElementById('img-' + feature);
        if (img) img.classList.add('active');
      });

      item.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(function() {
          hoverOverride = false;
          updateFeatures();
        }, 1000);
      });
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth <= 1024) {
        runway.style.height = 'auto';
      } else {
        runway.style.height = (numFeatures * 100) + 'vh';
      }
    });
  }

  // === MOBILE: Accordion interaction ===
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
