import { SideNavRoutes } from "@/utilities";
import Link from "next/link";

const AsideNav = () => {
  return (
    <nav className="text-center mt-10">
      <ul className="flex flex-col gap-5">
        {SideNavRoutes.map((route) => (
          <li key={route.title}>
            <Link
              className="hover:bg-gray-200 md:px-10 px-5 py-2 transition-all"
              href={route.href}
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AsideNav;
