const App = (() => {
  const body = document.body;
  const root = body.dataset.root || '.';
  const page = body.dataset.page || '';
  const state = { profile: null, projects: [], architectures: [] };

  const icons = {
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>',
    menu: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    github: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.22c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.12c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.71 5.39-5.29 5.68.42.36.78 1.07.78 2.16v3.24c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>',
    linkedin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.3 7.5H1.7V22h3.6V7.5ZM3.5 1.8a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM22.3 13.7c0-4.4-2.3-6.5-5.4-6.5a4.7 4.7 0 0 0-4.2 2.3v-2h-3.6V22h3.6v-7.2c0-1.9.4-3.8 2.8-3.8 2.4 0 2.4 2.2 2.4 3.9V22h3.6l.8-8.3Z"/></svg>',
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>'
  };

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const isExternal = url => /^https?:\/\//i.test(url || '');
  const href = url => !url ? '' : (isExternal(url) || url.startsWith('mailto:') || url.startsWith('#') ? url : `${root}/${url}`.replace(/\/\.\//g, '/'));
  const linkAttrs = url => isExternal(url) ? 'target="_blank" rel="noopener noreferrer"' : '';

  async function fetchJSON(path) {
    const response = await fetch(`${root}/${path}`, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
    return response.json();
  }

  function renderHeader() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const items = [
      ['Home', 'index.html', 'home'], ['About', 'about.html', 'about'], ['Expertise', 'expertise.html', 'expertise'],
      ['Projects', 'projects.html', 'projects'], ['Architecture', 'architecture.html', 'architecture'], ['Publications', 'publications.html', 'publications'],
      ['Articles', 'articles.html', 'articles'], ['Resume', 'resume.html', 'resume'], ['Contact', 'contact.html', 'contact']
    ];
    header.innerHTML = `<div class="container nav-shell">
      <a class="brand" href="${root}/index.html" aria-label="Ashok Kumar Manohar home">
        <span class="brand-mark" aria-hidden="true">AKM</span><span class="brand-copy"><strong>Ashok Kumar Manohar</strong><span>TEST ARCHITECT · AI QUALITY</span></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation" data-open="false">
        ${items.map(([label, url, id]) => `<a href="${root}/${url}" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      <div class="nav-actions">
        <a class="btn btn-sm header-link profile-link" data-profile-link="linkedin" href="#">LinkedIn</a>
        <button class="icon-button" type="button" data-theme-toggle aria-label="Switch colour theme"></button>
        <button class="menu-button" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false" aria-label="Open navigation">${icons.menu}</button>
      </div>
    </div>`;

    const menu = header.querySelector('[data-menu-toggle]');
    const nav = header.querySelector('#site-nav');
    menu?.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      nav.dataset.open = String(!isOpen);
      menu.setAttribute('aria-expanded', String(!isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    });
    nav?.addEventListener('click', e => { if (e.target.closest('a')) { nav.dataset.open = 'false'; menu?.setAttribute('aria-expanded', 'false'); } });
  }

  function renderFooter() {
    const footer = document.querySelector('[data-site-footer]');
    if (!footer) return;
    footer.innerHTML = `<div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><strong>Ashok Kumar Manohar</strong><p>Engineering quality for AI-powered software through test architecture, Agentic AI, enterprise automation and systematic AI evaluation.</p></div>
        <div class="footer-links">
          <a href="${root}/projects.html">Featured engineering work</a><a href="${root}/architecture.html">Architecture & engineering</a>
          <a href="${root}/publications.html">Publications</a><a href="${root}/articles.html">Technical articles</a>
          <a href="${root}/resume.html">Resume</a><a href="${root}/contact.html">Contact</a>
          <a class="profile-link" data-profile-link="github" href="#">GitHub</a><a class="profile-link" data-profile-link="linkedin" href="#">LinkedIn</a>
        </div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Ashok Kumar Manohar. Built as a fast, accessible static site.</span><span>No trackers · No tokens · GitHub Pages ready</span></div>
    </div>`;
  }

  function initTheme() {
    const stored = localStorage.getItem('portfolio-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (systemDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = initial;
    updateThemeButtons();
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('portfolio-theme', next);
      updateThemeButtons();
    });
  }

  function updateThemeButtons() {
    const dark = document.documentElement.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = dark ? icons.sun : icons.moon;
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
    });
  }

  function applyProfile(profile) {
    state.profile = profile;
    document.querySelectorAll('[data-profile-text]').forEach(el => {
      const key = el.dataset.profileText;
      if (profile[key]) el.textContent = profile[key];
    });
    document.querySelectorAll('[data-profile-link]').forEach(el => {
      const key = el.dataset.profileLink;
      let url = profile[key] || '';
      if (key === 'email' && url && !url.startsWith('mailto:')) url = `mailto:${url}`;
      if (key === 'resume' && url && !isExternal(url)) url = href(url);
      if (!url) {
        el.classList.add('is-unset');
        el.setAttribute('aria-hidden', 'true');
        el.tabIndex = -1;
      } else {
        el.classList.remove('is-unset');
        el.href = url;
        if (isExternal(url)) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
      }
    });
    const githubLabels = document.querySelectorAll('[data-github-username]');
    githubLabels.forEach(el => el.textContent = `@${profile.githubUsername}`);
    document.querySelectorAll('script[data-person-schema]').forEach(el => {
      try {
        const schema = JSON.parse(el.textContent || '{}');
        schema.url = profile.siteUrl || schema.url;
        schema.sameAs = [profile.github, profile.linkedin].filter(Boolean);
        el.textContent = JSON.stringify(schema);
      } catch (_) {}
    });
  }

  async function getGithubMeta(project) {
    if (!state.profile?.githubUsername || !project.repo) return null;
    const key = `gh-meta:${state.profile.githubUsername}/${project.repo}`;
    try {
      const cached = JSON.parse(localStorage.getItem(key) || 'null');
      if (cached && Date.now() - cached.time < 60 * 60 * 1000) return cached.data;
    } catch (_) {}
    try {
      const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(state.profile.githubUsername)}/${encodeURIComponent(project.repo)}`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      const meta = { stars: data.stargazers_count, forks: data.forks_count, updated: data.updated_at, language: data.language };
      try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), data: meta })); } catch (_) {}
      return meta;
    } catch (_) { return null; }
  }

  function projectCard(project, index) {
    const links = [];
    if (project.caseStudy) links.push(`<a class="btn btn-sm" href="${href(project.caseStudy)}">Case study ${icons.arrow}</a>`);
    if (project.architectureUrl) links.push(`<a class="btn btn-sm btn-ghost" href="${href(project.architectureUrl)}">Architecture</a>`);
    if (project.github) links.push(`<a class="btn btn-sm btn-ghost" href="${project.github}" target="_blank" rel="noopener noreferrer">${icons.github} Repository</a>`);
    if (project.documentation) links.push(`<a class="btn btn-sm btn-ghost" href="${href(project.documentation)}" ${linkAttrs(project.documentation)}>Documentation</a>`);
    if (project.demo) links.push(`<a class="btn btn-sm btn-ghost" href="${project.demo}" target="_blank" rel="noopener noreferrer">Live demo</a>`);
    return `<article class="project-card reveal" data-project-id="${escapeHTML(project.id)}">
      <div class="project-top"><div><span class="project-number">${String(index + 1).padStart(2, '0')}</span><h3>${escapeHTML(project.name)}</h3></div><span class="meta-pill tag">${project.quickTour ? 'RECRUITER PICK' : 'FEATURED'}</span></div>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-value"><strong>Engineering value.</strong> ${escapeHTML(project.value)}</div>
      <ul class="chip-list" aria-label="Technologies">${project.technologies.slice(0, 6).map(t => `<li class="tag">${escapeHTML(t)}</li>`).join('')}</ul>
      <div class="project-meta" data-github-meta>${project.note ? `<span>${escapeHTML(project.note)}</span>` : '<span>GitHub metadata loads automatically when available.</span>'}</div>
      <div class="project-actions">${links.join('')}</div>
    </article>`;
  }

  async function renderProjects() {
    const targets = document.querySelectorAll('[data-project-grid]');
    if (!targets.length) return;
    if (!state.projects.length) state.projects = (await fetchJSON('data/projects.json')).sort((a,b) => a.order - b.order);
    for (const target of targets) {
      const limit = Number(target.dataset.limit || state.projects.length);
      const filter = target.dataset.filter;
      const items = state.projects.filter(p => !filter || Boolean(p[filter])).slice(0, limit);
      target.innerHTML = items.map(projectCard).join('');
    }
    initReveal();
    for (const project of state.projects.filter(p => p.repo)) {
      const card = document.querySelector(`[data-project-id="${CSS.escape(project.id)}"]`);
      if (!card) continue;
      getGithubMeta(project).then(meta => {
        if (!meta) return;
        const el = card.querySelector('[data-github-meta]');
        if (!el) return;
        const updated = meta.updated ? new Intl.DateTimeFormat('en-GB', { year:'numeric', month:'short' }).format(new Date(meta.updated)) : '—';
        el.innerHTML = `<span>★ ${meta.stars}</span><span>⑂ ${meta.forks}</span>${meta.language ? `<span>${escapeHTML(meta.language)}</span>` : ''}<span>Updated ${updated}</span>`;
      });
    }
  }

  async function renderQuickTour() {
    const target = document.querySelector('[data-quick-tour]');
    if (!target) return;
    if (!state.projects.length) state.projects = (await fetchJSON('data/projects.json')).sort((a,b) => a.order - b.order);
    const items = state.projects.filter(p => p.quickTour).slice(0,4);
    target.innerHTML = items.map((p,i) => `<article class="quick-card reveal">
      <span class="quick-step">START ${i+1}</span><h3>${escapeHTML(p.name)}</h3>
      <dl><dt>Problem</dt><dd>${escapeHTML(p.problem)}</dd><dt>Architecture</dt><dd>${escapeHTML(p.architecture)}</dd><dt>Engineering challenge</dt><dd>${escapeHTML(p.engineeringChallenge)}</dd><dt>Business value</dt><dd>${escapeHTML(p.value)}</dd></dl>
      <p class="muted"><strong>Key capabilities:</strong> ${p.capabilities.slice(0,4).map(escapeHTML).join(' · ')}</p>
      <div class="chip-list">${p.technologies.slice(0,4).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
      <div class="card-actions"><a class="btn btn-sm" href="${href(p.caseStudy || p.architectureUrl)}">Explore ${icons.arrow}</a>${p.github?`<a class="btn btn-sm btn-ghost" href="${p.github}" target="_blank" rel="noopener noreferrer">${icons.github} GitHub</a>`:''}</div>
    </article>`).join('');
    initReveal();
  }

  async function renderExpertise() {
    const target = document.querySelector('[data-expertise-grid]');
    if (!target) return;
    const data = await fetchJSON('data/expertise.json');
    target.innerHTML = data.map((group,i) => `<article class="expertise-card reveal"><span class="card-index">0${i+1}</span><h3>${escapeHTML(group.title)}</h3><ul class="chip-list">${group.items.map(item => `<li class="tag">${escapeHTML(item)}</li>`).join('')}</ul></article>`).join('');
    initReveal();
  }

  async function renderPublications() {
    const target = document.querySelector('[data-publications-grid]');
    if (!target) return;
    const data = await fetchJSON('data/publications.json');
    target.innerHTML = data.map(item => `<article class="publication-card reveal"><div class="card-meta"><span>${escapeHTML(item.topic)}</span>${item.platform?`<span>${escapeHTML(item.platform)}</span>`:''}<span>${escapeHTML(item.status)}</span>${item.date ? `<time>${escapeHTML(item.date)}</time>` : ''}</div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.abstract)}</p><div class="card-actions">${item.url ? `<a class="btn btn-sm" href="${href(item.url)}" ${linkAttrs(item.url)}>Read publication</a>` : ''}${item.github ? `<a class="btn btn-sm btn-ghost" href="${item.github}" target="_blank" rel="noopener noreferrer">${icons.github} GitHub source</a>` : ''}${item.pdf ? `<a class="btn btn-sm btn-ghost" href="${href(item.pdf)}">${icons.download} PDF</a>` : ''}</div></article>`).join('');
    initReveal();
  }

  async function renderArticles() {
    const target = document.querySelector('[data-articles-grid]');
    if (!target) return;
    const data = await fetchJSON('data/articles.json');
    target.innerHTML = data.map(item => `<article class="article-card reveal"><div class="card-meta"><span>${escapeHTML(item.category)}</span><span>${escapeHTML(item.readingTime)}</span>${item.date ? `<time>${escapeHTML(item.date)}</time>` : ''}</div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p><div class="card-actions"><a class="btn btn-sm" href="${href(item.url)}" ${linkAttrs(item.url)}>Read article ${icons.arrow}</a></div></article>`).join('');
    initReveal();
  }

  const diagramById = {
    'agentic-qe': `flowchart LR\n  R[Requirements] --> RA[Requirement Agent]\n  RA --> TD[Test Design Agent]\n  TD --> AA[Automation Agent]\n  AA --> EX[Executor Agent]\n  EX --> RV[Reviewer Agent]\n  RV --> CI[CI/CD]\n  GOV[Human Governance] -. review .-> TD\n  GOV -. approve .-> RV`,
    'smart-test-designer': `flowchart LR\n  KB[Enterprise Knowledge] --> RET[Retrieval]\n  REQ[Requirement] --> RET\n  RET --> GEN[Test Generation]\n  GEN --> EVAL[Evaluation]\n  EVAL --> TRACE[Traceability]\n  TRACE --> OUT[Scenarios / Reports / Exports]`,
    'rag': `flowchart LR\n  Q[Evaluation Queries] --> RET[Retriever]\n  RET --> CTX[Retrieved Context]\n  CTX --> LLM[Generator]\n  RET --> RM[Retrieval Metrics]\n  LLM --> GM[Faithfulness & Answer Metrics]\n  RM --> DASH[Evaluation Results]\n  GM --> DASH`,
    'agent-evaluation': `flowchart LR\n  TASK[Task Fixture] --> AG[AI Agent]\n  AG --> TOOLS[Tool Calls]\n  AG --> OUT[Final Outcome]\n  TOOLS --> DET[Deterministic Checks]\n  OUT --> JUDGE[Judge / Rubric Evaluation]\n  DET --> SCORE[Quality Scorecard]\n  JUDGE --> SCORE`,
    'playwright': `flowchart LR\n  TEST[Test Specs] --> FIX[Fixtures]\n  FIX --> UI[Page / Component Layer]\n  FIX --> API[API Layer]\n  UI --> BROWSER[Browser]\n  API --> SVC[Services]\n  BROWSER --> EVID[Evidence & Reports]\n  SVC --> EVID\n  EVID --> CI[CI/CD Quality Gate]`,
    'mcp': `flowchart LR\n  CLIENT[AI Client] --> MCP[MCP Server / Adapter]\n  MCP --> TOOLS[Allowed QE Tools]\n  TOOLS --> SVC[Existing Services / APIs]\n  SVC --> AUTH[Existing Auth & Authorisation]\n  MCP --> AUDIT[Audit / Observability]`,
    'cicd': `flowchart LR\n  COMMIT[Code Change] --> FAST[Fast Quality Checks]\n  FAST --> BUILD[Build]\n  BUILD --> E2E[UI / API / AI Evaluation]\n  E2E --> REL[Reliability Checks]\n  REL --> GATE[Risk-based Quality Gate]\n  GATE --> DEPLOY[Deployment]`,
    'api-automation': `flowchart LR\n  SPEC[OpenAPI / Contract] --> CLIENT[Reusable API Clients]\n  DATA[Test Data] --> FLOW[Business Workflow]\n  AUTH[Auth Context] --> FLOW\n  CLIENT --> FLOW\n  FLOW --> ASSERT[Schema / Business Assertions]\n  ASSERT --> EVID[Evidence & Reports]\n  EVID --> GATE[CI/CD Quality Gate]`
  };

  async function renderArchitectures() {
    const target = document.querySelector('[data-architecture-list]');
    if (!target) return;
    state.architectures = await fetchJSON('data/architectures.json');
    target.innerHTML = state.architectures.map(a => `<article class="architecture-card reveal" id="${escapeHTML(a.id)}"><div class="architecture-intro"><div><span class="eyebrow">Architecture</span><h2>${escapeHTML(a.title)}</h2><p>${escapeHTML(a.summary)}</p></div><div><h3>Problem statement</h3><p>${escapeHTML(a.problem)}</p></div></div><div class="diagram-shell"><pre class="mermaid diagram-fallback">${escapeHTML(diagramById[a.id] || '')}</pre></div><div class="architecture-details"><div class="detail-block"><h4>Design decisions</h4><ul>${a.decisions.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="detail-block"><h4>Technology</h4><ul>${a.technology.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="detail-block"><h4>Security</h4><ul>${a.security.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="detail-block"><h4>Scalability</h4><ul>${a.scalability.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div><div class="detail-block"><h4>Quality</h4><ul>${a.quality.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></div></div><div class="card-actions architecture-actions">${a.repository?`<a class="btn btn-sm" href="${a.repository}" target="_blank" rel="noopener noreferrer">${icons.github} Repository</a>`:''}${a.documentation?`<a class="btn btn-sm btn-ghost" href="${href(a.documentation)}" ${linkAttrs(a.documentation)}>Documentation</a>`:''}</div></article>`).join('');
    initReveal();
    initMermaid();
  }

  async function initMermaid() {
    if (!document.querySelector('.mermaid')) return;
    try {
      const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
      const dark = document.documentElement.dataset.theme === 'dark';
      mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'neutral', securityLevel: 'strict', flowchart: { htmlLabels: true, curve: 'basis' } });
      document.querySelectorAll('.mermaid').forEach(el => el.classList.remove('diagram-fallback'));
      await mermaid.run({ querySelector: '.mermaid' });
    } catch (error) {
      console.info('Mermaid unavailable; readable architecture source remains visible.', error);
    }
  }

  async function renderResume() {
    const target = document.querySelector('[data-resume-content]');
    if (!target) return;
    const resume = await fetchJSON('data/resume.json');
    if (!state.projects.length) state.projects = (await fetchJSON('data/projects.json')).sort((a,b) => a.order - b.order);
    const selected = state.projects.filter(p => resume.majorProjects.includes(p.name));
    target.innerHTML = `<section id="summary"><h2>Professional Summary</h2><p class="lead">${escapeHTML(resume.professionalSummary)}</p></section>
      <section id="expertise"><h2>Core Expertise</h2><ul class="chip-list">${resume.coreExpertise.map(x=>`<li class="tag">${escapeHTML(x)}</li>`).join('')}</ul></section>
      ${resume.experience?.length ? `<section id="experience"><h2>Experience</h2>${resume.experience.map(x=>`<article class="resume-role"><div class="resume-role-head"><div><h3>${escapeHTML(x.role)}</h3><div class="company">${escapeHTML(x.company)}</div></div><span>${escapeHTML(x.dates || '')}</span></div><p>${escapeHTML(x.summary || '')}</p>${x.bullets?.length?`<ul>${x.bullets.map(b=>`<li>${escapeHTML(b)}</li>`).join('')}</ul>`:''}</article>`).join('')}</section>` : ''}
      <section id="projects"><h2>Major Projects</h2>${selected.map(p=>`<div style="margin-top:20px"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><p class="muted" style="margin-top:8px"><strong>Focus:</strong> ${p.technologies.map(escapeHTML).join(' · ')}</p></div>`).join('')}</section>
      ${resume.certifications?.length ? `<section id="certifications"><h2>Certifications</h2><ul>${resume.certifications.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul>${resume.awards?.length?`<h3 style="margin-top:26px">Awards</h3><ul>${resume.awards.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul>`:''}</section>` : ''}
      ${resume.education?.length ? `<section id="education"><h2>Education</h2><ul>${resume.education.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></section>` : ''}
      ${resume.publications?.length ? `<section id="publications"><h2>Publications</h2><ul>${resume.publications.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul></section>` : ''}
      <section id="technology"><h2>Technology</h2><p>Agentic AI · LLM evaluation · RAG · Playwright · Selenium · TypeScript · Java · Python · REST APIs · OpenAPI · GraphQL · GitHub Actions · Jenkins · Azure DevOps · Docker · AWS · Azure · GCP · ChromaDB · Vector search · OpenTelemetry</p></section>`;
  }

  function initReveal() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (reduce || !('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -30px' });
    items.forEach(el => observer.observe(el));
  }

  function updateCanonical() {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = window.location.href.split(/[?#]/)[0];
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonical.href;
  }

  function initPrint() {
    document.addEventListener('click', e => { if (e.target.closest('[data-print]')) window.print(); });
  }

  async function start() {
    renderHeader(); renderFooter(); initTheme(); initPrint(); updateCanonical(); initReveal();
    try {
      const profile = await fetchJSON('data/profile.json');
      applyProfile(profile);
      await Promise.allSettled([renderProjects(), renderQuickTour(), renderExpertise(), renderPublications(), renderArticles(), renderArchitectures(), renderResume()]);
    } catch (error) {
      console.error('Portfolio data could not be loaded.', error);
      document.querySelectorAll('[data-data-error]').forEach(el => { el.hidden = false; });
    }
  }

  return { start };
})();

document.addEventListener('DOMContentLoaded', App.start);
