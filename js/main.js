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
    queueBuild();
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
    queueBuild();
  });

  /* See more */
  $$('.more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = byId(btn.getAttribute('aria-controls'));
      var open = list.hidden;
      list.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'See less ▴' : 'See more ▾';
      queueBuild();
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
    var interest = byId('conn-stage').value || 'Not sure yet';
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nCampus: ' + campus + '\nInterested in: ' + interest;
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

  /* Trail: a winding walking path behind the page that fills in as you scroll */
  var main = $('main');
  var NS = 'http://www.w3.org/2000/svg';
  var trail = document.createElementNS(NS, 'svg');
  trail.setAttribute('class', 'trail');
  trail.setAttribute('aria-hidden', 'true');
  trail.setAttribute('focusable', 'false');
  trail.innerHTML =
    '<defs><mask id="trail-walked" maskUnits="userSpaceOnUse"><path class="trail-reveal"/></mask></defs>' +
    '<path class="trail-bed"/><path class="trail-dots"/>' +
    '<path class="trail-dots trail-dots-walked" mask="url(#trail-walked)"/>' +
    '<circle class="trail-walker" r="8"/>';
  main.insertBefore(trail, main.firstChild);
  var trailMask = trail.querySelector('mask');
  var trailPaths = $$('.trail path');
  var trailReveal = trail.querySelector('.trail-reveal');
  var walker = trail.querySelector('.trail-walker');
  var trailLen = 0;
  var trailSamples = [];

  function rel(el) {
    var r = el.getBoundingClientRect();
    var m = main.getBoundingClientRect();
    return { top: r.top - m.top, bottom: r.bottom - m.top, left: r.left - m.left, right: r.right - m.left,
      cx: (r.left + r.right) / 2 - m.left, cy: (r.top + r.bottom) / 2 - m.top };
  }

  // Waypoints: the trail keeps to the side margins and crosses between sections, so it never runs behind text
  function trailRoute() {
    var W = main.clientWidth;
    var contentLeft = rel($('.choose .wrap')).left + 24;
    var L = contentLeft / 2;
    var R = W - contentLeft / 2;
    var wig = Math.min(28, contentLeft * 0.25);
    var pad = parseFloat(getComputedStyle($('.assess')).paddingTop);
    var hero = rel($('.hero'));
    var as = rel($('.assess'));
    var ch = rel($('.choose'));
    var wk = rel($('.walk'));
    var stops = $$('.st .lc').map(rel);
    var pts = [];

    function run(x, y1, y2, dir) {
      pts.push([x, y1]);
      if (y2 - y1 > 240) pts.push([x + dir * wig, (y1 + y2) / 2]);
      pts.push([x, y2]);
    }

    pts.push([hero.cx, hero.bottom]);
    run(R, as.top + pad * 0.7, as.bottom - pad * 0.7, -1);
    run(L, ch.top + pad * 0.7, stops[0].cy - 60, 1);
    stops.forEach(function (s) { pts.push([s.cx, s.cy]); });
    run(R, stops[stops.length - 1].cy + 60, ch.bottom - pad * 0.7, -1);
    // The trail ends beside "Who walks with you"
    run(L, wk.top + pad * 0.7, wk.bottom - pad, 1);
    return pts;
  }

  // Catmull-Rom spline through the waypoints, written as cubic Béziers
  function smoothPath(p) {
    function f(n) { return Math.round(n * 10) / 10; }
    var d = 'M' + f(p[0][0]) + ' ' + f(p[0][1]);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += ' C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) +
        ' ' + f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) +
        ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d;
  }

  function buildTrail() {
    var W = main.clientWidth;
    var H = main.offsetHeight;
    trail.setAttribute('width', W);
    trail.setAttribute('height', H);
    trail.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    ['width', 'height'].forEach(function (a, i) { trailMask.setAttribute(a, [W, H][i]); });
    // Narrow screens have little margin, so the trail narrows to stay clear of text
    var contentLeft = rel($('.choose .wrap')).left + 24;
    trail.querySelector('.trail-bed').style.strokeWidth = Math.max(10, Math.min(30, contentLeft * 0.8)) + 'px';
    var d = smoothPath(trailRoute());
    trailPaths.forEach(function (p) { p.setAttribute('d', d); });
    trailLen = trailPaths[0].getTotalLength();
    trailReveal.style.strokeDasharray = trailLen + ' ' + trailLen;
    trailSamples = [];
    for (var l = 0; l <= trailLen; l += 8) {
      var pt = trailPaths[0].getPointAtLength(l);
      trailSamples.push([l, pt.x, pt.y]);
    }
    walkTrail();
  }

  // The walked part ends where the trail crosses 60% of the way down the window
  function walkTrail() {
    if (!trailSamples.length) return;
    var target = window.innerHeight * 0.6 - main.getBoundingClientRect().top;
    var i = 0;
    while (i < trailSamples.length - 1 && trailSamples[i + 1][2] <= target) i++;
    var s = trailSamples[i];
    trailReveal.style.strokeDashoffset = trailLen - s[0];
    walker.setAttribute('cx', s[1]);
    walker.setAttribute('cy', s[2]);
    walker.style.opacity = target > trailSamples[0][2] ? 1 : 0;
  }

  var walkQueued = false;
  window.addEventListener('scroll', function () {
    if (walkQueued) return;
    walkQueued = true;
    requestAnimationFrame(function () { walkQueued = false; walkTrail(); });
  }, { passive: true });

  var buildTimer;
  function queueBuild() {
    clearTimeout(buildTimer);
    buildTimer = setTimeout(buildTrail, 60);
  }
  // Rebuild when the layout moves: resizes, late-loading fonts and images, and the toggles above
  window.addEventListener('resize', queueBuild);
  window.addEventListener('load', queueBuild);
  if ('ResizeObserver' in window) new ResizeObserver(queueBuild).observe(main);
  buildTrail();

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
