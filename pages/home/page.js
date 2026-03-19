<script>
/* ========================================
   SECTION: Hero Slideshow (section-hero1)
   NOTE: Hero JS is embedded inside section-hero1.html as a self-contained block.
   GHL's framework CSS overrides externally-injected styles, so the hero must
   stay as one unit (style + html + script) pasted into a single GHL HTML block.
   ======================================== */


/* ========================================
   SECTION: Features (section-features3)
   ======================================== */

function initFeatures() {
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
  // CATEGORY ACCORDION FUNCTIONALITY
  const categoryItems = document.querySelectorAll('.faq-category-item');

  categoryItems.forEach((catItem) => {
    const catButton = catItem.querySelector('.faq-category-question');
    catButton.addEventListener('click', () => {
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

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordion);
} else {
  initAccordion();
}
</script>
