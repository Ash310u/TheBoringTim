import { useState, useEffect } from 'react';
import Option from './Option';
import ScoreModal from './ScoreModal';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const questions = [
  { id: 1, text: "In the last month, how often have you been upset because of something that happened unexpectedly?", isReversed: false },
  { id: 2, text: "In the last month, how often have you felt that you were unable to control the important things in your life?", isReversed: false },
  { id: 3, text: "In the last month, how often have you felt nervous and stressed?", isReversed: false },
  { id: 4, text: "In the last month, how often have you felt confident about your ability to handle your personal problems?", isReversed: true },
  { id: 5, text: "In the last month, how often have you felt that things were going your way?", isReversed: true },
  { id: 6, text: "In the last month, how often have you found that you could not cope with all the things that you had to do?", isReversed: false },
  { id: 7, text: "In the last month, how often have you been able to control irritations in your life?", isReversed: true },
  { id: 8, text: "In the last month, how often have you felt that you were on top of things?", isReversed: true },
  { id: 9, text: "In the last month, how often have you been angered because of things that were outside of your control?", isReversed: false },
  { id: 10, text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?", isReversed: false }
];

const regularOptions = [
  { value: 0, label: "Never" },
  { value: 1, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Fairly Often" },
  { value: 4, label: "Very Often" }
];

const reversedOptions = [
  { value: 4, label: "Never" },
  { value: 3, label: "Almost Never" },
  { value: 2, label: "Sometimes" },
  { value: 1, label: "Fairly Often" },
  { value: 0, label: "Very Often" }
];

const Questionnaire = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const calculateScore = () => {
    return responses.reduce((total, response) => total + (response || 0), 0);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptionIndex(0);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOptionIndex(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const options = questions[currentQuestion].isReversed ? reversedOptions : regularOptions;

      switch(e.key) {
        case 'ArrowLeft':
          previousQuestion();
          break;
        case 'ArrowRight':
          if (responses[currentQuestion] !== null) {
            if (currentQuestion === questions.length - 1) {
              const score = calculateScore();
              setFinalScore(score);
              setShowModal(true);
            } else {
              nextQuestion();
            }
          }
          break;
        case 'Enter':
          setResponses(prev => {
            const newResponses = [...prev];
            newResponses[currentQuestion] = options[selectedOptionIndex].value;
            return newResponses;
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, responses, selectedOptionIndex]);

  if (!isStarted) {
    return (
      <div className="h-screen flex items-center justify-center p-2">
        <div className="w-[400px] max-w-3xl mx-auto text-center backdrop-blur-lg bg-gray-100/90 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Stress Assessment Questionnaire
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed text-xs sm:text-sm">
            Take our comprehensive stress assessment to understand your current stress levels and receive personalized insights. This questionnaire will take approximately 2 minutes to complete.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="group relative inline-flex items-center px-4 py-2 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full overflow-hidden transition-all duration-300 hover:opacity-90"
          >
            <span className="relative z-10">Get Started</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-[400px] h-[650px] max-w-3xl bg-gray-100/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 sm:mb-6">
          <div 
            className="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          >
            <div className="w-full h-full bg-[rgba(255,255,255,0.2)] rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 min-h-[400px]">
          {/* Question number */}
          <p className="text-gray-600 text-xs font-medium tracking-wider">
            QUESTION {currentQuestion + 1}/{questions.length}
          </p>

          {/* Question text */}
          <h2 className="text-lg sm:text-xl text-gray-800 font-bold leading-relaxed h-[85px]">
            {questions[currentQuestion].text}
          </h2>

          {/* Options */}
          <div className="grid gap-2">
            {(questions[currentQuestion].isReversed ? reversedOptions : regularOptions).map((option, index) => (
              <Option
                key={option.value}
                option={option}
                responses={responses}
                currentQuestion={currentQuestion}
                setResponses={setResponses}
                isSelected={index === selectedOptionIndex}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4 sm:pt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2
                ${currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white'
                }`}
            >
              <IoArrowBack /> Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => {
                  const score = calculateScore();
                  setFinalScore(score);
                  setShowModal(true);
                }}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2"
              >
                Calculate Score <IoArrowForward />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={responses[currentQuestion] === null}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2
                  ${responses[currentQuestion] === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 text-white'
                  }`}
              >
                Next <IoArrowForward />
              </button>
            )}
          </div>
        </div>
      </div>
      <ScoreModal 
        score={finalScore}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Questionnaire;