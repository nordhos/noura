CREATE UNIQUE INDEX transactions_opening_balance_unique_idx
ON public.transactions (
    profile_id,
    category_id
)
WHERE
    source = 'opening_balance';