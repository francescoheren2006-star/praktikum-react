import { useState } from "react";
import ProfilMahasiswa from "./components/ProfilMahasiswa.jsx";
import DaftarMatkul from "./components/DaftarMatkul.jsx";
import PenghitungKehadiran from "./components/PenghitungKehadiran.jsx";
import DaftarTugas from "./components/DaftarTugas.jsx";

const halaman = [
  { id: "profil", label: "Profil", tampil: () => <ProfilMahasiswa /> },
  { id: "matkul", label: "Mata Kuliah", tampil: () => <DaftarMatkul /> },
  { id: "hadir", label: "Kehadiran", tampil: () => <PenghitungKehadiran /> },
  { id: "tugas", label: "Daftar Tugas", tampil: () => <DaftarTugas /> },
];

export default function App() {
  const [aktif, setAktif] = useState("profil");
  const dipilih = halaman.find((h) => h.id === aktif);

  return (
    <main>
      <nav aria-label="Pilih tugas praktikum" className="tab">
        {halaman.map((h) => (
          <button
            key={h.id}
            type="button"
            className={h.id === aktif ? "" : "sekunder"}
            aria-pressed={h.id === aktif}
            onClick={() => setAktif(h.id)}
          >
            {h.label}
          </button>
        ))}
      </nav>
      {dipilih.tampil()}
    </main>
  );
}
