const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Baca data dari file JSON
const loadData = () => {
  try {
const rawData = fs.readFileSync(path.join(__dirname, 'sekolah.json'));
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Gagal memuat data:', error);
    return { sekolah: [] };
  }
};

// Endpoint Utama
app.get('/sekolah', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Filter by ID
app.get('/sekolah/:id', (req, res) => {
  const data = loadData();
  const result = data.sekolah.find(item => item.id === req.params.id);
  result ? res.json(result) : res.status(404).json({ error: 'Data tidak ditemukan' });
});

// Pencarian by Nama (case-insensitive)
app.get('/sekolah/search/:keyword', (req, res) => {
  const data = loadData();
  const keyword = req.params.keyword.toLowerCase();
  const results = data.sekolah.filter(item => 
    item.nama.toLowerCase().includes(keyword)
  );
  res.json({ results });
});

// Tambahkan endpoint baru tanpa perlu restart server
app.get('/sekolah/count', (req, res) => {
  const data = loadData();
  res.json({ total: data.sekolah.length });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Endpoint:');
  console.log(`- GET /sekolah`);
  console.log(`- GET /sekolah/:id`);
  console.log(`- GET /sekolah/search/:keyword`);
});