-- ==========================================
-- Sprint 2.2 - Database Cleanup
-- ==========================================

-- Remove obsolete columns from profiles

ALTER TABLE profiles
DROP COLUMN IF EXISTS role,
DROP COLUMN IF EXISTS salary,
DROP COLUMN IF EXISTS payday,
DROP COLUMN IF EXISTS savings,
DROP COLUMN IF EXISTS started_at;

-- ==========================================
-- App Setting
-- ==========================================

ALTER TABLE app_setting
DROP COLUMN IF EXISTS starting_balance;

ALTER TABLE app_setting
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- ==========================================
-- Transaction Categories
-- ==========================================

ALTER TABLE transaction_categories
DROP COLUMN IF EXISTS icon,
DROP COLUMN IF EXISTS color;

-- ==========================================
-- Strengthen transaction_categories
-- ==========================================

ALTER TABLE transaction_categories
ALTER COLUMN type SET NOT NULL,
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN is_default SET NOT NULL,
ALTER COLUMN is_default SET DEFAULT TRUE;

ALTER TABLE transaction_categories
ADD CONSTRAINT transaction_categories_type_check
CHECK (type IN ('income', 'expense'));