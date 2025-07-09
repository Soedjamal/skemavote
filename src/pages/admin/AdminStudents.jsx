import { Delete, Filter, Printer, Table, Trash, Upload } from "lucide-react";
import ActionBar from "../../components/utils/ActionBar";
import ButtonDropdown from "../../components/utils/ButtonDropdown";
import Dropdown, { DropdownItem } from "../../components/utils/GlobalDropdown";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Modal from "../../components/utils/Modal";
import { useStudents } from "../../service/admin/useStudents";
import Button from "../../components/utils/Button";
import { exportGroupedByJurusanToExcel } from "../../utils/excel/exportSiswaByJurusan";

const AdminStudents = () => {
  const { users, hasMore, filter, setFilter, loadMore, deleteAllUsers } =
    useStudents();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
    <>
      <div className="px-4 md:px-10">
        <ActionBar
          filterAct={
            <Dropdown
              icon={<Filter />}
              title="Filter"
              items={
                <>
                  <DropdownItem
                    title="Kelas X"
                    onClick={() => setFilter("x")}
                  />
                  <DropdownItem
                    title="Kelas XI"
                    onClick={() => setFilter("xi")}
                  />
                  <DropdownItem
                    title="Kelas XII"
                    onClick={() => setFilter("xii")}
                  />
                </>
              }
            />
          }
          actions={[
            <Modal
              selectedLevel={filter}
              input={true}
              className="btn-info"
              title={`Input Data Siswa Kelas ${filter.toUpperCase()}`}
              desc="Upload file excel melalui input dibawah, 
                    Pastikan didalamnya telah memiliki kolom NISN, Nama Siswa, dan JURUSAN"
              inputLabel="Upload File Excel"
              inputType="file"
              inputStyle="file-input file-input-bordered"
              inputAcc=".xlsx, .xls"
              btnTitle={`Input Siswa Kelas ${filter.toUpperCase()}`}
              icon={<Upload />}
            />,
            <Button
              icon={<Printer />}
              className="btn-success"
              title={`Cetak Siswa Kelas ${filter.toUpperCase()}`}
              onClick={() =>
                exportGroupedByJurusanToExcel(
                  users,
                  false,
                  `Data-Siswa-Kelas-${filter.toUpperCase()}`,
                )
              }
            />,
            <Modal
              icon={<Trash />}
              btnTitle="Hapus Semua"
              title={`Hapus Data Kelas ${filter.toUpperCase()}`}
              desc="Anda yakin?,
              ini akan menghapus semua data bardasarkan kelas yang d Filter"
              onClick={() => deleteAllUsers(filter)}
              className="btn-error"
            />,
          ]}
        />

        <div className="mt-4">
          <div className="overflow-x-auto  overflow-y-auto max-h-[600px] md:max-h-[600px]">
            <table className="table table-zebra table-auto">
              {/* head */}
              <thead>
                <tr>
                  <th>NISN</th>
                  <th>Nama</th>
                  <th>Jurusan</th>
                  {/* <th className="text-right">Hapus Baris</th> */}
                </tr>
              </thead>
              <tbody>
                {users?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.nisn}</td>
                    <td>{item.name}</td>
                    <td>{item.jurusan}</td>
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
            Jumlah Data{" "}
            {filter === "x"
              ? "Siswa Kelas X"
              : filter === "xi"
                ? "Siswa Kelas XI"
                : filter === "xii"
                  ? "Siswa Kelas XII"
                  : "Guru dan Staf"}{" "}
            : {users.length}
          </h3>
          <h4 className="">Scroll untuk muat lebih banyak</h4>
        </div>
      </div>
    </>
  );
};

export default AdminStudents;
