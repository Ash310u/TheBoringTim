import { useState } from 'react';
import { useSelector } from 'react-redux';

const MoodModal = ({ date, onClose, moodData, emotions, onSave }) => {
  const userId = useSelector(state => state.auth.userId);
  const dateObj = new Date(date);
  const dateKey = Number(
    dateObj.getFullYear().toString() +
    (dateObj.getMonth() + 1).toString().padStart(2, '0') +
    dateObj.getDate().toString().padStart(2, '0')
  );
  const [tempMoodData, setTempMoodData] = useState(
    moodData[dateKey] || { mood: emotions[0], note: '', intensity: 50, name:'Happy', emoji:'😊' }
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSave = () => {
    const moodPayload = {
      userId,
      date: date.toISOString(),
      emotion: tempMoodData.mood.name,
      intensity: tempMoodData.intensity,
      note: tempMoodData.note
    };

    onSave(moodPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-purple-50/80 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-zoom-in shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-pink-100 px-4 py-2 rounded-full">
            <h2 className="text-lg font-medium text-gray-700">
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'long'
              })}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <button
              className="w-full px-4 py-3 text-left border rounded-xl flex items-center justify-between bg-purple-50 border-purple-100 hover:bg-purple-100/50 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">{tempMoodData.mood?.emoji}</span>
                <span className="text-gray-700">{tempMoodData.mood?.name}</span>
              </span>
              <span className="text-purple-400">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-purple-100 rounded-xl shadow-lg overflow-hidden">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.name}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setTempMoodData(prev => ({ ...prev, mood: emotion }));
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="text-2xl">{emotion.emoji}</span>
                    <span className="text-gray-700">{emotion.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 bg-purple-50 p-4 rounded-xl">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Intensity</span>
              <span className="bg-white px-2 py-0.5 rounded-full text-purple-600 font-medium">
                {tempMoodData.intensity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-purple-400"
              value={tempMoodData.intensity}
              onChange={(e) => setTempMoodData(prev => ({ ...prev, intensity: Number(e.target.value) }))}
            />
          </div>

          <textarea
            className="w-full p-4 border rounded-xl resize-none h-32 focus:ring-2 focus:ring-purple-100 focus:border-purple-200 bg-purple-50/50 border-purple-100"
            placeholder="How are you feeling today?"
            value={tempMoodData.note}
            onChange={(e) => setTempMoodData(prev => ({ ...prev, note: e.target.value }))}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-purple-100 rounded-full hover:bg-purple-50 text-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full hover:from-purple-500 hover:to-pink-500 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodModal;