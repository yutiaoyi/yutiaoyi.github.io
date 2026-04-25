(() => {
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  if (!isCoarsePointer) return;

  const shots = Array.from(document.querySelectorAll("[data-photo-shot]"));
  if (shots.length === 0) return;

  function closeAll(except) {
    for (const shot of shots) {
      if (shot !== except) {
        shot.dataset.open = "false";
      }
    }
  }

  for (const shot of shots) {
    shot.dataset.open = "false";

    const media = shot.querySelector(".shot__media");
    if (!media) continue;

    media.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const next = shot.dataset.open !== "true";
      closeAll(next ? shot : undefined);
      shot.dataset.open = next ? "true" : "false";
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll(undefined);
  });
})();

