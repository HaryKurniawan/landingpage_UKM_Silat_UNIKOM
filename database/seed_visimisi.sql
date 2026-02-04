-- Add visi and misi columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'visi') THEN 
        ALTER TABLE site_settings ADD COLUMN visi TEXT; 
    END IF; 

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'misi') THEN 
        ALTER TABLE site_settings ADD COLUMN misi JSONB DEFAULT '[]'::JSONB; 
    END IF; 
END $$;

-- Update with default data (using upsert logic for ID 1)
INSERT INTO site_settings (id, visi, misi)
VALUES (
    1, 
    'Menjadi UKM Pencak Silat terdepan yang menghasilkan pesilat berprestasi dan berkarakter.',
    '["Latihan Berkualitas", "Prestasi Nasional", "Karakter Pesilat", "Komunitas Solid"]'::JSONB
)
ON CONFLICT (id) DO UPDATE 
SET 
    visi = EXCLUDED.visi,
    misi = EXCLUDED.misi;
