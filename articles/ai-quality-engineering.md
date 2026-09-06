# Why AI Quality Engineering Needs More Than Traditional Test Automation

Traditional automation remains essential for deterministic behaviour, but AI systems add probabilistic outputs, retrieval, tool use and model dependencies. Quality Engineering therefore needs layered evidence: deterministic contracts where possible, evaluation datasets for model behaviour, trace-level inspection for agents, and explicit governance for high-impact decisions.

## What changes

- Expected results become rubrics or distributions rather than a single string.
- Data quality and retrieval quality become part of the test surface.
- Cost, latency, safety and reliability are quality attributes.
- Model and prompt changes require regression evaluation.
- Human review remains important for ambiguous or high-impact outcomes.

## Engineering principle

Use deterministic assertions for everything that can be specified exactly, and reserve probabilistic evaluation for behaviour that genuinely requires judgement.
