-- ==========================================
-- Sprint 2.2 - Default Transaction Categories
-- ==========================================

-- Development only
-- Safe because NOURA is still in early stage.

BEGIN;

DELETE FROM transaction_categories
WHERE is_default = true;

INSERT INTO transaction_categories (name, type, is_default)
VALUES

COMMIT;

-- ==========================
-- INCOME
-- ==========================

('Saldo Awal', 'income', true),
('Gaji Pokok', 'income', true),
('Tunjangan', 'income', true),
('Bonus', 'income', true),
('THR', 'income', true),
('Perjalanan Dinas', 'income', true),
('Transfer Masuk', 'income', true),
('Penyesuaian Saldo', 'income', true),
('Lainnya', 'income', true),

-- ==========================
-- EXPENSE
-- ==========================

('Makan', 'expense', true),
('Minum', 'expense', true),
('Transportasi', 'expense', true),
('Belanja Offline', 'expense', true),
('Belanja Online', 'expense', true),
('Hiburan', 'expense', true),
('Kesehatan', 'expense', true),
('Pendidikan', 'expense', true),
('Anak', 'expense', true),
('Rumah', 'expense', true),
('Tagihan', 'expense', true),
('Parkir', 'expense', true),
('Donasi', 'expense', true),
('Lainnya', 'expense', true);