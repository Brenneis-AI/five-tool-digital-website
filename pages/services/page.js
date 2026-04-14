<script>
/* ========================================
   SECTION: Services Main (section-main1)
   Desktop: Scroll-lock with progress bars
   Mobile: Accordion cards
   ======================================== */

function initServices() {

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
  document.addEventListener('DOMContentLoaded', initServices);
} else {
  initServices();
}
</script>
