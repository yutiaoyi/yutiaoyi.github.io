---
show: true
width: 4
date: 2026-04-25 00:01:40 +0800
group: Photography
---

<div class="p-4">
  <a href="{{ '/showcase/photography/fantasy/' | relative_url }}" class="d-block mb-3">
    <div
      class="rounded-xl"
      style="
        aspect-ratio: 4 / 3;
        background:
          url('{{ '/showcase/photography/fantasy/cover.jpg' | relative_url }}') center/cover no-repeat,
          radial-gradient(1200px 520px at 70% 20%, rgba(255,255,255,0.08), transparent 60%),
          linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.99));
        border: 1px solid rgba(0,0,0,0.10);
        position: relative;
        overflow: hidden;
      "
    >
      <div style="position:absolute; inset:0; opacity:0.18; mix-blend-mode:screen; background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), transparent 55%),
        repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 18px);"></div>
      <div style="position:absolute; left:18px; top:16px; color: rgba(255,255,255,0.82); font-size:12px; letter-spacing:0.08em; text-transform:uppercase;">
        Series
      </div>
      <div style="position:absolute; left:18px; bottom:14px; color: rgba(255,255,255,0.92); font-size:14px; letter-spacing:0.04em;">
        Fantasy
      </div>
    </div>
  </a>
  <h3 class="mb-2">Fantasy</h3>
  <p class="mb-3 text-muted">{{ site.data.photography_series.fantasy.desc }}</p>
  <a class="btn btn-sm btn-outline-primary" href="{{ '/showcase/photography/fantasy/' | relative_url }}">
    Open
  </a>
</div>

