'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Logout: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Timer for redirecting to login page
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      router.push('/login');
    }

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [countdown, router]);

  const handleManualRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* Fade out animation */}
      <h1 className="text-xl font-bold text-gray-800 animate-fadeOut">
        You are being logged out
      </h1>
      <p className="text-lg text-gray-600">Redirecting in {countdown} seconds...</p>
      <button
        onClick={handleManualRedirect}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-400 transition duration-300"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Logout;
