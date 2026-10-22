/* PATHways landing: menu, area panels, see more, form, trail, parallax, reveals, help menu */
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
    if (id) detail.dataset.area = id;
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
  var trailmap = byId('trailmap');
  var inView = { hero: true, guide: false, foot: false };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { inView[en.target.dataset.fab] = en.isIntersecting; });
      var showFab = !inView.hero && !inView.guide && !inView.foot;
      fab.classList.toggle('show', showFab);
      if (!showFab && !helpMenu.hidden) setHelp(false);
      trailmap.classList.toggle('show', !inView.hero && !inView.foot);
    });
    [['.hero', 'hero'], ['#guide', 'guide'], ['.foot', 'foot']].forEach(function (pair) {
      var el = $(pair[0]);
      el.dataset.fab = pair[1];
      io.observe(el);
    });
  } else {
    fab.classList.add('show');
  }

  /* Trail map: marks the section you're in */
  var mapLinks = $$('#trailmap a');
  if ('IntersectionObserver' in window) {
    var mapIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        mapLinks.forEach(function (a) {
          a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    mapLinks.forEach(function (a) { mapIO.observe(byId(a.getAttribute('href').slice(1))); });
  }
  mapLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToEl(byId(a.getAttribute('href').slice(1)), 0);
    });
  });

  /* Trail: the hero's footpath continues down the page, edged with grass, stones, wildflowers and
     trail marker posts. It fades in out of the hero and, at the bottom, turns right and walks off the
     edge of the screen through the dusk hills, so the journey carries on. Its dotted centre line steps forward a little as you scroll. */
  var main = $('main');
  var NS = 'http://www.w3.org/2000/svg';
  var trail = document.createElementNS(NS, 'svg');
  trail.setAttribute('class', 'trail');
  trail.setAttribute('aria-hidden', 'true');
  trail.setAttribute('focusable', 'false');
  trail.innerHTML =
    '<defs><linearGradient id="trail-fade-grad" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0"></linearGradient>' +
    '<mask id="trail-fade" maskUnits="userSpaceOnUse" x="0" y="0"><rect fill="url(#trail-fade-grad)"/></mask></defs>' +
    '<g mask="url(#trail-fade)">' +
    '<path class="trail-edge"/><path class="trail-bed"/><path class="trail-dots"/>' +
    '<g class="trail-verge"></g>' +
    '<use class="trail-cairn" href="#i-cairn" width="48" height="56"/>' +
    '</g>';
  main.insertBefore(trail, main.firstChild);
  var trailPaths = $$('.trail path');
  var trailDots = trail.querySelector('.trail-dots');
  var trailVerge = trail.querySelector('.trail-verge');
  var trailCairn = trail.querySelector('.trail-cairn');
  var trailFade = trail.querySelector('#trail-fade-grad');
  var trailFadeRect = trail.querySelector('#trail-fade rect');
  var trailLen = 0;
  var cairnAt = null;
  var FLOWERS = ['#7FB3E5', '#14A8C2', '#F4AF00', '#DE2A50'];

  function rel(el) {
    var r = el.getBoundingClientRect();
    var m = main.getBoundingClientRect();
    return { top: r.top - m.top, bottom: r.bottom - m.top, left: r.left - m.left, right: r.right - m.left,
      cx: (r.left + r.right) / 2 - m.left, cy: (r.top + r.bottom) / 2 - m.top };
  }

  // Waypoints: the trail keeps to the side margins and crosses between sections, so it never runs behind text
  function trailRoute(contentLeft) {
    var W = main.clientWidth;
    var L = contentLeft / 2;
    var R = W - contentLeft / 2;
    var wig = Math.min(34, contentLeft * 0.25);
    var pad = parseFloat(getComputedStyle($('.choose')).paddingTop);
    var hero = rel($('.hero'));
    var as = rel($('.assess'));
    var ch = rel($('.choose'));
    var wk = rel($('.walk'));
    var stops = $$('.st .lc').map(rel);
    var pts = [];

    // Long straight runs get two gentle bends, so the trail meanders like a real footpath
    function run(x, y1, y2, dir) {
      pts.push([x, y1]);
      var span = y2 - y1;
      if (span > 420) {
        pts.push([x + dir * wig, y1 + span / 3]);
        pts.push([x - dir * wig * 0.6, y1 + span * 2 / 3]);
      } else if (span > 200) {
        pts.push([x + dir * wig, y1 + span / 2]);
      }
      pts.push([x, y2]);
    }

    // Picks up where the hero's footpath leaves the bottom of the landscape
    pts.push([hero.cx + 6, hero.bottom - 40]);
    run(L, ch.top + pad * 0.7, stops[0].cy - 60, 1);
    stops.forEach(function (s) { pts.push([s.cx, s.cy]); });
    run(R, stops[stops.length - 1].cy + 60, ch.bottom - pad * 0.7, -1);
    run(R, as.top + pad * 0.7, as.bottom - pad * 0.7, -1);
    // A cairn marks the spot beside "Who walks with you"
    run(L, wk.top + pad * 0.7, wk.bottom - 300, 1);
    cairnAt = pts[pts.length - 1];
    // Then the trail turns right through the dusk hills, below the content, and walks off the edge of the screen
    pts.push([L + (W - L) * 0.3, wk.bottom - 150]);
    pts.push([W + 160, wk.bottom - 120]);
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

  // Grass tufts, stones and the odd wildflower along both edges of the path
  function buildVerge(path, width) {
    trailVerge.innerHTML = '';
    if (width < 30) return;
    var off = width / 2 + 10;
    var stops = $$('.st .lc').map(rel);
    for (var l = 70, n = 0; l < trailLen - 40; l += 64, n++) {
      var a = path.getPointAtLength(l);
      var b = path.getPointAtLength(l + 1);
      var dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      var side = n % 2 ? 1 : -1;
      var x = a.x + (-dy / len) * off * side;
      var y = a.y + (dx / len) * off * side;
      if (stops.some(function (s) { return Math.hypot(s.cx - x, s.cy - y) < 48; })) continue;
      var kind = (n * 7) % 10;
      var el;
      if (kind < 5) {
        el = document.createElementNS(NS, 'use');
        el.setAttribute('href', '#i-tuft');
        el.setAttribute('class', 'verge-tuft');
        el.setAttribute('width', 18);
        el.setAttribute('height', 13);
        el.setAttribute('x', (x - 9).toFixed(1));
        el.setAttribute('y', (y - 11).toFixed(1));
      } else if (kind < 8) {
        el = document.createElementNS(NS, 'ellipse');
        el.setAttribute('class', 'verge-stone');
        el.setAttribute('cx', x.toFixed(1));
        el.setAttribute('cy', y.toFixed(1));
        el.setAttribute('rx', 4 + (n % 3));
        el.setAttribute('ry', 2.6 + (n % 2));
      } else {
        el = document.createElementNS(NS, 'circle');
        el.setAttribute('cx', x.toFixed(1));
        el.setAttribute('cy', y.toFixed(1));
        el.setAttribute('r', 3);
        el.setAttribute('fill', FLOWERS[n % 4]);
      }
      trailVerge.appendChild(el);
    }
    // Just four marker posts, one where the trail enters each section, banded in the area colors in order
    var gates = ['.choose', '.assess', '.walk'].map(function (sel) { return rel($(sel)).top + 70; });
    var g = 0;
    for (var p = 0; p < trailLen && g < gates.length; p += 6) {
      var c = path.getPointAtLength(p);
      if (c.y < gates[g]) continue;
      var c2 = path.getPointAtLength(p + 1);
      var ex = c2.x - c.x, ey = c2.y - c.y, el2 = Math.hypot(ex, ey) || 1;
      // Where the path runs across the page, the post stands on its upper side so it never covers it
      var ny = ex / el2;
      var s2 = Math.abs(ny) > 0.5 ? (ny > 0 ? -1 : 1) : 1;
      var px = c.x + (-ey / el2) * (width / 2 + 20) * s2;
      var py = c.y + ny * (width / 2 + 20) * s2;
      var post = document.createElementNS(NS, 'use');
      post.setAttribute('href', '#i-post');
      post.setAttribute('class', 'verge-post');
      post.setAttribute('width', 19);
      post.setAttribute('height', 54);
      post.setAttribute('x', (px - 9.5).toFixed(1));
      post.setAttribute('y', (py - 50).toFixed(1));
      post.style.color = FLOWERS[g];
      trailVerge.appendChild(post);
      g++;
    }
  }

  function buildTrail() {
    var W = main.clientWidth;
    var H = main.offsetHeight;
    trail.setAttribute('width', W);
    trail.setAttribute('height', H);
    trail.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    // Narrow screens have little margin, so the path narrows to stay clear of text
    var contentLeft = rel($('.choose .wrap')).left + 24;
    var width = Math.max(14, Math.min(46, contentLeft * 0.42));
    trail.querySelector('.trail-bed').style.strokeWidth = width + 'px';
    trail.querySelector('.trail-edge').style.strokeWidth = (width + 6) + 'px';
    var pts = trailRoute(contentLeft);
    var d = smoothPath(pts);
    trailPaths.forEach(function (p) { p.setAttribute('d', d); });
    var bed = trail.querySelector('.trail-bed');
    trailLen = bed.getTotalLength();
    buildVerge(bed, width);
    trailCairn.setAttribute('x', (cairnAt[0] + width / 2 + 6).toFixed(1));
    trailCairn.setAttribute('y', (cairnAt[1] - 46).toFixed(1));
    // Fade in over the first 170px below the hero
    var y0 = pts[0][1];
    var stops = [[y0, 0], [y0 + 170, 1]];
    trailFade.setAttribute('y2', H);
    trailFade.innerHTML = stops.map(function (st) {
      return '<stop offset="' + (st[0] / H).toFixed(4) + '" stop-color="#fff" stop-opacity="' + st[1] + '"/>';
    }).join('');
    trailFadeRect.setAttribute('width', W);
    trailFadeRect.setAttribute('height', H);
    stepTrail();
  }

  // The centre dots move along the path at a quarter of the scroll speed, like footsteps, and stop when you do
  function stepTrail() {
    if (reduceMotion) return;
    trailDots.style.strokeDashoffset = (-window.pageYOffset * 0.25).toFixed(1);
  }

  /* Hero parallax: the landscape layers drift at different speeds, so the sun rises behind the hills */
  var hero = $('.hero');
  var heroIn = $('.hero-in');
  var layers = $$('.hero-layer');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parallax() {
    if (reduceMotion) return;
    var y = window.pageYOffset;
    var h = hero.offsetHeight;
    if (y > h) return;
    layers.forEach(function (l) {
      l.style.transform = 'translate3d(0,' + (y * parseFloat(l.dataset.depth)).toFixed(1) + 'px,0)';
    });
    // The content drifts and fades only when the whole hero fits on screen; on phones people scroll to reach it
    var fits = h <= window.innerHeight;
    heroIn.style.transform = fits ? 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)' : '';
    heroIn.style.opacity = fits ? Math.max(0, 1 - y / (h * 0.85)).toFixed(3) : '';
  }

  /* Section scenery: each piece moves with its section's distance from the middle of the window.
     data-depth moves it up or down, data-drift sideways, data-spin turns it (in degrees per pixel). */
  var scenery = $$('.scenery [data-depth], .scenery [data-drift], .scenery [data-spin]');

  function sceneryMove() {
    if (reduceMotion) return;
    var vh = window.innerHeight;
    scenery.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -300 || r.top > vh + 300) return;
      var c = r.top + r.height / 2 - vh / 2;
      var ty = c * (parseFloat(el.dataset.depth) || 0);
      var tx = c * (parseFloat(el.dataset.drift) || 0);
      var rot = c * (parseFloat(el.dataset.spin) || 0);
      el.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0)' +
        (rot ? ' rotate(' + rot.toFixed(1) + 'deg)' : '');
    });
  }

  window.addEventListener('scroll', function () { stepTrail(); parallax(); sceneryMove(); }, { passive: true });
  parallax();
  sceneryMove();

  /* Content rises into view as you arrive at it */
  var canReveal = 'IntersectionObserver' in window && !reduceMotion;
  // Without scroll reveals, the definition's color marks are shown straight away
  if (!canReveal) $$('.marks').forEach(function (el) { el.classList.add('in'); });
  if (canReveal) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        revealIO.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.path-line, .assess-copy, .report-preview, .choose .wrap > .lbl, .choose-sub, .walk-copy, .walk-in > .form')
      .forEach(function (el) {
        el.classList.add('reveal');
        revealIO.observe(el);
      });
    // Section headings rise word by word
    // The definition's color marks sweep in, as a highlighter would
    $$('.marks').forEach(function (el) { revealIO.observe(el); });
    $$('.sec h2:not(.lbl), .foot-close-h').forEach(function (h) {
      var i = 0;
      (function split(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 1) { split(child); return; }
          if (child.nodeType !== 3 || !child.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span');
            w.className = 'w';
            var inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', i++);
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        });
      })(h);
      h.classList.add('split');
      revealIO.observe(h);
    });
    // The area cards only fade, so the trail's stops never move
    $$('.st').forEach(function (el, i) {
      el.classList.add('reveal-fade');
      el.style.setProperty('--reveal-delay', (i * 0.12) + 's');
      revealIO.observe(el);
    });
  }

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

  /* Help menu on the floating button: take the assessment, or talk to a guide */
  var helpMenu = byId('help-menu');

  function setHelp(open) {
    helpMenu.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open) helpMenu.querySelector('a').focus();
  }
  fab.addEventListener('click', function () { setHelp(helpMenu.hidden); });
  helpMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setHelp(false); });
  document.addEventListener('click', function (e) {
    if (!helpMenu.hidden && !e.target.closest('#help')) setHelp(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !helpMenu.hidden) { setHelp(false); fab.focus(); }
  });
})();
