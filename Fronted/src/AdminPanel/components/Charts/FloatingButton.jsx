export default function FloatingButton({onClick}) {
  return (
    <button onClick={onClick} className="fixed right-6 bottom-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center">
      +
    </button>
  );
}
