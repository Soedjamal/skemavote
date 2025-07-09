import { useState, useCallback } from "react";
import * as XLSX from "xlsx";

const normalizeHeader = (header) => {
  return header
    .toString()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/gi, "")
    .trim();
};

export const useUploadExcel = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    status: "idle",
    message: "",
    total: 0,
    success: 0,
    errors: [],
  });

  const findKeyByPatterns = useCallback((headers, patterns) => {
    const normalizedHeaders = headers.map((header) => normalizeHeader(header));

    for (const pattern of patterns) {
      const normalizedPattern = normalizeHeader(pattern);
      const index = normalizedHeaders.findIndex((h) =>
        h.includes(normalizedPattern),
      );

      if (index !== -1) {
        return headers[index];
      }
    }

    return null;
  }, []);

  const handleExcelUpload = useCallback(async (file, level, supabaseClient) => {
    setIsUploading(true);
    setUploadStatus({
      status: "processing",
      message: "Memulai proses upload...",
      total: 0,
      success: 0,
      errors: [],
    });

    try {
      // Validasi level
      const validLevels = ["ts", "x", "xi", "xii"];
      if (!validLevels.includes(level)) {
        throw new Error("Level tidak valid. Gunakan ts, x, xi, atau xii.");
      }

      // Baca file Excel
      const data = await readExcelFile(file);
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      // Konversi ke array 2D
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      if (jsonData.length < 2) {
        throw new Error("File Excel tidak memiliki data");
      }

      // Cari baris header (scan 5 baris pertama)
      let headerRowIndex = 0;
      const headerPatterns =
        level === "ts" ? ["nama"] : ["nisn", "nama", "jurusan"];

      for (let i = 0; i < Math.min(10, jsonData.length); i++) {
        const row = jsonData[i].map((cell) =>
          cell ? normalizeHeader(cell.toString()) : "",
        );
        const isHeaderRow = headerPatterns.some((pattern) =>
          row.some((cell) => cell.includes(pattern)),
        );

        if (isHeaderRow) {
          headerRowIndex = i;
          break;
        }
      }

      const headers = jsonData[headerRowIndex].map((h) =>
        h ? h.toString() : "",
      );
      const rows = jsonData
        .slice(headerRowIndex + 1)
        .filter((row) => row.length > 0);

      // Proses data sesuai level
      let processedData;
      if (level === "ts") {
        processedData = processTsData(headers, rows);
      } else {
        processedData = processClassData(headers, rows, level);
      }

      if (processedData.length === 0) {
        throw new Error("Tidak ada data yang valid untuk diupload");
      }

      // Upload ke Supabase per batch
      const batchSize = 100;
      const results = await uploadToSupabase(
        processedData,
        supabaseClient,
        batchSize,
      );

      // Update status akhir
      setUploadStatus({
        status: results.errors.length > 0 ? "partial" : "success",
        message: `Upload selesai: ${results.success} berhasil, ${results.errors.length} gagal`,
        total: processedData.length,
        success: results.success,
        errors: results.errors,
      });
    } catch (error) {
      setUploadStatus({
        status: "error",
        message: error.message,
        total: 0,
        success: 0,
        errors: [],
      });
    } finally {
      setIsUploading(false);
    }
  }, []);

  // Fungsi pembantu
  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };

  const processTsData = (headers, rows) => {
    const nameKey = findKeyByPatterns(headers, [
      "nama",
      "name",
      "nama siswa",
      "nama lengkap",
    ]);

    if (!nameKey) {
      setUploadStatus((prev) => ({
        ...prev,
        errors: [`Header 'nama' tidak ditemukan dalam file Excel`],
      }));
      return [];
    }

    const nameIndex = headers.indexOf(nameKey);

    return rows
      .map((row) => {
        if (nameIndex >= row.length) return null;
        const nama = row[nameIndex];
        return nama
          ? {
              nisn: null,
              name: nama.toString().trim(),
              level: "ts",
              jurusan: null,
            }
          : null;
      })
      .filter((item) => item !== null);
  };

  const processClassData = (headers, rows, level) => {
    const nisnKey = findKeyByPatterns(headers, [
      "nisn",
      "nis",
      "nomor induk",
      "id siswa",
    ]);

    const nameKey = findKeyByPatterns(headers, [
      "nama",
      "name",
      "nama siswa",
      "nama lengkap",
    ]);

    const jurusanKey = findKeyByPatterns(headers, [
      "jurusan",
      "kompetensi",
      "bidang",
      "program keahlian",
      "kelas",
    ]);

    // Validasi header penting
    if (!nisnKey || !nameKey) {
      const errors = [];
      if (!nisnKey) errors.push("Header 'nisn' tidak ditemukan");
      if (!nameKey) errors.push("Header 'nama' tidak ditemukan");

      setUploadStatus((prev) => ({
        ...prev,
        errors: [...prev.errors, ...errors],
      }));

      return [];
    }

    const nisnIndex = headers.indexOf(nisnKey);
    const nameIndex = headers.indexOf(nameKey);
    const jurusanIndex = jurusanKey ? headers.indexOf(jurusanKey) : -1;

    // Regex untuk deteksi level di jurusan
    const levelPatterns = {
      x: /(\b|_)x(\b|_)|(\b|_)10\b|kelas\s*x|tingkat\s*x/i,
      xi: /(\b|_)xi(\b|_)|(\b|_)11\b|kelas\s*xi|tingkat\s*xi/i,
      xii: /(\b|_)xii(\b|_)|(\b|_)12\b|kelas\s*xii|tingkat\s*xii/i,
    };

    const pattern = levelPatterns[level];
    if (!pattern) return [];

    return rows
      .map((row) => {
        // Validasi panjang row
        if (nisnIndex >= row.length || nameIndex >= row.length) return null;

        const nisn = row[nisnIndex];
        const nama = row[nameIndex];
        const jurusan =
          jurusanIndex !== -1 && jurusanIndex < row.length
            ? row[jurusanIndex]
            : null;

        // Validasi data wajib
        if (!nisn || !nama) return null;

        // Konversi ke string untuk pengecekan
        const jurusanStr = jurusan ? jurusan.toString() : "";

        // Pastikan jurusan mengandung level yang sesuai
        if (!pattern.test(jurusanStr)) return null;

        return {
          nisn: nisn.toString().trim(),
          name: nama.toString().trim(),
          level,
          jurusan: jurusanStr.trim() || "Umum",
        };
      })
      .filter((item) => item !== null);
  };

  const uploadToSupabase = async (data, supabaseClient, batchSize) => {
    const results = {
      success: 0,
      errors: [],
    };

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      try {
        const { error } = await supabaseClient
          .from("users")
          .insert(batch, { returning: "minimal" });

        if (error) throw error;

        results.success += batch.length;
      } catch (error) {
        results.errors.push({
          batch: Math.floor(i / batchSize) + 1,
          message: error.message,
        });
      }

      // Update progress
      setUploadStatus((prev) => ({
        ...prev,
        success: results.success,
        message: `Mengupload data ${Math.min(i + batchSize, data.length)}/${data.length}`,
      }));
    }

    return results;
  };

  return {
    handleExcelUpload,
    isUploading,
    uploadStatus,
  };
};
