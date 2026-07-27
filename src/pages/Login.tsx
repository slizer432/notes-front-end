import { Loader, AlertCircle } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../helper/authApi";
import { getErrorMessage } from "../helper/errorUtils";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/home";
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-1 w-full items-center justify-center px-4">
      <div className="flex flex-col rounded-md bg-neutral-800 p-8 shadow-lg w-full max-w-sm h-auto border border-zinc-700/60">
        <div className="text-center text-2xl font-bold text-zinc-300">
          <h1>Welcome Back</h1>
          <p className="mt-2 text-sm font-normal text-zinc-500">
            Log in to continue
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-lg flex items-start gap-2.5 text-xs text-red-200 animate-fadeIn">
            <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="username"
              className="text-xs font-bold uppercase text-zinc-400"
            >
              Username
            </label>
            <input
              required
              minLength={5}
              type="text"
              id="username"
              name="username"
              onChange={() => error && setError(null)}
              className="border-b border-zinc-600 bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none transition-colors pb-2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase text-zinc-400"
            >
              Password
            </label>
            <input
              required
              minLength={5}
              type="password"
              id="password"
              name="password"
              onChange={() => error && setError(null)}
              className="border-b border-zinc-600 bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none transition-colors pb-2"
            />
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors self-end"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 cursor-pointer rounded-md bg-indigo-600 py-3.5 px-4 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="size-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
          <p className="mt-4 text-center text-sm text-zinc-300">
            New Here?{" "}
            <a
              href="/register"
              className="text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

