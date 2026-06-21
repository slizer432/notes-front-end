import { Notebook } from "lucide-react";

const AuthHeader = () => {
  return (
    <nav className="bg-transparent">
      <div className="px-8 py-4">
        <h1 className="text-2xl font-bold text-zinc-300 flex items-center gap-2">
          <Notebook />
          Notes App
        </h1>
      </div>
    </nav>
  );
};

export default AuthHeader;
