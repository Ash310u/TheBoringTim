import { useState } from 'react';
import Option from './Option';

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

  const calculateScore = () => {
    return responses.reduce((total, response) => total + (response || 0), 0);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!isStarted) {
    return (
      <div className="h-screen flex items-center justify-center p-2">
        <div className="w-[400px] max-w-3xl mx-auto text-center backdrop-blur-lg bg-slate-800/40 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-700/50 transform hover:scale-105 transition-all duration-300">
          <h1 className="text-xl sm:text-2xl font-bold text-white/90 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-300/90 to-violet-500/90">
            Stress Assessment Questionnaire
          </h1>
          <p className="text-slate-300/80 mb-4 leading-relaxed text-xs sm:text-sm">
            Take our comprehensive stress assessment to understand your current stress levels and receive personalized insights. This questionnaire will take approximately 2 minutes to complete.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="group relative inline-flex items-center px-4 py-2 text-sm sm:text-base font-bold text-white/90 bg-gradient-to-r from-violet-400/90 to-violet-600/90 rounded-full overflow-hidden transition-all duration-300 hover:from-violet-500/90 hover:to-violet-700/90"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/80 to-violet-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-r from-violet-300/70 to-violet-500/70 animate-pulse"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-[400px] h-[650px] max-w-3xl bg-slate-800/40 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-700/50">
        {/* Progress bar */}
        <div className="w-full bg-slate-700/30 rounded-full h-1.5 mb-4 sm:mb-6">
          <div 
            className="h-1.5 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4 sm:space-y-6 min-h-[400px]">
          {/* Question number */}
          <p className="text-slate-300 text-xs font-medium tracking-wider">
            <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">QUESTION</span> {currentQuestion + 1}/{questions.length}
          </p>

          {/* Question text */}
          <h2 className="text-lg sm:text-xl text-white font-bold leading-relaxed h-[85px]">
            {questions[currentQuestion].text}
          </h2>

          {/* Options */}
          <div className="grid gap-2">
            {(questions[currentQuestion].isReversed ? reversedOptions : regularOptions).map(option => (
              <Option
                key={option.value}
                option={option}
                responses={responses}
                currentQuestion={currentQuestion}
                setResponses={setResponses}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4 sm:pt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300
                ${currentQuestion === 0
                  ? 'bg-slate-700/30 text-slate-400/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-400 to-violet-600 hover:from-violet-500 hover:to-violet-700 text-white'
                }`}
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => {
                  const score = calculateScore();
                  let stressLevel = "Low Stress";
                  if (score > 26) stressLevel = "High Perceived Stress";
                  else if (score > 13) stressLevel = "Moderate Stress";
                  alert(`Your total score is: ${score}\n${stressLevel}`);
                }}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-400 to-violet-600 hover:from-violet-500 hover:to-violet-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-all duration-300"
              >
                Calculate Score
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={responses[currentQuestion] === null}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300
                  ${responses[currentQuestion] === null
                    ? 'bg-slate-700/30 text-slate-400/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-violet-400 to-violet-600 hover:from-violet-500 hover:to-violet-700 text-white'
                  }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
    