import { useState } from 'react';
import { Flashcard } from '../lib/supabase';

interface FlashCardProps {
  flashcard: Flashcard;
  onAnswer: (correct: boolean) => void;
  currentIndex: number;
  totalCards: number;
}

export function FlashCard({ flashcard, onAnswer, currentIndex, totalCards }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    setIsFlipped(false);
    onAnswer(correct);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-6 text-center">
        <span className="text-purple-600 font-semibold text-lg">
          Card {currentIndex + 1} of {totalCards}
        </span>
      </div>

      <div
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center p-8 border-4 border-purple-400">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {flashcard.term}
                </h2>
                <p className="text-purple-200 text-sm">Click to reveal definition</p>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-2xl flex items-center justify-center p-8 border-4 border-purple-400">
              <div className="text-center">
                <p className="text-xl text-white leading-relaxed">
                  {flashcard.definition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAnswer(false);
            }}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-colors"
          >
            Need to Review
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAnswer(true);
            }}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors"
          >
            I Know This!
          </button>
        </div>
      )}
    </div>
  );
}
