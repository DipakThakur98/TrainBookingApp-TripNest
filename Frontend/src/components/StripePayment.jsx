import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { generateTicketPdf } from "../utils/generateTicketPdf";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Custom Stripe CardElement style (dark theme, no white background)
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      backgroundColor: "#2c2c2c",
      padding: "10px",
      borderRadius: "4px",
      "::placeholder": { color: "#bbbbbb" },
    },
    invalid: {
      color: "#ff6b6b",
    },
  },
};

function StripePayment({ bookingData }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [pnr, setPnr] = useState(null);
  const [txTime, setTxTime] = useState(null);

  // Create PaymentIntent on mount
  useEffect(() => {
    const createIntent = async () => {
      try {
        const { totalFare } = bookingData.fareBreakdown;
        const res = await axios.post("http://localhost:5000/api/payment/create-payment-intent", { amount: totalFare });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("❌ Payment Intent error:", err);
        alert("Failed to initialise payment. Please try again later.");
      }
    };
    createIntent();
  }, [bookingData]);

  const generatePDF = (generatedPNR) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("TripNest Booking Ticket", 14, 20);
    doc.setFontSize(12);
    doc.text(`PNR: ${generatedPNR}`, 14, 30);
    // You can add more details here if needed
    doc.save(`TripNest_PNR_${generatedPNR}.pdf`);
  };

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: bookingData.contact?.email } },
    });
    if (error) {
      console.error(error);
      alert(error.message || "Payment failed");
      setProcessing(false);
      return;
    }
    // Payment succeeded – generate PNR, download PDF, go home
    const pnrPart1 = Math.floor(100 + Math.random() * 900); // 3 digits
    const pnrPart2 = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
    const generated = `${pnrPart1}-${pnrPart2}`;
    setPnr(generated);
    setTxTime(new Date().toLocaleString());
    setProcessing(false);

    // Save booking to localStorage for My Booking page
    const completedBooking = {
      ...bookingData,
      pnr: generated,
      paymentTime: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("tripnest_bookings") || "[]");
    existing.push(completedBooking);
    localStorage.setItem("tripnest_bookings", JSON.stringify(existing));

    // Auto-download PDF ticket
    generateTicketPdf(bookingData, generated);

    // Show brief success alert and navigate to home
    alert(`Payment Successful! 🎉\nYour PNR: ${generated}\nTicket PDF has been downloaded.`);
    navigate("/", { replace: true });
  };

  if (!clientSecret) {
    return <p className="text-gray-600">Loading payment gateway…</p>;
  }

  if (paid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful 🎉</h2>
          <p className="text-gray-700 mb-2">PNR: <strong>{pnr}</strong></p>
          <p className="text-gray-500 mb-4">PDF ticket has been downloaded automatically.</p>
          <button onClick={() => navigate("/", { replace: true })} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">TripNest Secure Payment</h2>
      <CardElement options={CARD_ELEMENT_OPTIONS} className="w-full p-4 bg-gray-800 rounded mb-4" />
      <button
        onClick={handlePay}
        disabled={processing}
        className={`mt-2 w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded ${processing ? "opacity-60 cursor-wait" : ""}`}
      >
        {processing ? "Processing…" : "Pay Now"}
      </button>
    </div>
  );
}

export default function StripePaymentWrapper({ bookingData }) {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment bookingData={bookingData} />
    </Elements>
  );
}
