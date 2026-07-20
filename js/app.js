// Renders the day nav + exercise cards from data.js, then wires up interactions.
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const todayDow = new Date().getDay();
const todayDay = (todayDow >= 1 && todayDow <= 6) ? todayDow : null;
const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const behavior = rm ? "auto" : "smooth";
const chev = `<svg class="exchev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

const host = document.getElementById("days");
days.forEach(d => {
  const isToday = d.id === todayDay;
  const det = document.createElement("details");
  det.className = "day " + d.kind;
  det.id = "day-" + d.id;
  if (isToday) det.open = true;

  const exHtml = d.ex.map(e => {
    const g = e.g || {};
    const meta = [];
    if (g.t) meta.push(`<span class="m-tag"><span class="m-k">Targets</span>${esc(g.t)}</span>`);
    if (g.r) meta.push(`<span class="m-tag"><span class="m-k">Rest</span>${esc(g.r)}</span>`);
    const steps = (g.steps || []).map(s => `<li>${esc(s)}</li>`).join("");
    return `
    <details class="ex${e.star ? " priority" : ""}">
      <summary>
        <span class="left">
          <span class="name">${e.tag ? `<span class="tag">${esc(e.tag)}</span>` : ""}${esc(e.n)}${e.sub ? `<span class="sub">${esc(e.sub)}</span>` : ""}</span>
        </span>
        <span class="right"><span class="sets">${esc(e.s)}</span>${chev}</span>
      </summary>
      <div class="how">
        ${meta.length ? `<div class="how-meta">${meta.join("")}</div>` : ""}
        ${steps ? `<ol class="steps">${steps}</ol>` : ""}
        ${g.cue ? `<p class="cue"><b>Cue</b>${esc(g.cue)}</p>` : ""}
      </div>
    </details>`;
  }).join("");

  det.innerHTML = `
    <summary>
      <span class="idx">${d.id}</span>
      <span class="meta">
        <span class="focus">${esc(d.focus)}${isToday ? `<span class="today">Today</span>` : ""}</span>
        <span class="muscles">${esc(d.muscles)}</span>
      </span>
      <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </summary>
    <div class="exlist">
      <div class="exhint"><button type="button" class="exall">Show all</button></div>
      ${exHtml}
    </div>`;
  host.appendChild(det);

  const allBtn = det.querySelector(".exall");
  allBtn.addEventListener("click", () => {
    const items = det.querySelectorAll("details.ex");
    const anyClosed = [...items].some(x => !x.open);
    items.forEach(x => x.open = anyClosed);
    allBtn.textContent = anyClosed ? "Hide all" : "Show all";
  });
  det.querySelectorAll("details.ex").forEach(x => {
    x.addEventListener("toggle", () => {
      const items = det.querySelectorAll("details.ex");
      allBtn.textContent = [...items].every(i => i.open) ? "Hide all" : "Show all";
    });
  });
});

const rest = document.createElement("div");
rest.className = "rest";
rest.id = "rest";
rest.innerHTML = `<span class="idx">7</span><div><b>Rest: Sunday</b><span>Full rest, or a relaxed walk / yoga / mobility.</span></div>`;
host.appendChild(rest);

const nav = document.getElementById("daynav");
days.forEach(d => {
  const a = document.createElement("a");
  a.className = d.kind + (d.id === todayDay ? " now" : "");
  a.href = "#day-" + d.id;
  const short = d.focus.split(":")[0].trim();
  a.innerHTML = `<span class="dot"></span>${d.id} ${esc(short)}`;
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.getElementById("day-" + d.id);
    t.open = true;
    t.scrollIntoView({behavior, block:"start"});
  });
  nav.appendChild(a);
});
const ra = document.createElement("a");
ra.className = "rest" + (todayDow === 0 ? " now" : "");
ra.href = "#rest";
ra.innerHTML = `<span class="dot"></span>7 Rest`;
ra.addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("rest").scrollIntoView({behavior, block:"start"});
});
nav.appendChild(ra);

const toTop = document.getElementById("toTop");
addEventListener("scroll", () => {
  toTop.classList.toggle("show", window.scrollY > 420);
}, {passive:true});
toTop.addEventListener("click", () => window.scrollTo({top:0, behavior}));

const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = () =>
  document.documentElement.dataset.theme || (prefersDark.matches ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});
