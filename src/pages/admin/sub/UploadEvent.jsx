import { useNavigate } from "react-router";
import ActionBar from "../../../components/utils/ActionBar";
import { ArrowLeft } from "lucide-react";
import Button from "../../../components/utils/Button";
import { useEvents } from "../../../service/admin/useEvents";

const UploadEvent = () => {
  const nv = useNavigate();
  const {
    handleSubmit,
    handleChange,
    handleThumbnailSelect,
    formData,
    loading,
  } = useEvents();

  return (
    <>
      <div className="mt-4 md:px-10">
        <ActionBar
          actions={[
            <Button
              title=""
              icon={<ArrowLeft />}
              className=""
              onClick={() => nv("/admin/manage-events")}
            />,
            <h4 className="text-xl font-semibold text-neutral-600">
              Tambahkan Acara Baru
            </h4>,
          ]}
        />

        <div className="flex gap-10 mt-5 h-fit">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-6 max-w-1/4"
          >
            <label htmlFor="title" className="flex flex-col gap-2">
              Judul Acara
              <input
                onChange={handleChange}
                type="text"
                name="title"
                value={formData.title}
                placeholder="Masukkan Judul Acara"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label htmlFor="main_heading" className="flex flex-col gap-2">
              Judul Utama
              <input
                onChange={handleChange}
                type="text"
                name="main_heading"
                value={formData.main_heading}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label htmlFor="sub_heading" className="flex flex-col gap-2">
              Sub Judul
              <input
                onChange={handleChange}
                type="text"
                name="sub_heading"
                value={formData.sub_heading}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label htmlFor="description" className="flex flex-col gap-2">
              Deskripsi
              <input
                onChange={handleChange}
                type="text"
                name="description"
                value={formData.description}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label htmlFor="thumbnail_url" className="flex flex-col gap-2">
              Waktu Mulai
              <input
                value={formData.voting_start}
                onChange={handleChange}
                type="datetime-local"
                name="voting_start"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label htmlFor="thumbnail_url" className="flex flex-col gap-2">
              Waktu Selesai
              <input
                value={formData.voting_end}
                onChange={handleChange}
                type="datetime-local"
                name="voting_end"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label htmlFor="thumbnail_url" className="flex flex-col gap-2">
              Foto Banner
              <input
                accept="image/*"
                onChange={handleThumbnailSelect}
                type="file"
                name="thumbnail_url"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Aktifkan acara</span>
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-info"
                />
              </label>
            </div>

            <Button
              title={loading ? "Mengirim.." : "Submit"}
              disabled={loading}
              type="submit"
              className="w-full mt-4"
            />
          </form>

          {/* <div className="preview flex flex-col w-[450px] bg-neutral-300 h-[550px] rounded-xl p-5"> */}
          {/*   <div className="w-full bg-neutral-100 rounded-xl h-[100px] overflow-hidden"> */}
          {/*     <img */}
          {/*       src={} */}
          {/*       alt="" */}
          {/*       className="w-full h-full object-cover" */}
          {/*     /> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col w-full items-center mt-4"> */}
          {/*     <h2 className="text-lg font-bold"> */}
          {/*       Pemilihan Ketua dan Wakil Ketua Osis */}
          {/*     </h2> */}
          {/*     <h2 className="text-lg font-bold">SMK Negeri 5 Kendal</h2> */}
          {/*     <h4 className="font-semibold">Periode 2024/2025</h4> */}
          {/*   </div> */}
          {/**/}
          {/*   <div className="flex flex-col w-full px-10 mt-10 gap-4"> */}
          {/*     <div className="flex gap-1 flex-col"> */}
          {/*       <h4>Token</h4> */}
          {/*       <div className="w-full px-2 py-1 h-10 border-[2px] border-neutral-500 rounded-lg bg-neutral-200"> */}
          {/*         Masukkan token */}
          {/*       </div> */}
          {/*     </div> */}
          {/**/}
          {/*     <div className="w-full flex justify-center items-center font-bold text-neutral-100 h-10 rounded-lg bg-neutral-500"> */}
          {/*       Submit */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default UploadEvent;
