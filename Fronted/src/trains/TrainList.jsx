import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../login/AuthContext";

export default function TrainList() {
  const { state } = useLocation();
  const [results, setResults] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    SL: false,
    "2S": false,
    "3A": false,
    "2A": false,
    "1A": false,
  });

  useEffect(() => {
    if (!state) return;

    const fetchData = async () => {
      try {
        const trainsRes = await axios.get("http://localhost:5000/data/MergedTrains");
        const priceRes = await axios.get("http://localhost:5000/data/ClassesWithPrice.json");

        const allStations = trainsRes.data;
        const allTrains = allStations.flatMap((st) => st.trains);
        const priceData = priceRes.data;

        const filtered = allTrains.filter(
          (train) => train.FromStnCode === state.from && train.ToStnCode === state.to
        );

        const updated = filtered.map((train) => {
          const priceInfo = priceData.find(
            (p) => Number(p["Train No"]) === Number(train["Train No"])
          );

          const classes = {
            SL: { Available: null, showSeats: false },
            "2S": { Available: null, showSeats: false },
            "3A": { Available: null, showSeats: false },
            "2A": { Available: null, showSeats: false },
            "1A": { Available: null, showSeats: false },
          };

          const prices = {};
          if (priceInfo && priceInfo.Classes) {
            for (const [cls, info] of Object.entries(priceInfo.Classes)) {
              prices[cls] = info.Price;
            }
          }

          return {
            ...train,
            selectedClass: null,
            Classes: classes,
            Price: prices,
          };
        });

        setResults(updated);
      } catch (err) {
        console.error("❌ Error fetching trains:", err);
      }
    };

    fetchData();
  }, [state]);

  const handleRefreshAll = (trainIdx) => {
    setResults((prev) =>
      prev.map((train, idx) => {
        if (idx !== trainIdx) return train;
        const newClasses = {};
        for (const [cls] of Object.entries(train.Classes)) {
          const randomSeats = Math.floor(Math.random() * 120) - 10;
          newClasses[cls] = {
            Available: randomSeats,
            showSeats: true,
          };
        }
        return { ...train, Classes: newClasses };
      })
    );
  };

  const handleClassSelect = (trainIdx, cls) => {
    setResults((prev) =>
      prev.map((train, idx) =>
        idx === trainIdx ? { ...train, selectedClass: cls } : train
      )
    );
  };

  const handleBookNow = (train) => {
    if (!user) {
      navigate("/loginform", { state: { train } });
      return;
    }
    navigate("/passengerform", { state: { train } });
  };

  const handleFilterChange = (cls) => {
    setFilters((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  const applyFilters = (trains) => {
    const activeFilters = Object.keys(filters).filter((f) => filters[f]);
    if (activeFilters.length === 0) return trains;
    return trains.filter((train) =>
      activeFilters.some((f) => train.Classes[f])
    );
  };

  if (!state) {
    return <p className="text-center mt-10">⚠️ No search data found.</p>;
  }

  const filteredTrains = applyFilters(results);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 px-3 sm:px-6 py-6">
      {/* ✅ LEFT FILTER PANEL */}
      <div className="lg:w-1/4 w-full bg-white border shadow rounded-xl p-6 h-fit">
        <h3 className="font-bold text-lg mb-3 border-b pb-2">Journey Summary</h3>
        <p><strong>From:</strong> {state?.from}</p>
        <p><strong>To:</strong> {state?.to}</p>
        <p><strong>Date:</strong> {state?.date}</p>
        <p><strong>Passengers:</strong> 1 Adult</p>

        <hr className="my-3" />

        <h4 className="font-semibold text-gray-700 mb-2">Filter by Class</h4>
        {Object.keys(filters).map((cls) => (
          <label key={cls} className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={filters[cls]}
              onChange={() => handleFilterChange(cls)}
            />
            {cls}
          </label>
        ))}

        <button
          onClick={() =>
            setFilters({ SL: false, "2S": false, "3A": false, "2A": false, "1A": false })
          }
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      {/* ✅ TRAIN LIST */}
      <div className="lg:w-3/4 w-full space-y-6">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train, i) => (
            <div
              key={i}
              className="p-6 border rounded-2xl shadow bg-white hover:shadow-lg transition-all w-full"
            >
              {/* 🚆 Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  🚆 {train["Train Name"]} ({train["Train No"]})
                </h2>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Train Schedule
                </a>
              </div>

              {/* 🕒 Route Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-3 mb-3 text-center sm:text-left gap-4">
                <div>
                  <p className="text-2xl font-bold">{train.Departure || "22:30"}</p>
                  <p className="font-semibold">
                    {train.From} ({train.FromStnCode})
                  </p>
                  <p className="text-sm text-gray-500">{state.date}</p>
                </div>

                <div className="text-gray-600 text-sm">
                  <p>──── {train.Duration || "09:10"} ────</p>
                </div>

                <div>
                  <p className="text-2xl font-bold">{train.Arrival || "07:40"}</p>
                  <p className="font-semibold">
                    {train.To} ({train.ToStnCode})
                  </p>
                </div>
              </div>

              {/* 💺 Classes */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 mt-3">
                {Object.entries(train.Classes).map(([cls, info], idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      info.showSeats ? handleClassSelect(i, cls) : null
                    }
                    className={`border rounded-lg h-16 sm:h-20 flex flex-col justify-center items-center text-center cursor-pointer transition-all ${
                      train.selectedClass === cls
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold">{cls}</p>
                    {train.Price[cls] && (
                      <p className="text-green-400 fw-large text-xs sm:text-sm ">
                        {/* ₹{train.Price[cls]} */}
                      </p>
                    )}
                    {info.showSeats ? (
                      <p
                        className={`text-xs ${
                          info.Available > 0
                            ? "text-green-300 font-bold"
                            : "text-red-300 font-bold"
                        }`}
                      >
                        {info.Available > 0
                          ? `${info.Available} seats`
                          : `WL${Math.abs(info.Available) || 1}`}
                      </p>
                    ) : (
                      <button
                        className="mt-1 text-[11px] text-blue-600 border border-blue-400 px-2 py-1 rounded-md hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRefreshAll(i);
                        }}
                      >
                        Refresh
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* 🎟️ Book Now + Price */}
              <div className="flex flex-wrap items-center gap-3 mt-5 justify-between">
                <button
                  disabled={!train.selectedClass}
                  onClick={() => handleBookNow(train)}
                  className={`px-6 py-2 rounded-md font-semibold text-white text-sm sm:text-base ${
                    train.selectedClass
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Book Now
                </button>

                {train.selectedClass && train.Price[train.selectedClass] && (
                  <span className="text-base sm:text-lg font-semibold text-gray-800">
                    ₹{train.Price[train.selectedClass]}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No trains found for this route.
          </p>
        )}
      </div>
    </div>
  );
}
