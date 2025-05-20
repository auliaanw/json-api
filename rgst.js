import React, { useState, useEffect } from "react";
import bgImage from "../assets/hero-bg.png";
import "../css/form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import ikon untuk visual
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios untuk melakukan request

const HeroForm = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [formData, setFormData] = useState({
    daerah: "",
    kecamatan: "",
    jenjang: "",
    sekolah: "",
    kelas: "",
    noHp: "",
    buktiTransfer: null
  });

  const [showConfirmation, setShowConfirmation] = useState(false); // State untuk menampilkan konfirmasi
  const [daerahList, setDaerahList] = useState([]); // State untuk daftar daerah
  const [kecamatanList, setKecamatanList] = useState([]); // State untuk daftar kecamatan
  const [jenjangList, setJenjangList] = useState([]); // State untuk daftar jenjang
  const [sekolahList, setSekolahList] = useState([]); // State untuk daftar sekolah
  const [kelasList, setKelasList] = useState([]); // State untuk daftar kelas

  // Mengambil data daerah
  useEffect(() => {
    const fetchDaerah = async () => {
      const response = await axios.get("https://registjprk.free.beeceptor.com/daerah");
      setDaerahList(response.data.daerah);
    };
    fetchDaerah();
  }, []);

  // Mengambil data kecamatan
  useEffect(() => {
    const fetchKecamatan = async () => {
      const response = await axios.get("https://registjprk.free.beeceptor.com/kecamatan");
      setKecamatanList(response.data.kecamatan);
    };
    fetchKecamatan();
  }, []);

  // Mengambil data jenjang pendidikan
  useEffect(() => {
    const fetchJenjang = async () => {
      const response = await axios.get("https://681c37196ae7c794cf7100fe.mockapi.io/jenjangpendidikan");
      setJenjangList(response.data);
    };
    fetchJenjang();
  }, []);

  // Mengambil data sekolah
  useEffect(() => {
    const fetchSekolah = async () => {
      const response = await axios.get("https://registjprk.free.beeceptor.com/sekolah");
      setSekolahList(response.data.sekolah);
    };
    fetchSekolah();
  }, []);

  // Mengambil data kelas
  useEffect(() => {
    const fetchKelas = async () => {
      const response = await axios.get("https://681c37196ae7c794cf7100fe.mockapi.io/kelas");
      setKelasList(response.data);
    };
    fetchKelas();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Tampilkan konfirmasi ketika tombol Daftar ditekan
  };

  const handleReset = () => {
    setFormData({
      daerah: "",
      kecamatan: "",
      jenjang: "",
      sekolah: "",
      kelas: "",
      noHp: "",
      buktiTransfer: null
    });
  };

  const handleConfirmation = (isConfirmed) => {
    if (isConfirmed) {
      console.log(formData); // Tampilkan data form jika konfirmasi diterima
      handleReset();
      navigate("/akun"); // Arahkan ke halaman Akun.js
    }
    setShowConfirmation(false); // Tutup konfirmasi
  };

  return (
    <div
      className="hero py-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh"
      }}
    >
      <div className="container bg-white p-5 rounded shadow">
        <h2 className="custom-text">Formulir Pendaftaran Peserta</h2>
        <p className="hero-desc">Silakan isi data di bawah ini dengan benar untuk proses pendaftaran</p>

        <form onSubmit={handleSubmit}>
          {/* Daerah */}
          <div className="mb-3">
            <label className="form-label">Nama Daerah <span className="required">*</span></label>
            <select
              className="form-select"
              name="daerah"
              value={formData.daerah}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Daerah</option>
              {daerahList.map((daerah) => (
                <option key={daerah.id} value={daerah.nama}>{daerah.nama}</option>
              ))}
            </select>
          </div>

          {/* Kecamatan */}
          <div className="mb-3">
            <label className="form-label">Kecamatan <span className="required">*</span></label>
            <select
              className="form-select"
              name="kecamatan"
              value={formData.kecamatan}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kecamatan</option>
              {kecamatanList.map((kecamatan) => (
                <option key={kecamatan.id} value={kecamatan.nama}>{kecamatan.nama}</option>
              ))}
            </select>
          </div>

          {/* Jenjang */}
          <div className="mb-3">
            <label className="form-label">Jenjang Pendidikan <span className="required">*</span></label>
            <select
              className="form-select"
              name="jenjang"
              value={formData.jenjang}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenjang</option>
              {jenjangList.map((jenjang) => (
                <option key={jenjang.id} value={jenjang.nama}>{jenjang.nama}</option>
              ))}
            </select>
          </div>

          {/* Sekolah */}
          <div className="mb-3">
            <label className="form-label">Nama Sekolah <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama Sekolah"
              name="sekolah"
              value={formData.sekolah}
              onChange={handleChange}
              required
            />
          </div>

          {/* Kelas */}
          <div className="mb-3">
            <label className="form-label">Kelas <span className="required">*</span></label>
            <select
              className="form-select"
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.nama}>{kelas.nama}</option>
              ))}
            </select>
          </div>

          {/* No HP */}
          <div className="mb-3">
            <label className="form-label">No HP/WA Aktif <span className="required">*</span></label>
            <input
              type="tel"
              className="form-control"
              placeholder="081234567890"
              name="noHp"
              value={formData.noHp}
              onChange={handleChange}
              required
            />
            <small className="text-muted">Pastikan nomor aktif untuk konfirmasi</small>
          </div>

          {/* Bukti Transfer */}
          <div className="mb-4">
            <label className="form-label">Bukti Transfer <span className="required">*</span></label>
            <input
              type="file"
              className="form-control"
              name="buktiTransfer"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
            <small className="text-muted">Upload bukti transfer dalam format JPG/PNG/PDF (max 2MB)</small>
          </div>

          {/* Tombol */}
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-danger flex-grow-1"
              onClick={handleReset}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary flex-grow-1">
              Daftar
            </button>
          </div>
        </form>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirmation && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title text-success">
                  <FaCheckCircle className="me-2" /> Pendaftaran Berhasil!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmation(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted">
                  Apakah Anda yakin ingin melanjutkan pendaftaran?
                </p>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowConfirmation(false)}
                >
                  <FaTimesCircle className="me-2" /> Tidak
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleConfirmation(true)}
                >
                  <FaCheckCircle className="me-2" /> Ya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroForm;
