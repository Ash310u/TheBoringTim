const Option = ({ option, responses, currentQuestion, setResponses }) => {

    const handleChange = (value) => {
        const newResponses = [...responses];
        newResponses[currentQuestion] = value;
        setResponses(newResponses);
      };

    return (
        <div
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={`
                  p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-102
                  ${responses[currentQuestion] === option.value
                    ? 'border-pink-300 bg-gradient-to-r from-pink-400/10 to-pink-500/10 text-gray-800'
                    : 'border-white/10 hover:border-pink-300/30 text-gray-800 hover:bg-white/5'
                }
                `}
        >
            <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${responses[currentQuestion] === option.value
                        ? 'border-pink-300 bg-pink-300'
                        : 'border-gray-400'
                    }`}
                >
                    {responses[currentQuestion] === option.value && (
                        <div className="w-2 h-2 bg-gray-800 rounded-full" />
                    )}
                </div>
                <span className="text-sm sm:text-base text-gray-800">{option.label}</span>
            </div>
        </div>
    )
}

export default Option
