import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrain, FaRegClock, FaFilter, FaCheck, FaSync, FaExchangeAlt, FaCalendarAlt, FaBriefcase, FaThLarge, FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../login/AuthContext";
import TrainScheduleModal from "./TrainScheduleModal";

export default function TrainList() {
  const location = useLocation();
  const [state, setState] = useState(location.state || { from: "ADI", to: "PUNE", date: "26/06/2026" });
  
  const [searchFrom, setSearchFrom] = useState(state.from);
  const [searchTo, setSearchTo] = useState(state.to);
  const [searchDate, setSearchDate] = useState(state.date);

  const [results, setResults] = useState([]);
  const [allTrains, setAllTrains] = useState([]);
  const [selectedScheduleTrain, setSelectedScheduleTrain] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trainQuery, setTrainQuery] = useState("");

  const [filters, setFilters] = useState({
    SL: false,
    "2S": false,
    "3A": false,
    "2A": false,
    "1A": false,
  });

  const formatRunsOn = (runsOnObj) => {
    if (!runsOnObj) return "All Days";
    if (typeof runsOnObj === 'string') return runsOnObj;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const activeDays = days.filter(d => runsOnObj[d]);

    if (activeDays.length === 7) return "All Days";
    if (activeDays.length === 0) return "Not Scheduled";
    return activeDays.join(", ");
  };

  useEffect(() => {
    if (!state) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const trainsRes = await axios.get("http://localhost:5000/data/MergedTrains");
        const allStations = trainsRes.data;
        const all = allStations.flatMap((st) => st.trains);

        // Normalize ALL trains with Price + Classes structure for card rendering
        const normalize = (train) => {
          const prices = {};
          if (train.Classes) {
            for (const [cls, info] of Object.entries(train.Classes)) {
              if (info && info.Price) prices[cls] = info.Price;
            }
          }
          return {
            ...train,
            selectedClass: null,
            Classes: {
              SL: { Available: null, showSeats: false },
              "2S": { Available: null, showSeats: false },
              "3A": { Available: null, showSeats: false },
              "2A": { Available: null, showSeats: false },
              "1A": { Available: null, showSeats: false },
            },
            Price: prices,
          };
        };

        const normalizedAll = all.map(normalize);
        setAllTrains(normalizedAll);

        const filtered = normalizedAll.filter(
          (train) =>
            train.FromStnCode?.toUpperCase().trim() === state.from?.toUpperCase().trim() &&
            train.ToStnCode?.toUpperCase().trim() === state.to?.toUpperCase().trim()
        );

        setResults(filtered);
      } catch (err) {
        console.error("❌ Error fetching trains:", err);
      } finally {
        setLoading(false);
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
      navigate("/loginform", { state: { returnTo: location.pathname, returnState: state, train } });
      return;
    }
    navigate("/passengerform", { state: { train } });
  };

  const handleFilterChange = (cls) => {
    setFilters((prev) => ({ ...prev, [cls]: !prev[cls] }));
  };

  const applyFilters = (trains) => {
    // When trainQuery is typed, search across ALL trains in the database
    let base = trainQuery.trim() ? allTrains : trains;

    if (trainQuery.trim()) {
      const q = trainQuery.trim().toLowerCase();
      base = base.filter(
        (train) =>
          String(train["Train No"]).includes(q) ||
          train["Train Name"]?.toLowerCase().includes(q)
      );
    }
    // Filter by class type
    const activeFilters = Object.keys(filters).filter((f) => filters[f]);
    if (activeFilters.length > 0) {
      base = base.filter((train) =>
        activeFilters.some((f) => train.Price && train.Price[f] !== undefined)
      );
    }
    return base;
  };

  // Removed early return so UI always renders

  const getFullClassName = (code) => {
    const mapping = {
      "1A": "AC First Class",
      "2A": "AC 2 Tier",
      "3A": "AC 3 Tier",
      "3E": "AC 3 Economy",
      "CC": "AC Chair Car",
      "SL": "Sleeper",
      "2S": "Second Sitting"
    };
    return mapping[code] || code;
  };

  const handleModifySearch = () => {
    setState({
      from: searchFrom,
      to: searchTo,
      date: searchDate
    });
  };

  const filteredTrains = applyFilters(results);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-12 font-sans">
      {/* 🌟 MODIFY SEARCH HEADER (IRCTC STYLE) */}
      <div className="bg-[#213d77] dark:bg-slate-800 text-white py-4 px-4 border-b-4 border-orange-500 shadow-md">
        <div className="max-w-[1550px] mx-auto flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 w-full">
            {/* From */}
            <div className="flex bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded px-3 py-2 items-center w-full lg:flex-1 min-w-[200px]">
              <FaLocationArrow className="text-blue-700 dark:text-blue-400 mr-2" />
              <input type="text" value={searchFrom} onChange={(e) => setSearchFrom(e.target.value)} className="outline-none w-full text-sm font-bold bg-transparent" placeholder="From Station Code (e.g. ADI)" />
            </div>

            {/* Swap */}
            <div 
              className="bg-white dark:bg-slate-700 rounded-full p-2 cursor-pointer text-[#213d77] dark:text-blue-400 hidden lg:block shadow-sm"
              onClick={() => {
                const temp = searchFrom;
                setSearchFrom(searchTo);
                setSearchTo(temp);
              }}
            >
              <FaExchangeAlt />
            </div>

            {/* To */}
            <div className="flex bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded px-3 py-2 items-center w-full lg:flex-1 min-w-[200px]">
              <FaMapMarkerAlt className="text-blue-700 dark:text-blue-400 mr-2" />
              <input type="text" value={searchTo} onChange={(e) => setSearchTo(e.target.value)} className="outline-none w-full text-sm font-bold bg-transparent" placeholder="To Station Code (e.g. PUNE)" />
            </div>

            {/* Date */}
            <div className="flex bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded px-3 py-2 items-center w-full lg:flex-1 min-w-[150px]">
              <FaCalendarAlt className="text-blue-700 dark:text-blue-400 mr-2" />
              <input type="text" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="outline-none w-full text-sm font-bold bg-transparent" placeholder="DD/MM/YYYY" />
            </div>

            {/* All Classes */}
            <div className="flex bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded px-3 py-2 items-center w-full lg:flex-1 min-w-[150px]">
              <FaBriefcase className="text-blue-700 dark:text-blue-400 mr-2" />
              <select className="outline-none w-full text-sm font-bold bg-transparent">
                <option>All Classes</option>
              </select>
            </div>

            {/* Quota */}
            <div className="flex bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded px-3 py-2 items-center w-full lg:flex-1 min-w-[150px]">
              <FaThLarge className="text-blue-700 dark:text-blue-400 mr-2" />
              <select className="outline-none w-full text-sm font-bold bg-transparent">
                <option>GENERAL</option>
              </select>
            </div>

            {/* Modify Button */}
            <button 
              onClick={handleModifySearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded text-[15px] shadow-sm w-full lg:w-auto mt-2 lg:mt-0 transition-colors"
            >
              Modify Search
            </button>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-8 mt-1 text-sm font-bold text-white dark:text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" /> Flexible With Date
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" /> Person With Disability Concession
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" /> Railway Pass Concession
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-[1550px] mx-auto flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-8 -mt-2">
        {/* ✅ LEFT FILTER PANEL */}
        <div className="lg:w-1/6 w-full relative z-10">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-100 dark:border-slate-700 shadow-xl rounded-3xl p-7 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2.5 rounded-xl">
                <FaFilter className="text-blue-600 dark:text-blue-400 text-lg" />
              </div>
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white">Filters</h3>
            </div>

            {/* 🔍 Train No / Name Search */}
            <h4 className="font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase text-xs tracking-widest">Search Train</h4>
            <input
              type="text"
              value={trainQuery}
              onChange={(e) => setTrainQuery(e.target.value)}
              placeholder="Train No or Name..."
              className="w-full mb-6 px-3 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <h4 className="font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase text-xs tracking-widest">Class Types</h4>
            <div className="space-y-4">
              {Object.keys(filters).map((cls) => (
                <label key={cls} className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all duration-300 ${filters[cls]
                    ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500 shadow-md shadow-blue-500/30'
                    : 'border-gray-300 dark:border-slate-600 group-hover:border-blue-400'
                    }`}>
                    {filters[cls] && <FaCheck className="text-white text-xs" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={filters[cls]}
                    onChange={() => handleFilterChange(cls)}
                    className="hidden"
                  />
                  <span className={`font-semibold text-lg transition-colors duration-200 ${filters[cls] ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                    {cls} Class
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => {
                setFilters({ SL: false, "2S": false, "3A": false, "2A": false, "1A": false });
                setTrainQuery("");
              }}
              className="mt-8 w-full bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200 dark:border-slate-600 shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* ✅ TRAIN LIST */}
        <div className="lg:w-3/4 w-full space-y-6 relative z-10">
          {/* Result Count */}
          {!loading && (
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
              {filteredTrains.length} train{filteredTrains.length !== 1 ? 's' : ''} found
              {state.from && state.to ? ` · ${state.from} → ${state.to}` : ''}
            </div>
          )}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : filteredTrains.length > 0 ? (
            filteredTrains.map((train, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 mb-6 rounded shadow-sm overflow-hidden"
              >
                {/* 🚆 Header */}
                <div className="bg-[#f8f9fa] dark:bg-slate-750 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-[17px] font-bold text-gray-900 dark:text-white uppercase">
                    {train["Train Name"]} ({train["Train No"]})
                  </div>
                  <div className="text-[15px] text-gray-700 dark:text-gray-300">
                    Runs On: {formatRunsOn(train.RunsOn)}
                  </div>
                  <div
                    className="text-[15px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                    onClick={() => setSelectedScheduleTrain(train)}
                  >
                    Train Schedule
                  </div>
                </div>

                {/* 🕒 Route Info */}
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[22px] font-bold text-gray-900 dark:text-white">{train.Departure || "05:30"} |</span>
                      <span className="text-[15px] text-gray-800 dark:text-gray-200 uppercase">{train.From} | {state?.date || "Fri, 26 Jun"}</span>
                    </div>

                    <div className="hidden lg:flex items-center text-gray-500 text-[15px]">
                      <div className="w-12 h-px bg-gray-300 dark:bg-slate-600"></div>
                      <span className="mx-4 font-medium">{train.Duration || "11:10"}</span>
                      <div className="w-12 h-px bg-gray-300 dark:bg-slate-600"></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[22px] font-bold text-gray-900 dark:text-white">{train.Arrival || "16:40"} |</span>
                      <span className="text-[15px] text-gray-800 dark:text-gray-200 uppercase">{train.To} | {state?.date || "Fri, 26 Jun"}</span>
                    </div>
                  </div>

                  {/* 💺 Classes Grid */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {Object.entries(train.Classes).map(([cls, info], idx) => {
                      if (!train.Price[cls]) return null;
                      
                      const isSelected = train.selectedClass === cls;
                      
                      return (
                        <div
                          key={idx}
                          onClick={() => info.showSeats ? handleClassSelect(i, cls) : null}
                          className={`min-w-[160px] border rounded p-2.5 flex flex-col bg-white dark:bg-slate-800 cursor-pointer ${
                            isSelected
                              ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,1)]"
                              : "border-gray-200 dark:border-slate-600 hover:border-gray-300"
                          }`}
                        >
                          <div className="font-bold text-[15px] text-gray-900 dark:text-white mb-1">
                            {getFullClassName(cls)} ({cls})
                          </div>
                          
                          {info.showSeats ? (
                            <div className="flex flex-col mt-0.5">
                              <span className={`text-[15px] font-bold ${
                                info.Available > 0
                                  ? "text-emerald-700 dark:text-emerald-400"
                                  : "text-orange-600 dark:text-orange-400"
                              }`}>
                                {info.Available > 0
                                  ? `AVAILABLE ${info.Available}`
                                  : `WL ${Math.abs(info.Available) || 1}`}
                              </span>
                              <span className="text-gray-900 dark:text-white font-bold text-[15px] mt-0.5">
                                ₹{train.Price[cls]}
                              </span>
                            </div>
                          ) : (
                            <div className="mt-1">
                              <div
                                className="text-gray-900 dark:text-white font-bold text-[15px] flex items-center gap-1.5 cursor-pointer hover:opacity-80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRefreshAll(i);
                                }}
                              >
                                Refresh <FaSync className="text-sm font-black" />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 🎟️ Book Now Footer */}
                  <div className="text-[14px] text-gray-900 dark:text-gray-200 font-bold mb-4">
                    Please check NTES website or NTES app for actual time before boarding
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={!train.selectedClass}
                      onClick={() => handleBookNow(train)}
                      className={`font-bold py-2 px-5 rounded text-[15px] ${
                        train.selectedClass
                          ? "bg-[#fbb996] hover:bg-[#faad85] text-white"
                          : "bg-[#fbb996]/50 text-white cursor-not-allowed"
                      }`}
                    >
                      Book Now
                    </button>
                    <button className="border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-black dark:text-white font-bold py-2 px-5 rounded text-[15px] hover:bg-gray-100 dark:hover:bg-slate-600">
                      OTHER DATES
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-16 text-center shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col items-center">
              <div className="bg-gray-50 dark:bg-slate-700 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <FaTrain className="text-gray-400 dark:text-slate-500 text-4xl" />
              </div>
              <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-3">No Trains Found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                We couldn't find any trains matching your current filters for this route. Try adjusting your class preferences.
              </p>
              <button
                onClick={() => setFilters({ SL: false, "2S": false, "3A": false, "2A": false, "1A": false })}
                className="mt-8 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Train Schedule Modal */}
      {selectedScheduleTrain && (
        <TrainScheduleModal
          train={selectedScheduleTrain}
          onClose={() => setSelectedScheduleTrain(null)}
        />
      )}
    </>  
  );
}
