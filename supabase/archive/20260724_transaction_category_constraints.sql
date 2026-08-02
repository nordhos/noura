-- ==========================================
-- Sprint 2.2 - Transaction Category Constraints
-- ==========================================

ALTER TABLE transaction_categories
ADD CONSTRAINT transaction_categories_type_name_unique
UNIQUE (type, name);