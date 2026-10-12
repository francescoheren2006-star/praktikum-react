import { identitas } from "../identitas.js";

function Judul() {
  return <h1>Profil Mahasiswa</h1>;
}

function KartuProfil({ nama, nim, programStudi, kampus }) {
  return (
    <article>
      <h2>{nama}</h2>
      <p>NIM: {nim}</p>
      <p>Program studi: {programStudi}</p>
      <p>Kampus: {kampus}</p>
    </article>
  );
}

function Footer({ mataKuliah }) {
  return <footer>Mata kuliah: {mataKuliah}</footer>;
}

export default function ProfilMahasiswa() {
  const { nama, nim, programStudi, kampus, mataKuliah } = identitas;
  const jumlah = 2 + 3;

  return (
    <section>
      <Judul />
      <p>Selamat datang, {nama}.</p>
      <KartuProfil
        nama={nama}
        nim={nim}
        programStudi={programStudi}
        kampus={kampus}
      />
      <p>2 + 3 = {jumlah}</p>
      <Footer mataKuliah={mataKuliah} />
    </section>
  );
}
