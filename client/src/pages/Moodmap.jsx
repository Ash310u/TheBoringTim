import { useState } from 'react';
import DayCard from '../components/DayCard';
import MoodModal from '../components/MoodModal';

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

  const MonthSection = ({ month, monthIndex }) => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-300">
          {month}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {getDaysInMonth(monthIndex).map((date) => {
            const dateKey = date.toISOString().split('T')[0];
            const dayMood = moodData[dateKey] || { mood: emotions[0], note: '', intensity: 50 };
            
            return (
              <DayCard 
                key={date.toISOString()}
                date={date}
                mood={dayMood.mood}
                note={dayMood.note}
                onClick={() => {
                  setSelectedDate(date);
                  setIsModalOpen(true);
                }}
              />
            );
          })}
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
          moodData={moodData}
          setMoodData={setMoodData}
          emotions={emotions}
        />
      )}
    </div>
  );
};

export default MoodMap;