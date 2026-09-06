# RAG Evaluation Architecture

Separates retrieval, context and answer evaluation so quality failures can be diagnosed instead of averaged into one score.

## Problem statement

Identify whether poor answers originate from retrieval, context selection or generation.

## Design decisions

- Evaluate retrieval and generation independently
- Use controlled question sets
- Retain source evidence
- Compare embeddings and rerankers experimentally

## Technology

- RAGAS
- Embeddings
- Vector search
- Reranking
- Python

## Security considerations

- No secrets in evaluation fixtures
- Sensitive corpus controls
- Model endpoint configuration outside source

## Scalability considerations

- Batch evaluation
- Comparable runs
- Pluggable retrievers

## Quality considerations

- Precision
- Recall
- Faithfulness
- Context relevance
- Hallucination checks
