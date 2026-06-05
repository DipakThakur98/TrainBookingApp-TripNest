import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrain, FaTimes, FaMapMarkerAlt, FaCircle } from "react-icons/fa";

export default function TrainScheduleModal({ train, onClose }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!train) return;
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5000/data/train-schedule/${train["Train No"]}`)
      .then((res) => setSchedule(res.data))
      .catch(() => setError("Could not load schedule."))
      .finally(() => setLoading(false));
  }, [train]);

  if (!train) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 dark:border-slate-700">

        {/* Header */}
        <div className="bg-[#213d77] dark:bg-slate-800 px-6 py-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-white mb-1">
              <FaTrain className="text-orange-400 text-lg" />
              <span className="font-bold text-lg uppercase tracking-wide">
                {train["Train Name"]}
              </span>
            </div>
            <span className="text-blue-200 text-sm font-medium">
              Train No: {train["Train No"]} &nbsp;|&nbsp; {train.From} → {train.To}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white mt-1 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Stop count badge */}
        {schedule && (
          <div className="bg-orange-50 dark:bg-slate-800 border-b border-orange-100 dark:border-slate-700 px-6 py-2.5 flex items-center gap-2">
            <FaMapMarkerAlt className="text-orange-500 text-sm" />
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
              {schedule.totalStops} Stations &nbsp;·&nbsp;
              <span className="text-orange-500">{train.From}</span>
              {" → "}
              <span className="text-orange-500">{train.To}</span>
            </span>
          </div>
        )}

        {/* Body — stops list */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-10 w-10 rounded-full border-t-4 border-b-4 border-blue-600" />
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 mt-10">{error}</p>
          )}

          {schedule && schedule.stops.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 mt-10">
              No stop data available for this train.
            </p>
          )}

          {schedule && schedule.stops.length > 0 && (
            <ol className="relative border-l-2 border-blue-200 dark:border-slate-700 ml-3">
              {schedule.stops.map((stop, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === schedule.stops.length - 1;
                return (
                  <li key={idx} className="mb-0 ml-6">
                    <span
                      className={`absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                        isFirst
                          ? "bg-green-500"
                          : isLast
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      <FaCircle className="text-white text-[6px]" />
                    </span>
                    <div
                      className={`flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-800 ${
                        isFirst || isLast ? "font-bold" : ""
                      }`}
                    >
                      <div>
                        <p className={`text-sm ${isFirst ? "text-green-600 dark:text-green-400" : isLast ? "text-red-500 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}`}>
                          {stop.stnName}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {stop.stnCity !== stop.stnName ? stop.stnCity : ""}
                        </p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        isFirst
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : isLast
                          ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {stop.stnCode}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="w-full bg-[#213d77] hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl transition-colors"
          >
            Close Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
