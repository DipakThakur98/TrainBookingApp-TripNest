import { jsPDF } from "jspdf";

/**
 * Generate a ticket PDF using booking data and a generated PNR.
 * @param {Object} data - bookingData passed from the payment flow.
 *   Expected shape: { train, passengers, contact, fareBreakdown }
 * @param {string} pnr - generated PNR string.
 */
export const generateTicketPdf = (data, pnr) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("TripNest Ticket", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`PNR: ${pnr}`, 20, 30);

  const { train, passengers, contact, fareBreakdown } = data;
  doc.text(`Train: ${train["Train Name"]} (${train["Train No"]})`, 20, 40);
  doc.text(`Route: ${train.From} → ${train.To}`, 20, 48);
  doc.text(`Class: ${train.selectedClass}`, 20, 56);

  doc.text("Passengers:", 20, 68);
  passengers.forEach((p, i) => {
    const line = `${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${p.gender || "N/A"}, Berth: ${p.berth || "Any"}`;
    doc.text(line, 30, 76 + i * 8);
  });

  const yBase = 76 + passengers.length * 8 + 10;
  doc.text(`Total Fare: ₹ ${fareBreakdown.totalFare.toFixed(2)}`, 20, yBase);
  doc.text(`Contact: ${contact.mobile} | ${contact.email}`, 20, yBase + 8);

  doc.save(`TripNest_Ticket_${pnr}.pdf`);
};
