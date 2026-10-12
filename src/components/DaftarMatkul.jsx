function KartuMatkul({ nama, sks }) {
  return (
    <article>
      <h2>{nama}</h2>
      <p>Jumlah SKS: {sks}</p>
    </article>
  );
}

const mataKuliah = [
  { id: "web", nama: "Pemrograman Berbasis Web", sks: 3 },
  { id: "ml", nama: "Machine Learning", sks: 3 },
  { id: "kal", nama: "Kalkulus", sks: 2 },
  { id: "md", nama: "Manajemen Data", sks: 3 },
];

export default function DaftarMatkul() {
  const totalSks = mataKuliah.reduce((total, item) => total + item.sks, 0);

  return (
    <section>
      <h1>Daftar Mata Kuliah</h1>
      <p>
        {mataKuliah.length} mata kuliah, total {totalSks} SKS
      </p>
      {mataKuliah.map((item) => (
        <KartuMatkul key={item.id} nama={item.nama} sks={item.sks} />
      ))}
    </section>
  );
}
