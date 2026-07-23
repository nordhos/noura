# NOURA Domain Model

Version: 1.0

Status: LOCKED

---

# Purpose

The Domain Model defines the core concepts of NOURA and the relationships between them.

It represents the business domain, not the database structure.

Every architectural and engineering decision should originate from this model.

---

# Domain Overview

NOURA consists of one Financial System.

Within that Financial System, users record financial activities that produce Financial Clarity.

Financial System
│
├── Profiles
├── Categories
├── Transactions
└── Reports (Calculated)

---

# Core Entities

The first version of NOURA contains four core entities.

1. Financial System
2. Profile
3. Category
4. Transaction

Everything else is derived from these entities.

---

# Financial System

Definition

Represents the user's complete financial environment.

Responsibilities

- Owns Profiles
- Owns Categories
- Owns Transactions
- Defines Financial Timeline

Rules

Exactly one Financial System exists per account.

---

# Profile

Definition

Represents a financial owner.

Responsibilities

Own financial transactions.

Rules

- Maximum two profiles.
- Every transaction belongs to one profile.
- Profiles do not calculate balances.
- Profiles never own categories.

---

# Category

Definition

Classifies financial transactions.

Responsibilities

Improve financial understanding.

Rules

Every transaction belongs to exactly one category.

Categories never affect calculations.

---

# Transaction

Definition

Represents a financial event.

Responsibilities

Capture historical financial activities.

Rules

Every transaction:

- has one owner
- has one category
- has one amount
- has one date
- is immutable historical evidence

---

# Derived Objects

The following are not entities.

They are calculated views.

- Dashboard
- Reports
- Balance
- Financial Health
- Insights

They should never become primary sources of truth.

---

# Relationships

Financial System

1

↓

Profiles

1..2

↓

Transactions

↓

Categories

---

# Ownership

Financial System

owns

Profiles

owns

Transactions

references

Categories

---

# Source of Truth

Transactions are the only financial source of truth.

Everything else is calculated.

---

# Aggregate Boundaries

Financial System

Aggregate Root

↓

Profiles

↓

Transactions

↓

Categories

No entity outside the Financial System may directly modify Transactions.

---

# Domain Invariants

The following rules must always be true.

- Every transaction has exactly one owner.
- Every transaction has exactly one category.
- Every transaction has exactly one date.
- Balance is always calculated.
- Financial Timeline cannot be empty.
- A Financial System always contains at least one Profile.