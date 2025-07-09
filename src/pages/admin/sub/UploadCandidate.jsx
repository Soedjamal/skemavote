import { useNavigate } from "react-router";
import ActionBar from "../../../components/utils/ActionBar";
import { ArrowLeft } from "lucide-react";
import Button from "../../../components/utils/Button";
import { useCandidates } from "../../../service/admin/useCandidates";

const UploadCandidate = () => {
  const nv = useNavigate();
  const {
    handleSubmit,
    handleChange,
    handleThumbnailSelect,
    formData,
    loading,
  } = useCandidates();

  return (
    <>
      <div className="mt-4 md:px-10">
        <ActionBar
          actions={[
            <Button
              title=""
              icon={<ArrowLeft />}
              className=""
              onClick={() => nv("/admin/candidates")}
            />,
            <h4 className="text-xl font-semibold text-neutral-600">
              Tambahkan Kandidat Baru
            </h4>,
          ]}
        />

        <div className="flex flex-col mt-5 w-full max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-6 w-full"
          >
            <label htmlFor="nama_ketua" className="flex flex-col gap-2">
              Nama Ketua
              <input
                onChange={handleChange}
                type="text"
                name="nama_ketua"
                value={formData.nama_ketua}
                placeholder="Masukkan Nama Ketua"
                className="input input-bordered w-full "
              />
            </label>

            <label htmlFor="nama_wakil" className="flex flex-col gap-2">
              Nama Wakil Ketua
              <input
                onChange={handleChange}
                type="text"
                name="nama_wakil"
                value={formData.nama_wakil}
                placeholder="Masukkan Nama Wakil Ketua"
                className="input input-bordered w-full "
              />
            </label>

            <label htmlFor="nama_wakil" className="flex flex-col gap-2">
              Paslon Ke
              <input
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                name="paslon"
                value={formData.paslon}
                placeholder="Masukkan Nomor Urut Paslon"
                className="input input-bordered w-full "
              />
            </label>

            <label htmlFor="nama_wakil" className="flex flex-col gap-2">
              Level Paslon
              <select
                name="level"
                onChange={handleChange}
                value={formData.level}
                className="select select-bordered w-full "
              >
                <option disabled value="" defaultChecked>
                  Pilih level
                </option>
                <option value="teacher">Guru</option>
                <option value="student">Murid</option>
              </select>
            </label>

            <label htmlFor="thumbnail_url" className="flex flex-col gap-2">
              Foto Kandidat
              <input
                accept="image/*"
                onChange={handleThumbnailSelect}
                type="file"
                name="thumbnail_url"
                className="file-input file-input-bordered w-full"
              />
            </label>

            <Button
              title={loading ? "Mengirim.." : "Submit"}
              disabled={loading}
              type="submit"
              className="w-full mt-4"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadCandidate;
