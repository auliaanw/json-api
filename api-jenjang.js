const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Baca data dari file JSON
const loadData = () => {
  try {
const rawData = fs.readFileSync(path.join(__dirname, 'jenjang.json'));
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Gagal memuat data:', error);
    return { jenjang: [] };
  }
};

// Endpoint Utama
app.get('/jenjang', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Filter by ID
app.get('/jenjang/:id', (req, res) => {
  const data = loadData();
  const result = data.jenjang.find(item => item.id === req.params.id);
  result ? res.json(result) : res.status(404).json({ error: 'Data tidak ditemukan' });
});

// Pencarian by Nama (case-insensitive)
app.get('/jenjang/search/:keyword', (req, res) => {
  const data = loadData();
  const keyword = req.params.keyword.toLowerCase();
  const results = data.jenjang.filter(item => 
    item.nama.toLowerCase().includes(keyword)
  );
  res.json({ results });
});

// Tambahkan endpoint baru tanpa perlu restart server
app.get('/jenjang/count', (req, res) => {
  const data = loadData();
  res.json({ total: data.jenjang.length });
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log('Endpoint:');
  console.log(`- GET /jenjang`);
  console.log(`- GET /jenjang/:id`);
  console.log(`- GET /jenjang/search/:keyword`);
});