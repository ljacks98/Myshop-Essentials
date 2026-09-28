// 360° product viewer — drag (or swipe) to spin the product in 3D.
//
// Usage: mountViewer(containerEl, [imageUrl, imageUrl, ...], altText)
//
// Each photo covers an equal slice of the full turn. Within a slice the
// photo swings in 3D; at the slice edge it cross-fades to the next photo,
// so the product appears to turn on a turntable. With one photo it tilts
// in 3D instead. Spins slowly on its own until someone touches it.
// Respects "reduce motion" settings (no auto-spin).

function mountViewer(container, images, alt) {
  images = (images || []).filter(Boolean);
  if (!images.length) return;
  const n = images.length;
  const slice = 360 / n;
  const SWING = n > 1 ? 38 : 22; // max rotateY within a slice (degrees)
  const reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  container.classList.add("v360");
  container.innerHTML = `
    <div class="v360-stage" tabindex="0" role="img" aria-label="${alt || "Product"} — drag to spin">
      <div class="v360-turntable">
        ${images
          .map(
            (src, i) =>
              `<img class="v360-img${i === 0 ? " is-active" : ""}" src="${src}" alt="${i === 0 ? alt || "" : ""}" draggable="false" ${i === 0 ? "" : 'loading="lazy"'} />`
          )
          .join("")}
        <div class="v360-sheen"></div>
      </div>
      <div class="v360-floor"></div>
      <span class="v360-badge">360° · drag to spin</span>
      ${n > 1 ? '<button type="button" class="v360-nav v360-prev" aria-label="Previous photo">&#8249;</button><button type="button" class="v360-nav v360-next" aria-label="Next photo">&#8250;</button>' : ""}
    </div>
    ${
      n > 1
        ? `<div class="v360-thumbs">${images
            .map(
              (src, i) =>
                `<button type="button" class="v360-thumb${i === 0 ? " is-active" : ""}" data-i="${i}" aria-label="Photo ${i + 1}"><img src="${src}" alt="" loading="lazy" /></button>`
            )
            .join("")}</div>`
        : ""
    }
  `;

  const stage = container.querySelector(".v360-stage");
  const table = container.querySelector(".v360-turntable");
  const imgs = [...container.querySelectorAll(".v360-img")];
  const thumbs = [...container.querySelectorAll(".v360-thumb")];
  const sheen = container.querySelector(".v360-sheen");
  const floor = container.querySelector(".v360-floor");
  const badge = container.querySelector(".v360-badge");

  let angle = 0; // total spin angle in degrees
  let target = 0; // where we're easing to
  let active = 0;
  let dragging = false;
  let lastX = 0;
  let velocity = 0;
  let autoSpin = !reduceMotion;
  let interacted = false;

  function render() {
    let a = ((angle % 360) + 360) % 360;
    let idx;
    let local; // -1..1 position within the current slice
    if (n > 1) {
      idx = Math.floor((a + slice / 2) / slice) % n;
      const center = idx * slice;
      let d = a - center;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      local = d / (slice / 2);
    } else {
      idx = 0;
      local = Math.sin((a * Math.PI) / 180); // gentle back-and-forth tilt
    }
    const rot = local * SWING;
    table.style.transform = `rotateY(${rot}deg) rotateX(${Math.abs(local) * 4}deg)`;
    sheen.style.backgroundPosition = `${50 + local * 60}% 0`;
    floor.style.transform = `translateX(-50%) scaleX(${1 - Math.abs(local) * 0.25})`;
    if (idx !== active) {
      imgs[active].classList.remove("is-active");
      imgs[idx].classList.add("is-active");
      if (thumbs.length) {
        thumbs[active].classList.remove("is-active");
        thumbs[idx].classList.add("is-active");
      }
      active = idx;
    }
  }

  function tick() {
    if (!dragging) {
      if (autoSpin) target += n > 1 ? 0.35 : 0.6;
      else if (Math.abs(velocity) > 0.05) {
        target += velocity;
        velocity *= 0.94; // momentum after letting go
      }
    }
    angle += (target - angle) * 0.18;
    render();
    requestAnimationFrame(tick);
  }

  function stopAuto() {
    autoSpin = false;
    if (!interacted) {
      interacted = true;
      badge.classList.add("is-faded");
    }
  }

  function goTo(i) {
    stopAuto();
    velocity = 0;
    const cur = Math.round(target / 360) * 360;
    target = cur + i * slice;
  }

  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".v360-nav")) return;
    dragging = true;
    stopAuto();
    velocity = 0;
    lastX = e.clientX;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("is-dragging");
  });
  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    const delta = dx * 0.6;
    target += delta;
    velocity = delta;
  });
  const endDrag = () => {
    dragging = false;
    stage.classList.remove("is-dragging");
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("mouseenter", () => { if (!interacted) autoSpin = false; });
  stage.addEventListener("mouseleave", () => { if (!interacted && !reduceMotion) autoSpin = true; });
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { goTo((active + 1) % n); e.preventDefault(); }
    if (e.key === "ArrowLeft") { goTo((active - 1 + n) % n); e.preventDefault(); }
  });
  container.querySelectorAll(".v360-thumb").forEach((b) =>
    b.addEventListener("click", () => goTo(Number(b.dataset.i)))
  );
  const prev = container.querySelector(".v360-prev");
  const next = container.querySelector(".v360-next");
  if (prev) prev.addEventListener("click", () => goTo((active - 1 + n) % n));
  if (next) next.addEventListener("click", () => goTo((active + 1) % n));

  render();
  requestAnimationFrame(tick);
}

async function fetchGallery() {
  try {
    const res = await fetch("/data/gallery.json");
    if (!res.ok) return {};
    return await res.json();
  } catch (e) {
    return {};
  }
}
