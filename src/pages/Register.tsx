import { Loader, LoaderCircle } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setIsLoading(true);

    const response = await fetch("http://localhost:5164/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      setIsLoading(false);
      const login = fetch("http://localhost:5164/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const loginResponse = await login;
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/home";
      }
    }
  }

  return (
    <div className="flex flex-1 w-full items-center justify-center px-4">
      <div className="flex flex-col rounded-sm bg-neutral-800 px-8 py-10 shadow-lg w-full max-w-sm h-auto">
        <div className="text-center text-2xl font-bold text-zinc-300">
          <h1>Create an Account</h1>
          <p className="mt-2 text-sm font-normal text-zinc-500">
            Register to create your account
          </p>
        </div>
        <form
          action=""
          onSubmit={handleRegister}
          className="mt-6 flex flex-col gap-6"
        >
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
              className="border-b border-zinc-600 bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none transition-colors pb-2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase text-zinc-400"
            >
              Email
            </label>
            <input
              required
              minLength={5}
              type="email"
              id="email"
              name="email"
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
              className="border-b border-zinc-600 bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none transition-colors pb-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 cursor-pointer rounded-md bg-indigo-600 py-6 px-4 text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors justify-center flex items-center gap-2"
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
          <p className="mt-4 text-center text-sm text-zinc-300">
            Already have an account?{" "}
            <a
              href="login"
              className="text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
