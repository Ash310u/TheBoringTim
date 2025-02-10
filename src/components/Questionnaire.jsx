import React, { useState } from 'react';

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

  const handleChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

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
      <div className="min-h-screen flex items-center justify-center p-2">
        <div className="max-w-2xl mx-auto text-center backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 transform hover:scale-105 transition-all duration-300">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Stress Assessment Questionnaire
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            Take our comprehensive stress assessment to understand your current stress levels and receive personalized insights. This questionnaire will take approximately 2 minutes to complete.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="group relative inline-flex items-center px-6 py-3 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/10">
        {/* Progress bar */}
        <div className="w-full bg-gray-800/50 rounded-full h-2 mb-6 sm:mb-8">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Question number */}
          <p className="text-blue-900 text-xs sm:text-sm font-medium tracking-wider">
            <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">QUESTION</span> {currentQuestion + 1}/{questions.length}
          </p>

          {/* Question text */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-relaxed">
            {questions[currentQuestion].text}
          </h2>

          {/* Options */}
          <div className="grid gap-3">
            {(questions[currentQuestion].isReversed ? reversedOptions : regularOptions).map(option => (
              <div
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={`
                  p-4 sm:p-6 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-102
                  ${responses[currentQuestion] === option.value 
                    ? 'border-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white' 
                    : 'border-white/10 hover:border-blue-400/50 text-white/80 hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${responses[currentQuestion] === option.value 
                      ? 'border-blue-400 bg-blue-400' 
                      : 'border-white/50'
                    }`}
                  >
                    {responses[currentQuestion] === option.value && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-base sm:text-lg">{option.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 sm:pt-8">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300
                ${currentQuestion === 0
                  ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
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
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-300"
              >
                Calculate Score
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={responses[currentQuestion] === null}
                className={`px-4 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300
                  ${responses[currentQuestion] === null
                    ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
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