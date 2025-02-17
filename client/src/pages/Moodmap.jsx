import React, { useState } from 'react';

const MoodMap = () => {
  const emotions = [
    { name: 'Happy', emoji: '😊' },
    { name: 'Sad', emoji: '😢' },
    { name: 'Angry', emoji: '😠' },
    { name: 'Excited', emoji: '🤩' },
    { name: 'Tired', emoji: '😴' },
    { name: 'Anxious', emoji: '😰' },
  ];

  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  // Get all months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      index: i
    };
  });

  // Generate year options (from 2024 to 2030)
  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

  // Navigation Component
  const Navigation = () => {
    return (
      <div className="mb-8 flex justify-center gap-4">
        <div className="relative">
          <button
            onClick={() => {
              setIsMonthDropdownOpen(!isMonthDropdownOpen);
              setIsYearDropdownOpen(false);
            }}
            className="px-6 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 text-gray-700"
          >
            {months[selectedMonth].name}
            <span className="text-purple-400">▼</span>
          </button>
          
          {isMonthDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white rounded-xl shadow-lg z-20 py-2">
              {months.map((month) => (
                <button
                  key={month.index}
                  onClick={() => {
                    setSelectedMonth(month.index);
                    setIsMonthDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors ${
                    selectedMonth === month.index ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                  }`}
                >
                  {month.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsYearDropdownOpen(!isYearDropdownOpen);
              setIsMonthDropdownOpen(false);
            }}
            className="px-6 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 text-gray-700"
          >
            {selectedYear}
            <span className="text-purple-400">▼</span>
          </button>
          
          {isYearDropdownOpen && (
            <div className="absolute mt-2 w-32 bg-white rounded-xl shadow-lg z-20 py-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors ${
                    selectedYear === year ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Update getDaysInMonth to use selected year
  const getDaysInMonth = (month) => {
    const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(selectedYear, month, i + 1));
  };

  const MoodModal = ({ date, onClose }) => {
    const dateKey = date.toISOString().split('T')[0];
    const [tempMoodData, setTempMoodData] = useState(
      moodData[dateKey] || { mood: emotions[0], note: '', intensity: 50 }
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSave = () => {
      setMoodData(prev => ({
        ...prev,
        [dateKey]: tempMoodData
      }));
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
                  <span className="text-2xl">{tempMoodData.mood.emoji}</span>
                  <span className="text-gray-700">{tempMoodData.mood.name}</span>
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

  const DayCard = ({ date }) => {
    const dateKey = date.toISOString().split('T')[0];
    const dayMood = moodData[dateKey] || { mood: emotions[0], note: '', intensity: 50 };

    return (
      <div
        onClick={() => {
          setSelectedDate(date);
          setIsModalOpen(true);
        }}
        className="bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 -mx-3 -mt-3 p-2 rounded-t-xl mb-3">
          <div className="text-sm text-gray-700 font-medium">
            {date.toLocaleDateString('en-US', {
              weekday: 'short',
              day: '2-digit',
              month: 'short'
            })}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-2xl">{dayMood.mood.emoji}</span>
          {dayMood.note && (
            <p className="text-sm text-gray-600 truncate">
              {dayMood.note}
            </p>
          )}
        </div>
      </div>
    );
  };

  const MonthSection = ({ month, monthIndex }) => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-300">
          {month}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {getDaysInMonth(monthIndex).map((date) => (
            <DayCard key={date.toISOString()} date={date} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 pt-2 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen h-screen overflow-hidden flex flex-col">
      <div className="mb-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text tracking-tight">
            MoodMaps
            <span className="block text-base font-light text-gray-600 mt-2">Track your emotional journey</span>
          </h1>

          <Navigation />
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full">
        <div className="bg-white/50 rounded-2xl p-4 shadow-sm">
          <MonthSection 
            month={months[selectedMonth].name} 
            monthIndex={selectedMonth} 
          />
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <MoodModal 
          date={selectedDate} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDate(null);
          }} 
        />
      )}
    </div>
  );
};

export default MoodMap;