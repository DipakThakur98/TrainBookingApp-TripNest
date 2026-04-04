import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const { state } = useLocation();

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <p><strong>Train:</strong> {state.train?.["Train Name"]} ({state.train?.["Train No"]})</p>
      <p><strong>Passengers:</strong> {state.passengers.length}</p>
      <p><strong>Payment Mode:</strong> {state.preferences.paymentMode}</p>
      <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">Pay Now</button>
    </div>
  );
};

export default PaymentPage;
