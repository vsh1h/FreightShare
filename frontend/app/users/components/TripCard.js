export default function TripCard({ route, status, date, loading = false }) {
    const color =
      status === "Completed"
        ? "bg-green-100 text-green-800"
        : status === "In Transit"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";
  
    return (
      <div
        className={`rounded-xl p-4 flex justify-between items-center ${
          loading
            ? "animate-pulse bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 opacity-70 rounded-xl"
            : "bg-white bg-opacity-50 backdrop-blur-md shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </>
        ) : (
          <>
            <div>
              <h4 className="text-lg font-medium">{route}</h4>
              <p className="text-gray-500 text-sm">{date}</p>
            </div>
  
            <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${color}`}>
              {status}
            </span>
          </>
        )}
      </div>
    );
  }
    