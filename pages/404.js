import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Page Not Found</h2>
      <p className="mb-6 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Go Home</Link>
    </div>
  );
}
