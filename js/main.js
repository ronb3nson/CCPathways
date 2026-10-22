/* PATHways landing: menu, stage panels, see more, form, floating button, quiz */
(function () {
  'use strict';

  var HEADER_OFFSET = 96;
  var CARD_OFFSET = 110;

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function byId(id) { return document.getElementById(id); }

  function scrollToEl(el, offset) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - (offset || HEADER_OFFSET);
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* Menu */
  var menuBtn = byId('menu-btn');
  var menuPane = byId('menu-pane');
  menuBtn.addEventListener('click', function () {
    var open = menuPane.hidden;
    menuPane.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  /* Stage panels */
  var detail = byId('stage-detail');
  var stepper = $('.stepper');
  var activeStage = null;

  function setStage(id) {
    activeStage = id;
    detail.hidden = !id;
    $$('.s-panel').forEach(function (p) { p.classList.toggle('on', p.id === 'panel-' + id); });
    $$('.st').forEach(function (card) {
      var on = card.dataset.stage === id;
      card.setAttribute('data-active', String(on));
      card.querySelector('.st-cta').setAttribute('aria-expanded', String(on));
    });
  }

  $$('.st-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setStage(btn.dataset.stage);
      scrollToEl(detail);
    });
  });
  $$('.st').forEach(function (card) {
    card.addEventListener('click', function () { setStage(card.dataset.stage); });
  });
  byId('sd-close').addEventListener('click', function () {
    setStage(null);
    scrollToEl(stepper, 120);
  });

  /* Hero rows: open a stage, then scroll to a card or the section */
  $$('[data-goto]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      setStage(link.dataset.goto);
      var card = link.dataset.card && byId(link.dataset.card);
      scrollToEl(card || byId('choose-path'), card ? CARD_OFFSET : HEADER_OFFSET);
    });
  });

  /* Next steps with no page of their own link to the guide form */
  $$('a[href="#guide"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToEl(byId('guide'));
    });
  });

  /* Explainer */
  var defToggle = byId('def-toggle');
  var explainer = byId('explainer');
  defToggle.addEventListener('click', function () {
    var open = explainer.hidden;
    explainer.hidden = !open;
    defToggle.setAttribute('aria-expanded', String(open));
    defToggle.textContent = open ? 'Hide explainer ↑' : 'What is discipleship? →';
  });

  /* See more */
  $$('.more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = byId(btn.getAttribute('aria-controls'));
      var open = list.hidden;
      list.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'See less ▴' : 'See more ▾';
    });
  });

  /* Guide form: opens an email to Church Life */
  var form = byId('guide');
  var submit = byId('conn-submit');
  var resetTimer;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = byId('conn-name').value.trim();
    var email = byId('conn-email').value.trim();
    if (!name || !email) {
      submit.textContent = 'Please add your name and email';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () { submit.textContent = 'Send my info'; }, 2600);
      byId(name ? 'conn-email' : 'conn-name').focus();
      return;
    }
    var campus = byId('conn-campus').value || 'Not specified';
    var path = byId('conn-stage').value || 'Not sure yet';
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nCampus: ' + campus + '\nPath: ' + path;
    window.location.href = 'mailto:ChurchLife@christchurchusa.org?subject=' +
      encodeURIComponent('PATHways: next-step guide') + '&body=' + encodeURIComponent(body);
    submit.textContent = 'Thank you!';
    submit.disabled = true;
  });

  /* Floating button: shown only while the hero, the form and the footer are all out of view */
  var fab = byId('fab-open');
  var inView = { hero: true, guide: false, foot: false };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { inView[en.target.dataset.fab] = en.isIntersecting; });
      fab.classList.toggle('show', !inView.hero && !inView.guide && !inView.foot);
    });
    [['.hero', 'hero'], ['#guide', 'guide'], ['.foot', 'foot']].forEach(function (pair) {
      var el = $(pair[0]);
      el.dataset.fab = pair[1];
      io.observe(el);
    });
  } else {
    fab.classList.add('show');
  }

  /* Quiz modal */
  var Q = [
    { q: 'Where are you with Jesus right now?',
      a: ["I'm still exploring who He is", 'I recently started following Him', "I've followed Him for a while", 'I help others follow Him'] },
    { q: 'How connected do you feel at Christ Church?',
      a: ["I'm new or just visiting", "I come, but I haven't connected yet", "I'm in a group or class", 'I serve on a team or disciple others'] },
    { q: 'What would help you most right now?',
      a: ['Understanding the basics of faith', 'Growing in prayer and the Bible', 'Finding a place to serve', 'Helping someone else follow Jesus'] }
  ];
  var STAGES = [
    { id: 'participate', k: 'p', L: 'P', name: 'Participate',
      d: 'Belong. Visit a weekend service, fill in a connection card and find your people.' },
    { id: 'apply', k: 'a', L: 'A', name: 'Apply',
      d: 'Become. Grow more like Jesus through prayer, Scripture and a Life Group.' },
    { id: 'takeaction', k: 't', L: 'T', name: 'Take Action',
      d: 'Serve. Discover your gifts, join a serve team and make a real difference.' },
    { id: 'helpothers', k: 'h', L: 'H', name: 'Help Others',
      d: 'Multiply. Invite a friend, walk alongside someone and help them make disciples too.' }
  ];

  var overlay = byId('ns-overlay');
  var quiz = byId('ns-quiz');
  var result = byId('ns-result');
  var back = byId('ns-back');
  var retake = byId('ns-retake');
  var step = 0;
  var answers = [];
  var picked = null;

  function focusables() {
    return $$('#ns-overlay button:not([hidden]), #ns-overlay [href]').filter(function (el) {
      return el.offsetParent !== null && !el.disabled && getComputedStyle(el).visibility !== 'hidden';
    });
  }

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    byId('ns-close').focus();
  }
  function closeModal(returnFocus) {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (returnFocus) fab.focus();
  }

  function renderQuestion() {
    quiz.hidden = false;
    result.hidden = true;
    retake.hidden = true;
    back.style.visibility = step ? 'visible' : 'hidden';
    byId('ns-prog').textContent = 'Question ' + (step + 1) + ' of ' + Q.length;
    byId('ns-q').textContent = Q[step].q;
    var box = byId('ns-ans');
    box.innerHTML = '';
    Q[step].a.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ans';
      b.textContent = text;
      if (answers[step] === i) b.setAttribute('aria-pressed', 'true');
      b.addEventListener('click', function () {
        answers[step] = i;
        if (step < Q.length - 1) { step++; renderQuestion(); } else { showResult(); }
        var first = box.querySelector('.ans');
        if (first && !quiz.hidden) first.focus();
      });
      box.appendChild(b);
    });
  }

  function showResult() {
    var mean = answers.reduce(function (s, v) { return s + v; }, 0) / answers.length;
    picked = STAGES[Math.min(3, Math.round(mean))];
    var lc = byId('ns-res-lc');
    lc.className = 'lc lc-' + picked.k;
    lc.textContent = picked.L;
    byId('ns-res-stage').textContent = picked.name;
    byId('ns-res-desc').textContent = picked.d;
    byId('ns-go').textContent = 'Explore ' + picked.name;
    quiz.hidden = true;
    result.hidden = false;
    retake.hidden = false;
    byId('ns-go').focus();
  }

  function startQuiz() { step = 0; answers = []; renderQuestion(); }

  fab.addEventListener('click', function () { startQuiz(); openModal(); });
  byId('ns-close').addEventListener('click', function () { closeModal(true); });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(true); });
  back.addEventListener('click', function () { if (step > 0) { step--; renderQuestion(); } });
  retake.addEventListener('click', startQuiz);
  byId('ns-go').addEventListener('click', function () {
    closeModal(false);
    setStage(picked.id);
    scrollToEl(detail);
  });
  byId('ns-guide').addEventListener('click', function () {
    closeModal(false);
    scrollToEl(byId('guide'));
    byId('conn-name').focus({ preventScroll: true });
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(true); return; }
    if (e.key !== 'Tab') return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
