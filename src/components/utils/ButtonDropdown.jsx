import { Printer, Table } from "lucide-react";

const ButtonDropdown = ({ title, className, btn, btnIcon, itemIcon }) => {
  const handlePrintExcel = () => {};
  const handlePrintPDF = () => {};
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className={`btn ${btn} m-1`}>
          <Printer /> {title}
        </div>
        <ul
          tabIndex={0}
          className={`dropdown-content menu rounded-lg z-[20] w-52 
p-2 shadow-lg bg-neutral-200 border-2 border-neutral-400 ${className}`}
        >
          <li>
            <div onClick={handlePrintExcel}>
              <Table /> Cetak Excel
            </div>
            <div onClick={handlePrintPDF}>
              <Table /> Cetak PDF
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ButtonDropdown;
