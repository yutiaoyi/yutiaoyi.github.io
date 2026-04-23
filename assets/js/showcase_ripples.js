(() => {
  function getDpr() {
    return Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function slugToLabel(slug) {
    return String(slug || "").trim();
  }

  function buildGroupNav() {
    const nav = document.querySelector("[data-showcase-group-nav]");
    const groups = Array.from(document.querySelectorAll(".showcase-group__title"));
    if (!nav || groups.length === 0) return;

    const frag = document.createDocumentFragment();
    for (const h of groups) {
      const label = slugToLabel(h.textContent);
      if (!label) continue;
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = label;
      frag.appendChild(a);
    }
    nav.appendChild(frag);
  }

  function initRippleCanvas() {
    const canvas = document.querySelector("[data-showcase-ripple-canvas]");
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = getDpr();

    const ripples = [];
    const MAX_RIPPLES = 18;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = getDpr();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(x, y, strength = 1) {
      ripples.push({
        x,
        y,
        t0: performance.now(),
        strength: clamp(strength, 0.35, 1.5),
        hue: Math.random() < 0.5 ? 206 : 194,
      });
      while (ripples.length > MAX_RIPPLES) ripples.shift();
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // Base ink wash
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(11, 15, 20, 0.03)";
      ctx.fillRect(0, 0, w, h);

      // Ripples
      ctx.globalCompositeOperation = "multiply";
      for (const r of ripples) {
        const age = (now - r.t0) / 1000;
        const life = 3.6;
        if (age > life) continue;

        const p = age / life;
        const radius = (p * 1.12 + 0.02) * Math.max(w, h) * 0.55;
        const alpha = (1 - p) * 0.22 * r.strength;
        const lineW = 1.6 + (1 - p) * 3.2;

        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue}, 55%, 45%, ${alpha})`;
        ctx.lineWidth = lineW;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, radius * 0.82, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue + 18}, 55%, 52%, ${alpha * 0.7})`;
        ctx.lineWidth = Math.max(1, lineW * 0.65);
        ctx.stroke();
      }

      // Soft moving wavefield (subtle)
      ctx.globalCompositeOperation = "multiply";
      const t = now / 1000;
      const bandCount = 10;
      for (let i = 0; i < bandCount; i++) {
        const y0 = (i / (bandCount - 1)) * h;
        const amp = 8 + i * 0.6;
        const freq = 0.008 + i * 0.0007;
        const phase = t * (0.7 + i * 0.05);

        ctx.beginPath();
        for (let x = 0; x <= w; x += 14) {
          const y = y0 + Math.sin(x * freq + phase) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const a = 0.02 + i * 0.004;
        ctx.strokeStyle = `rgba(18, 119, 153, ${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    function pointerToCanvas(e) {
      const rect = canvas.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left), 0, rect.width);
      const y = clamp((e.clientY - rect.top), 0, rect.height);
      return { x, y };
    }

    let lastSpawn = 0;
    function onPointerMove(e) {
      const now = performance.now();
      if (now - lastSpawn < 220) return;
      lastSpawn = now;
      const { x, y } = pointerToCanvas(e);
      spawn(x, y, 0.55);
    }

    function onPointerDown(e) {
      const { x, y } = pointerToCanvas(e);
      spawn(x, y, 1.25);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });

    resize();
    // Seed a few ripples so it feels alive immediately
    spawn(w * 0.22, h * 0.45, 0.9);
    spawn(w * 0.72, h * 0.35, 0.8);
    spawn(w * 0.48, h * 0.62, 0.7);
    requestAnimationFrame(draw);
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildGroupNav();
    initRippleCanvas();
  });
})();

