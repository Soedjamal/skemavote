import { Delete, Filter, Printer, Trash, Upload } from "lucide-react";
import Button from "../../components/utils/Button";
import ActionBar from "../../components/utils/ActionBar";
import ButtonDropdown from "../../components/utils/ButtonDropdown";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Modal from "../../components/utils/Modal";
import { useTeacherNStaff } from "../../service/admin/useTeacherNStaff";

const AdminTeachersAndStaff = () => {
  const { users, hasMore, loadMore, deleteAllUsers } = useTeacherNStaff();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      console.log("Inview detected");
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
    <>
      <div className="px-4 md:px-10 flex-shrink-0">
        <ActionBar
          actions={[
            <Modal
              selectedLevel="ts"
              input={true}
              className="w-fit flex justify-start bg-info"
              title={`Input Data Guru & Staff`}
              desc='Upload file excel melalui input dibawah, 
                    Pastikan didalamnya telah memiliki kolom "Nama"'
              inputLabel="Upload File Excel"
              inputType="file"
              inputStyle="file-input file-input-bordered"
              inputAcc=".xlsx, .xls"
              btnTitle={`Input Guru &  Staff`}
              icon={<Upload />}
            />,

            <Button
              title="Cetak Guru/Staff"
              icon={<Printer />}
              className="btn-success"
              onClick={() => null}
            />,
            <Modal
              icon={<Trash />}
              btnTitle="Hapus Semua"
              title={`Hapus Data Guru & Staff`}
              desc="Anda yakin?,
              ini akan menghapus semua data Guru & Staff yang di Filter"
              onClick={() => deleteAllUsers("ts")}
              className="btn-error"
            />,
          ]}
        />

        <div className="mt-4">
          <div className="overflow-x-auto  overflow-y-auto max-h-[600px] md:max-h-[700px]">
            <table className="table table-zebra table-auto">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>level</th>
                  {/* <th className="text-right">Hapus Baris</th> */}
                </tr>
              </thead>
              <tbody>
                {users?.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.level}</td>
                    {/* <td className="w-fit p-2 text-right"> */}
                    {/*   <Button */}
                    {/*     className="btn-error" */}
                    {/*     title="Hapus" */}
                    {/*     onClick={() => deleteUserById(item.id)} */}
                    {/*     icon={<Delete />} */}
                    {/*   /> */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>

            {hasMore && (
              <div ref={ref} className="h-10 text-center">
                Loading...
              </div>
            )}
          </div>

          <h3
            className=" w-full border-t-neutral-200 border-[1px] 
            border-transparent pt-3 mt-5 font-bold"
          >
            Jumlah Data Guru dan Staf : {users.length}
          </h3>
          <h4 className="">Scroll untuk muat lebih banyak</h4>
        </div>
      </div>
    </>
  );
};

export default AdminTeachersAndStaff;
