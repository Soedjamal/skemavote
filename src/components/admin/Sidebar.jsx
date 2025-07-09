import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import SidebarItems from "./SidebarItems";
// import LogoutButton from "../../auth/Logout";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      {sidebar ? (
        <div
          onClick={() => setSidebar(!sidebar)}
          className="bg-neutral-800 opacity-50 w-full z-20 fixed md:hidden h-screen top-0 left-0 flex "
        ></div>
      ) : null}

      {sidebar ? (
        <>
          <div
            className="fixed md:hidden px-5 py-6 w-2/3 md:w-1/4 left-0 top-0 z-30
            bg-cyan-800 text-neutral-50 h-screen flex flex-col"
          >
            <div className="flex items-center w-full mb-6 justify-between h-fit">
              <div className="flex">
                <h2 className="text-xl font-[700] text-cyan-500 font-pS2p">
                  skema
                </h2>
                <h2 className="text-xl font-[700] text-neutral-200 font-pS2p">
                  vote
                </h2>
              </div>

              <X className="md:hidden" onClick={() => setSidebar(!sidebar)} />
            </div>
            <div className="flex flex-col gap-2">
              <SidebarItems onClick={() => setSidebar(!sidebar)} />
            </div>{" "}
            <div className="absolute bottom-20 left-10">
              {/* <LogoutButton /> */}
            </div>
          </div>
          {/* <div className="w-2/3 fixed left-0 bottom-0 h-[200px] bg-secondary-700 flex"></div> */}
        </>
      ) : null}

      <div
        className="hidden md:relative px-5 py-6 w-2/3 md:w-1/4 left-0 top-0 z-30
            bg-cyan-800 text-neutral-50 min-h-screen md:flex flex-col"
      >
        <div className="flex items-center w-full mb-6 justify-between h-fit">
          <div className="flex">
            <h2 className="text-xl font-[700] text-cyan-500 font-pS2p">
              skema
            </h2>
            <h2 className="text-xl font-[700] text-neutral-200 font-pS2p">
              vote
            </h2>
          </div>

          <X className="md:hidden" onClick={() => setSidebar(!sidebar)} />
        </div>

        <div className="flex flex-col gap-2">
          <SidebarItems onClick={() => setSidebar(!sidebar)} />
        </div>
        <div className="absolute bottom-0 left-0">{/* <LogoutButton /> */}</div>
      </div>

      <div className="bg-neutral-50 shadow-md fixed md:hidden top-0 w-full z-10">
        <nav
          className="container mx-auto flex items-center
        py-4 px-4 justify-between md:px-0"
        >
          <div className="nav-logo flex gap-2 items-center">
            <AlignJustify
              onClick={() => setSidebar(!sidebar)}
              size={24}
              className="flex md:hidden"
            />
            <div className="flex md:hidden">
              <h2 className="text-lg font-[700] text-cyan-600 font-pS2p">
                skema
              </h2>
              <h2 className="text-lg font-[700] text-neutral-600 font-pS2p">
                vote
              </h2>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
