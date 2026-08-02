CREATE UNIQUE INDEX transactions_auto_salary_unique_idx
ON public.transactions (
    profile_id,
    category_id,
    transaction_date
)
WHERE
    is_auto_generated = TRUE
    AND source = 'auto_salary';