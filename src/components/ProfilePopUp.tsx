import { DoorOpen } from "lucide-react";

const ProfilePopUp = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex gap-2 items-center cursor-pointer hover:bg-neutral-700 transition-colors p-4 rounded-md"
    >
      <DoorOpen />
      <p>Log Out</p>
    </button>
  );
};

export default ProfilePopUp;
