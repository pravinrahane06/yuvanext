
-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  goal_amount NUMERIC NOT NULL DEFAULT 0,
  raised_amount NUMERIC NOT NULL DEFAULT 0,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  featured_image TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Everyone can view campaigns
CREATE POLICY "Anyone can view campaigns"
  ON public.campaigns FOR SELECT
  USING (true);

-- Admins can manage campaigns
CREATE POLICY "Admins can insert campaigns"
  ON public.campaigns FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update campaigns"
  ON public.campaigns FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete campaigns"
  ON public.campaigns FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create donation type enum
CREATE TYPE public.donation_type AS ENUM ('one-time', 'recurring');

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  type public.donation_type NOT NULL DEFAULT 'one-time',
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  tribute_name TEXT DEFAULT '',
  cover_fee BOOLEAN NOT NULL DEFAULT false,
  pan_number TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  transaction_id TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Authenticated users can create donations
CREATE POLICY "Users can create donations"
  ON public.donations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can view own donations
CREATE POLICY "Users can view own donations"
  ON public.donations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all donations
CREATE POLICY "Admins can view all donations"
  ON public.donations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update campaign raised_amount on new donation
CREATE OR REPLACE FUNCTION public.update_campaign_raised_amount()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND NEW.campaign_id IS NOT NULL THEN
    UPDATE public.campaigns
    SET raised_amount = raised_amount + NEW.amount
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_donation_insert_update_raised
  AFTER INSERT ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.update_campaign_raised_amount();

-- Enable realtime for donations
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
