import { useState } from 'react';

const photocardImages = [
  '/profile-photo.jpg',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
];

export function PhotoCardSwiper() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? photocardImages.length - 1 : prev - 1));
    setFlipped(false);
  };

  const handleNext = () => {
    setIndex((prev) => (prev === photocardImages.length - 1 ? 0 : prev + 1));
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="relative w-72 h-96 flex items-center justify-center">
      <div
        className={`w-full h-full perspective cursor-pointer`}
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute w-full h-full backface-hidden">
            <img
              src={photocardImages[index]}
              alt={`Photocard ${index + 1}`}
              className="rounded-xl shadow-2xl border-2 border-cyan-300 object-cover w-full h-full"
            />
          </div>
          <div className="absolute w-full h-full flex items-center justify-center bg-slate-900 rounded-xl shadow-2xl border-2 border-cyan-300 text-cyan-300 text-xl font-bold rotate-y-180 backface-hidden">
            Photocard #{index + 1} Info
          </div>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/80 text-cyan-300 rounded-full p-2 shadow-lg hover:bg-cyan-300 hover:text-slate-900 transition"
        aria-label="Previous photocard"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/80 text-cyan-300 rounded-full p-2 shadow-lg hover:bg-cyan-300 hover:text-slate-900 transition"
        aria-label="Next photocard"
      >
        &#8594;
      </button>
    </div>
  );
}
