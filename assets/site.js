// Highlights the current section in the side index.
// Progressive enhancement: the page works fully without this file.
(function () {
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      var link = byId[entry.target.id];
      if (link) link.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  Object.keys(byId).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
