# Ashok Kumar Manohar — Personal Portfolio

A production-quality GitHub Pages portfolio for **Ashok Kumar Manohar**, positioned around senior **Test Architecture, AI Quality Engineering, Agentic AI, Playwright, API automation, CI/CD, RAG and LLM evaluation**.

**Live URL after GitHub Pages is enabled:** `https://ashokmanohar-ai.github.io/ashokmanohar-ai/`

![Portfolio preview](assets/images/portfolio-preview.png)

## About

The site is designed as a professional hub for UK recruiters, hiring managers, Engineering Directors, Heads of Quality Engineering, AI Engineering leaders, Solution Architects and technology consulting leaders. It presents engineering work as architecture-led case studies rather than generic repository cards.

## Key Expertise

- Test Architecture and Quality Engineering
- Agentic AI and multi-agent systems
- AI agent, LLM and RAG evaluation
- Playwright and enterprise automation architecture
- API and integration testing
- MCP / Model Context Protocol quality and security boundaries
- CI/CD, continuous quality and governance
- AI-assisted test design, observability and intelligent automation

## Website Features

- Premium responsive light/dark design with reduced-motion support
- Sticky desktop navigation and accessible mobile menu
- Central personal configuration in `data/profile.json`
- Data-driven project, publication, article, architecture and resume content
- Public GitHub API integration for stars, forks, language and last update, with graceful fallback
- Recruiter Quick Tour for four flagship engineering projects
- Architecture diagrams with Mermaid and readable no-CDN fallback
- Project case studies using Problem → Architecture → Technology → Value
- Publication / white-paper section and Markdown-backed technical articles
- Printer-friendly HTML resume and downloadable PDF resume
- Open Graph / LinkedIn social preview image
- Sitemap, robots, canonical metadata and structured Person metadata
- GitHub Actions deployment for repository Pages
- Dependency-free site validation before deployment
- No analytics, trackers, secrets or GitHub tokens

## Technology

- Semantic HTML5
- Modern CSS
- Vanilla JavaScript
- JSON content/configuration
- Mermaid loaded only on the Architecture page when available
- GitHub public REST API for optional public repository metadata
- GitHub Pages + GitHub Actions

No Node build step is required.

## Local Development

From the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`.

Run the same structural checks used by CI:

```bash
python tools/validate_site.py
```

## Deployment

This portfolio is maintained on the `portfolio-site` branch so the existing GitHub profile content on `main` remains untouched.

1. Open **Settings → Pages** in `ashokmanohar-ai/ashokmanohar-ai`.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` validates and deploys pushes to `portfolio-site`.

The workflow determines the repository Pages URL and runs `tools/update-seo.py` so canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml` and `data/profile.json` use the correct Pages path.

## Repository Structure

```text
.
├── index.html
├── about.html
├── expertise.html
├── projects.html
├── architecture.html
├── publications.html
├── articles.html
├── resume.html
├── contact.html
├── projects/
├── publications/
├── articles/
├── assets/
├── data/
├── docs/architecture/
├── tools/
├── .github/workflows/deploy.yml
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── LICENSE
└── README.md
```

## Updating Content

Edit `data/profile.json` for shared identity and contact links. An empty optional link is hidden automatically instead of rendering a broken CTA.

Edit `data/projects.json` for featured projects. Public repository metadata is enriched client-side without a token, while static project content remains visible if the GitHub API is unavailable or rate-limited.

Edit `data/publications.json` and `data/articles.json` for publication and article cards. Long-form Markdown sources live under `articles/` and `docs/`.

The web resume is rendered from `data/resume.json`; replace `assets/Ashok-Kumar-Manohar-Resume.pdf` whenever the downloadable PDF changes.

## Quality, Security and Privacy

The implementation uses semantic landmarks, keyboard-focus styles, an accessible mobile menu, responsive layouts, reduced-motion support and minimal JavaScript. `tools/validate_site.py` checks required files, JSON parsing, local references and baseline metadata before deployment.

- No personal access tokens
- No credentials or secrets
- No third-party trackers
- No private repository API calls
- Optional public email remains empty until intentionally configured

## License

MIT — see [LICENSE](LICENSE).
