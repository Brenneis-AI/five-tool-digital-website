/* ========================================
   SECTION: Hero Slideshow (section-hero1)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration
  const isMobile = window.innerWidth <= 768;
  const slideDuration = isMobile ? 4000 : 5000;
  const totalSlides = 4;

  let currentSlide = 0;
  let slideInterval;

  // Get elements
  const slides = document.querySelectorAll('.hero-slide');
  const overlay = document.querySelector('.hero-overlay');
  const textContent = document.querySelector('.hero-text-content');

  // Start slideshow
  function startSlideshow() {
    // Activate first slide
    // ADD BOTH Active (Visible) AND Zooming (Animation)
    slides[0].classList.add('active');
    slides[0].classList.add('zooming');

    slideInterval = setInterval(() => {
      // Calculate next slide index
      const nextSlide = currentSlide + 1;

      // If we've shown all slides, show text
      if (nextSlide >= totalSlides) {
        // Fade out last slide
        slides[currentSlide].classList.remove('active');
        // Note: We leave 'zooming' ON so it doesn't snap back while fading

        clearInterval(slideInterval);
        showText();
        return;
      }

      // 1. Prepare next slide (Start animation hidden)
      slides[nextSlide].classList.add('zooming');

      // 2. Small delay to ensure DOM update, then execute fade
      setTimeout(() => {
        // Fade OUT current
        slides[currentSlide].classList.remove('active');

        // Fade IN next
        slides[nextSlide].classList.add('active');

        // Move to next slide
        currentSlide = nextSlide;
      }, 50);

    }, slideDuration);
  }

  // Show text overlay
  function showText() {
    // Fade in dark overlay
    overlay.classList.add('active');

    // Wait for overlay, then fade in text
    setTimeout(() => {
      textContent.classList.add('active');
    }, 500);
  }

  // Initialize slideshow
  startSlideshow();
});


/* ========================================
   SECTION: Features (section-features3)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DESKTOP: Feature hover interaction
  const featureItems = document.querySelectorAll('.feature-item');
  const featureImages = document.querySelectorAll('.feature-image');

  featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      featureItems.forEach(i => i.classList.remove('active'));
      featureImages.forEach(img => img.classList.remove('active'));

      item.classList.add('active');
      const feature = item.dataset.feature;
      document.getElementById(`img-${feature}`).classList.add('active');
    });
  });

  // MOBILE: Accordion interaction
  const accordionCards = document.querySelectorAll('.feature-accordion-card');

  accordionCards.forEach(card => {
    const header = card.querySelector('.feature-accordion-header');

    header.addEventListener('click', () => {
      // Close all other cards
      accordionCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
        }
      });

      // Toggle current card
      card.classList.toggle('active');
    });
  });
});


/* ========================================
   SECTION: FAQ (section-faq7)
   ======================================== */

// Primary event listener
document.addEventListener('DOMContentLoaded', initAccordion);

// Fallback for if DOM already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initAccordion, 1);
}

function initAccordion() {
  // CATEGORY ACCORDION FUNCTIONALITY
  const categoryItems = document.querySelectorAll('.faq-category-item');
  console.log('Found category items:', categoryItems.length);

  categoryItems.forEach((catItem) => {
    const catButton = catItem.querySelector('.faq-category-question');
    catButton.addEventListener('click', () => {
      console.log('Category clicked');
      // Close any other open category
      const openCat = document.querySelector('.faq-category-item.active');
      if (openCat && openCat !== catItem) {
        openCat.classList.remove('active');
      }
      // Toggle this category
      catItem.classList.toggle('active');
    });
  });

  // QUESTION-ANSWER ACCORDION FUNCTIONALITY
  const items = document.querySelectorAll('.faq-item');
  console.log('Found FAQ items:', items.length);

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      console.log('Question clicked');
      // Collapse any other open answer in the same category
      const openItem = item.closest('.faq-accordion').querySelector('.faq-item.active');
      if (openItem && openItem !== item) {
        openItem.classList.remove('active');
      }
      // Toggle this answer
      item.classList.toggle('active');
    });
  });
}
