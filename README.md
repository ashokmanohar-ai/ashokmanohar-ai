# Ashok Kumar Manohar — Personal Portfolio

A production-quality GitHub Pages portfolio for **Ashok Kumar Manohar**, positioned around senior **Test Architecture, AI Quality Engineering, Agentic AI, Playwright, API automation, CI/CD, RAG and LLM evaluation**.

**Default live URL:** `https://ashokmanohar-ai.github.io`

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
- GitHub Actions deployment for both root Pages sites and repository subpaths
- Dependency-free site validation before deployment
- No analytics, trackers, secrets or GitHub tokens

## Technology

The runtime is intentionally simple:

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

1. Create a GitHub repository and copy these files into it.
2. Commit and push to the `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` validates and deploys the site.

The workflow automatically determines the correct public base URL for either:

- `username.github.io`
- `username.github.io/repository-name/`

It then runs `tools/update-seo.py` on the deployment artifact so canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml` and `data/profile.json` use the correct Pages path.

For a custom domain, run before deployment (or adjust the workflow):

```bash
python tools/update-seo.py --site-url "https://your-domain.example"
```

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
├── projects/                 # Deep project case studies
├── publications/             # Local white-paper pages
├── articles/                 # HTML articles + Markdown sources
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── icons/
│   ├── og-image.png
│   └── Ashok-Kumar-Manohar-Resume.pdf
├── data/
│   ├── profile.json
│   ├── projects.json
│   ├── expertise.json
│   ├── architectures.json
│   ├── publications.json
│   ├── articles.json
│   └── resume.json
├── docs/architecture/        # Markdown architecture notes
├── tools/
│   ├── update-seo.py
│   └── validate_site.py
├── .github/workflows/deploy.yml
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── LICENSE
└── README.md
```

## Updating Content

### Personal links

Edit only `data/profile.json` for shared identity/contact links:

```json
{
  "github": "https://github.com/ashokmanohar-ai",
  "linkedin": "https://www.linkedin.com/in/ashok-kumar-manohar",
  "email": "",
  "resume": "assets/Ashok-Kumar-Manohar-Resume.pdf"
}
```

An empty optional link is hidden automatically instead of rendering a broken CTA.

### Projects

Edit `data/projects.json`. Public repository metadata is enriched client-side without a token. The static project content remains visible if the GitHub API is unavailable or rate-limited.

### Publications and articles

- Edit `data/publications.json` and `data/articles.json` for cards.
- Keep long-form Markdown sources under `articles/` or `docs/`.
- Publication HTML pages live under `publications/`.

### Resume

The web resume is rendered from `data/resume.json`. Replace `assets/Ashok-Kumar-Manohar-Resume.pdf` whenever the downloadable PDF changes.

## Quality and Accessibility

The implementation uses semantic landmarks, keyboard-focus styles, an accessible mobile menu, responsive layouts, colour contrast designed for WCAG 2.1 AA-oriented use, `prefers-reduced-motion`, lazy-friendly static assets, and minimal JavaScript. `tools/validate_site.py` checks required files, JSON parsing, local references and baseline metadata before deployment.

## Security and Privacy

- No personal access tokens
- No credentials or secrets
- No third-party trackers
- No private repository API calls
- Optional public email remains empty until intentionally configured

## License

MIT — see [LICENSE](LICENSE).
