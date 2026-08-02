-- =====================================================
-- NOURA v1.0
-- Initial Database Schema
-- Created: 2026-08-02
-- =====================================================

create extension if not exists pgcrypto;

-- =====================================================
-- PROFILES
-- =====================================================

create table if not exists public.profiles (
  id uuid not null default gen_random_uuid(),

  name text,

  salary_day smallint,

  base_salary numeric(15,2),

  auto_salary_enabled boolean not null default false,

  created_at timestamptz not null default now(),

  constraint profiles_pkey
    primary key (id),

  constraint profiles_salary_day_check
    check (
      salary_day is null
      or (
        salary_day >= 1
        and salary_day <= 31
      )
    ),

  constraint profiles_base_salary_check
    check (
      base_salary is null
      or base_salary >= 0
    )
);

-- =====================================================
-- APP SETTING
-- =====================================================

create table if not exists public.app_setting (

  id uuid not null default gen_random_uuid(),

  financial_start_date date,

  onboarding_completed boolean not null default false,

  created_at timestamptz not null default now(),

  constraint app_setting_pkey
    primary key (id)
);

-- =====================================================
-- TRANSACTION CATEGORIES
-- =====================================================

create table if not exists public.transaction_categories (

  id uuid not null default gen_random_uuid(),

  type text not null,

  name text not null,

  is_default boolean not null default true,

  is_system boolean not null default false,

  sort_order integer not null default 999,

  created_at timestamptz not null default now(),

  constraint transaction_categories_pkey
    primary key (id),

  constraint transaction_categories_type_check
    check (
      type in ('income','expense')
    )
);

-- =====================================================
-- TRANSACTIONS
-- =====================================================

create table if not exists public.transactions (

  id uuid not null default gen_random_uuid(),

  profile_id uuid,

  category_id uuid,

  type text,

  amount bigint,

  description text,

  transaction_date date,

  year integer,

  month integer,

  is_auto_generated boolean not null default false,

  source text,

  created_at timestamptz not null default now(),

  constraint transactions_pkey
    primary key (id),

  constraint transactions_profile_id_fkey
    foreign key (profile_id)
    references public.profiles(id)
    on update cascade
    on delete restrict,

  constraint transactions_category_id_fkey
    foreign key (category_id)
    references public.transaction_categories(id)
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_transactions_profile
on public.transactions(profile_id);

create index if not exists idx_transactions_category
on public.transactions(category_id);

create index if not exists idx_transactions_date
on public.transactions(transaction_date);

create index if not exists idx_transactions_year_month
on public.transactions(year, month);

create index if not exists idx_transaction_categories_type
on public.transaction_categories(type);

-- =====================================================
-- END
-- =====================================================