import { useState, useEffect } from 'react';
import { supabase, Flashcard } from './lib/supabase';
import { FlashCard } from './components/FlashCard';
import { Results } from './components/Results';
import { BookOpen } from 'lucide-react';

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('category', 'endocrinology')
      .order('created_at');

    if (error) {
      console.error('Error loading flashcards:', error);
    } else if (data) {
      setFlashcards(data);
    }
    setLoading(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectCount(correctCount + 1);
    }

    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setShowResults(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700 text-xl font-semibold">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-purple-700" />
            <h1 className="text-5xl font-bold text-purple-800">
              Endocrinology Flashcards
            </h1>
          </div>
          <p className="text-purple-700 text-lg">
            Master key concepts in endocrinology
          </p>
        </header>

        {showResults ? (
          <Results
            correctCount={correctCount}
            totalCards={flashcards.length}
            onRestart={handleRestart}
          />
        ) : flashcards.length > 0 ? (
          <FlashCard
            flashcard={flashcards[currentIndex]}
            onAnswer={handleAnswer}
            currentIndex={currentIndex}
            totalCards={flashcards.length}
          />
        ) : (
          <div className="text-center text-purple-700">
            <p className="text-xl">No flashcards found. Please add some flashcards to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
