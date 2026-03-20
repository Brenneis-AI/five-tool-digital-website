<script>
/* ========================================
   SECTION: Services Main (section-main1)
   Features Accordion
   ======================================== */

function initServices() {
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
  document.addEventListener('DOMContentLoaded', initServices);
} else {
  initServices();
}
</script>
