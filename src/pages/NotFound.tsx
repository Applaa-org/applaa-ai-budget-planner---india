import { useRouter } from '@tanstack/react-router';
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.state.location.pathname,
    );
  }, [router.state.location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-teal-50 to-orange-100">
      <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-orange-200">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🗺️</span>
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">The destination you're looking for doesn't exist.</p>
        <button 
          onClick={() => router.navigate({ to: '/' })}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;