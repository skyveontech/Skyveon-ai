import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-4 text-slate-500">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}