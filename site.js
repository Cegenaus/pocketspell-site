// Pocketspell Studios: drifting embers in the night band, and the copy-email button.
(function () {
  var canvas = document.querySelector(".embers");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w = 0, h = 0, parts = [];
    var make = function (anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 8,
        r: 0.6 + Math.random() * 1.7,
        v: 0.12 + Math.random() * 0.4,
        sway: Math.random() * 6.28,
        star: anywhere && Math.random() < 0.5
      };
    };
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(80, (w * h) / 8000));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(make(true));
    };
    var draw = function (t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (p.star) {
          var a = 0.25 + 0.3 * Math.sin(p.sway + t / 900);
          ctx.fillStyle = "rgba(243,236,220," + a.toFixed(3) + ")";
          ctx.fillRect(p.x, p.y * 0.65, p.r * 0.8, p.r * 0.8);
          continue;
        }
        if (!reduce) {
          p.y -= p.v;
          p.x += Math.sin(p.sway + t / 1300) * 0.22;
          if (p.y < -10) { parts[i] = make(false); continue; }
        }
        var al = Math.max(0, Math.min(1, p.y / h)) * 0.85;
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, "rgba(255,200,115," + al.toFixed(3) + ")");
        g.addColorStop(1, "rgba(255,150,60,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, 6.283);
        ctx.fill();
      }
      if (!reduce) window.requestAnimationFrame(draw);
    };
    size();
    window.addEventListener("resize", function () { size(); if (reduce) draw(0); });
    window.requestAnimationFrame(draw);
  }

  var copy = document.querySelector("[data-copy]");
  if (copy) {
    var status = document.querySelector(".mailbox .status");
    var text = copy.getAttribute("data-copy");
    copy.addEventListener("click", function () {
      var done = function () { if (status) status.textContent = "Copied to clipboard"; };
      var fallback = function () {
        var code = document.querySelector(".mailbox code");
        if (code && window.getSelection) {
          var range = document.createRange();
          range.selectNodeContents(code);
          var sel = window.getSelection();
          sel.removeAllRanges(); sel.addRange(range);
        }
        if (status) status.textContent = "Selected. Press Ctrl+C (or long-press) to copy.";
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else { fallback(); }
      } catch (e) { fallback(); }
    });
  }
})();
