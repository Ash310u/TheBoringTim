import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DayCard from '../components/DayCard';
import MoodModal from '../components/MoodModal';
import { useCreateMoodMutation, useGetMoodsQuery, setMood, setMonthMoods } from '../store';

const MoodMap = () => {
  const emotions = useSelector(state => state.mood.emotions);
  const moods = useSelector(state => state.mood.moods);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [createMood] = useCreateMoodMutation();

  // Get all months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      index: i
    };
  });

  // Generate year options (from 2025 to 2030)
  const years = Array.from({ length: 7 }, (_, i) => 2025 + i);

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

  // Add the query hook
  const { data: monthMoods, error } = useGetMoodsQuery({
    userId,
    startDate: new Date(selectedYear, selectedMonth, 1).toISOString(),
    endDate: new Date(selectedYear, selectedMonth + 1, 0).toISOString()
  });

  // Use useEffect to update the moods in the store when data is received
  useEffect(() => {
    if (monthMoods) {
      dispatch(setMonthMoods(monthMoods));
    }
  }, [monthMoods, dispatch, selectedMonth, selectedYear]);

  const MonthSection = ({ month, monthIndex }) => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-300">
          {month}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {getDaysInMonth(monthIndex).map((date) => {
            const dateObj = new Date(date)
            const dateKey = Number(
              dateObj.getFullYear().toString() +
              (dateObj.getMonth() + 1).toString().padStart(2, '0') +
              dateObj.getDate().toString().padStart(2, '0')
            );
            const dayMood = moods[dateKey];

            return (
              <DayCard 
                key={date.toISOString()}
                date={date}
                emotions={dayMood?.emotion || emotions[0]}
                note={dayMood?.note || ''}
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
          moodData={moods}
          emotions={emotions}
          onSave={async (moodData) => {
            try {
              const response = await createMood(moodData).unwrap();
              dispatch(setMood(response));
              // You might want to show a success notification here
            } catch (error) {
              console.error('Failed to save mood:', error);
              // You might want to show an error notification here
            }
          }}
        />
      )}
    </div>
  );
};

export default MoodMap;