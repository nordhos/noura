-- =====================================================
-- NOURA v2.0
-- Add Transfer & Return Transaction Types
-- Created: 2026-09-25
-- =====================================================

-- =====================================================
-- 1. ADD PROFILE REFERENCES FOR TRANSFER
-- =====================================================

alter table public.transactions
add column if not exists from_profile_id uuid;

alter table public.transactions
add column if not exists to_profile_id uuid;


-- =====================================================
-- 2. ADD FOREIGN KEYS
-- =====================================================

alter table public.transactions
drop constraint if exists transactions_from_profile_id_fkey;

alter table public.transactions
add constraint transactions_from_profile_id_fkey
foreign key (from_profile_id)
references public.profiles(id)
on update cascade
on delete restrict;


alter table public.transactions
drop constraint if exists transactions_to_profile_id_fkey;

alter table public.transactions
add constraint transactions_to_profile_id_fkey
foreign key (to_profile_id)
references public.profiles(id)
on update cascade
on delete restrict;


-- =====================================================
-- 3. TRANSACTION TYPE CONSTRAINT
-- =====================================================

alter table public.transactions
drop constraint if exists transactions_type_check;

alter table public.transactions
add constraint transactions_type_check
check (
  type in (
    'income',
    'expense',
    'transfer',
    'return'
  )
);


-- =====================================================
-- 4. TRANSFER STRUCTURE CONSTRAINT
-- =====================================================

alter table public.transactions
drop constraint if exists transactions_transfer_structure_check;

alter table public.transactions
add constraint transactions_transfer_structure_check
check (
  (
    type = 'transfer'
    and profile_id is null
    and category_id is null
    and from_profile_id is not null
    and to_profile_id is not null
    and from_profile_id <> to_profile_id
  )
  or
  (
    type <> 'transfer'
    and from_profile_id is null
    and to_profile_id is null
  )
);


-- =====================================================
-- 5. RETURN STRUCTURE CONSTRAINT
-- =====================================================

alter table public.transactions
drop constraint if exists transactions_return_structure_check;

alter table public.transactions
add constraint transactions_return_structure_check
check (
  (
    type = 'return'
    and profile_id is not null
    and category_id is null
    and from_profile_id is null
    and to_profile_id is null
  )
  or
  (
    type <> 'return'
  )
);


-- =====================================================
-- 6. INDEXES
-- =====================================================

create index if not exists idx_transactions_from_profile
on public.transactions(from_profile_id);

create index if not exists idx_transactions_to_profile
on public.transactions(to_profile_id);


-- =====================================================
-- END
-- =====================================================