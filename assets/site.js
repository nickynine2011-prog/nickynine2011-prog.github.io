// Highlights the current section in the side index.
// Progressive enhancement: the page works fully without this file.
(function () {
  var links = [].slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  var targets = links.map(function (a) { return document.getElementById(a.hash.slice(1)); });
  if (!links.length) return;

  var queued = false;

  // The current section is the last one whose top has passed 40% of the
  // viewport. At the very bottom of the page the last section wins, since
  // a short final section can never reach that line on a tall screen.
  function update() {
    queued = false;
    var line = window.innerHeight * 0.4;
    var current = -1;
    targets.forEach(function (el, i) {
      if (el && el.getBoundingClientRect().top <= line) current = i;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = targets.length - 1;
    }
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  function queue() {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();
})();
