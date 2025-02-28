import StudentCard from "./StudentCard";

const StudentList = ({ students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {students.map((student, index) => (
        <StudentCard 
          key={index} 
          name={student.name} 
          major={student.major} 
          year={student.year} 
        />
      ))}
    </div>
  );
};

export default StudentList;
