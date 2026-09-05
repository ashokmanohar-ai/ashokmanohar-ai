# Portfolio Evidence Index

This page is the verification layer behind my GitHub portfolio. It is designed for recruiters, hiring managers, architects, engineering leaders, and interviewers who want to distinguish polished documentation from reproducible engineering evidence.

> **Portfolio principle:** claims should be reviewable. Where a project is synthetic or reference-only, it is labelled that way. Where validation was constrained, the limitation is stated instead of converted into a false PASS.

## How to review this portfolio

A fast review can be done in three passes:

1. **Architecture:** inspect the README, architecture diagram, design decisions, repository structure, and governance boundaries.
2. **Engineering evidence:** inspect the merged implementation PR, CI evidence, validation report, tests, quality gates, and release artifacts.
3. **Production judgment:** inspect security boundaries, failure modes, limitations, observability, release controls, and the difference between reference evidence and production claims.

## Flagship verification matrix

| Project | Engineering evidence | What was validated | Scope / integrity note |
| --- | --- | --- | --- |
| **[Playwright Enterprise Test Framework](https://github.com/ashokmanohar-ai/playwright-enterprise-test-framework)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/playwright-enterprise-test-framework/pull/1) · [v1.0.0 release](https://github.com/ashokmanohar-ai/playwright-enterprise-test-framework/releases/tag/v1.0.0) | Strict TypeScript, ESLint/Prettier, DEV/QA/UAT configuration, 46 scenarios plus setup, 95 configured project executions, 14/14 deterministic local API checks, positive and missing-evidence quality-gate paths | The original PR explicitly documented that browser downloads and Docker were unavailable in that runner rather than claiming a false pass; the stable release retains a credential-free deterministic API verification path. |
| **[Enterprise AI Quality Engineering Platform](https://github.com/ashokmanohar-ai/enterprise-ai-quality-engineering-platform)** | [v1.0.0 release](https://github.com/ashokmanohar-ai/enterprise-ai-quality-engineering-platform/releases/tag/v1.0.0) · recruiter quick tour and five-minute proof path in README | Canonical evaluation contracts, DeepEval/Ragas/Promptfoo integration, LLM/RAG/agent/MCP checks, baseline comparison, hard safety gates, Azure OpenAI configuration, Phoenix-first observability, offline validation | Synthetic AcmeCloud reference system. Live model, adversarial, and performance profiles remain explicit opt-in activities requiring authorized targets and runtime credentials. |
| **[Agentic Quality Engineering Platform](https://github.com/ashokmanohar-ai/agentic-quality-engineering-platform)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/agentic-quality-engineering-platform/pull/1) · [v1.0.0 release](https://github.com/ashokmanohar-ai/agentic-quality-engineering-platform/releases/tag/v1.0.0) | CI, Python quality, Playwright Chromium, Docker Buildx, CodeQL Python + JavaScript/TypeScript, Ruff, strict MyPy across 73 source files, 29 pytest tests, 36-case offline evaluation, npm audit with 0 vulnerabilities | Synthetic portfolio reference. AI recommendations remain bounded by deterministic policy, exact-artifact human approval, RBAC, tenant scope, fixed commands, and audit evidence. |
| **[API & Integration Testing Framework](https://github.com/ashokmanohar-ai/api-integration-testing-framework)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/api-integration-testing-framework/pull/1) · [v1.0.0 release](https://github.com/ashokmanohar-ai/api-integration-testing-framework/releases/tag/v1.0.0) | 79 collected tests, 76/76 non-Docker tests, Ruff/format/strict MyPy, Pact consumer/provider/evolution flow, Docker service health, PostgreSQL + WireMock integration, real `OrderCreated` event through Redpanda, 100% quality gate | No credentials are committed; CI creates an ephemeral database password. Pact telemetry is disabled. |
| **[RAG & LLM Evaluation Lab](https://github.com/ashokmanohar-ai/rag-llm-evaluation-lab)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/rag-llm-evaluation-lab/pull/1) | Ruff, MyPy across 73 files, 45 pytest tests, 85.15% test coverage, 80 evaluation cases, index/query/API smoke tests, five evaluation suites, baseline create/compare, seven benchmark configurations, clean secret scan, Docker CI | Offline-first reference implementation. Provider-backed behavior requires intentional credentials and is separate from deterministic framework validation. |
| **[Performance & Reliability Testing](https://github.com/ashokmanohar-ai/performance-reliability-testing)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/performance-reliability-testing/pull/1) | Strict TypeScript, 7/7 unit tests, Docker Compose health, PostgreSQL test data, Prometheus scrape, Grafana provisioning, smoke/baseline/load/stress/spike/soak/scalability/capacity profiles, controlled outage/recovery, duplicate-payment idempotency, p95/p99/error/throughput gate, +30% regression detection | Measured CI numbers are ephemeral-runner evidence, not production baselines. Remote load requires explicit opt-in and bounded VU/duration controls. |
| **[AI Agent Evaluation Framework](https://github.com/ashokmanohar-ai/ai-agent-evaluation-framework)** | [Merged implementation PR #1](https://github.com/ashokmanohar-ai/ai-agent-evaluation-framework/pull/1) · [v1.0.0 release](https://github.com/ashokmanohar-ai/ai-agent-evaluation-framework/releases/tag/v1.0.0) | Ruff, MyPy across 62 source/test files, 32 pytest tests, 11/11 smoke evaluation, 70/70 full offline evaluation, baseline comparison, console/JSON/HTML/JUnit reporting, workflow/Compose parsing, Docker build and offline container evaluation | Provider-independent offline benchmark validates framework behavior, not production-agent business readiness. Critical safety and approval findings hard-fail regardless of weighted score. |

## Evidence patterns I intentionally use

### 1. Deterministic controls before probabilistic judgment

Schemas, contracts, authorization checks, static policy, exact artifact hashes, fixed commands, test verdicts, and hard safety gates stay deterministic wherever possible. LLM or agent judgment is used only where probabilistic evaluation is appropriate.

### 2. Failure evidence instead of green-only demos

The repositories include negative paths, missing-evidence behavior, quality-gate failures, fault injection, safety checks, regression detection, retry/recovery testing, and explicit `UNKNOWN`/fail-safe behavior where evidence is insufficient.

### 3. Reproducibility

Flagship projects favour versioned datasets, deterministic local/offline modes, Docker, CI workflows, documented commands, and retained reports so another engineer can reproduce the intended proof path.

### 4. Security and governance boundaries

Credentials are runtime-only. High-impact actions use approval and policy boundaries. Security/performance workflows require explicit authorization or opt-in. Synthetic data is used in portfolio evidence rather than customer data.

### 5. Transparent limitations

A reference implementation is not described as production deployment evidence. A synthetic benchmark is not described as customer performance. A test that could not run is not silently converted into a pass.

## Repository provenance and portfolio scope

The six flagship repositories on my profile are the primary representation of my current professional engineering level. Supporting repositories provide focused technical depth; educational, tutorial, fork, and historical repositories are retained as learning/reference history and should not be interpreted as equivalent portfolio evidence.

For senior-role assessment, use the flagship repositories, their merged engineering evidence, and the explicit verification paths above. Where a repository is synthetic/reference-only, that status is stated directly. I do not treat copied learning material, forks, or historical experiments as equivalent to original architect-level portfolio work.

## Business-impact claims

The following outcomes shown on my profile come from prior enterprise delivery rather than these public synthetic/reference repositories:

- escaped defects reduced by **40% year over year**;
- FHIR API coverage increased from **60% to 95%**;
- regression execution reduced from approximately **4 hours to under 60 minutes**.

They are intentionally separated from portfolio test counts and synthetic evaluation results so readers can distinguish enterprise delivery outcomes from public reference evidence.

## What this evidence is intended to demonstrate

- **Test / QE Architect:** architecture, scalability, contracts, quality gates, CI/CD, reliability, security, and engineering governance.
- **AI Quality Engineering Architect:** measurable LLM/RAG/agent quality, datasets, regression, observability, safety, performance, and release controls.
- **AI Test Automation Architect:** modern Playwright/API automation integrated with AI-assisted workflows without surrendering deterministic verdicts.
- **Agentic AI Engineer:** explicit state, bounded tools, trajectories, approvals, persistence, evaluation, and observability.
- **Forward Deployed Engineer (AI):** customer-problem framing, integration thinking, deployment, troubleshooting, incident response, measurable success criteria, and handover discipline.

---

**Evidence first. Architecture is stronger when another engineer can inspect the decisions, reproduce the checks, and see the limitations.**
