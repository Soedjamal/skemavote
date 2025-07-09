import { useCallback, useEffect, useState } from "react";
import eventsQueries from "../../queries/admin/events";
import { useParams } from "react-router";

export const useEvents = () => {
  const [formData, setFormData] = useState({
    title: "",
    main_heading: "",
    sub_heading: "",
    description: "",
    banner: "",
    voting_start: "",
    voting_end: "",
    status: false,
  });
  const [selectedFile, setSelectedFile] = useState(null); // <-- untuk file gambar

  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);

  const { id } = useParams();

  const getAllEvents = async () => {
    const result = await eventsQueries.getAllEvents();
    setEvents(result);
  };

  const getEventById = useCallback(async () => {
    const data = await eventsQueries.getEventById(id);
    setFormData({
      title: data.title,
      main_heading: data.main_heading,
      sub_heading: data.sub_heading,
      description: data.description,
      banner: data.banner,
      voting_start: data.voting_start,
      voting_end: data.voting_end,
      status: data.status,
    });
  }, [id]);

  const deleteEventById = async (id) => {
    await eventsQueries.deleteEventById(id);
    getAllEvents();
  };

  useEffect(() => {
    getAllEvents();
  }, []);

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

      if (new Date(formData.voting_end) <= new Date(formData.voting_start)) {
        alert("Waktu selesai harus setelah waktu mulai.");
        return;
      }

      const dataToInsert = {
        title: formData.title.trim(),
        main_heading: formData.main_heading.trim(),
        sub_heading: formData.sub_heading.trim(),
        description: formData.description.trim(),
        banner: imageUrl,
        voting_start: new Date(formData.voting_start).toISOString(),
        voting_end: new Date(formData.voting_end).toISOString(),
        status: formData.status,
      };

      await eventsQueries.insertEvent(dataToInsert);
      // navigate("/admin/candidates");
    } catch (error) {
      console.error("Gagal mengirim:", error);
    } finally {
      setLoading(false);
      getAllEvents();
    }
  };

  const handleSubmitUpdate = async (e) => {
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

      if (new Date(formData.voting_end) <= new Date(formData.voting_start)) {
        alert("Waktu selesai harus setelah waktu mulai.");
        return;
      }

      const dataToInsert = {
        title: formData.title.trim(),
        main_heading: formData.main_heading.trim(),
        sub_heading: formData.sub_heading.trim(),
        description: formData.description.trim(),
        banner: imageUrl || formData.banner,
        voting_start: new Date(formData.voting_start).toISOString(),
        voting_end: new Date(formData.voting_end).toISOString(),
        status: formData.status,
      };

      await eventsQueries.updateEventById(dataToInsert, id);
      // navigate("/admin/candidates");
    } catch (error) {
      console.error("Gagal mengirim:", error);
    } finally {
      setLoading(false);
      getAllEvents();
    }
  };

  return {
    handleChange,
    handleThumbnailSelect,
    handleSubmit,
    handleSubmitUpdate,
    setFormData,
    deleteEventById,
    getEventById,
    formData,
    loading,
    events,
  };
};
