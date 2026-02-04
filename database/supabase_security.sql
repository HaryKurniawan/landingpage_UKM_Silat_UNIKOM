-- 1. Enable RLS on all tables
ALTER TABLE pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE aktivitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;

-- 2. Create Public Read Policies (Allows anyone to VIEW data)
DROP POLICY IF EXISTS "Public Read Pengurus" ON pengurus;
CREATE POLICY "Public Read Pengurus" ON pengurus FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public Read Events" ON events;
CREATE POLICY "Public Read Events" ON events FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public Read Aktivitas" ON aktivitas;
CREATE POLICY "Public Read Aktivitas" ON aktivitas FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Public Read Prestasi" ON prestasi;
CREATE POLICY "Public Read Prestasi" ON prestasi FOR SELECT TO public USING (true);

-- 3. Create Admin Write Policies (Allows ONLY specific email to INSERT/UPDATE/DELETE)
-- IMPORTANT: Replace 'ukmpencaksilatunikom@gmail.com' with your actual admin email address!

-- Policy for Pengurus
DROP POLICY IF EXISTS "Admin Write Pengurus" ON pengurus;
CREATE POLICY "Admin Write Pengurus" ON pengurus 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com');

-- Policy for Events
DROP POLICY IF EXISTS "Admin Write Events" ON events;
CREATE POLICY "Admin Write Events" ON events 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com');

-- Policy for Aktivitas
DROP POLICY IF EXISTS "Admin Write Aktivitas" ON aktivitas;
CREATE POLICY "Admin Write Aktivitas" ON aktivitas 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com');

-- Policy for Prestasi
DROP POLICY IF EXISTS "Admin Write Prestasi" ON prestasi;
CREATE POLICY "Admin Write Prestasi" ON prestasi 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'ukmpencaksilatunikom@gmail.com');

-- Site Settings Policies
DROP POLICY IF EXISTS "Public Read Site Settings" ON site_settings;
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow Admin Update Site Settings" ON site_settings;
CREATE POLICY "Allow Admin Update Site Settings" ON site_settings
    FOR ALL
    TO authenticated
    USING (auth.email() = 'ukmpencaksilatunikom@gmail.com')
    WITH CHECK (auth.email() = 'ukmpencaksilatunikom@gmail.com');
