-- Add athlete column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'prestasi' AND column_name = 'athlete') THEN 
        ALTER TABLE prestasi ADD COLUMN athlete TEXT; 
    END IF; 
END $$;

-- Clear existing data
TRUNCATE TABLE prestasi;

-- Insert data for Kejuaraan Pakubumi Open 3
INSERT INTO prestasi (event_name, year, title, athlete, medal) VALUES
('Kejuaraan Pakubumi Open 3', '2024', 'Juara 1 Tanding Kelas C Putra', 'Hary Kurniawan', 'gold'),
('Kejuaraan Pakubumi Open 3', '2024', 'Juara 1 Tanding Kelas A Putra', 'Muhammad Farid Alhamdani', 'gold'),
('Kejuaraan Pakubumi Open 3', '2024', 'Juara 2 Tanding Kelas A Putri', 'Anita Nuraghnia', 'silver');

-- Insert data for Kejuaraan Bandung Lautan Api Championship 5
INSERT INTO prestasi (event_name, year, title, athlete, medal) VALUES
('Kejuaraan Bandung Lautan Api Championship 5', '2024', 'Juara 1 Tanding Kelas G Putra', 'Fa’i Refriandi', 'gold'),
('Kejuaraan Bandung Lautan Api Championship 5', '2024', 'Juara 2 Seni Tunggal Putri', 'Delia Aksani Puspitasari', 'silver'),
('Kejuaraan Bandung Lautan Api Championship 5', '2024', 'Juara 3 Seni Tunggal Putra', 'Chandra Abdul Aziz', 'bronze'),
('Kejuaraan Bandung Lautan Api Championship 5', '2024', 'Juara 3 Tanding Kelas F Putri', 'Dian Lestari', 'bronze'),
('Kejuaraan Bandung Lautan Api Championship 5', '2024', 'Juara 3 Tanding Kelas D Putra', 'Muhammad Aris Azfa Assathin Supriyadi', 'bronze');
