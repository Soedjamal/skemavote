import { useEffect, useRef, useState } from "react";
import { useUploadExcel } from "../../service/admin/useUploadExcel";
import { supabase } from "../../lib/supabase"; // Sesuaikan path ini
import { useUsers } from "../../service/admin/useUsers";

const Modal = ({
  title,
  desc,
  icon,
  btnTitle,
  className,
  input = false,
  inputLabel,
  inputPlaceholder,
  inputType = "text",
  inputStyle = "input input-bordered",
  inputAcc = ".xlsx, .xls",
  selectedLevel,
  submitFn,
  submitTitle = "Submit",

  onClick,
}) => {
  const modalRef = useRef(null);
  const [inputT, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [inputTyped, setInputType] = useState("");
  const [inputAccp, setInputAcc] = useState("");

  const { resetUsers } = useUsers();

  const { handleExcelUpload, uploadStatus, isUploading } = useUploadExcel();

  useEffect(() => {
    if (inputType) setInputType(inputType);
    if (inputAcc) setInputAcc(inputAcc);
  }, [inputType, inputAcc]);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    resetUsers();
    modalRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("selectedLevel:", selectedLevel);
    console.log("selectedFile:", file);

    if (inputType === "text") {
      submitFn(inputT);
      closeModal();
      setInput("");
    }
    if (inputType === "file") {
      if (!file || !selectedLevel)
        return alert("File atau level belum dipilih");
      await handleExcelUpload(file, selectedLevel, supabase);

      if (uploadStatus.success > 0) {
        closeModal();
        setFile(null);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <button className={`btn ${className}`} onClick={openModal}>
        {icon} {btnTitle}
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box md:w-1/2 flex items-start flex-col max-w-xl">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{desc}</p>
          <div className="modal-action  w-full flex gap-4 flex-col">
            <form
              onSubmit={handleSubmit}
              className="flex items-end justify-end gap-4"
            >
              {input && (
                <label>
                  {inputLabel}
                  <input
                    type={inputTyped}
                    accept={inputAccp}
                    onChange={
                      inputType === "text"
                        ? (e) => setInput(e.target.value)
                        : (e) => setFile(e.target.files[0])
                    }
                    placeholder={inputPlaceholder}
                    className={`${inputStyle} w-full mt-2`}
                    {...(inputType === "text" ? { value: inputT } : {})}
                  />
                </label>
              )}
              <button
                type="submit"
                className="btn btn-success"
                onClick={onClick}
              >
                {submitTitle}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {isUploading && <p>Sedang memproses file...</p>}

            {uploadStatus.status !== "idle" && (
              <div>
                <p>
                  <strong>Status:</strong> {uploadStatus.message}
                </p>
                <p>
                  Progress: {uploadStatus.success}/{uploadStatus.total}
                </p>

                {uploadStatus.errors.length > 0 && (
                  <div>
                    <h4>Kesalahan:</h4>
                    <ul>
                      {uploadStatus.errors.map((error, idx) => (
                        <li key={idx}>
                          {error.batch ? `Batch ${error.batch}: ` : ""}
                          {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
