# NOURA Decision Log

Version: 1.0

Status: Living Document

---

# Purpose

Every important product, architecture, or business decision must be documented here before implementation.

Decision Log exists to preserve context.

Code explains how.

Decision Log explains why.

Whenever future discussions revisit a previous topic, this document becomes the primary source of truth.

---

# Decision Status

🟢 LOCKED

Decision has been finalized.

Changing it requires strong product justification.

---

🟡 REVIEWING

Decision is currently being evaluated.

Implementation should wait.

---

🔵 PROPOSED

Idea has been introduced.

No implementation yet.

---

# Product Decisions

---

DL-001

Title

Product Category

Decision

NOURA is a Financial Clarity System.

It is intentionally not positioned as an Expense Tracker, Budget App or Money Manager.

Status

🟢 LOCKED

Date

2026

---

DL-002

Title

Target Users

Decision

NOURA supports only two usage scenarios:

• Individual

• Couple

Maximum supported profiles:

2

Supporting more than two profiles is intentionally outside the product scope.

Status

🟢 LOCKED

---

DL-003

Title

Financial Setup

Decision

Financial Setup is completed only once.

It establishes the user's financial system.

Status

🟢 LOCKED

---

DL-004

Title

Financial Setup Flow

Decision

The onboarding sequence is:

1. Financial Timeline

2. Profile Setup

3. Initial Balance

4. System Initialization

Status

🟢 LOCKED

---

DL-005

Title

Initial Balance

Decision

Initial Balance is represented as an Income transaction.

Category:

Saldo Awal

The transaction date equals the Financial Start Date.

Status

🟢 LOCKED

---

DL-006

Title

Transaction Ownership

Decision

Every transaction belongs to exactly one profile.

There are no Shared Profiles.

There are no System Profiles.

Status

🟢 LOCKED

---

DL-007

Title

Financial Truth

Decision

Transactions are the only financial source of truth.

Balance is always calculated.

Balance is never stored.

Status

🟢 LOCKED

---

DL-008

Title

Dashboard Philosophy

Decision

Dashboard exists to answer important financial questions.

It is not designed to display every available metric.

Status

🟢 LOCKED

---

DL-009

Title

Product Philosophy

Decision

Financial Clarity always has higher priority than feature completeness.

Status

🟢 LOCKED

---

DL-010

Title

Engineering Philosophy

Decision

Business Rules

↓

Architecture

↓

Implementation

Never the opposite.

Status

🟢 LOCKED

---

# Decision Template

Use this template whenever introducing a new decision.

---

DL-XXX

Title

Problem

Current Situation

Alternatives

Option A

Option B

Option C

Recommendation

Decision

Reason

Impact

Product

UX

Architecture

Engineering

Status

🔵 Proposed

🟡 Reviewing

🟢 Locked

Date

YYYY-MM-DD