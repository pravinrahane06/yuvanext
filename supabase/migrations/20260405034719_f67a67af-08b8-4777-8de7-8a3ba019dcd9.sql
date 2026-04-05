
-- Create fundraising_pages table for peer fundraising
CREATE TABLE public.fundraising_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  goal_amount NUMERIC NOT NULL DEFAULT 0,
  raised_amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  featured_image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fundraising_pages ENABLE ROW LEVEL SECURITY;

-- Anyone can view active fundraising pages
CREATE POLICY "Anyone can view active fundraising pages"
ON public.fundraising_pages FOR SELECT
TO public
USING (status = 'active');

-- Authenticated users can create their own pages
CREATE POLICY "Users can create own fundraising pages"
ON public.fundraising_pages FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own pages
CREATE POLICY "Users can update own fundraising pages"
ON public.fundraising_pages FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Users can delete their own pages
CREATE POLICY "Users can delete own fundraising pages"
ON public.fundraising_pages FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Admins can manage all
CREATE POLICY "Admins can manage all fundraising pages"
ON public.fundraising_pages FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_fundraising_pages_updated_at
BEFORE UPDATE ON public.fundraising_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
