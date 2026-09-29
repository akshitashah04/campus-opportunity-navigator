import { opportunities, statuses } from "./data.js";

const STORAGE_KEY = "campuspath-applications-v1";
const state = { view: "discover", query: "", type: "all", applications: loadApplications() };
const $ = (selector) => document.querySelector(selector);
const list = $("#opportunityList");
const dialog = $("#detailDialog");
let toastTimer;

function loadApplications() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([id, status]) => opportunities.some((item) => item.id === id) && statuses.includes(status)));
  } catch { return {}; }
}

function saveApplications() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.applications)); }
  catch { showToast("Could not save changes in this browser."); }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function deadlineLabel(days) { return `${days} days left`; }
function textElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = content;
  return element;
}

function button(className, label, action, id, extra = {}) {
  const element = textElement("button", className, label);
  element.type = "button";
  element.dataset.action = action;
  element.dataset.id = id;
  for (const [key, value] of Object.entries(extra)) element.setAttribute(key, value);
  return element;
}

function renderCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  const top = textElement("div", "card-top", "");
  const icon = textElement("span", `card-icon ${item.accent}`, item.organization.charAt(0));
  icon.setAttribute("aria-hidden", "true");
  top.append(icon, textElement("span", "type-pill", item.type));
  top.append(button("bookmark", state.applications[item.id] ? "♥" : "♡", "toggle", item.id, { "aria-label": state.applications[item.id] ? `Remove ${item.title} from applications` : `Save ${item.title}`, "aria-pressed": String(Boolean(state.applications[item.id])) }));
  card.append(top, textElement("h3", "", item.title), textElement("p", "organization", item.organization));
  const meta = textElement("div", "meta", "");
  meta.append(textElement("span", "", `⌖ ${item.location}`), textElement("span", "", `◷ ${item.schedule}`));
  card.append(meta);
  const tags = textElement("div", "tags", "");
  item.tags.forEach((tag) => tags.append(textElement("span", "tag", tag)));
  card.append(tags);
  const footer = textElement("div", "card-footer", "");
  footer.append(textElement("span", "deadline", `◷ ${deadlineLabel(item.daysUntilDeadline)}`), button("details-button", "View details →", "details", item.id));
  card.append(footer);
  if (state.view === "saved") {
    const row = textElement("div", "status-row", "");
    const label = textElement("label", "", "Application stage");
    const select = document.createElement("select");
    select.dataset.action = "status";
    select.dataset.id = item.id;
    select.setAttribute("aria-label", `Application stage for ${item.title}`);
    statuses.forEach((status) => { const option = new Option(status, status); select.add(option); });
    select.value = state.applications[item.id];
    label.append(select);
    row.append(label);
    card.append(row);
  }
  return card;
}

function visibleItems() {
  return opportunities.filter((item) => {
    if (state.view === "saved" && !state.applications[item.id]) return false;
    if (state.type !== "all" && item.type !== state.type) return false;
    const haystack = [item.title, item.organization, item.type, item.location, ...item.tags].join(" ").toLowerCase();
    return haystack.includes(state.query.toLowerCase().trim());
  });
}

function render() {
  const saved = Object.keys(state.applications).length;
  $("#savedCount").textContent = saved;
  document.querySelectorAll("[data-view]").forEach((nav) => {
    const active = nav.dataset.view === state.view;
    nav.classList.toggle("active", active);
    if (active) nav.setAttribute("aria-current", "page"); else nav.removeAttribute("aria-current");
  });
  const savedView = state.view === "saved";
  $("#sectionKicker").textContent = savedView ? "KEEP MOVING FORWARD" : "EXPLORE WHAT'S POSSIBLE";
  $("#sectionTitle").textContent = savedView ? "My applications" : "Discover opportunities";
  $("#sectionDescription").textContent = savedView ? "Move each saved role through your application stages." : "A curated starting point for your campus search.";
  const items = visibleItems();
  $("#resultCount").textContent = `${items.length} ${items.length === 1 ? "opportunity" : "opportunities"}`;
  list.replaceChildren(...items.map(renderCard));
  const empty = $("#emptyState");
  empty.hidden = items.length !== 0;
  $("#emptyMessage").textContent = savedView && saved === 0 ? "Save an opportunity in Discover to start tracking it here." : "Try a different search or filter.";
  $("#resetFilters").textContent = savedView && saved === 0 ? "Explore opportunities" : "Clear filters";
}

function showDetails(item) {
  const content = $("#dialogContent");
  content.replaceChildren();
  const close = button("dialog-close", "×", "close", item.id, { "aria-label": "Close details" });
  content.append(close, textElement("span", "eyebrow green", item.type), textElement("h2", "", item.title), textElement("p", "dialog-org", item.organization));
  const facts = textElement("div", "dialog-facts", "");
  [item.location, item.schedule, item.compensation, deadlineLabel(item.daysUntilDeadline)].forEach((fact) => facts.append(textElement("span", "", fact)));
  content.append(facts, textElement("h3", "", "About the role"), textElement("p", "", item.description), textElement("h3", "", "Example eligibility"), textElement("p", "", item.eligibility));
  const note = textElement("p", "dialog-note", "Fictional demo listing. There is no application link. Check official university channels for real opportunities and requirements.");
  content.append(note, button("primary-button", state.applications[item.id] ? "Remove from my applications" : "Save to my applications", "toggle", item.id));
  dialog.showModal();
}

document.querySelectorAll("[data-view]").forEach((nav) => nav.addEventListener("click", () => { state.view = nav.dataset.view; render(); $("#sectionTitle").focus?.(); }));
$("#searchInput").addEventListener("input", (event) => { state.query = event.target.value; render(); });
$("#typeFilter").addEventListener("change", (event) => { state.type = event.target.value; render(); });
$("#resetFilters").addEventListener("click", () => { state.query = ""; state.type = "all"; $("#searchInput").value = ""; $("#typeFilter").value = "all"; if (state.view === "saved" && Object.keys(state.applications).length === 0) state.view = "discover"; render(); });
document.addEventListener("click", (event) => {
  const target = event.target.closest("button[data-action]");
  if (!target) return;
  const item = opportunities.find((candidate) => candidate.id === target.dataset.id);
  if (target.dataset.action === "close") { dialog.close(); return; }
  if (!item) return;
  if (target.dataset.action === "details") { showDetails(item); return; }
  if (target.dataset.action === "toggle") {
    const wasSaved = Boolean(state.applications[item.id]);
    if (wasSaved) delete state.applications[item.id]; else state.applications[item.id] = "Saved";
    saveApplications(); render();
    if (dialog.open) dialog.close();
    showToast(wasSaved ? "Removed from your applications" : "Saved to your applications");
  }
});
list.addEventListener("change", (event) => {
  if (event.target.dataset.action !== "status") return;
  const { id } = event.target.dataset;
  if (!state.applications[id] || !statuses.includes(event.target.value)) return;
  state.applications[id] = event.target.value;
  saveApplications(); showToast(`Moved to ${event.target.value}`);
});
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
render();
