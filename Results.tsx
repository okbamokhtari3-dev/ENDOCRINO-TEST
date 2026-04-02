import { Trophy, RotateCcw } from 'lucide-react';

interface ResultsProps {
  correctCount: number;
  totalCards: number;
  onRestart: () => void;
}

export function Results({ correctCount, totalCards, onRestart }: ResultsProps) {
  const percentage = Math.round((correctCount / totalCards) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl p-12 text-center border-4 border-purple-400">
        <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-300" />

        <h2 className="text-4xl font-bold text-white mb-4">
          Study Session Complete!
        </h2>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
          <p className="text-6xl font-bold text-white mb-2">
            {correctCount}/{totalCards}
          </p>
          <p className="text-2xl text-purple-200">
            {percentage}% Mastered
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-lg text-purple-100">
            {percentage >= 80
              ? "Excellent work! You've mastered these endocrinology terms!"
              : percentage >= 60
              ? "Good job! Keep reviewing to strengthen your knowledge."
              : "Keep studying! Review the terms you missed."}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-4 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:bg-purple-50 transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Study Again
        </button>
      </div>
    </div>
  );
}
