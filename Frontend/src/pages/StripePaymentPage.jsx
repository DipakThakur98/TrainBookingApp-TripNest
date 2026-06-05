import React from "react";
import { useLocation } from "react-router-dom";
import StripePaymentWrapper from "../components/StripePayment";

export default function StripePaymentPage() {
  const location = useLocation();
  const bookingData = location.state || {};

  return <StripePaymentWrapper bookingData={bookingData} />;
}
