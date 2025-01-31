import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center">
        {/* হেডিং */}
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
          Page Not Found
        </h2>

        {/* বার্তা */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Oops! The page you are looking for does not exist.
        </p>

        {/* হোম পেজে ফিরে যাওয়ার লিঙ্ক */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}