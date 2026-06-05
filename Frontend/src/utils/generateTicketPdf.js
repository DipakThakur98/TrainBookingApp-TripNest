import { jsPDF } from 'jspdf';

/**
 * Generates a PDF ticket for a successful booking.
 * @param {Object} bookingData - Contains train, passengers, contact, fareBreakdown.
 * @param {string} pnr - Generated PNR to be shown on the ticket.
 */
export function generateTicketPdf(bookingData, pnr) {
  const { train, passengers, contact, fareBreakdown } = bookingData;
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('TripNest Booking Ticket', 20, 20);

  doc.setFontSize(12);
  doc.text(`PNR: ${pnr}`, 20, 30);
  doc.text(`Train: ${train?.['Train Name'] || ''} (${train?.['Train No'] || ''})`, 20, 40);
  doc.text(`Route: ${train?.From} → ${train?.To}`, 20, 48);
  doc.text(`Class: ${train?.selectedClass}`, 20, 56);
  doc.text('Passengers:', 20, 66);
  passengers.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${p.gender || 'N/A'}, Berth: ${p.berth || 'Any'}`, 30, 76 + i * 8);
  });
  const y = 76 + passengers.length * 8 + 10;
  doc.text(`Total Fare: ₹ ${fareBreakdown.totalFare.toFixed(2)}`, 20, y);
  doc.text(`Contact: ${contact.mobile} | ${contact.email}`, 20, y + 8);

  doc.save(`TripNest_Ticket_${pnr}.pdf`);
}
