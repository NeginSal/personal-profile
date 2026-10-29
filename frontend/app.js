const API_BASE = "http://localhost:8081";

async function loadProfile() {
  const res = await fetch(`${API_BASE}/api/profile`);
  if (!res.ok) {
    throw new Error(`Profile request failed: ${res.status}`);
  }
  const profile = await res.json();

  document.getElementById("name").textContent = profile.name;
  document.getElementById("title").textContent = profile.title;
  document.getElementById("about-text").textContent = profile.about;

  const skillsList = document.getElementById("skills-list");
  skillsList.innerHTML = "";
  for (const skill of profile.skills) {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  }

  const links = document.getElementById("links");
  links.innerHTML = "";
  for (const link of profile.links) {
    const a = document.createElement("a");
    a.textContent = link.label;
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    links.appendChild(a);
  }
}

async function loadProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) {
    throw new Error(`Projects request failed: ${res.status}`);
  }
  const projects = await res.json();

  const container = document.getElementById("projects-list");
  container.innerHTML = "";
  for (const p of projects) {
    const card = document.createElement("div");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = p.name;

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const tags = document.createElement("p");
    tags.textContent = p.tags.join(" · ");

    const a = document.createElement("a");
    a.textContent = "View on GitHub";
    a.href = p.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    card.append(title, desc, tags, a);
    container.appendChild(card);
  }
}

async function init() {
  try {
    await Promise.all([loadProfile(), loadProjects()]);
  } catch (err) {
    console.error(err);
    document.getElementById("name").textContent = "Could not load profile";
  }
}

init();
