import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <main className="flex">
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;
