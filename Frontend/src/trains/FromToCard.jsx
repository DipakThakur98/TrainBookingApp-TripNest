import { useEffect, useState } from "react";
import { FaTrain, FaCalendarAlt, FaChair } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FromToCard() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [stationOptions, setStationOptions] = useState([]);
  const [date, setDate] = useState("");
  const [classType, setClassType] = useState("");
  const [seatType, setSeatType] = useState("");

  const navigate = useNavigate();

  // 🔄 Swap From & To
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/data/CombinedStationsTrains")
      .then((res) => {
        const options = res.data.map((station) => {
          const code = station.station.stnCode || station.station.stncode || "";
          return {
            value: code,
            label: `${station.station.stnName || ""} (${code})`,
          };
        });
        setStationOptions(options);
      });
  }, []);

  // 🔍 Search trains → navigate to /train
  const handleSearch = () => {
    if (!from || !to || !date) return; // Only From, To, Date are required

    navigate("/train", {
      state: {
        from: from.value,
        to: to.value,
        date,
        classType: classType || "All Classes",
        seatType: seatType || "General",
      },
    });
  };

  return (
    <div className="p-6">
      <div className="p-6 bg-white dark:bg-[#0e1628] border border-gray-100 dark:border-slate-800 shadow-xl rounded-2xl max-w-5xl mx-auto transition-colors duration-300 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
          🚆 Book Your Train Ticket
        </h2>

        {/* From - Swap - To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
          {/* From */}
          <div>
            <h4 className="flex text-sm font-medium mb-1 items-center gap-2 mt-2 text-gray-700 dark:text-gray-200">
              <FaTrain className="text-blue-600" /> From
            </h4>
            <Select
              options={stationOptions}
              value={from}
              onChange={setFrom}
              placeholder="Select Station"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains("dark") ? "#0b1120" : "#fff",
                  borderColor: document.documentElement.classList.contains("dark") ? "#1e293b" : "#cccccc",
                  color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains("dark") ? "#0e1628" : "#fff",
                  zIndex: 20
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#3b82f6"
                    : state.isFocused
                    ? (document.documentElement.classList.contains("dark") ? "#1e293b" : "#f3f4f6")
                    : "transparent",
                  color: state.isSelected
                    ? "#fff"
                    : (document.documentElement.classList.contains("dark") ? "#fff" : "#000"),
                }),
                singleValue: (base) => ({
                  ...base,
                  color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                }),
              }}
            />
          </div>

          {/* Swap */}
          <div className="flex items-center justify-center mt-4 sm:mt-0">
            <button
              onClick={handleSwap}
              type="button"
              className="rounded-full bg-gray-100 dark:bg-[#1e293b] p-2 hover:bg-gray-200 dark:hover:bg-[#334155] transition shadow-md border-none"
            >
              <LuArrowUpDown size={15} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* To */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              To <FaTrain className="text-blue-600" />
            </h4>
            <Select
              options={stationOptions}
              value={to}
              onChange={setTo}
              placeholder="Select Station"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains("dark") ? "#0b1120" : "#fff",
                  borderColor: document.documentElement.classList.contains("dark") ? "#1e293b" : "#cccccc",
                  color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains("dark") ? "#0e1628" : "#fff",
                  zIndex: 20
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#3b82f6"
                    : state.isFocused
                    ? (document.documentElement.classList.contains("dark") ? "#1e293b" : "#f3f4f6")
                    : "transparent",
                  color: state.isSelected
                    ? "#fff"
                    : (document.documentElement.classList.contains("dark") ? "#fff" : "#000"),
                }),
                singleValue: (base) => ({
                  ...base,
                  color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
                }),
              }}
            />
          </div>
        </div>

        {/* Date - Class - Seat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Date */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <FaCalendarAlt className="text-green-600" /> Journey Date
            </h4>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white"
            />
          </div>
          {/* Class Type */}
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Class</h4>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white"
            >
              <option value="">Select Class</option>
              <option value="Sleeper">Sleeper</option>
              <option value="AC 3 Tier">AC 3 Tier</option>
              <option value="AC 2 Tier">AC 2 Tier</option>
              <option value="AC First Class">AC First Class</option>
            </select>
          </div>

          {/* Seat Type */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <FaChair className="text-purple-600" /> Seat Preference
            </h4>
            <select
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white"
            >
              <option value="">Select Seat</option>
              <option value="General">General</option>
              <option value="Tatkal">TATKAL</option>
              <option value="Ladies">LADIES</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={!from || !to || !date}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          🔍 Search Trains
        </button>
      </div>
    </div>
  );
}
