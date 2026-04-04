// Payment.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function generatePNR() {
  // 10-char alphanumeric PNR-like code (uppercase)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state || null; // expected from PassengerForm

  // If no booking data, redirect back after brief message
  useEffect(() => {
    if (!incoming) {
      const t = setTimeout(() => navigate("/", { replace: true }), 400);
      return () => clearTimeout(t);
    }
  }, [incoming, navigate]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [pnr, setPnr] = useState(null);
  const [txTime, setTxTime] = useState(null);

  if (!incoming) {
    // while redirecting, show friendly message
    return (
      <div className="max-w-3xl mx-auto p-6 mt-24 bg-white shadow rounded text-center">
        <h3 className="text-lg font-semibold mb-2">No booking details found</h3>
        <p className="text-gray-600 mb-4">You will be redirected to Home.</p>
      </div>
    );
  }

  const { train, passengers, contact, preferences, fareBreakdown } = incoming;
  const {
    ticketFarePerPassenger = 0,
    convenienceFee = 0,
    insuranceFee = 0,
    totalFare = 0,
  } = fareBreakdown || {};

  const update = (field, value) => setPaymentInfo((p) => ({ ...p, [field]: value }));

  const validateCard = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentInfo;
    if (!cardNumber || !cardName || !expiry || !cvv) return false;
    if (cardNumber.replace(/\s/g, "").length < 12) return false; // allow short for fake
    if (cvv.length < 3) return false;
    return true;
  };

  const handlePayNow = () => {
    if (preferences.paymentMode === "card") {
      if (!validateCard()) {
        alert("Please fill valid (dummy) card details.");
        return;
      }
    } else {
      if (!paymentInfo.upiId) {
        alert("Please enter UPI ID (dummy).");
        return;
      }
    }

    // simulate processing
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      const generated = generatePNR();
      setPnr(generated);
      setTxTime(new Date().toLocaleString());
      // log to console for debug
      console.log("FAKE PAYMENT SUCCESS", {
        pnr: generated,
        time: new Date().toISOString(),
        train,
        passengers,
        contact,
        preferences,
        fareBreakdown,
        paymentInfo,
      });
    }, 1000);
  };

  const handlePrint = () => {
    // open print dialog for ticket area — simplest: window.print()
    window.print();
  };

  const handleFinish = () => {
    // navigate to home or to bookings page
    navigate("/", { replace: true });
  };

  // Confirmation screen after paid
  if (paid) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h2>
          <p className="text-gray-600">Booking confirmed. Your PNR is shown below.</p>
        </div>

        <div className="border rounded p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Train</p>
              <h3 className="font-semibold">{train["Train Name"]} ({train["Train No"]})</h3>
              <p className="text-sm text-gray-600">{train.From} → {train.To} • {train.selectedClass}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">PNR</p>
              <p className="text-xl font-bold">{pnr}</p>
              <p className="text-sm text-gray-500 mt-1">Txn: {txTime}</p>
            </div>
          </div>

          <hr className="my-3" />

          <div>
            <p className="font-semibold mb-2">Passengers</p>
            <ul className="space-y-1">
              {passengers.map((p, i) => (
                <li key={i} className="text-sm">
                  {i + 1}. {p.name || "—"} • {p.age || "—"} yrs • {p.gender || "—"}
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-3" />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Contact</div>
            <div className="text-right">{contact.mobile || "—"} / {contact.email || "—"}</div>

            <div>Ticket Fare</div>
            <div className="text-right">₹ {(ticketFarePerPassenger * passengers.length).toFixed(2)}</div>

            <div>Convenience Fee</div>
            <div className="text-right">₹ {convenienceFee.toFixed(2)}</div>

            <div>Travel Insurance</div>
            <div className="text-right">₹ {insuranceFee.toFixed(2)}</div>

            <div className="font-bold">Total Paid</div>
            <div className="text-right font-bold">₹ {totalFare.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded">Print / Save</button>
          <button onClick={handleFinish} className="px-4 py-2 bg-green-600 text-white rounded">Finish</button>
        </div>
      </div>
    );
  }

  // Regular payment form
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment (Fake)</h2>

      <div className="border rounded p-4 mb-4 bg-gray-50">
        <p className="font-semibold">{train["Train Name"]} ({train["Train No"]})</p>
        <p className="text-sm text-gray-600">{train.From} → {train.To} • {train.selectedClass}</p>
        <p className="text-sm text-gray-700 mt-2">Passengers: {passengers.length} • Total: <strong>₹ {totalFare.toFixed(2)}</strong></p>
      </div>

      {preferences.paymentMode === "card" ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number (dummy)"
            value={paymentInfo.cardNumber}
            onChange={(e) => update("cardNumber", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Name on Card"
            value={paymentInfo.cardName}
            onChange={(e) => update("cardName", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={(e) => update("expiry", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => update("cvv", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="UPI ID (dummy) e.g. user@upi"
            value={paymentInfo.upiId}
            onChange={(e) => update("upiId", e.target.value)}
            className="w-full border p-2 rounded"
          />
          <p className="text-sm text-gray-500 mt-2">Click Pay to simulate UPI success immediately.</p>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Back</button>
        <button
          onClick={handlePayNow}
          disabled={processing}
          className={`px-4 py-2 rounded text-white ${processing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
        >
          {processing ? "Processing..." : `Pay ₹ ${totalFare.toFixed(2)}`}
        </button>
      </div>

      <div className="mt-6 text-sm text-yellow-800 bg-yellow-50 p-3 rounded border border-yellow-200">
        ⚠️ This is a fake payment flow for testing only — no real transaction will happen.
      </div>
    </div>
  );
};

export default Payment;
