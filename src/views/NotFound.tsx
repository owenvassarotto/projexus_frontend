import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-yellow-400">404</h1>
        <p className="text-2xl font-semibold text-gray-900 mt-4">
          Oops! Page not found
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Sorry, we can't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-5 py-3 bg-yellow-400 text-white text-sm font-medium rounded-md shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
