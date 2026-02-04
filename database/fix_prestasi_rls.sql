-- Enable RLS for Prestasi
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Public Read Prestasi" ON prestasi;

-- Re-create the policy allowing public read access
CREATE POLICY "Public Read Prestasi" 
ON prestasi 
FOR SELECT 
TO public 
USING (true);
