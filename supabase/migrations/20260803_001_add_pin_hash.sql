ALTER TABLE public.app_setting
ADD COLUMN pin_hash text;

ALTER TABLE public.app_setting
ADD COLUMN updated_at timestamptz DEFAULT now();