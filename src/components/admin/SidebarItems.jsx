import {
  BookOpenCheck,
  Box,
  Calendar,
  GraduationCap,
  Home,
  School,
  UserCheck,
  UserCog,
  Users,
  UserSearchIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

const sidebarItems = [
  {
    label: "Dasboard",
    href: "/admin/dashboard",
    icon: <Home />,
  },
  {
    label: "Kelola Acara",
    href: "/admin/manage-events",
    icon: <Calendar />,
  },
  {
    label: "Kandidat",
    href: "/admin/candidates",
    icon: <UserCheck />,
  },
  {
    label: "Peserta",
    href: "/admin/voters",
    icon: <Users />,
  },
  {
    label: "Guru & Staff",
    href: "/admin/teacher-and-staff",
    icon: <BookOpenCheck />,
  },
  {
    label: "Siswa",
    href: "/admin/students",
    icon: <GraduationCap />,
  },
];

const SidebarItems = ({ onClick }) => {
  const { pathname } = useLocation();

  return (
    <>
      {sidebarItems.map((item, i) => (
        <li
          onClick={onClick}
          key={i}
          className={`list-none  ${
            pathname === item.href
              ? `bg-cyan-700 md:bg-cyan-700 
                 md:border-b-cyan-700 md:rounded-lg`
              : null
          }
            w-full p-1 hover:sm:bg-cyan-700 hover:md:border-b-cyan-700 
            flex gap-3 rounded-lg`}
        >
          <div className="flex">{item.icon}</div>
          <Link className="font-pxSans " to={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default SidebarItems;
