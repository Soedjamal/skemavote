import { Delete, Edit, Trash, Upload } from "lucide-react";
import Button from "../../components/utils/Button";
import ActionBar from "../../components/utils/ActionBar";
import { useNavigate } from "react-router";
import { useEvents } from "../../service/admin/useEvents";
import Modal from "../../components/utils/Modal";
import { formatDate } from "../../utils/formatDate";

const AdminManageEvents = () => {
  const { events, deleteEventById } = useEvents();

  const nv = useNavigate();

  return (
    <>
      <div className="px-4 md:px-10 relative">
        <ActionBar
          actions={[
            <Button
              title="Tambah Acara"
              icon={<Upload />}
              className="btn-info"
              onClick={() => nv("/admin/manage-events/upload")}
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
            {events.length < 1 ? (
              <h4 onClick={() => nv("/admin/candidates/upload")}>
                Tambahkan Acara Baru
              </h4>
            ) : (
              <table className="table table-auto z-0">
                {/* head */}
                <thead>
                  <tr>
                    <th>Nama Acara</th>
                    <th>Waktu Mulai</th>
                    <th>Waktu Selesai</th>
                    <th>Status Acara</th>
                    <th className="text-right">Kelola Event</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.title}</td>
                      <td>{formatDate(item.voting_start)}</td>
                      <td>{formatDate(item.voting_end)}</td>
                      <td>{item.status ? "Aktif" : "Tidak Aktif"}</td>

                      <td className="w-fit p-2 text-right">
                        <Button
                          className="btn-success"
                          title=""
                          icon={<Edit />}
                          onClick={() =>
                            nv(`/admin/manage-events/edit/${item.id}`)
                          }
                        />
                        <Modal
                          className="btn-error"
                          title="Hapus acara ini?"
                          desc="Anda yakin ingin menghapus acara ini?"
                          icon={<Delete />}
                          submitTitle="Ya"
                          onClick={() => deleteEventById(item.id)}
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

export default AdminManageEvents;
