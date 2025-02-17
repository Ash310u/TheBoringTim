const DayCard = ({ date, note, onClick, emotions }) => {
  return (
    <div
      onClick={onClick}
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
      <div className="flex flex-col gap-2">
        {emotions && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emotions?.emoji}</span>
          </div>
        )}
        {note && (
          <p className="text-sm text-gray-600 truncate">
            {note}
          </p>
        )}
      </div>
    </div>
  );
};

export default DayCard; 