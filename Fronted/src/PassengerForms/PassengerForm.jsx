import React, { useEffect, useState } from "react";
import { useAuth } from "../login/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

const PassengerForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation(); // expects { train } from TrainList

  // passengers + contact + countries + preferences
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "", country: "IN", berth: "" },
  ]);
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // load simple Country.json if available (optional)
    fetch("/Country.json")
      .then((res) => {
        if (!res.ok) throw new Error("Country.json not found");
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch(() => {
        // fallback minimal list
        setCountries([{ code: "IN", name: "India" }, { code: "US", name: "United States" }]);
      });
  }, []);

  const [preferences, setPreferences] = useState({
    autoUpgrade: false,
    confirmOnly: false,
    reservationChoice: "",
    coachNo: "",
    travelInsurance: true,
    paymentMode: "card",
  });

  // Fare calculation helpers — will recalc on render
  const ticketFarePerPassenger =
    (state?.train?.Price && state.train.selectedClass && state.train.Price[state.train.selectedClass]) ||
    180; // fallback
  const convenienceFee = 17.7;
  const insuranceFee = preferences.travelInsurance ? 0.45 : 0;
  const totalFare = ticketFarePerPassenger * passengers.length + convenienceFee + insuranceFee;

  // Passenger handlers
  const handlePassengerChange = (index, field, value) => {
    setPassengers((p) => {
      const copy = [...p];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addPassenger = () => {
    setPassengers((p) => [...p, { name: "", age: "", gender: "", country: "IN", berth: "" }]);
  };

  const removePassenger = (index) => {
    setPassengers((p) => p.filter((_, i) => i !== index));
  };

  // Continue -> navigate to payment, pass all state including totalFare
  const handleContinue = () => {
    if (!user) {
      navigate("/loginform", { state: { from: "/passengerform", train: state?.train } });
      return;
    }

    // Basic validation: ensure each passenger has name and age
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name || !passengers[i].age) {
        alert(`Please enter name and age for passenger ${i + 1}`);
        return;
      }
    }
    if (!contact.mobile) {
      alert("Please enter contact mobile number");
      return;
    }

    navigate("/payment", {
      state: {
        train: state?.train,
        passengers,
        contact,
        preferences,
        fareBreakdown: {
          ticketFarePerPassenger,
          convenienceFee,
          insuranceFee,
          totalFare,
        },
      },
    });
  };

  
  if (!state?.train) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded text-center">
        <h3 className="text-lg font-semibold mb-2">No train selected</h3>
        <p className="text-gray-600 mb-4">Please go back and select a train to book.</p>
        <button onClick={() => navigate(-1)} className="bg-orange-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-28 grid md:grid-cols-3 gap-6">
      {/* Left Column — Form (col-span 2) */}
      <div className="md:col-span-2 bg-white shadow rounded p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold">
            {state.train["Train Name"]} ({state.train["Train No"]})
          </h2>
          <p className="text-gray-600">
            {state.train.From} → {state.train.To} • {state.train.selectedClass}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Passenger Details</h3>
          {passengers.map((p, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 mb-3 items-center border p-2 rounded">
              <input
                className="border p-1 rounded col-span-2"
                placeholder="Name"
                value={p.name}
                onChange={(e) => handlePassengerChange(idx, "name", e.target.value)}
              />
              <input
                className="border p-1 rounded"
                placeholder="Age"
                type="number"
                value={p.age}
                onChange={(e) => handlePassengerChange(idx, "age", e.target.value)}
              />
              <select
                className="border p-1 rounded"
                value={p.gender}
                onChange={(e) => handlePassengerChange(idx, "gender", e.target.value)}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select
                className="border p-1 rounded"
                value={p.country}
                onChange={(e) => handlePassengerChange(idx, "country", e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                className="border p-1 rounded"
                value={p.berth}
                onChange={(e) => handlePassengerChange(idx, "berth", e.target.value)}
              >
                <option value="">No Preference</option>
                <option>LOWER</option>
                <option>MIDDLE</option>
                <option>UPPERe</option>
                <option>SIDE LOWER</option>
                <option>SIDE MIDDLE</option>               
              </select>

              <div className="col-span-6 flex justify-end -mt-6">
                {passengers.length > 1 && (
                  <button
                    onClick={() => removePassenger(idx)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                    title="Remove passenger"
                  >
                    <MdOutlineClose />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button onClick={addPassenger} className="text-blue-600 underline">
            + Add Passenger
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border p-2 rounded"
              placeholder="Mobile"
              value={contact.mobile}
              onChange={(e) => setContact((c) => ({ ...c, mobile: e.target.value }))}
            />
            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Other Preferences</h3>
          <div className="mb-3 space-y-2 border p-4 rounded bg-gray-50">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.autoUpgrade}
                onChange={(e) => setPreferences((pr) => ({ ...pr, autoUpgrade: e.target.checked }))}
              />
              Consider for Auto Upgradation
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.confirmOnly}
                onChange={(e) => setPreferences((pr) => ({ ...pr, confirmOnly: e.target.checked }))}
              />
              Book only if confirm berths are allotted
            </label>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <select
                className="border p-2 rounded"
                value={preferences.reservationChoice}
                onChange={(e) => setPreferences((pr) => ({ ...pr, reservationChoice: e.target.value }))}
              >
                <option value="">Reservation Choice</option>
                <option>Book only if 1 lower berth</option>
                <option>Prefer Side Lower</option>
                <option>No Preference</option>
              </select>
              <input
                className="border p-2 rounded"
                placeholder="Preferred Coach No"
                value={preferences.coachNo}
                onChange={(e) => setPreferences((pr) => ({ ...pr, coachNo: e.target.value }))}
              />
            </div>

            <div className="mt-2">
              <p className="font-semibold">Travel Insurance</p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="insurance"
                  checked={preferences.travelInsurance === true}
                  onChange={() => setPreferences((pr) => ({ ...pr, travelInsurance: true }))}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="insurance"
                  checked={preferences.travelInsurance === false}
                  onChange={() => setPreferences((pr) => ({ ...pr, travelInsurance: false }))}
                />{" "}
                No
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Payment Mode</h3>
          <div className="border p-4 rounded bg-gray-50">
            <label className="block mb-2">
              <input
                type="radio"
                name="paymentMode"
                checked={preferences.paymentMode === "card"}
                onChange={() => setPreferences((pr) => ({ ...pr, paymentMode: "card" }))}
              />{" "}
              Credit/Debit Card / Net Banking / Wallets / EMI / Rewards
            </label>
            <label className="block">
              <input
                type="radio"
                name="paymentMode"
                checked={preferences.paymentMode === "upi"}
                onChange={() => setPreferences((pr) => ({ ...pr, paymentMode: "upi" }))}
              />{" "}
              BHIM/UPI
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded">
            Back
          </button>
          <button onClick={handleContinue} className="bg-orange-500 text-white px-4 py-2 rounded">
            Continue to Payment
          </button>
        </div>
      </div>

      {/* Right Column — Fare Summary */}
      <div className="bg-gray-50 p-4 rounded shadow h-fit">
        <h3 className="font-semibold text-lg mb-3">Fare Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Ticket Fare ({passengers.length} x {state.train.selectedClass})</span>
          <span>₹ {(ticketFarePerPassenger * passengers.length).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Convenience Fee</span>
          <span>₹ {convenienceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Travel Insurance</span>
          <span>₹ {insuranceFee.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold mt-2">
          <span>Total Fare</span>
          <span>₹ {totalFare.toFixed(2)}</span>
        </div>
      </div>  
    </div>
  );
};

export default PassengerForm;
