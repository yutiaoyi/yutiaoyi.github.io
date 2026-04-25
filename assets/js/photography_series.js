(() => {
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  if (!isCoarsePointer) return;

  const shots = Array.from(document.querySelectorAll("[data-photo-shot]"));
  if (shots.length === 0) return;

  function closeAll(except) {
    for (const shot of shots) {
      if (shot !== except) {
        shot.dataset.open = "false";
        const btn = shot.querySelector("[data-shot-toggle]");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    }
  }

  for (const shot of shots) {
    shot.dataset.open = "false";

    const btn = shot.querySelector("[data-shot-toggle]");
    if (!btn) continue;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const next = shot.dataset.open !== "true";
      closeAll(next ? shot : undefined);
      shot.dataset.open = next ? "true" : "false";
      btn.setAttribute("aria-expanded", next ? "true" : "false");
    });

    shot.addEventListener("click", () => {
      // Tap outside the caption area closes it.
      if (shot.dataset.open === "true") {
        closeAll(undefined);
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll(undefined);
  });
})();

