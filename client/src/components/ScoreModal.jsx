const ScoreModal = ({ score, isOpen, onClose }) => {
  let stressLevel = "Low Stress";
  if (score > 26) stressLevel = "High Perceived Stress";
  else if (score > 13) stressLevel = "Moderate Stress";

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-[90%] max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Results</h2>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              {score}
            </p>
            <p className="text-gray-600">Total Score</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">{stressLevel}</p>
            <p className="text-sm text-gray-600 mt-2">
              Based on the Perceived Stress Scale scoring system
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ScoreModal; 