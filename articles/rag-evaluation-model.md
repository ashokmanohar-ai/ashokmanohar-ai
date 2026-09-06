# A Practical Evaluation Model for RAG Systems

A RAG system should be evaluated as a pipeline, not as a single answer generator. Separate retrieval quality from context quality and generation quality so failures can be diagnosed.

## Retrieval

Measure precision, recall, ranking, freshness and authorization filtering.

## Context

Check relevance, sufficiency, duplication, ordering and contradiction.

## Generation

Measure faithfulness, correctness, citation integrity and appropriate abstention.

## Operations

Track latency, cost, versioned datasets and production traces so evaluation becomes a continuous quality gate.
