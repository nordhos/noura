-- =====================================================
-- NOURA v1.0
-- Seed Default Transaction Categories
-- =====================================================

BEGIN;

DELETE FROM public.transaction_categories
WHERE is_default = true;

INSERT INTO public.transaction_categories
(
  name,
  type,
  is_default,
  is_system,
  sort_order
)

VALUES

-- =====================================================
-- INCOME
-- =====================================================

('Saldo Awal',         'income', true, true,  1),
('Gaji Pokok',         'income', true, true,  2),
('Tunjangan',          'income', true, false, 3),
('Bonus',              'income', true, false, 4),
('THR',                'income', true, false, 5),
('Perjalanan Dinas',   'income', true, false, 6),
('Transfer Masuk',     'income', true, false, 7),
('Penyesuaian Saldo',  'income', true, false, 8),
('Lainnya',            'income', true, false, 9),
('Donasi',             'income', true, false, 10),

-- =====================================================
-- EXPENSE
-- =====================================================

('Rumah Tangga',            'expense', true, false,  1),
('Makanan/Minuman',         'expense', true, false,  2),
('Transportasi',            'expense', true, false,  3),
('Anak',                    'expense', true, false,  4),
('Kesehatan',               'expense', true, false,  5),
('Belanja Pribadi',         'expense', true, false,  6),
('Hiburan',                 'expense', true, false,  7),
('Tagihan',                 'expense', true, false,  8),
('Cicilan',                 'expense', true, false,  9),
('Tabungan & Investasi',    'expense', true, false, 10),
('Lainnya',                 'expense', true, false, 11);

COMMIT;