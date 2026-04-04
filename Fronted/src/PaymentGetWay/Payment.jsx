import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";

function generatePNR() {
  const chars = "0123456789";
  return Array.from({ length: 10 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state || null;

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
  const [selectedMethod, setSelectedMethod] = useState("card");

  if (!incoming) {
    useEffect(() => {
      const t = setTimeout(() => navigate("/", { replace: true }), 400);
      return () => clearTimeout(t);
    }, [navigate]);
    return <p>Redirecting to home...</p>;
  }

  const { train, passengers, fareBreakdown } = incoming;
  const { ticketFarePerPassenger = 0, convenienceFee = 0, insuranceFee = 0, totalFare = 0 } =
    fareBreakdown || {};

  const update = (field, value) =>
    setPaymentInfo((p) => ({ ...p, [field]: value }));

  // Simple validations
  const validateCard = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentInfo;
    const cardValid = /^[0-9]{16}$/.test(cardNumber);
    const cvvValid = /^[0-9]{3,4}$/.test(cvv);
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
    return cardName && cardValid && cvvValid && expiryValid;
  };

  const validateUPI = () => /^[\w.-]+@[\w]+$/.test(paymentInfo.upiId);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("TripNest Booking Ticket", 14, 20);
    doc.setFontSize(12);
    doc.text(`PNR: ${pnr}`, 14, 30);
    doc.text(`Transaction Time: ${txTime}`, 14, 38);
    doc.text(`Train: ${train["Train Name"]} (${train["Train No"]})`, 14, 48);
    doc.text(`Route: ${train.From} → ${train.To}`, 14, 56);
    doc.text(`Class: ${train.selectedClass}`, 14, 64);
    doc.text(`Passengers:`, 14, 74);
    passengers.forEach((p, i) => {
      doc.text(
        `${i + 1}. ${p.name || "—"} • ${p.age || "—"} yrs • ${p.gender || "—"}`,
        18,
        82 + i * 8
      );
    });
    let y = 82 + passengers.length * 8 + 10;
    doc.text(`Ticket Fare: ₹${(ticketFarePerPassenger * passengers.length).toFixed(2)}`, 14, y);
    doc.text(`Convenience Fee: ₹${convenienceFee.toFixed(2)}`, 14, y + 8);
    doc.text(`Travel Insurance: ₹${insuranceFee.toFixed(2)}`, 14, y + 16);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Paid: ₹${totalFare.toFixed(2)}`, 14, y + 28);
    doc.save(`TripNest_PNR_${pnr}.pdf`);
  };

  const saveBookingToBackend = async (generatedPNR) => {
    try {
      await axios.post("http://localhost:5000/api/bookings/create", {
        train: {
          TrainNo: train["Train No"],
          TrainName: train["Train Name"],
          From: train.From,
          To: train.To,
          selectedClass: train.selectedClass,
        },
        passengers,
        fareBreakdown,
        paymentMode: selectedMethod,
        paymentInfo: selectedMethod === "upi" ? { upiId: paymentInfo.upiId } : paymentInfo,
        pnrNumber: generatedPNR,
        status: "Confirmed",
        userId: incoming.user?._id || null,
      });
    } catch (err) {
      console.error("Failed to save booking:", err);
    }
  };

  const handlePayNow = async () => {
    if (selectedMethod === "card" && !validateCard()) {
      alert("Enter valid card details (16-digit number, CVV, MM/YY).");
      return;
    } else if (selectedMethod === "upi" && !validateUPI()) {
      alert("Enter valid UPI ID (e.g., name@bank).");
      return;
    }

    setProcessing(true);
    setTimeout(async () => {
      const generated = generatePNR();
      setPnr(generated);
      setTxTime(new Date().toLocaleString());
      setPaid(true);
      setProcessing(false);

      await saveBookingToBackend(generated);
      setTimeout(generatePDF, 300);
    }, 1200);
  };

  const handleFinish = () => navigate("/", { replace: true });

  if (paid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful 🎉</h2>
          <p className="text-gray-700 mb-2">PNR: <strong>{pnr}</strong></p>
          <p className="text-gray-500 mb-4">PDF ticket has been downloaded automatically.</p>
          <button onClick={handleFinish} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Secure Payment</h2>

        {/* Payment Method */}
        <div className="flex gap-3 mb-6 justify-center">
          {["card", "upi", "razorpay", "paypal"].map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedMethod === method
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        {/* Card Payment */}
        {selectedMethod === "card" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              maxLength="16"
              value={paymentInfo.cardNumber}
              onChange={(e) => update("cardNumber", e.target.value.replace(/\D/g, ""))}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Name on Card"
              value={paymentInfo.cardName}
              onChange={(e) => update("cardName", e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentInfo.expiry}
                onChange={(e) => update("expiry", e.target.value)}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength="4"
                value={paymentInfo.cvv}
                onChange={(e) => update("cvv", e.target.value.replace(/\D/g, ""))}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* UPI Payment */}
        {selectedMethod === "upi" && (
          <input
            type="text"
            placeholder="UPI ID (e.g., name@bank)"
            value={paymentInfo.upiId}
            onChange={(e) => update("upiId", e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
          />
        )}

        {["razorpay", "paypal"].includes(selectedMethod) && (
          <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-700 mb-4">
            Demo {selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)} payment.<br />
            (No real transaction occurs)
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
            Back
          </button>
          <button
            onClick={handlePayNow}
            disabled={processing}
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              processing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {processing ? "Processing..." : `Pay ₹ ${totalFare.toFixed(2)}`}
          </button>
        </div>

        <p className="mt-4 text-sm text-yellow-800 bg-yellow-50 p-2 rounded border border-yellow-200 text-center">
          ⚠️ Fake payment for testing only.
        </p>
      </div>
    </div>
  );
};

export default Payment;
