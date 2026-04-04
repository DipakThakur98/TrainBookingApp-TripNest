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

  // 🚉 Station list laana
  useEffect(() => {
    axios
      .get("http://localhost:5000/data/CombinedStationsTrains")
      .then((res) => {
        const options = res.data.map((station) => ({
          value: station.station.stnCode, // for filtering
          label: `${station.station.stnName} (${station.station.stnCode})`,
        }));
        setStationOptions(options);
      });
  }, []);

  // 🔍 Search trains → navigate to /train
  const handleSearch = () => {
    if (!from || !to || !date || !classType || !seatType) return;

    navigate("/train", {
      state: {
        from: from.value,
        to: to.value,
        date,
        classType,
        seatType,
      },
    });
  };

  return (
    <div className="p-6">
      <div className="p-6 bg-white shadow-xl rounded-2xl max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          🚆 Book Your Train Ticket
        </h2>

        {/* From - Swap - To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
          {/* From */}
          <div>
            <h4 className="flex text-sm font-medium mb-1 items-center gap-2 mt-2">
              <FaTrain className="text-blue-600" /> From
            </h4>
            <Select
              options={stationOptions}
              value={from}
              onChange={setFrom}
              placeholder="Select Station"
            />
          </div>

          {/* Swap */}
          <div className="flex items-center justify-center mt-4 sm:mt-0">
            <button
              onClick={handleSwap}
              type="button"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition shadow-md"
            >
              <LuArrowUpDown size={15} className="text-gray-600" />
            </button>
          </div>

          {/* To */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
              To <FaTrain className="text-blue-600" />
            </h4>
            <Select
              options={stationOptions}
              value={to}
              onChange={setTo}
              placeholder="Select Station"
            />
          </div>
        </div>

        {/* Date - Class - Seat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Date */}
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" /> Journey Date
            </h4>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {/* Class Type */}
          <div>
            <h4 className="text-sm font-medium mb-1">Class</h4>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
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
            <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
              <FaChair className="text-purple-600" /> Seat Preference
            </h4>
            <select
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
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
          disabled={!from || !to || !date || !classType || !seatType}
          className="mt-6 bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          🔍 Search Trains
        </button>
      </div>
    </div>
  );
}
