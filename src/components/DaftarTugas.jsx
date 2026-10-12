import { useEffect, useState } from "react";

const KUNCI_PENYIMPANAN = "daftar-tugas-kuliah";

const TUGAS_AWAL = [{ id: "awal", judul: "Pelajari JSX", selesai: false }];

const FILTER = [
  { id: "semua", label: "Semua" },
  { id: "aktif", label: "Aktif" },
  { id: "selesai", label: "Selesai" },
];

function buatId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function valid(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.judul === "string" &&
    typeof item.selesai === "boolean"
  );
}

function bacaTugasTersimpan() {
  try {
    const mentah = localStorage.getItem(KUNCI_PENYIMPANAN);
    if (mentah === null) return TUGAS_AWAL;
    const data = JSON.parse(mentah);
    if (Array.isArray(data) && data.every(valid)) return data;
  } catch {
    // JSON tidak valid atau penyimpanan tidak tersedia: pakai data awal.
  }
  return TUGAS_AWAL;
}

function ItemTugas({
  item,
  sedangEdit,
  judulEdit,
  errorEdit,
  onUbahJudulEdit,
  onMulaiEdit,
  onSimpanEdit,
  onBatalEdit,
  onToggle,
  onHapus,
}) {
  if (sedangEdit) {
    return (
      <li>
        <form
          className="baris-form form-edit"
          onSubmit={(event) => {
            event.preventDefault();
            onSimpanEdit(item.id);
          }}
        >
          <input
            aria-label={`Judul baru untuk ${item.judul}`}
            value={judulEdit}
            onChange={(event) => onUbahJudulEdit(event.target.value)}
            autoFocus
          />
          <button type="submit">Simpan</button>
          <button type="button" className="sekunder" onClick={onBatalEdit}>
            Batal
          </button>
        </form>
        {errorEdit && <p role="alert">{errorEdit}</p>}
      </li>
    );
  }

  return (
    <li className={item.selesai ? "selesai" : ""}>
      <span>{item.judul}</span>
      <button type="button" onClick={() => onToggle(item.id)}>
        {item.selesai ? "Batalkan" : "Selesai"}
      </button>
      <button
        type="button"
        className="sekunder"
        onClick={() => onMulaiEdit(item)}
      >
        Edit
      </button>
      <button type="button" onClick={() => onHapus(item.id)}>
        Hapus
      </button>
    </li>
  );
}

export default function DaftarTugas() {
  const [judul, setJudul] = useState("");
  const [error, setError] = useState("");
  const [tugas, setTugas] = useState(bacaTugasTersimpan);
  const [filter, setFilter] = useState("semua");
  const [idEdit, setIdEdit] = useState(null);
  const [judulEdit, setJudulEdit] = useState("");
  const [errorEdit, setErrorEdit] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(tugas));
    } catch {
      // Penyimpanan penuh atau diblokir: aplikasi tetap berjalan dengan data di memori.
    }
  }, [tugas]);

  function tambah(event) {
    event.preventDefault();
    const teks = judul.trim();
    if (!teks) {
      setError("Judul tugas wajib diisi.");
      return;
    }
    const item = { id: buatId(), judul: teks, selesai: false };
    setTugas((lama) => [...lama, item]);
    setJudul("");
    setError("");
  }

  function toggle(id) {
    setTugas((lama) =>
      lama.map((item) =>
        item.id === id ? { ...item, selesai: !item.selesai } : item,
      ),
    );
  }

  function hapus(id) {
    setTugas((lama) => lama.filter((item) => item.id !== id));
    if (id === idEdit) batalEdit();
  }

  function mulaiEdit(item) {
    setIdEdit(item.id);
    setJudulEdit(item.judul);
    setErrorEdit("");
  }

  function batalEdit() {
    setIdEdit(null);
    setJudulEdit("");
    setErrorEdit("");
  }

  function simpanEdit(id) {
    const teks = judulEdit.trim();
    if (!teks) {
      setErrorEdit("Judul tugas wajib diisi.");
      return;
    }
    // id dan status selesai tidak berubah; hanya judul yang diganti.
    setTugas((lama) =>
      lama.map((item) => (item.id === id ? { ...item, judul: teks } : item)),
    );
    batalEdit();
  }

  const jumlahSelesai = tugas.filter((item) => item.selesai).length;

  const tampil = tugas.filter((item) => {
    if (filter === "aktif") return !item.selesai;
    if (filter === "selesai") return item.selesai;
    return true;
  });

  return (
    <section>
      <h1>Daftar Tugas Kuliah</h1>
      <form onSubmit={tambah}>
        <label htmlFor="judul">Judul tugas</label>
        <div className="baris-form">
          <input
            id="judul"
            value={judul}
            onChange={(event) => setJudul(event.target.value)}
          />
          <button type="submit">Tambah</button>
        </div>
      </form>
      {error && <p role="alert">{error}</p>}
      <p>
        Selesai {jumlahSelesai} dari {tugas.length} tugas
      </p>

      <div className="baris-form" role="group" aria-label="Filter tugas">
        {FILTER.map((f) => (
          <button
            key={f.id}
            type="button"
            className={f.id === filter ? "" : "sekunder"}
            aria-pressed={f.id === filter}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tugas.length === 0 ? (
        <p>Belum ada tugas.</p>
      ) : tampil.length === 0 ? (
        <p>Tidak ada tugas pada filter ini.</p>
      ) : (
        <ul>
          {tampil.map((item) => (
            <ItemTugas
              key={item.id}
              item={item}
              sedangEdit={item.id === idEdit}
              judulEdit={judulEdit}
              errorEdit={errorEdit}
              onUbahJudulEdit={setJudulEdit}
              onMulaiEdit={mulaiEdit}
              onSimpanEdit={simpanEdit}
              onBatalEdit={batalEdit}
              onToggle={toggle}
              onHapus={hapus}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
