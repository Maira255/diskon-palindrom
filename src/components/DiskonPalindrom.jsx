
import { useState } from 'react';

function DiskonPalindrom() {
const [harga, setHarga] = useState('');
const [nama, setNama] = useState('');
const [hasil, setHasil] = useState(null);

const cekDanHitung = () => {
    const hargaBeli = parseFloat(harga);
    const namaBersih = nama.trim();

    if (
    harga === '' ||
    !Number.isFinite(hargaBeli) ||
    hargaBeli <= 0 ||
    !namaBersih
    ) {
    alert('Masukkan harga dan nama pelanggan yang valid!');
    return;
    }

    // Mengabaikan spasi dan huruf besar/kecil
    const namaNormal = namaBersih
    .toLowerCase()
    .replace(/\s/g, '');

    // Mengecek apakah nama merupakan palindrom
    const namaTerbalik = namaNormal
    .split('')
    .reverse()
    .join('');

    const isPalindrom =
    namaNormal.length >= 3 &&
    namaNormal === namaTerbalik;

    // Menghitung karakter unik
    const karakterUnik = new Set(namaNormal);
    const jumlahKarakterUnik = karakterUnik.size;

    let diskon;

    if (isPalindrom) {
    diskon = 25;
    } else {
    diskon = jumlahKarakterUnik;
    }

    const potongan = hargaBeli * diskon / 100;
    const hargaAkhir = hargaBeli - potongan;

    setHasil({
    status: isPalindrom ? 'Palindrom' : 'Bukan Palindrom',
    jumlahKarakterUnik,
    diskon,
    potongan,
    hargaAkhir
    });
};

const rupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
    }).format(angka);

return (
    <div>
    <h2>Program Diskon Palindrom Nama</h2>

    <div>
        <label>Total Harga Pembelian</label>
        <input
        type="number"
        min="1"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        placeholder="Masukkan total harga"
        />
    </div>

    <div>
        <label>Nama Pelanggan</label>
        <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Masukkan nama pelanggan"
        />
    </div>

    <button onClick={cekDanHitung}>Cek & Hitung</button>

    {hasil && (
        <div>
        <h3>Hasil Perhitungan</h3>
        <p>Status Nama: {hasil.status}</p>
        <p>
            Jumlah Karakter Unik: {hasil.jumlahKarakterUnik}
        </p>
        <p>Persentase Diskon: {hasil.diskon}%</p>
        <p>Total Potongan Harga: {rupiah(hasil.potongan)}</p>
        <p>Harga Setelah Diskon: {rupiah(hasil.hargaAkhir)}</p>
        </div>
    )}
    </div>
);
}

export default DiskonPalindrom;
