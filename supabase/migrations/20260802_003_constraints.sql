-- =====================================================
-- NOURA v1.0
-- Database Constraints & Indexes
-- =====================================================

BEGIN;

-- =====================================================
-- CATEGORY UNIQUE
-- =====================================================

ALTER TABLE public.transaction_categories
ADD CONSTRAINT transaction_categories_type_name_unique
UNIQUE (type, name);

-- =====================================================
-- AUTO SALARY
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS
transactions_auto_salary_unique_idx

ON public.transactions
(
    profile_id,
    category_id,
    transaction_date
)

WHERE
    is_auto_generated = TRUE
    AND source = 'auto_salary';

-- =====================================================
-- OPENING BALANCE
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS
transactions_opening_balance_unique_idx

ON public.transactions
(
    profile_id,
    category_id
)

WHERE
    source = 'opening_balance';

COMMIT;