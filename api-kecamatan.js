const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Baca data dari file JSON
const loadData = () => {
  try {
const rawData = fs.readFileSync(path.join(__dirname, 'kecamatan.json'));
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Gagal memuat data:', error);
    return { kecamatan: [] };
  }
};

// Endpoint Utama
app.get('/kecamatan', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Filter by ID
app.get('/kecamatan/:id', (req, res) => {
  const data = loadData();
  const result = data.kecamatan.find(item => item.id === req.params.id);
  result ? res.json(result) : res.status(404).json({ error: 'Data tidak ditemukan' });
});

// Pencarian by Nama (case-insensitive)
app.get('/kecamatan/search/:keyword', (req, res) => {
  const data = loadData();
  const keyword = req.params.keyword.toLowerCase();
  const results = data.kecamatan.filter(item => 
    item.nama.toLowerCase().includes(keyword)
  );
  res.json({ results });
});

// Tambahkan endpoint baru tanpa perlu restart server
app.get('/kecamatan/count', (req, res) => {
  const data = loadData();
  res.json({ total: data.kecamatan.length });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Endpoint:');
  console.log(`- GET /kecamatan`);
  console.log(`- GET /kecamatan/:id`);
  console.log(`- GET /kecamatan/search/:keyword`);
});