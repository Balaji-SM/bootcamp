const StudentCard = ({ name, major, year }) => {
    return (
      <div className="max-w-sm bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">
          <strong>Major:</strong> {major}
        </p>
        <p className="text-gray-600">
          <strong>Year:</strong> {year}
        </p>
      </div>
    );
  };
  
  export default StudentCard;
  