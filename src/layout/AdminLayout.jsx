import React from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "../components/admin/Sidebar";
import toPascalCase from "../utils/toPascalCase.js";
import LogoutButton from "../utils/auth/LogoutBtn.jsx";

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="md:hidden">
        <Sidebar />
        <div className="pt-20 px-4">{children}</div>
      </div>

      <div className="hidden md:flex min-w-screen min-h-screen overflow-hidden">
        <Sidebar />
        <div
          className="
          w-screen min-h-screen relative overflow-x-auto "
        >
          <div className="flex justify-between items-center absolute top-0 left-0 w-full p-4 shadow-lg bg-neutral-50">
            <h2 className="font-semibold text-lg text-neutral-800">
              {toPascalCase(pathname.slice(7))}
            </h2>
            <div className="flex items-center gap-4">
              <LogoutButton />
            </div>
          </div>

          <div className="mt-24 overflow-y-auto md:max-h-[80vh] relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
