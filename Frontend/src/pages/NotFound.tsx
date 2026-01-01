export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16">
      <h1 className="text-5xl font-bold text-emerald-400 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-emerald-400 text-white rounded shadow hover:bg-emerald-500 transition font-medium"
      >
        Go Home
      </a>
    </div>
  );
}