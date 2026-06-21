const Login = () => {
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch("http://localhost:5164/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      // window.location.href = "/dashboard";
    }
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
    }
  }
  return (
    <div className="flex flex-1 w-full items-center justify-center px-4">
      <div className="flex flex-col rounded-sm bg-neutral-800 px-8 py-10 shadow-lg w-full max-w-sm h-auto">
        <div className="text-center text-2xl font-bold text-zinc-300">
          <h1>Welcome Back</h1>
          <p className="mt-2 text-sm font-normal text-zinc-500">
            Log in to continue
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="username"
              className="text-xs font-bold uppercase text-zinc-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
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
              type="password"
              id="password"
              name="password"
              className="border-b border-zinc-600 bg-transparent text-zinc-300 placeholder:text-zinc-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none transition-colors pb-2"
            />
            <a
              href=""
              className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors self-end"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="mt-4 cursor-pointer  rounded-md bg-indigo-600 py-6 px-4 text-xl font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Log In
          </button>
          <p className="mt-4 text-center text-sm text-zinc-300">
            New Here?{" "}
            <a
              href="register"
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
