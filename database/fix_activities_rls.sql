-- Enable RLS
ALTER TABLE aktivitas ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Public Read Aktivitas" ON aktivitas;

-- Re-create the policy allowing public read access
CREATE POLICY "Public Read Aktivitas" 
ON aktivitas 
FOR SELECT 
TO public 
USING (true);
