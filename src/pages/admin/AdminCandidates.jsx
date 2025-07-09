import { Delete, Filter, Lock, Printer, Trash, Upload } from "lucide-react";
import Button from "../../components/utils/Button";
import ActionBar from "../../components/utils/ActionBar";
import { useCandidates } from "../../service/admin/useCandidates";
import { useNavigate } from "react-router";
import Modal from "../../components/utils/Modal";

const AdminCandidates = () => {
  const { users, deleteCandidateById } = useCandidates();

  const nv = useNavigate();

  return (
    <>
      <div className="px-4 md:px-10 relative">
        <ActionBar
          actions={[
            <Button
              title="Tambah Kandidat"
              icon={<Upload />}
              className="btn-info"
              onClick={() => nv("/admin/candidates/upload")}
            />,
            <Button
              title="Cetak Kandidat"
              icon={<Printer />}
              className="btn-success"
              onClick={() => null}
            />,
            <Button
              icon={<Trash />}
              onClick={() => null}
              title="Hapus Semua"
              className="btn-error"
            />,
          ]}
        />

        <div className="mt-4">
          <div className="overflow-x-auto  overflow-y-auto max-h-[600px] md:max-h-[700px]">
            {users.length < 1 ? (
              <h4 onClick={() => nv("/admin/candidates/upload")}>
                Tambahkan Kandidat Baru
              </h4>
            ) : (
              <table className="table table-auto z-0">
                {/* head */}
                <thead>
                  <tr>
                    <th>Paslon No</th>
                    <th>Ketua</th>
                    <th>Wakil</th>
                    <th>Total Pemilih</th>
                    <th>Level</th>
                    <th>Foto Paslon</th>
                    <th>Hapus Kandidat</th>
                    {/* <th className="text-right">Hapus Baris</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.paslon}</td>
                      <td>{item.nama_ketua}</td>
                      <td>{item.nama_wakil}</td>
                      <td>{item.total_vote}</td>
                      <td>{item.level === "teacher" ? "Guru" : "Murid"}</td>
                      <td>
                        <div className="flex w-24 h-24 overflow-hidden items-start">
                          <img
                            className="w-full object-contain"
                            src={item.thumbnail_url}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="w-fit p-2 text-right">
                        <Modal
                          className="btn-error"
                          title="Hapus acara ini?"
                          desc="Anda yakin ingin menghapus acara ini?"
                          icon={<Delete />}
                          submitTitle="Ya"
                          onClick={() => deleteCandidateById(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCandidates;
