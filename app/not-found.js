'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 underline hover:text-blue-800">
        Go back home
      </Link>
    </div>
  );
}
