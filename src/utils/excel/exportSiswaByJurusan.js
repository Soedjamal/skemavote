import * as XLSX from "xlsx";

/**
 * Mengekspor data users ke Excel dengan pengelompokan berdasarkan jurusan
 * dan filter berdasarkan status pemilihan.
 *
 * @param {Array} users - Data users dari Supabase
 * @param {String} voteStatusFilter - "memilih" atau "belum memilih"
 * @param {String} filename - Nama file Excel yang akan diunduh
 */
export const exportGroupedByJurusanToExcel = (
  users,
  voteStatusFilter,
  filename = "data",
) => {
  // Filter berdasarkan vote_status
  const filteredUsers = users.filter(
    (user) => user.vote_status === voteStatusFilter,
  );

  const mergedData = filteredUsers;

  // Siapkan data akhir sesuai urutan kolom
  const rows = mergedData.map(({ id, name, nisn, jurusan, vote_status }) => ({
    id,
    name,
    nisn,
    jurusan,
    vote_status,
  }));

  // Buat worksheet dan workbook
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ["id", "name", "nisn", "jurusan", "vote_status"],
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Simpan file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
