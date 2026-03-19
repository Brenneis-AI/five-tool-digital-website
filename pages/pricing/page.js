<script>
/* ========================================
   SECTION: Pricing Hero (section-hero1)
   Slider, billing toggle, arrow nav, compare modal
   ======================================== */

function initPricing() {

  var plans = [
    {name:'Rookie League',tagline:'Step up to the plate—tools that just work.',price:'$127/mo',details:'Up to 1,000 contacts • Up to 5,000 emails • 200 SMS • 100 voice minutes • 400 AI Replies Per Month'},
    {name:'Single-A',tagline:'More at-bats, more leads, still lean.',price:'$197/mo',details:'Up to 2,500 contacts • Up To 10,000 emails • 400 SMS • 200 AI voice minutes • 800 AI Chat Replies Per Month'},
    {name:'Double-A',tagline:'Pro-level automations for rising contenders.',price:'$297/mo',details:'Up to 5,000 contacts • Up To 20,000 emails • 600 SMS • 300 AI voice minutes • 1,200 AI Chat Replies Per Month'},
    {name:'Triple-A',tagline:'High-volume hustle—ready for the big show.',price:'$397/mo',details:'Up to 10,000 contacts • Up To 40,000 emails • 1,000 SMS • 500 AI voice minutes • Unlimited AI Chat Replies Per Month'},
    {name:'Major League',tagline:'Enterprise power minus the enterprise bloat.',price:'$597/mo',details:'Up to 25,000 contacts • Up To 100,000 emails • 2,000 SMS • 1,000 AI voice minutes • Unlimited AI Chat Replies Per Month'},
    {name:'Dynasty',tagline:'Unlimited scale. Own the field, forever.',price:'$1197/mo',details:'Up to 100,000 contacts • Up To 500,000 emails • 5,000 SMS • 3,000 AI voice minutes • Unlimited AI Chat Replies Per Month'}
  ];

  var slider        = document.getElementById('contactSlider');
  var display       = document.getElementById('planDisplay');
  var arrowL        = document.getElementById('arrowLeft');
  var arrowR        = document.getElementById('arrowRight');
  var billingToggle = document.getElementById('billingMode');
  var monthlyLabel  = document.getElementById('monthlyLabel');
  var annualLabel   = document.getElementById('annualLabel');
  var compareBtn    = document.getElementById('compareBtn');
  var modal         = document.getElementById('comparisonModal');
  var modalClose    = document.getElementById('modalClose');

  if (!slider || !display) return;

  function updatePlan() {
    var idx           = +slider.value;
    var p             = plans[idx];
    var monthlyPrice  = parseFloat(p.price.replace('$','').replace('/mo',''));
    var isAnnual      = billingToggle.checked;

    var priceHTML     = '';
    var savingsHTML   = '';

    if (isAnnual) {
      var annualMonthly = Math.floor(monthlyPrice * 0.9);
      var annualTotal   = annualMonthly * 12;
      var regularAnnualTotal = monthlyPrice * 12;
      var annualSavings = regularAnnualTotal - annualTotal;

      priceHTML = '<strong>$' + annualMonthly + '/mo</strong>';
      savingsHTML =
        '<div class="plan-savings">' +
          '<em>billed at $' + annualTotal + '/yr</em>' +
          '<div>(Save $' + annualSavings + '/yr)</div>' +
        '</div>';
    } else {
      priceHTML = '<strong>' + p.price + '</strong>';
    }

    var bulletItems = p.details
      .split('•')
      .map(function(item) { return '<li>' + item.trim() + '</li>'; })
      .join('');

    display.innerHTML =
      '<div class="plan-name">' + p.name + '</div>' +
      '<div class="plan-tagline">' + p.tagline + '</div>' +
      '<div class="plan-price">' + priceHTML + '</div>' +
      savingsHTML +
      '<ul class="plan-details">' + bulletItems + '</ul>';

    arrowL.style.visibility = idx === 0                ? 'hidden' : 'visible';
    arrowR.style.visibility = idx === plans.length - 1 ? 'hidden' : 'visible';

    if (isAnnual) {
      annualLabel.classList.add('selected');
      monthlyLabel.classList.remove('selected');
    } else {
      monthlyLabel.classList.add('selected');
      annualLabel.classList.remove('selected');
    }
  }

  slider.addEventListener('input', updatePlan);
  billingToggle.addEventListener('change', updatePlan);
  arrowL.addEventListener('click', function() {
    if (+slider.value > 0) { slider.value--; updatePlan(); }
  });
  arrowR.addEventListener('click', function() {
    if (+slider.value < plans.length - 1) { slider.value++; updatePlan(); }
  });

  compareBtn.addEventListener('click', function() {
    modal.style.display = 'block';
  });
  modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  updatePlan();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricing);
} else {
  initPricing();
}


/* ========================================
   SECTION: Pricing FAQ (section-special-pricing2)
   ======================================== */

function initPricingFaq() {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      var openItem = document.querySelector('.faq-item.active');
      if (openItem && openItem !== item) {
        openItem.classList.remove('active');
      }
      item.classList.toggle('active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingFaq);
} else {
  initPricingFaq();
}
</script>
