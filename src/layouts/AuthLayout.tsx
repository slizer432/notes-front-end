import { Outlet } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-900 flex flex-col">
      <AuthHeader />
      <div className="flex flex-1 w-full items-center justify-center px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
