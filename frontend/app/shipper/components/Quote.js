"use client";

export default function Quote({ loading = false }) {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade {
          border: 2px solid #4F46E5;
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fade:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.6);
          z-index: 10;
        }
        .fade div h2, .fade div p {
          transition: color 0.3s ease;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div
        className={`p-6 rounded-2xl flex items-center justify-between transform transition-transform duration-300 ease-in-out ${
          loading
            ? "animate-pulse bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 opacity-70 bg-opacity-30 backdrop-blur-md shadow-lg"
            : "fade bg-white bg-opacity-50 backdrop-blur-md shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <div className="h-10 bg-gray-300 rounded w-48"></div>
            <div className="h-6 bg-gray-300 rounded w-64"></div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold">Hello Driver! 👋</h2>
            <p className="mt-3 text-m opacity-200">
              {"Every mile you drive moves someone's world forward."}
              {" Keep up the great work — safe roads and strong journeys! 🚚✨"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
