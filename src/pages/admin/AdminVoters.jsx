import { Delete, Filter, Lock, Printer, Trash } from "lucide-react";
import Button from "../../components/utils/Button";
import ActionBar from "../../components/utils/ActionBar";
import ButtonDropdown from "../../components/utils/ButtonDropdown";
import Modal from "../../components/utils/Modal";
import { useUsers } from "../../service/admin/useUsers";
import Dropdown, { DropdownItem } from "../../components/utils/GlobalDropdown";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { generateCardsPdf } from "../../utils/pdf/printTokenCardPDF";

const AdminVoters = () => {
  const {
    users,
    deleteAllUsers,
    setFilter,
    generateTokenByLevel,
    hasMore,
    filter,
    loadMore,
    getAbsoluteAllUserByLevel,
    usersAll,
  } = useUsers();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
    <>
      <div className="px-4 md:px-10 relative">
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
                  <DropdownItem
                    title="Guru & Staff"
                    onClick={() => setFilter("ts")}
                  />
                </>
              }
            />
          }
          actions={[
            <Modal
              btnTitle="Buat Token"
              desc="Anda yakin ingin membuat token untuk semua peserta?,
              Ini akan mengganti token sebelumnya"
              title="Buat Token"
              icon={<Lock />}
              className="btn-info"
              input={true}
              // onClick={() => alert("njing")}
              submitFn={(value) => {
                generateTokenByLevel(value.trim().toLowerCase());
              }}
              inputLabel="Masukkan Level"
              inputPlaceholder="Contoh : x, xi, xii, atau ts"
            />,
            <Button
              title="Cetak Kartu"
              icon={<Printer />}
              className="btn-success"
              onClick={() =>
                generateCardsPdf(
                  users,
                  filter === "x"
                    ? "Token-Kelas-X"
                    : filter === "xi"
                      ? "Token-Kelas-XI"
                      : filter === "xii"
                        ? "Token-Kelas-XII"
                        : "Token-Guru-Dan-Staf",
                )
              }
            />,
            <Button
              icon={<Trash />}
              onClick={() => deleteAllUsers()}
              title="Hapus Semua"
              className="btn-error"
            />,
          ]}
        />

        <div className="mt-4">
          <div className="overflow-x-auto  overflow-y-auto max-h-[600px] md:max-h-[700px]">
            <table className="table table-auto z-0">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Token</th>
                  {/* <th className="text-right">Hapus Baris</th> */}
                </tr>
              </thead>
              <tbody>
                {users?.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.level}</td>
                    <td>{item.token}</td>
                    {/* <td className="w-fit p-2 text-right"> */}
                    {/*   <Button */}
                    {/*     className="btn-error" */}
                    {/*     title="Hapus" */}
                    {/*     icon={<Delete />} */}
                    {/*     onClick={() => deleteUserById(item.id)} */}
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

export default AdminVoters;
