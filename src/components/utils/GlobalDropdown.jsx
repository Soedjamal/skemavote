import { Printer, Table } from "lucide-react";

export const DropdownItem = ({ onClick, title, icon = <Table /> }) => {
  return (
    <>
      <div onClick={onClick} className="w-full flex items-center gap-2">
        {icon} {title}
      </div>
    </>
  );
};

const Dropdown = ({ title, className, btn, items, icon }) => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className={`btn ${btn} m-1`}>
          {icon} {title}
        </div>
        <ul
          tabIndex={0}
          className={`dropdown-content menu rounded-lg z-[20] w-52 
p-2 shadow-lg bg-neutral-200 border-2 border-neutral-400 ${className}`}
        >
          <li>{items}</li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
