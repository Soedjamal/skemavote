import { useEffect, useState } from "react";
import usersQueries from "../../queries/admin/users";
import { useNavigate } from "react-router";

export const useCandidates = () => {
  const [formData, setFormData] = useState({
    nama_ketua: "",
    nama_wakil: "",
    thumbnail_url: "",
    paslon: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // <-- untuk file gambar

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  const getAllCandidates = async () => {
    const result = await usersQueries.getAllCandidates();
    setUsers(result);
  };

  const deleteCandidateById = async (id) => {
    await usersQueries.deleteCandidateById(id);
    getAllCandidates();
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    try {
      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", selectedFile);
        formDataUpload.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formDataUpload,
          },
        );
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const dataToInsert = {
        nama_ketua: formData.nama_ketua.trim(),
        nama_wakil: formData.nama_wakil.trim(),
        thumbnail_url: imageUrl,
        paslon: parseInt(formData.paslon.trim()),
      };

      await usersQueries.insertCandidate(dataToInsert);
      navigate("/admin/candidates");
    } catch (error) {
      console.error("Gagal mengirim:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleThumbnailSelect,
    handleSubmit,
    setFormData,
    deleteCandidateById,
    formData,
    loading,
    users,
  };
};
