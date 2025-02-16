'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirecting to /login after the component is mounted
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold text-blue-600">
          Redirecting to Login...
        </h2>
      </div>
    </div>
  );
};

export default Page;
