const fallback = {
  site_name: 'Social Work Students in Action (SWSA)',
  institution: 'Freed-Hardeman University',
  announcement: 'A student organization at Freed-Hardeman University · Learn. Serve. Advocate. Inspire.',
  hero_eyebrow: 'FREED-HARDEMAN UNIVERSITY · STUDENT ORGANIZATION',
  hero_title: 'Learn. Serve. Make an impact.',
  hero_intro: 'Social Work Students in Action (SWSA) brings Freed-Hardeman students together to grow as compassionate leaders, dedicated advocates, and future social work professionals.',
  about_title: 'More than a club. A community.',
  about_text: 'Social Work Students in Action (SWSA) is a student organization at Freed-Hardeman University. We bring students together around a shared commitment to helping people, strengthening communities, and advancing social justice.',
  about_extra: "Whether you're exploring the profession or preparing to launch your career, there's a place for you here.",
  join_text: 'Want to meet other students, serve your community, build professional skills, or learn more about social work? SWSA is a place to connect, contribute, and grow.',
  contact_text: "Have a question, an idea, or want to get involved? We'd love to hear from you.",
  contact_email: '',
  contact_url: ''
};
async function loadJSON(path, fallbackValue) { try { const response = await fetch(path); if (!response.ok) throw new Error('Not found'); return await response.json(); } catch { return fallbackValue; } }
function setText(id, value) { if (value) document.getElementById(id).textContent = value; }
function safeLink(url) { return /^(https?:|mailto:)/i.test(url || '') ? url : '#'; }
function renderEvents(events) {
  const root = document.getElementById('eventsGrid');
  const upcoming = (events || []).filter(e => e.published !== false).sort((a,b) => (a.date || '').localeCompare(b.date || '')).slice(0,6);
  if (!upcoming.length) return;
  root.innerHTML = upcoming.map(e => {
    const date = e.date ? new Date(`${e.date}T12:00:00`) : null;
    const month = date && !isNaN(date) ? date.toLocaleString('en-US',{month:'short'}).toUpperCase() : 'EVENT';
    const day = date && !isNaN(date) ? date.getDate() : '✳';
    const dateLabel = date && !isNaN(date) ? date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : '';
    return `<article class="event-card"><div class="event-top"><div class="event-date">${day}<small>${month}</small></div><span class="event-type">${escapeHTML(e.category || 'CLUB EVENT')}</span></div><div class="event-body"><h3>${escapeHTML(e.title || 'Club event')}</h3><p>${escapeHTML(e.description || '')}</p><div class="event-meta">${dateLabel}${e.time ? ' · '+escapeHTML(e.time) : ''}${e.location ? ' · '+escapeHTML(e.location) : ''}</div>${e.link ? `<a class="event-link" href="${safeLink(e.link)}" target="_blank" rel="noopener">Event details ↗</a>` : ''}</div></article>`;
  }).join('');
}
function renderDocuments(docs) {
  const root = document.getElementById('documentsList');
  const visible = (docs || []).filter(d => d.published !== false);
  if (!visible.length) return;
  root.innerHTML = visible.map(d => `<a class="resource-row" href="${safeLink(d.file || d.url || '#')}" ${/^https?:/i.test(d.file || d.url || '') ? 'target="_blank" rel="noopener"' : 'download'}><div><span class="resource-type">${escapeHTML(d.type || 'CLUB RESOURCE')}</span><h3>${escapeHTML(d.title || 'Club document')}</h3><p>${escapeHTML(d.description || '')}</p></div><span class="resource-arrow">↗</span></a>`).join('');
}
function renderLeaders(people) {
  const root = document.getElementById('leadersGrid');
  const visible = (people || []).filter(p => p.published !== false);
  if (!visible.length) return;
  root.innerHTML = visible.map(p => `<article class="leader-card"><div class="leader-avatar">${p.photo ? `<img src="${safeLink(p.photo)}" alt="${escapeHTML(p.name || 'Officer')}" style="width:100%;height:100%;object-fit:cover;border-radius:13px">` : escapeHTML((p.name || 'S').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div><h3>${escapeHTML(p.name || '')}</h3><p>${escapeHTML(p.role || '')}</p>${p.email ? `<p><a href="mailto:${encodeURIComponent(p.email)}">Email officer</a></p>` : ''}</article>`).join('');
}
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
(async function init(){
  const site = {...fallback, ...(await loadJSON('/content/site.json', {}))};
  setText('announcementText', site.announcement); setText('heroEyebrow', site.hero_eyebrow); setText('missionTitle', site.mission_title); setText('missionStatement', site.mission_statement); setText('missionTagline', site.tagline); setText('heroIntro', site.hero_intro); setText('aboutText', site.about_text); setText('aboutExtra', site.about_extra); setText('joinText', site.join_text); setText('contactText', site.contact_text);
  if (site.hero_title) document.getElementById('heroTitle').innerHTML = escapeHTML(site.hero_title).replace('Make an impact.','<span>Make an impact.</span>').replace('\n','<br>');
  if (site.about_title) document.getElementById('aboutTitle').innerHTML = escapeHTML(site.about_title).replace('A community.','<span>A community.</span>').replace('\n','<br>');
  if (site.contact_email) { setText('contactEmail', site.contact_email); document.getElementById('contactLink').href = 'mailto:'+site.contact_email; }
  if (site.contact_url) { document.getElementById('contactLink').href = safeLink(site.contact_url); }
  if (site.join_url) document.getElementById('joinLink').href = safeLink(site.join_url);
  const eventData = await loadJSON('/content/events.json', {events: []});
  const documentData = await loadJSON('/content/documents.json', {documents: []});
  const leaderData = await loadJSON('/content/leaders.json', {leaders: []});
  renderEvents(Array.isArray(eventData) ? eventData : eventData.events);
  renderDocuments(Array.isArray(documentData) ? documentData : documentData.documents);
  renderLeaders(Array.isArray(leaderData) ? leaderData : leaderData.leaders);
  document.getElementById('year').textContent = new Date().getFullYear();
})();
const toggle = document.getElementById('menuToggle'); const nav = document.getElementById('mainNav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
