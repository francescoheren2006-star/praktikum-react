import { useState } from "react";

const MAKSIMUM = 30;

export default function PenghitungKehadiran() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <section>
      <h1>Penghitung Kehadiran</h1>
      <p>Jumlah hadir: {jumlah}</p>
      <div className="baris-form">
        <button
          type="button"
          disabled={jumlah >= MAKSIMUM}
          onClick={() => setJumlah((n) => Math.min(MAKSIMUM, n + 1))}
        >
          Tambah
        </button>
        <button
          type="button"
          onClick={() => setJumlah((n) => Math.max(0, n - 1))}
        >
          Kurangi
        </button>
        <button type="button" onClick={() => setJumlah(0)}>
          Reset
        </button>
      </div>
      <p>{jumlah === 0 ? "Belum ada mahasiswa" : "Ada mahasiswa"}</p>
      {jumlah >= MAKSIMUM && (
        <p role="status">Batas maksimum {MAKSIMUM} tercapai.</p>
      )}
    </section>
  );
}
